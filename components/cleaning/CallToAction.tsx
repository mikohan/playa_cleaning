"use client"
import React, { useActionState, useEffect, useTransition, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  CheckCircle2,
  MessageSquareText,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Pencil,
  Camera,
} from "lucide-react"
import { toast } from "react-toastify"

import { sendEmail, FormState } from "@/lib/resend"
import {
  BED_OPTIONS,
  BATH_OPTIONS,
  calculateQuote,
  quoteToParams,
  type QuoteInput,
  type ServiceType,
} from "@/lib/booking"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
import { WaveDivider } from "../common/WaveDivider"
import { cn } from "@/lib/utils"
import Cookies from "js-cookie"

// ─────────────────────────────────────────────────────────────
// Options (prices come from app/data/pricing.ts via calculateQuote)
// ─────────────────────────────────────────────────────────────

export type CtaService = ServiceType | "post"

const quoteInput = (type: ServiceType, beds: string, baths: string): QuoteInput => ({
  beds,
  baths,
  type,
  addons: [],
  windows: 0,
  blinds: 0,
})

const priceFor = (type: ServiceType, beds: string, baths: string) =>
  calculateQuote(quoteInput(type, beds, baths)).total

/** Home sizes used for the "from" price and the price examples */
const STARTING_HOME = { beds: "1", baths: "1" }
const EXAMPLE_HOMES = [
  { beds: "1", baths: "1" },
  { beds: "2", baths: "2" },
  { beds: "3", baths: "2" },
  { beds: "4", baths: "3" },
]

const SERVICES: { id: CtaService; name: string; note: string }[] = [
  { id: "standard", name: "Standard", note: "Regular upkeep" },
  { id: "deep", name: "Deep Clean", note: "Top to bottom detail" },
  { id: "move", name: "Move In / Out", note: "Empty home, inside cabinets" },
  { id: "post", name: "Post-Construction", note: "Dust after a remodel" },
]

const HOME_SIZES = [
  "Under 1,000",
  "1,000–1,500",
  "1,500–2,500",
  "2,500–3,500",
  "3,500+",
  "Not sure",
]

const PHONE_DISPLAY = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343"
const PHONE_LINK = process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK || "+14243562343"

type Result = { price?: number; label?: string; custom: boolean; bookHref?: string }

// ─────────────────────────────────────────────────────────────
// QuoteForm: the form itself, shared by the page section and the popup
// ─────────────────────────────────────────────────────────────

interface QuoteFormProps {
  /** Pre-selects the service, e.g. on a service page */
  defaultService?: CtaService
  /** Sent to GTM / the lead email so you can tell forms apart */
  formType?: string
  /** "modal": no outer card, tighter spacing */
  variant?: "section" | "modal"
}

