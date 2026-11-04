"use client"

import React, { Suspense, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock,
  CreditCard,
  Home,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DEPOSIT_AMOUNT,
  PAYMENT_OPTIONS,
  PaymentOption,
  TIME_WINDOWS,
  TIME_WINDOW_LABELS,
  TimeWindow,
  calculateQuote,
  formatUSD,
  paymentSplit,
  quoteFromParams,
} from "@/lib/booking"

const PAYMENT_UI: Record<
  PaymentOption,
  { title: string; text: (total: number) => string; icon: React.ElementType }
> = {
  later: {
    title: "Pay after the cleaning",
    text: (t) => `Nothing today. You pay ${formatUSD(t)} when the job is done.`,
    icon: Wallet,
  },
  deposit: {
    title: `$${DEPOSIT_AMOUNT} deposit now`,
    text: (t) =>
      `Holds your spot. The other ${formatUSD(Math.max(0, t - DEPOSIT_AMOUNT))} is due after the cleaning.`,
    icon: ShieldCheck,
  },
  full: {
    title: "Pay in full now",
    text: (t) => `Pay ${formatUSD(t)} by card today and you are all set.`,
    icon: CreditCard,
  },
}

// Form draft, kept for this browser tab only (sessionStorage), so a customer
// who cancels on Stripe comes back to a filled-in form
const DRAFT_KEY = "playa-booking-draft"
interface Draft {
  name?: string
  phone?: string
  email?: string
  address?: string
  notes?: string
  dates?: string[]
  windows?: TimeWindow[]
  payment?: PaymentOption
}
function loadDraft(): Draft {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}") as Draft
  } catch {
    return {}
  }
}
function saveDraft(d: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d))
  } catch {
    /* private mode: no draft, the form still works */
  }
}
function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY)
  } catch {
    /* ignore */
  }
}

function tomorrowISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const inputClass =
  "w-full rounded-2xl border border-border bg-background py-4 pr-4 pl-12 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"

function Field({
  icon: Icon,
  top = false,
  children,
}: {
  icon: React.ElementType
  top?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground",
          top ? "top-4" : "top-1/2 -translate-y-1/2"
        )}
      />
      {children}
    </div>
  )
}

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-foreground">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-sm font-black text-white">
        {n}
      </span>
      {children}
    </h2>
  )
}

