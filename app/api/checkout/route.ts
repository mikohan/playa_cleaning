import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import {
  DEPOSIT_AMOUNT,
  bookingSchema,
  calculateQuote,
  newBookingId,
  paymentSplit,
  quoteToParams,
} from "@/lib/booking"
import {
  bookingToMetadata,
  buildEmailData,
  sendCustomerEmail,
  sendManagerEmail,
} from "@/lib/booking-server"
import { sendMetaCapiEvent } from "@/lib/meta-capi"

const WEBSITE = (process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://playacleaning.com").replace(/\/$/, "")

/**
 * Booking submit (all three payment choices).
 * 1. Validates the form and recalculates the price on the server.
 * 2. Emails the manager right away, so every request is saved even if the
 *    customer leaves Stripe without paying.
 * 3. "later": emails the customer and returns. "deposit"/"full": creates a
 *    Stripe Checkout session; the webhook sends the "PAID" emails.
 */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json(
      { error: first?.message || "Please check the form", field: first?.path.join(".") },
      { status: 400 }
    )
  }

  const booking = parsed.data
  const bookingId = newBookingId()
  const quote = calculateQuote(booking.quote)
  const { dueToday } = paymentSplit(quote.total, booking.payment)
  const paysNow = booking.payment !== "later" && dueToday > 0

  // ── Manager email (always) ─────────────────────────────────
  const managerData = buildEmailData({
    bookingId,
    booking,
    status: paysNow ? "awaiting_payment" : "requested",
  })
  const mgr = await sendManagerEmail(managerData).catch((e) => ({ error: e }))
  if ("error" in mgr && mgr.error) {
    console.error("[booking] manager email failed", bookingId, mgr.error)
  }

  // ── Meta Conversions API: Lead ─────────────────────────────
  const h = await headers()
  const ip = h.get("cf-connecting-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined
  const ua = h.get("user-agent") || undefined
  sendMetaCapiEvent({
    eventName: "Lead",
    eventId: booking.tracking?.eventId || `lead_${bookingId}`,
    value: quote.total,
    eventSourceUrl: booking.tracking?.pageUrl || h.get("referer") || `${WEBSITE}/booking/confirm`,
    testEventCode: process.env.META_TEST_EVENT_CODE?.trim() || undefined,
    user: {
      phone: booking.phone,
      email: booking.email,
      first_name: booking.name.split(" ")[0],
      clientIpAddress: ip,
      clientUserAgent: ua,
      fbc: booking.tracking?.fbc,
      fbp: booking.tracking?.fbp,
    },
  }).catch((e) => console.error("[booking] CAPI Lead failed", e))

  // ── Pay later: done ────────────────────────────────────────
  if (!paysNow) {
    if ("error" in mgr && mgr.error) {
      return NextResponse.json(
        { error: "We could not send your request. Please call or text us." },
        { status: 502 }
      )
    }
    await sendCustomerEmail(buildEmailData({ bookingId, booking, status: "requested" })).catch((e) =>
      console.error("[booking] customer email failed", bookingId, e)
    )
    return NextResponse.json({ ok: true, bookingId, total: quote.total })
  }

  // ── Deposit / full: Stripe Checkout ────────────────────────
  try {
    const metadata = bookingToMetadata(bookingId, booking)
    const isDeposit = booking.payment === "deposit"
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Cards only (incl. Apple Pay / Google Pay). No buy-now-pay-later for deposits.
      payment_method_types: ["card"],
      customer_email: booking.email,
      customer_creation: "always",
      client_reference_id: bookingId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(dueToday * 100),
            product_data: {
              name: isDeposit
                ? `Deposit: ${quote.serviceLabel} (${quote.roomsLabel})`
                : `${quote.serviceLabel} (${quote.roomsLabel})`,
              description: isDeposit
                ? `$${DEPOSIT_AMOUNT} today, $${quote.total - dueToday} after the cleaning. Full refund if you cancel at least one day before.`
                : `Paid in full. Full refund if you cancel at least one day before.`,
            },
          },
        },
      ],
      metadata,
      payment_intent_data: {
        metadata,
        description: `Playa Cleaning ${bookingId}: ${quote.serviceLabel}, ${booking.name}`,
      },
      success_url: `${WEBSITE}/thank-you?status=paid&booking=${bookingId}`,
      cancel_url: `${WEBSITE}/booking/confirm?${quoteToParams(booking.quote).toString()}&cancelled=1`,
    })

    return NextResponse.json({ ok: true, bookingId, url: session.url })
  } catch (error) {
    console.error("[booking] Stripe session failed", bookingId, error)
    return NextResponse.json(
      { error: "Card payment is not available right now. Choose \"Pay after the cleaning\" or call us." },
      { status: 502 }
    )
  }
}
