import "server-only"
import { Resend } from "resend"
import { render } from "@react-email/components"
import type Stripe from "stripe"
import {
  BookingInput,
  PaymentOption,
  bookingSchema,
  calculateQuote,
  formatUSD,
  paymentSplit,
} from "@/lib/booking"
import BookingManagerEmail from "@/emails/BookingManagerEmail"
import BookingCustomerEmail from "@/emails/BookingCustomerEmail"
import type { BookingEmailData, BookingEmailStatus } from "@/emails/booking-shared"

const resend = new Resend(process.env.RESEND_API_KEY)

export const SITE_TAG = "playa" // marks Playa payments in the shared Stripe account

const FROM = (process.env.RESEND_FROM_EMAIL || "Playa Cleaning <info@angaracleaning.com>").trim()
const MANAGER = (process.env.COMPANY_EMAIL || "angaralabllc@gmail.com").trim()
const REPLY_TO = (process.env.NEXT_PUBLIC_COMPANY_EMAIL || "order@playacleaning.com").trim()
const OWNER = (process.env.NEXT_PUBLIC_COMPANY_OWNER || "Alicia").trim()
const PHONE = (process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343").trim()
const WEBSITE = (process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://playacleaning.com").replace(/\/$/, "")

export function laTime(date = new Date()) {
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function buildEmailData(args: {
  bookingId: string
  booking: BookingInput
  status: BookingEmailStatus
  paidAmount?: number
  stripeDashboardUrl?: string
  createdAt?: string
}): BookingEmailData {
  const quote = calculateQuote(args.booking.quote)
  const { dueToday, balance } = paymentSplit(quote.total, args.booking.payment)
  return {
    bookingId: args.bookingId,
    status: args.status,
    booking: args.booking,
    quote,
    payment: args.booking.payment,
    dueToday,
    balance:
      args.status === "paid" && args.paidAmount !== undefined
        ? Math.max(0, quote.total - args.paidAmount)
        : balance,
    paidAmount: args.paidAmount,
    stripeDashboardUrl: args.stripeDashboardUrl,
    createdAt: args.createdAt || laTime(),
    ownerName: OWNER,
    companyPhone: PHONE,
    companyEmail: REPLY_TO,
    website: WEBSITE,
  }
}

const MANAGER_SUBJECT: Record<BookingEmailStatus, (d: BookingEmailData) => string> = {
  requested: (d) => `🧹 New booking request: ${d.booking.name}, ${d.quote.serviceLabel} ${formatUSD(d.quote.total)} (pay later)`,
  awaiting_payment: (d) => `⏳ New booking, paying ${formatUSD(d.dueToday)}: ${d.booking.name}, ${d.quote.serviceLabel}`,
  paid: (d) => `💰 PAID ${formatUSD(d.paidAmount ?? d.dueToday)}: ${d.booking.name}, ${d.quote.serviceLabel} (${d.bookingId})`,
}

/** One email to the manager. idempotencyKey stops duplicates on retries. */
export async function sendManagerEmail(d: BookingEmailData) {
  const el = BookingManagerEmail(d)
  return resend.emails.send(
    {
      from: FROM,
      to: [MANAGER],
      replyTo: d.booking.email,
      subject: MANAGER_SUBJECT[d.status](d),
      html: await render(el),
      text: await render(el, { plainText: true }),
    },
    { idempotencyKey: `mgr-${d.status}-${d.bookingId}` }
  )
}

/** Confirmation to the customer, signed by the owner. */
export async function sendCustomerEmail(d: BookingEmailData) {
  const el = BookingCustomerEmail(d)
  return resend.emails.send(
    {
      from: FROM,
      to: [d.booking.email],
      replyTo: REPLY_TO,
      subject:
        d.status === "paid"
          ? `Your Playa Cleaning payment is confirmed (${d.bookingId})`
          : `We got your cleaning request, ${d.booking.name.split(" ")[0]}!`,
      html: await render(el),
      text: await render(el, { plainText: true }),
    },
    { idempotencyKey: `cust-${d.status}-${d.bookingId}` }
  )
}

// ─────────────────────────────────────────────────────────────
// Stripe metadata (max 50 keys, 500 chars per value)
// ─────────────────────────────────────────────────────────────

const cut = (v: string | undefined, n = 500) => (v || "").slice(0, n)

export function bookingToMetadata(bookingId: string, b: BookingInput): Record<string, string> {
  const q = calculateQuote(b.quote)
  const split = paymentSplit(q.total, b.payment)
  return {
    site: SITE_TAG,
    booking_id: bookingId,
    name: cut(b.name),
    phone: cut(b.phone),
    email: cut(b.email),
    address: cut(b.address),
    dates: b.preferredDates.join(","),
    times: b.timeWindows.join(","),
    notes: cut(b.notes),
    payment: b.payment,
    beds: b.quote.beds,
    baths: b.quote.baths,
    type: b.quote.type,
    addons: b.quote.addons.join(","),
    windows: String(b.quote.windows),
    blinds: String(b.quote.blinds),
    total: String(q.total),
    due_today: String(split.dueToday),
    balance: String(split.balance),
    page_url: cut(b.tracking?.pageUrl),
    fbc: cut(b.tracking?.fbc),
    fbp: cut(b.tracking?.fbp),
    event_id: cut(b.tracking?.eventId, 100),
    test_code: cut(b.tracking?.testCode, 40),
  }
}

export function bookingFromMetadata(m: Stripe.Metadata | null): {
  bookingId: string
  booking: BookingInput
} | null {
  if (!m || m.site !== SITE_TAG || !m.booking_id) return null
  const parsed = bookingSchema.safeParse({
    name: m.name,
    phone: m.phone,
    email: m.email,
    address: m.address,
    preferredDates: (m.dates || "").split(",").filter(Boolean),
    timeWindows: (m.times || "").split(",").filter(Boolean),
    notes: m.notes || "",
    payment: m.payment as PaymentOption,
    quote: {
      beds: m.beds,
      baths: m.baths,
      type: m.type,
      addons: (m.addons || "").split(",").filter(Boolean),
      windows: m.windows || 0,
      blinds: m.blinds || 0,
    },
    tracking: {
      pageUrl: m.page_url || undefined,
      fbc: m.fbc || undefined,
      fbp: m.fbp || undefined,
      eventId: m.event_id || undefined,
      testCode: m.test_code || undefined,
    },
  })
  if (!parsed.success) {
    console.error("[booking] metadata did not parse", parsed.error.issues)
    return null
  }
  return { bookingId: m.booking_id, booking: parsed.data }
}