function BookingContent() {
  const router = useRouter()
  const params = useSearchParams()
  const quoteInput = useMemo(() => quoteFromParams(params), [params])
  const quote = useMemo(() => (quoteInput ? calculateQuote(quoteInput) : null), [quoteInput])
  const cancelled = params.get("cancelled") === "1"

  const [draft] = useState<Draft>(() => (cancelled ? loadDraft() : {}))
  const [minDate] = useState(tomorrowISO)
  const [dates, setDates] = useState<string[]>(() =>
    [0, 1, 2].map((i) => draft.dates?.[i] || "")
  )
  const [windows, setWindows] = useState<TimeWindow[]>(draft.windows || [])
  const [payment, setPayment] = useState<PaymentOption>(draft.payment || "later")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!quote || !quoteInput) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <h1 className="text-3xl font-black text-foreground">Let&apos;s start with your home</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick your rooms and service in the calculator, then come back here to book.
        </p>
        <Link
          href="/cleaning-calculator"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary-blue px-8 py-4 font-bold text-white"
        >
          Open the calculator <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  const split = paymentSplit(quote.total, payment)

  const toggleWindow = (w: TimeWindow) =>
    setWindows((prev) => (prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError(null)

    const fd = new FormData(e.currentTarget)
    const preferredDates = dates.filter(Boolean)
    if (!preferredDates.length) return setError("Please pick at least one date that works for you.")
    if (!windows.length) return setError("Please pick a time of day.")

    saveDraft({
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      address: String(fd.get("address") || ""),
      notes: String(fd.get("notes") || ""),
      dates,
      windows,
      payment,
    })

    const eventId = `booking_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          address: fd.get("address"),
          notes: fd.get("notes") || "",
          preferredDates,
          timeWindows: windows,
          payment,
          quote: quoteInput,
          tracking: {
            eventId,
            fbc: Cookies.get("_fbc") || undefined,
            fbp: Cookies.get("_fbp") || undefined,
            pageUrl: window.location.href,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.")

      // GTM conversion (same event name as the other forms)
      const w = window as Window & { dataLayer?: Record<string, unknown>[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({
        event: "form_submission_success",
        event_id: eventId,
        form_type: "booking_page",
        payment_option: payment,
        estimated_value: quote.total,
        service_type: quote.serviceLabel,
      })

      if (data.url) {
        window.location.href = data.url
      } else {
        clearDraft()
        router.push(`/thank-you?status=requested&booking=${encodeURIComponent(data.bookingId)}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const submitLabel =
    payment === "later"
      ? "Send my booking request"
      : `Pay ${formatUSD(split.dueToday)} and book`

  return (
    <div className="container mx-auto max-w-6xl px-6 py-10 lg:py-16">
      <Link
        href="/cleaning-calculator"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary-blue"
      >
        <ChevronLeft size={16} /> Edit estimate
      </Link>

      {cancelled && (
        <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          The card payment was canceled, so nothing was charged. Your details are still here.
          Pick a payment option and send your request again.
        </div>
      )}

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
          Book your <span className="text-primary-blue">cleaning</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tell us about you and the days that work. We will call or text you to confirm the
          exact time.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10 lg:col-span-7" noValidate={false}>
          {/* 1. Contact */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <StepTitle n={1}>Your details</StepTitle>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field icon={User}>
                <label className="sr-only" htmlFor="name">Full name</label>
                <input id="name" name="name" defaultValue={draft.name} required autoComplete="name" placeholder="Full name" className={inputClass} />
              </Field>
              <Field icon={Phone}>
                <label className="sr-only" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" defaultValue={draft.phone} type="tel" required autoComplete="tel" placeholder="Phone number" className={inputClass} />
              </Field>
              <div className="md:col-span-2">
                <Field icon={Mail}>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input id="email" name="email" defaultValue={draft.email} type="email" required autoComplete="email" placeholder="Email" className={inputClass} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field icon={MapPin}>
                  <label className="sr-only" htmlFor="address">Service address</label>
                  <input id="address" name="address" defaultValue={draft.address} required autoComplete="street-address" placeholder="Service address (street, city, ZIP)" className={inputClass} />
                </Field>
              </div>
            </div>
          </section>

          {/* 2. When */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <StepTitle n={2}>
              <span className="flex items-center gap-2">
                Days that work for you <CalendarDays size={18} className="text-primary-blue" />
              </span>
            </StepTitle>
            <p className="-mt-2 mb-5 text-sm text-muted-foreground">
              Pick up to 3 days. These are preferences, and we confirm the final date with you
              first.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {dates.map((d, i) => (
                <div key={i}>
                  <label className="sr-only" htmlFor={`date-${i}`}>
                    {i === 0 ? "First choice date" : `Other date ${i}`}
                  </label>
                  <input
                    id={`date-${i}`}
                    type="date"
                    min={minDate}
                    value={d}
                    required={i === 0}
                    onChange={(e) =>
                      setDates((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))
                    }
                    className={cn(inputClass, "pl-4 text-sm")}
                  />
                </div>
              ))}
            </div>

            <p className="mt-6 mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              <Clock size={16} className="text-primary-blue" /> Time of day
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Time of day">
              {TIME_WINDOWS.map((w) => {
                const on = windows.includes(w)
                return (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleWindow(w)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition-all",
                      on
                        ? "border-primary-blue bg-primary-blue/10 text-primary-blue-dark dark:text-primary-blue"
                        : "border-border text-foreground/80 hover:border-primary-blue/40"
                    )}
                  >
                    {on && <Check size={14} />}
                    {TIME_WINDOW_LABELS[w]}
                  </button>
                )
              })}
            </div>

            <div className="mt-6">
              <Field icon={MessageSquare} top>
                <label className="sr-only" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  defaultValue={draft.notes}
                  rows={3}
                  maxLength={1000}
                  placeholder="Anything we should know? Pets, parking, gate code, how to get in…"
                  className={cn(inputClass, "pt-4 [&]:min-h-28")}
                />
              </Field>
            </div>
          </section>

          {/* 3. Payment */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <StepTitle n={3}>How would you like to pay?</StepTitle>
            <div className="grid gap-3" role="radiogroup" aria-label="Payment option">
              {PAYMENT_OPTIONS.map((opt) => {
                const ui = PAYMENT_UI[opt]
                const Icon = ui.icon
                const on = payment === opt
                return (
                  <label
                    key={opt}
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition-all",
                      on
                        ? "border-primary-blue bg-primary-blue/5 shadow-sm"
                        : "border-border hover:border-primary-blue/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt}
                      checked={on}
                      onChange={() => setPayment(opt)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        on ? "bg-primary-blue text-white" : "bg-muted text-foreground/70"
                      )}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-bold text-foreground">{ui.title}</span>
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border-2",
                            on ? "border-primary-blue bg-primary-blue" : "border-border"
                          )}
                        >
                          {on && <Check size={12} className="text-white" />}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {ui.text(quote.total)}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>

            <p className="mt-5 flex items-start gap-2 text-sm text-foreground/80">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-green-600" />
              Full refund if you cancel at least one day before your cleaning.
            </p>
          </section>

          {error && (
            <p role="alert" className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-blue py-5 text-lg font-bold text-white shadow-lg transition-all hover:bg-primary-blue-dark disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> One moment…
              </>
            ) : (
              <>
                {payment === "later" ? null : <Lock size={18} />}
                {submitLabel} <ArrowRight size={20} />
              </>
            )}
          </button>
          {payment !== "later" && (
            <p className="-mt-6 text-center text-xs text-muted-foreground">
              Secure card payment by Stripe. You will come back here when it is done.
            </p>
          )}
        </form>

        {/* SUMMARY */}
        <aside className="order-first lg:sticky lg:top-28 lg:order-none lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <div className="bg-primary-blue p-8 text-white">
              <p className="text-xs font-bold tracking-widest uppercase">Your estimate</p>
              <p className="mt-2 text-6xl font-black tracking-tight">{formatUSD(quote.total)}</p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                <Home size={16} /> {quote.serviceLabel} · {quote.roomsLabel}
              </p>
            </div>
            <ul className="divide-y divide-border px-8 py-4">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-foreground/80">{l.label}</span>
                  <span className={cn("font-bold", l.included ? "text-green-700 dark:text-green-400" : "text-foreground")}>
                    {l.included ? "Included" : formatUSD(l.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-border bg-muted/40 px-8 py-6 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/80">Due today</span>
                <span className="text-lg font-black text-foreground">{formatUSD(split.dueToday)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/80">Due after the cleaning</span>
                <span className="font-bold text-foreground">{formatUSD(split.balance)}</span>
              </div>
            </div>
          </div>
          <ul className="mt-6 space-y-3 px-2 text-sm text-foreground/80">
            {[
              "We confirm the date with you before anything is final",
              "Insured and bonded, HEPA vacuums, pet-safe supplies",
              "Full refund if you cancel at least one day before",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-primary-blue" /> {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 animate-spin" size={20} /> Loading…
          </div>
        }
      >
        <BookingContent />
      </Suspense>
    </main>
  )
}
