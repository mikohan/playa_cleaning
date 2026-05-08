import React from "react"
import {
  Clock,
  CheckCircle2,
  ShieldCheck,
  Star,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { LocationTicker } from "@/components/cleaning/LocationTicker"
import { Metadata } from "next"
import { CleaningModal } from "@/components/common/CleaningModal"

export const metadata: Metadata = {
  title: "Same Day Cleaning Service Los Angeles | 24 Hour Maid Service",
  description:
    "Need a professional clean today? Playa Cleaning offers premier same day house cleaning & 24-hour maid services across Los Angeles. Licensed, insured, and 5-star rated.",
  keywords: [
    "same day cleaning service near me",
    "emergency house cleaning Los Angeles",
    "24 hour maid service LA",
    "last minute cleaning service",
    "same day deep cleaning",
    "professional cleaners Los Angeles",
    "residential reset cleaning",
  ],
  alternates: {
    canonical: "https://playacleaning.com/same-day-cleaning-los-angeles",
  },
  openGraph: {
    title: "Same Day Cleaning Service in Los Angeles | Book Now",
    description:
      "Professional, meticulous home cleaning on short notice. Serving the Westside, South Bay, and Greater LA 24/7.",
    url: "https://playacleaning.com/same-day-cleaning-los-angeles",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/images/og-same-day.jpg", // Update with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Professional Same Day Cleaning Service in Los Angeles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playa Cleaning | 24/7 Same Day Service",
    description:
      "Last-minute house cleaning you can trust. Licensed & Insured cleaners ready for your residential reset.",
    images: ["/images/og-same-day.jpg"],
  },
}

const SameDayCleaningPage = () => {
  const phoneFormatted = "(213) 598-7763"
  const phoneRaw = "2135987763"

  return (
    <div className="text-foreground transition-colors duration-300">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Decorative background - removed z-index, using natural flow */}
        <div className="radial-gradient pointer-events-none absolute inset-0 opacity-5" />

        <div className="relative container mx-auto px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="space-y-8 lg:w-1/2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-blue">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-blue opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-blue"></span>
                </span>
                Premier Same Day Cleaning Service near me
              </div>

              <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-tight text-foreground lg:text-7xl">
                The Meticulous <br />
                <span className="text-primary-blue">
                  Same Day Cleaning Service
                </span>{" "}
                in Los Angeles
              </h1>

              <p className="max-w-lg text-xl leading-relaxed text-muted-foreground">
                Professional Same Day House Cleaning Service & 24 Hour Maid
                Service for Residential Resets in Los Angeles.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-xl shadow-primary/10 transition-all hover:opacity-90">
                  Book the Reset <ArrowRight size={18} />
                </button> */}
                <CleaningModal text="Book Cleaning Now" />
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-all hover:bg-accent"
                >
                  <Phone size={18} /> {phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-1 text-primary-blue">
                  <ShieldCheck size={16} />
                  <span className="text-muted-foreground">
                    Licensed & Insured
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primary-blue">
                  <Star size={16} />
                  <span className="text-muted-foreground">
                    4.9/5 TrustScore
                  </span>
                </div>
              </div>
            </div>

            <div className="relative lg:w-1/2">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex h-full w-full items-center justify-center bg-muted px-4 text-center text-muted-foreground italic">
                  [Professional Same Day House Cleaning Service in Action]
                </div>
              </div>

              {/* Float Badge - No z-index, positioned relative to parent container */}
              <div className="absolute -bottom-6 -left-6 hidden animate-in rounded-xl border border-border bg-card p-5 shadow-2xl duration-700 fade-in slide-in-from-bottom-4 md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-blue">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      Availability
                    </p>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      24 Hour Cleaning Service Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRICING SECTION */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold">
              Transparent Same Day House Cleaning Service
            </h2>
            <p className="mt-4 text-muted-foreground">
              Calculated by square footage. The most reliable same day cleaning
              service near me.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Standard Same Day",
                price: "$199+",
                desc: "A fast, systematic refresh of all living areas by our elite same day maid service.",
              },
              {
                title: "Same Day Deep Cleaning Service",
                price: "$299+",
                desc: "Detailed restoration of kitchen, bath, and baseboards for those who need a total reset.",
                popular: true,
              },
              {
                title: "24 Hour House Cleaning Service",
                price: "$349+",
                desc: "Clinical sanitization for property turnovers and emergency resets available around the clock.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-lg ${
                  item.popular
                    ? "border-primary-blue ring-1 ring-primary-blue"
                    : "border-border"
                }`}
              >
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div className="mb-6 text-3xl font-bold text-foreground">
                  {item.price}
                </div>
                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-colors ${
                    item.popular
                      ? "bg-primary-blue text-white hover:opacity-90"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  Select Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PROTOCOL */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-heading text-4xl font-bold text-foreground">
                The Protocol
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Speed doesn&apos;t mean skipping steps. Our same day house
                cleaning service near me follows a specific sequence.
              </p>
              <div className="space-y-4">
                {[
                  "HEPA-filter filtration of micro-dust",
                  "Degreasing of high-touch kitchen surfaces",
                  "Scrub-level sanitization of all bathrooms",
                  "Manual detailing of floor tracks and baseboards",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary-blue">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-medium text-foreground/80">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* The Overlay Box */}
            <div className="relative overflow-hidden rounded-3xl bg-secondary p-10 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-primary/5">
                <ShieldCheck size={120} />
              </div>
              <div className="relative space-y-6">
                <p className="text-xs font-bold tracking-widest text-primary-blue uppercase">
                  Professional Standards
                </p>
                <h4 className="font-heading text-2xl font-bold text-foreground italic">
                  &ldquo;We treat home cleaning like a precise science. Every
                  motion is optimized for the best possible result.&rdquo;
                </h4>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted" />
                  <div>
                    <p className="font-bold text-foreground">Operations Lead</p>
                    <p className="text-sm text-muted-foreground">
                      Quality Control
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCAL SERVICE AREAS */}
      <section className="bg-card/50 py-12">
        <LocationTicker />
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-blue p-12 text-center text-white shadow-2xl">
            {/* Using background color instead of absolute overlay to avoid stacking issues */}
            <div className="relative space-y-8">
              <h2 className="font-heading text-4xl leading-tight font-bold md:text-5xl">
                Ready for the Reset?
              </h2>
              <p className="mx-auto max-w-xl text-xl text-white/80">
                Book the highest-rated same day maid service near me. Calculate
                your price and secure your slot in 60 seconds.
              </p>
              <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
                <button className="rounded-xl bg-background px-12 py-5 text-lg font-bold text-primary-blue transition-all hover:scale-105 hover:shadow-2xl">
                  Get a Quote Now
                </button>
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-12 py-5 text-lg font-bold text-white transition-all hover:bg-white/20"
                >
                  <Phone size={20} /> {phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SameDayCleaningPage
