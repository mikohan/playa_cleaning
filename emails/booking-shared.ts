// Shared data + styles for booking emails (manager + customer)
import type { BookingInput, Quote, PaymentOption } from "@/lib/booking"

export type BookingEmailStatus = "requested" | "awaiting_payment" | "paid"

export interface BookingEmailData {
  bookingId: string
  status: BookingEmailStatus
  booking: BookingInput
  quote: Quote
  payment: PaymentOption
  dueToday: number
  balance: number
  paidAmount?: number
  stripeDashboardUrl?: string
  createdAt: string // already formatted, LA time
  ownerName: string
  companyPhone: string
  companyEmail: string
  website: string
}

export const colors = {
  blue: "#2b6cb8",
  blueDark: "#1e4f8a",
  ink: "#0f172a",
  muted: "#475569",
  line: "#e2e8f0",
  soft: "#f1f5fb",
  green: "#15803d",
  amber: "#b45309",
}

export const s = {
  body: {
    backgroundColor: "#f6f8fb",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    border: `1px solid ${colors.line}`,
    borderRadius: "16px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "32px",
  },
  brand: {
    color: colors.blue,
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.12em",
    margin: "0 0 20px",
    textTransform: "uppercase" as const,
  },
  h1: { color: colors.ink, fontSize: "24px", fontWeight: 800, lineHeight: "1.3", margin: "0 0 12px" },
  p: { color: colors.muted, fontSize: "15px", lineHeight: "1.6", margin: "0 0 14px" },
  sectionTitle: {
    color: colors.ink,
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.1em",
    margin: "24px 0 8px",
    textTransform: "uppercase" as const,
  },
  row: { borderBottom: `1px solid ${colors.line}`, padding: "8px 0" },
  label: { color: colors.muted, fontSize: "14px", width: "42%", verticalAlign: "top" as const, padding: "6px 0" },
  value: { color: colors.ink, fontSize: "14px", fontWeight: 600, verticalAlign: "top" as const, padding: "6px 0" },
  totalBox: {
    backgroundColor: colors.soft,
    borderRadius: "12px",
    margin: "20px 0 0",
    padding: "16px 20px",
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: "10px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 700,
    padding: "12px 22px",
    textDecoration: "none",
  },
  footer: { color: "#94a3b8", fontSize: "12px", lineHeight: "1.6", margin: "24px 0 0" },
}
