"use client"
import React, { useActionState, useEffect, useTransition, useRef, useState } from "react"
import Image from "next/image"
import {
  Phone,
  CheckCircle2,
  MessageSquareText,
  CalendarCheck,
  ClipboardList,
  ArrowRight,
} from "lucide-react"

import { sendEmail, FormState } from "@/lib/resend"
import { BED_OPTIONS, BATH_OPTIONS, META_TEST_COOKIE, type ServiceType } from "@/lib/booking"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
import { WaveDivider } from "../common/WaveDivider"
import { cn } from "@/lib/utils"
import Cookies from "js-cookie"

// ─────────────────────────────────────────────────────────────
// Quote request form. Prices live only on the calculator page;
// Alicia texts every customer with a quote.
// ─────────────────────────────────────────────────────────────

export type CtaService = ServiceType | "post"

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

const NEXT_STEPS = [
  { icon: ClipboardList, text: "Send your request (takes a minute)" },
  { icon: MessageSquareText, text: "Alicia texts you to go over the details" },
  { icon: CalendarCheck, text: "Get your quote and pick a date" },
]

interface QuoteFormProps {
  /** Pre-selects the service, e.g. on a service page */
  defaultService?: CtaService
  /** Sent to GTM / the lead email so you can tell forms apart */
  formType?: string
  /** "modal": no outer card, the popup is the card */
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
  const [sent, setSent] = useState(false)
  // Shown inside the form: page-level toasts sit under the popup and nobody sees them
  const [error, setError] = useState("")
  const doneRef = useRef<HTMLDivElement>(null)

  // Bring the confirmation into view after submit (the form is taller)
  useEffect(() => {
    if (sent) doneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [sent])

  const [, action] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const res = await sendEmail(prevState, formData)
      if (res?.success) setSent(true)
      else setError(`Could not send your request. Please call or text ${PHONE_DISPLAY}.`)
      hasFiredRef.current = false
      return res
    },
    { success: false }
  )

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hasFiredRef.current) return
    setError("")

    if (!service) {
      setError("Please pick a type of cleaning.")
      return
    }
    if (service !== "post" && (!beds || !baths)) {
      setError("Please pick bedrooms and bathrooms.")
      return
    }

    const formData = new FormData(e.currentTarget)
    const phone = formData.get("phone") as string
    const username = formData.get("username") as string
    const zip = ((formData.get("zip") as string) || "").trim()

    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
      setError("Please enter your mobile number: (XXX) XXX-XXXX")
      return
    }
    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a 5-digit ZIP code.")
      return
    }

    hasFiredRef.current = true

    const bedsValue = beds || "Not given"
    const bathsValue = baths || "Not given"
    const clientSideEventId = `lead_${Date.now()}_${Math.floor(Math.random() * 1000000)}`
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
          estimated_value: 165,
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
    formData.append("form_type", formType)
    formData.set("fbc", Cookies.get("_fbc") || "")
    formData.set("fbp", Cookies.get("_fbp") || "")
    formData.set("pageUrl", window.location.href)
    const testCode = Cookies.get(META_TEST_COOKIE)
    if (testCode) formData.set("metaTestCode", testCode)

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

  if (sent) {
    return (
      <div
        ref={doneRef}
        className={cn(
          "max-w-xl scroll-mt-28 animate-in space-y-5 text-center duration-500 fade-in zoom-in",
          !isModal && "rounded-[2rem] border border-primary-blue/20 bg-primary-blue/5 p-6 sm:p-10"
        )}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-blue text-white shadow-lg shadow-primary-blue/20">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Request received!</h3>
        <p className="text-muted-foreground">
          Alicia will text you from <span className="font-bold text-foreground">{PHONE_DISPLAY}</span> to
          go over the details and give you a quote. She&apos;s often on a cleaning job
          herself, so her reply can take a little while.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-bold text-primary-blue underline transition-colors hover:text-primary"
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn(
        "relative z-20 max-w-xl",
        isModal ? "space-y-6" : "space-y-7 rounded-[2rem] border border-border bg-card p-4 shadow-sm sm:p-8"
      )}
    >
      {/* Step 1: service */}
      <fieldset className="space-y-3">
        <legend className="mb-3">{stepLabel(1, "What kind of cleaning do you need?")}</legend>
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
                <span className="mt-1 text-xs text-muted-foreground">{s.note}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Step 2: home */}
      <fieldset className="space-y-4">
        <legend className="mb-3">{stepLabel(2, service === "post" ? "Tell us about your home (optional)" : "Tell us about your home")}</legend>

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
        <legend className="mb-3">{stepLabel(3, "Where should Alicia text you?")}</legend>
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
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 ring-1 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary-blue py-5 text-xl font-black text-white shadow-2xl shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Request My Free Quote"}
          {!isPending && <ArrowRight size={22} />}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          <span className="font-bold text-foreground">What happens next:</span> Alicia texts you
          from {PHONE_DISPLAY} to go over the details and give you a quote. She&apos;s
          often on a cleaning job, so her reply can take a little while.
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
                    “I read every request myself and text you back with a quote. I&apos;m
                    often on a cleaning job, so my reply can take a little while. Thanks for
                    your patience!”
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
                  <CheckCircle2 size={16} /> Free quote, no payment needed
                </span>
                <h2 className="font-blauerMedium text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-5xl">
                  Get Your Free{" "}
                  <span className="text-primary-blue underline decoration-primary-blue/20">
                    Cleaning Quote
                  </span>
                </h2>
                <p className="max-w-xl text-base text-muted-foreground">
                  Tell us about your home and leave your number. Alicia will text you to go over
                  the details and give you a quote.
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