export const QuoteForm = ({
  defaultService,
  formType = "inline_cta_offer",
  variant = "section",
}: QuoteFormProps) => {
  const isModal = variant === "modal"
  const [isPending, startTransition] = useTransition()
  const hasFiredRef = useRef<boolean>(false)

  const [service, setService] = useState<CtaService | null>(defaultService ?? null)
  const [beds, setBeds] = useState<string | null>(null)
  const [baths, setBaths] = useState<string | null>(null)
  const [homeSize, setHomeSize] = useState<string>("Not sure")
  const [result, setResult] = useState<Result | null>(null)
  const pendingRef = useRef<Result | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const isCustom = service === "post"

  // Bring the price into view after submit (the form is taller than the result)
  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [result])

  const [, action] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const res = await sendEmail(prevState, formData)

      if (res?.success) {
        const local = pendingRef.current
        setResult({
          custom: res.custom ?? local?.custom ?? false,
          price: res.price ?? local?.price,
          label: res.quoteLabel ?? local?.label,
          bookHref: local?.bookHref,
        })
      } else if (res?.message) {
        toast.error(res.message, { position: "top-center" })
      }

      hasFiredRef.current = false
      return res
    },
    { success: false }
  )

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hasFiredRef.current) return

    if (!service) {
      toast.error("Please pick a type of cleaning.", { position: "top-center" })
      return
    }
    if (!isCustom && (!beds || !baths)) {
      toast.error("Please pick bedrooms and bathrooms.", { position: "top-center" })
      return
    }

    const formData = new FormData(e.currentTarget)

    const phone = formData.get("phone") as string
    const username = formData.get("username") as string
    const zip = ((formData.get("zip") as string) || "").trim()

    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
      toast.error("Please enter a valid phone: (XXX) XXX-XXXX", { position: "top-center" })
      return
    }
    if (!/^\d{5}$/.test(zip)) {
      toast.error("Please enter a 5-digit ZIP code.", { position: "top-center" })
      return
    }

    hasFiredRef.current = true

    const bedsValue = beds || "Not given"
    const bathsValue = baths || "Not given"

    // Same price the server will calculate, kept as a fallback for the result screen
    let local: Result = { custom: isCustom }
    if (!isCustom && beds && baths) {
      const input = quoteInput(service as ServiceType, beds, baths)
      const q = calculateQuote(input)
      local = {
        custom: false,
        price: q.total,
        label: `${q.serviceLabel} · ${q.roomsLabel}`,
        bookHref: `/booking/confirm?${quoteToParams(input).toString()}`,
      }
    }
    pendingRef.current = local

    const clientSideEventId = `lead_${Date.now()}_${Math.floor(Math.random() * 1000000)}`
    const dynamicValue = local.price ?? 165
    const formattedServiceString = `Playa ${service} Clean (${bedsValue}B/${bathsValue}B)`

    if (typeof window !== "undefined") {
      try {
        const globalScope = window as unknown as {
          dataLayer: Array<Record<string, unknown>>
        }
        globalScope.dataLayer = globalScope.dataLayer || []
        globalScope.dataLayer.push({
          event: "form_submission_success",
          event_id: clientSideEventId,
          service_type: formattedServiceString,
          estimated_value: dynamicValue,
          form_type: formType,
          username: username,
          phone: phone,
        })
      } catch (trackingError) {
        console.error("GTM DataLayer append failed:", trackingError)
      }
    }

    formData.set("serviceType", service)
    formData.set("bedrooms", bedsValue)
    formData.set("bathrooms", bathsValue)
    formData.set("homeSize", homeSize)
    formData.append("clientEventId", clientSideEventId)
    formData.append("service_type", formattedServiceString)
    formData.append("estimated_value", String(dynamicValue))
    formData.append("form_type", formType)
    formData.set("fbc", Cookies.get("_fbc") || "")
    formData.set("fbp", Cookies.get("_fbp") || "")
    formData.set("pageUrl", window.location.href)

    startTransition(async () => {
      await action(formData)
    })
  }

  // Automatic phone mask
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    let value = target.value.replace(/\D/g, "")
    if (value.length > 10) value = value.slice(0, 10)
    const areaCode = value.slice(0, 3)
    const middle = value.slice(3, 6)
    const last = value.slice(6, 10)
    if (value.length > 6) target.value = `(${areaCode}) ${middle}-${last}`
    else if (value.length > 3) target.value = `(${areaCode}) ${middle}`
    else if (value.length > 0) target.value = `(${areaCode}`
  }

  const handleZipInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    target.value = target.value.replace(/\D/g, "").slice(0, 5)
  }

  const inputClass =
    "w-full rounded-2xl border-none bg-background px-4 py-4 sm:px-5 text-base text-foreground shadow-sm ring-1 ring-border transition-all outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary-blue"

  const chip = (active: boolean) =>
    cn(
      "rounded-xl px-3 py-3 text-sm font-bold ring-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-blue active:scale-[0.97]",
      active
        ? "bg-primary-blue text-white ring-primary-blue shadow-md shadow-primary-blue/20"
        : "bg-background text-foreground ring-border hover:ring-primary-blue/50"
    )

  const stepLabel = (n: number, text: string) => (
    <p className="flex items-center gap-2 text-sm font-bold text-foreground">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-blue text-xs text-white">
        {n}
      </span>
      {text}
    </p>
  )

  const roomsShort = (h: { beds: string; baths: string }) => `${h.beds} bd / ${h.baths} ba`

  if (result) {
    return (
      <div
        ref={resultRef}
        className={cn(
          "max-w-xl scroll-mt-28 animate-in space-y-6 duration-500 fade-in zoom-in",
          !isModal && "rounded-[2rem] border border-primary-blue/20 bg-primary-blue/5 p-5 sm:p-10"
        )}
      >
        {result.custom ? (
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-blue text-white shadow-lg shadow-primary-blue/20">
              <Camera size={30} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Request received!</h3>
            <p className="text-muted-foreground">
              Every remodel is different, so post-construction jobs get a custom quote.
              Alicia will text you to ask for a few photos and send you an exact price.
            </p>
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <p className="text-sm font-bold tracking-widest text-primary-blue uppercase">
              Your price
            </p>
            <p className="font-blauerMedium text-6xl font-bold text-foreground">
              ${result.price}
            </p>
            <p className="font-semibold text-foreground">{result.label}</p>
            <p className="text-sm text-muted-foreground">
              Extras like inside the fridge or oven can be added when you book.
            </p>
          </div>
        )}

        <div className="flex items-start gap-3 rounded-2xl bg-background p-4 text-sm ring-1 ring-border">
          <MessageSquareText size={20} className="mt-0.5 shrink-0 text-primary-blue" />
          <p className="text-muted-foreground">
            <span className="font-bold text-foreground">What happens next:</span> Alicia
            will text you from {PHONE_DISPLAY} to go over the details and pick a date.
            She&apos;s often on a cleaning job, so her reply can take a little while.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {result.bookHref && (
            <Link
              href={result.bookHref}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-blue py-4 text-lg font-black text-white shadow-xl shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-[0.98]"
            >
              Book this cleaning <ArrowRight size={20} />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setResult(null)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-background py-4 font-bold text-foreground ring-1 ring-border transition-all hover:ring-primary-blue"
          >
            <Pencil size={16} /> Change details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn(
        "relative z-20 max-w-xl",
        isModal
          ? "space-y-6"
          : "space-y-7 rounded-[2rem] border border-border bg-card p-4 shadow-sm sm:p-8"
      )}
    >
      {/* Step 1: service */}
      <fieldset className="space-y-3">
        <legend className="mb-3">{stepLabel(1, "Pick a service")}</legend>
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((s) => {
            const active = service === s.id
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => setService(s.id)}
                className={cn(
                  "flex flex-col items-start rounded-2xl p-3 text-left ring-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-blue active:scale-[0.98] sm:p-4",
                  active
                    ? "bg-primary-blue/5 ring-2 ring-primary-blue"
                    : "bg-background ring-border hover:ring-primary-blue/50"
                )}
              >
                <span className="text-sm leading-tight font-bold text-foreground sm:text-base">
                  {s.name}
                </span>
                <span className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                  {s.note}
                </span>
                {s.id === "post" ? (
                  <span className="mt-2 text-sm font-black text-primary-blue">Custom quote</span>
                ) : (
                  <span className="mt-2 text-sm font-black text-primary-blue">
                    from ${priceFor(s.id, STARTING_HOME.beds, STARTING_HOME.baths)}
                    <span className="block text-xs font-medium text-muted-foreground">
                      for {roomsShort(STARTING_HOME)}
                    </span>
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Price examples for the picked service */}
        {service && !isCustom && (
          <div className="rounded-2xl bg-primary-blue/5 p-3 ring-1 ring-primary-blue/15">
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
              {SERVICES.find((s) => s.id === service)?.name} prices
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
              {EXAMPLE_HOMES.map((h) => (
                <p key={roomsShort(h)} className="text-sm text-foreground">
                  {roomsShort(h)}{" "}
                  <span className="font-bold text-primary-blue">
                    ${priceFor(service as ServiceType, h.beds, h.baths)}
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}
      </fieldset>

      {/* Step 2: home */}
      <fieldset className="space-y-4">
        <legend className="mb-3">
          {stepLabel(2, isCustom ? "Tell us about your home (optional)" : "Tell us about your home")}
        </legend>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Bedrooms</p>
          <div className="grid grid-cols-5 gap-2" role="group" aria-label="Bedrooms">
            {BED_OPTIONS.map((b) => (
              <button key={b} type="button" aria-pressed={beds === b} onClick={() => setBeds(b)} className={chip(beds === b)}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Bathrooms</p>
          <div className="grid grid-cols-5 gap-2" role="group" aria-label="Bathrooms">
            {BATH_OPTIONS.map((b) => (
              <button key={b} type="button" aria-pressed={baths === b} onClick={() => setBaths(b)} className={chip(baths === b)}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Home size, sq ft <span className="font-normal normal-case">(optional)</span>
          </p>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Home size">
            {HOME_SIZES.map((h) => (
              <button key={h} type="button" aria-pressed={homeSize === h} onClick={() => setHomeSize(h)} className={cn(chip(homeSize === h), "px-1 text-xs")}>
                {h}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Step 3: contact */}
      <fieldset className="space-y-3">
        <legend className="mb-3">
          {stepLabel(3, isCustom ? "Where should Alicia text you?" : "Where should Alicia text your price?")}
        </legend>
        <div className="grid grid-cols-5 gap-3">
          <label className="col-span-5 space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Your name</span>
            <input required name="username" autoComplete="name" placeholder="First and last name" className={inputClass} />
          </label>
          <label className="col-span-5 space-y-1 sm:col-span-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Mobile phone</span>
            <input required name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(310) 555-0123" onInput={handlePhoneInput} className={inputClass} />
          </label>
          <label className="col-span-5 space-y-1 sm:col-span-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">ZIP code</span>
            <input required name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="90094" onInput={handleZipInput} className={inputClass} />
          </label>
        </div>
      </fieldset>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary-blue py-5 text-xl font-black text-white shadow-2xl shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Submit"}
          {!isPending && <ArrowRight size={22} />}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Alicia texts you from {PHONE_DISPLAY} to confirm details. She&apos;s often on a
          job, so her reply can take a little while.
        </p>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────
// CallToAction: page section with Alicia's photo + QuoteForm
// ─────────────────────────────────────────────────────────────

interface CallToActionProps {
  /** Pre-selects the service, e.g. on a service page */
  defaultService?: CtaService
}

const NEXT_STEPS = [
  { icon: Sparkles, text: "See your price right away" },
  { icon: MessageSquareText, text: "Alicia texts you to go over details" },
  { icon: CalendarCheck, text: "Pick a date that works for you" },
]

export const CallToAction = ({ defaultService }: CallToActionProps) => {
  return (
    <section className="relative mx-auto overflow-hidden" id="quote">
      <div className="relative mx-auto py-24">
        <div className="absolute top-0 left-0 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
        <WaveDivider position="top" fill="var(--color-background)" />

        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-5 lg:gap-16">
            {/* Photo + what happens next */}
            <div className="order-last space-y-6 md:sticky md:top-24 md:order-first md:col-span-2">
              <div className="group relative h-96 overflow-hidden rounded-2xl bg-muted md:h-140">
                <Image
                  src={AliciaPortrait}
                  alt="Alicia, owner of Playa Cleaning"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-blue/60 via-transparent to-transparent"></div>
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-background/90 p-4 shadow-lg backdrop-blur">
                  <p className="text-sm leading-relaxed text-foreground">
                    “I read every request myself and text you back. I&apos;m often on a
                    cleaning job, so my reply can take a little while. Thanks for your
                    patience!”
                  </p>
                  <p className="mt-2 text-sm font-bold text-primary-blue">— Alicia</p>
                </div>
              </div>

              <ol className="space-y-3">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-blue/10 text-primary-blue">
                      <s.icon size={18} />
                    </span>
                    <span>
                      <span className="font-bold text-foreground">{i + 1}.</span> {s.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="z-30 space-y-8 md:col-span-3">
              <div className="space-y-4">
                <span className="font-blauerMedium inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary-blue uppercase">
                  <CheckCircle2 size={16} /> Free price in 30 seconds
                </span>
                <h2 className="font-blauerMedium text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-5xl">
                  See Your{" "}
                  <span className="text-primary-blue underline decoration-primary-blue/20">
                    Cleaning Price
                  </span>
                </h2>
                <p className="max-w-xl text-base text-muted-foreground">
                  Tap your home details, add your phone, and your exact price shows up
                  right away. No payment needed.
                </p>
              </div>

              <QuoteForm defaultService={defaultService} formType="inline_cta_offer" />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="text-sm text-muted-foreground">Prefer to talk?</span>
                <a
                  href={`tel:${PHONE_LINK}`}
                  className="flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary-blue"
                >
                  <span className="rounded-full bg-muted p-3">
                    <Phone size={20} className="text-primary-blue" />
                  </span>
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
