/**
 * Booking: shared between the calculator, the booking page and the server.
 * The server always recalculates the price with calculateQuote(), so the
 * amount charged never comes from the browser.
 */
import { z } from "zod"
import {
  INCLUSIONS,
  PRICING_ADDONS,
  PRICING_MATRICES,
} from "@/app/data/pricing"

// ─────────────────────────────────────────────────────────────
// Options
// ─────────────────────────────────────────────────────────────

/** Cookie set by ?meta_test=TEST12345 (components/common/MetaTestLink.tsx) */
export const META_TEST_COOKIE = "meta_test_code"

export const DEPOSIT_AMOUNT = 50 // USD, refundable up to one day before

export const BED_OPTIONS = Object.keys(PRICING_MATRICES.STANDARD) // 1..5+
export const BATH_OPTIONS = ["1", "2", "3", "4", "5+"]
export const SERVICE_TYPES = ["standard", "deep", "move"] as const
export const TOGGLE_ADDONS = ["fridge", "oven", "moveAppliances", "pets"] as const
export const TIME_WINDOWS = ["morning", "midday", "afternoon", "flexible"] as const
export const PAYMENT_OPTIONS = ["later", "deposit", "full"] as const

export type ServiceType = (typeof SERVICE_TYPES)[number]
export type ToggleAddon = (typeof TOGGLE_ADDONS)[number]
export type TimeWindow = (typeof TIME_WINDOWS)[number]
export type PaymentOption = (typeof PAYMENT_OPTIONS)[number]

export const SERVICE_LABELS: Record<ServiceType, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  move: "Move In/Out Cleaning",
}

export const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  morning: "Morning (8–11 am)",
  midday: "Midday (11 am–2 pm)",
  afternoon: "Afternoon (2–5 pm)",
  flexible: "Any time works",
}

export const PAYMENT_LABELS: Record<PaymentOption, string> = {
  later: "Pay after the cleaning",
  deposit: `$${DEPOSIT_AMOUNT} deposit now`,
  full: "Pay in full now",
}

// ─────────────────────────────────────────────────────────────
// Quote
// ─────────────────────────────────────────────────────────────

export const quoteSchema = z.object({
  beds: z.enum(BED_OPTIONS as [string, ...string[]]),
  baths: z.enum(BATH_OPTIONS as [string, ...string[]]),
  type: z.enum(SERVICE_TYPES),
  addons: z.array(z.enum(TOGGLE_ADDONS)).max(TOGGLE_ADDONS.length).default([]),
  windows: z.coerce.number().int().min(0).max(60).default(0),
  blinds: z.coerce.number().int().min(0).max(60).default(0),
})
export type QuoteInput = z.infer<typeof quoteSchema>

export interface QuoteLine {
  label: string
  amount: number
  included?: boolean
}

export interface Quote {
  input: QuoteInput
  serviceLabel: string
  roomsLabel: string
  lines: QuoteLine[]
  total: number
}

const FREE_WINDOWS_WHEN_INCLUDED = 5

export function isIncluded(type: ServiceType, addon: string): boolean {
  return INCLUSIONS[type]?.includes(addon) ?? false
}

/** Same math the calculator shows. Single source of truth for the price. */
export function calculateQuote(input: QuoteInput): Quote {
  const { beds, baths, type } = input
  const matrix =
    type === "standard" ? PRICING_MATRICES.STANDARD : PRICING_MATRICES.DEEP

  let base = matrix[beds]?.[baths]
  if (!base) {
    // Combination not in the price table: same fallback as the calculator
    const defaultBase = type === "standard" ? 165 : 280
    base = defaultBase + parseInt(beds) * 25 + parseInt(baths) * 30
  }
  if (type === "move") base = base * PRICING_ADDONS.moveMultiplier
  base = Math.round(base)

  const lines: QuoteLine[] = [
    { label: `${SERVICE_LABELS[type]}, ${beds} bed / ${baths} bath`, amount: base },
  ]

  for (const id of TOGGLE_ADDONS) {
    const item = PRICING_ADDONS.addons[id]
    if (isIncluded(type, id)) {
      lines.push({ label: item.label, amount: 0, included: true })
    } else if (input.addons.includes(id)) {
      lines.push({ label: item.label, amount: item.price })
    }
  }

  const freeWindows = isIncluded(type, "windows") ? FREE_WINDOWS_WHEN_INCLUDED : 0
  if (freeWindows) {
    lines.push({ label: `Interior windows (first ${freeWindows})`, amount: 0, included: true })
  }
  const paidWindows = Math.max(0, input.windows - freeWindows)
  if (paidWindows > 0) {
    lines.push({
      label: `Interior windows × ${paidWindows}`,
      amount: paidWindows * PRICING_ADDONS.addons.windows.price,
    })
  }
  if (input.blinds > 0) {
    lines.push({
      label: `Hand-wiped blinds × ${input.blinds}`,
      amount: input.blinds * PRICING_ADDONS.addons.blinds.price,
    })
  }

  const total = Math.round(lines.reduce((s, l) => s + l.amount, 0))
  return {
    input,
    serviceLabel: SERVICE_LABELS[type],
    roomsLabel: `${beds} bed / ${baths} bath`,
    lines,
    total,
  }
}

/** Amount charged today and balance after the cleaning. */
export function paymentSplit(total: number, option: PaymentOption) {
  const dueToday =
    option === "full" ? total : option === "deposit" ? Math.min(DEPOSIT_AMOUNT, total) : 0
  return { dueToday, balance: Math.max(0, total - dueToday) }
}

/** Quote <-> URL params (calculator → booking page). No price in the URL. */
export function quoteToParams(q: QuoteInput): URLSearchParams {
  const p = new URLSearchParams({ beds: q.beds, baths: q.baths, type: q.type })
  if (q.addons.length) p.set("addons", q.addons.join(","))
  if (q.windows) p.set("windows", String(q.windows))
  if (q.blinds) p.set("blinds", String(q.blinds))
  return p
}

export function quoteFromParams(p: URLSearchParams): QuoteInput | null {
  const parsed = quoteSchema.safeParse({
    beds: p.get("beds") ?? undefined,
    baths: p.get("baths") ?? undefined,
    type: p.get("type") ?? undefined,
    addons: (p.get("addons") || "").split(",").filter(Boolean),
    windows: p.get("windows") ?? 0,
    blinds: p.get("blinds") ?? 0,
  })
  return parsed.success ? parsed.data : null
}

// ─────────────────────────────────────────────────────────────
// Booking request (booking page → /api/checkout)
// ─────────────────────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date")

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Please enter a valid phone number"),
  email: z.email("Please enter a valid email").max(200),
  address: z.string().trim().min(5, "Please enter the service address").max(200),
  preferredDates: z.array(isoDate).min(1, "Pick at least one date").max(3),
  timeWindows: z.array(z.enum(TIME_WINDOWS)).min(1, "Pick a time of day").max(4),
  notes: z.string().trim().max(1000).optional().default(""),
  payment: z.enum(PAYMENT_OPTIONS),
  quote: quoteSchema,
  tracking: z
    .object({
      eventId: z.string().max(100).optional(),
      fbc: z.string().max(300).optional(),
      fbp: z.string().max(300).optional(),
      pageUrl: z.string().max(500).optional(),
      testCode: z.string().max(40).optional(),
    })
    .optional()
    .default({}),
})
export type BookingInput = z.infer<typeof bookingSchema>

export function newBookingId(date = new Date()): string {
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, "")
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `PC-${ymd}-${rand}`
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

export function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}
