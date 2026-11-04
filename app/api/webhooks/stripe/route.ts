import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import {
  SITE_TAG,
  bookingFromMetadata,
  buildEmailData,
  laTime,
  sendCustomerEmail,
  sendManagerEmail,
} from "@/lib/booking-server"
import { sendMetaCapiEvent } from "@/lib/meta-capi"

// Stripe needs the raw body to check the signature
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const HANDLED = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
])

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = req.headers.get("stripe-signature")
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret)
  } catch (err) {
    console.error("[stripe webhook] bad signature", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (!HANDLED.has(event.type)) return NextResponse.json({ received: true })

  // Fresh copy from Stripe (our API version, latest metadata)
  const sessionId = (event.data.object as Stripe.Checkout.Session).id
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  // Shared Stripe account: only act on Playa payments
  if (session.metadata?.site !== SITE_TAG) {
    return NextResponse.json({ received: true, skipped: "not playa" })
  }
  // Card is paid instantly; delayed methods come back later as async_payment_succeeded
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, skipped: "not paid yet" })
  }
  // Already handled (Stripe retries, or both events arrived)
  if (session.metadata?.notified === "1") {
    return NextResponse.json({ received: true, skipped: "already notified" })
  }

  const parsed = bookingFromMetadata(session.metadata)
  if (!parsed) {
    console.error("[stripe webhook] could not read booking from session", session.id)
    return NextResponse.json({ received: true, skipped: "bad metadata" })
  }

  const paidAmount = (session.amount_total ?? 0) / 100
  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id
  const dashboardUrl = paymentIntentId
    ? `https://dashboard.stripe.com/payments/${paymentIntentId}`
    : undefined

  const data = buildEmailData({
    bookingId: parsed.bookingId,
    booking: parsed.booking,
    status: "paid",
    paidAmount,
    stripeDashboardUrl: dashboardUrl,
    createdAt: laTime(new Date(session.created * 1000)),
  })

  const mgr = await sendManagerEmail(data)
  if (mgr.error) {
    console.error("[stripe webhook] manager email failed", parsed.bookingId, mgr.error)
    // 500 → Stripe retries later; idempotency keys stop duplicate emails
    return NextResponse.json({ error: "email failed" }, { status: 500 })
  }
  const cust = await sendCustomerEmail(data)
  if (cust.error) console.error("[stripe webhook] customer email failed", parsed.bookingId, cust.error)

  await sendMetaCapiEvent({
    eventName: "Purchase",
    eventId: `purchase_${parsed.bookingId}`,
    value: paidAmount,
    user: {
      phone: parsed.booking.phone,
      email: parsed.booking.email,
      first_name: parsed.booking.name.split(" ")[0],
      fbc: parsed.booking.tracking?.fbc,
      fbp: parsed.booking.tracking?.fbp,
    },
  }).catch((e) => console.error("[stripe webhook] CAPI Purchase failed", e))

  // Mark as done so retries skip it
  await stripe.checkout.sessions
    .update(session.id, { metadata: { ...session.metadata, notified: "1" } })
    .catch((e) => console.error("[stripe webhook] could not mark notified", e))

  return NextResponse.json({ received: true })
}
