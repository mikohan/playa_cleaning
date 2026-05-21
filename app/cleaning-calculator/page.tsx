import React from "react"
import Image from "next/image"
import { Metadata } from "next"
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Calculator as CalcIcon,
} from "lucide-react"
import OlesyaImage from "@/public/images/cleaning/ol-2.png"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculatorOffer"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"

export const metadata: Metadata = {
  title: "Instant Cleaning Quote | Playa Cleaning Los Angeles",
  description:
    "Get an instant price for your residential deep cleaning in Los Angeles. Select your layout to view our flat-rate pricing for standard upkeep and intensive home prep cleans.",
  keywords: [
    "cleaning calculator LA",
    "maid service price estimator",
    "house cleaning cost Los Angeles",
    "Playa Cleaning pricing",
    "Playa Cleaning quote",
  ],

  // Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Instant Home Cleaning Calculator | Playa Cleaning",
    description:
      "Calculate your cleaning cost in seconds. Transparent, flat-rate pricing for professional maid services in Los Angeles.",
    url: "https://playacleaning.com/cleaning-calculator",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Instant Quote Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "How much does house cleaning cost in LA?",
    description:
      "Use our instant calculator to get a flat-rate quote for your home or layout in seconds.",
    images: ["/og-calculator-preview.jpg"],
    creator: "@playacleaning",
  },

  // Search Engine Specifics
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function CalculatorPage() {
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"
  // Clean phone string for the tel: anchor tag
  const numericPhone = companyPhone.replace(/[^0-9+]/g, "")

  return (
    <main className="min-h-screen bg-background font-jakarta text-foreground">
      <BreadCrumbsUniversal />
      <div className="mx-auto max-w-7xl px-6">
        {/* --- HERO SECTION --- */}
        <section className="grid grid-cols-1 gap-16 py-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
              <Zap size={16} className="fill-primary-blue" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                Instant Transparent Pricing
              </span>
            </div>

            <h1 className="mb-8 text-5xl leading-[1.1] font-black tracking-tight text-primary-blue md:text-7xl">
              Calculate Your <br />
              <span className="text-foreground/20">Custom Clean.</span>
            </h1>

            <p className="max-w-xl text-xl leading-relaxed font-medium text-foreground/80 [word-spacing:0.05rem]">
              No surprises, no hidden fees. Use our professional estimator to
              get a precise quote for your Los Angeles home or space in under 60
              seconds.
            </p>
          </div>

          {/* Coordinator Side Profile */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative ml-auto aspect-square max-w-150">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-primary-blue/20" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-background shadow-2xl">
                <Image
                  src={OlesyaImage}
                  alt="Lead Coordinator"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute right-12 -bottom-2 rounded-2xl bg-foreground p-4 shadow-xl">
                <p className="text-[10px] font-black tracking-widest text-background uppercase">
                  Personalized Quote
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CALCULATOR PLACEHOLDER --- */}
        <section className="py-12">
          <CleaningCalculator showHeader={false} />
        </section>

        {/* --- SEO TEXT & KEYWORDS SECTION --- */}
        <section className="mt-12 grid grid-cols-1 gap-12 border-t border-border/50 py-24 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Professional Standards
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
              Whether you need <strong>deep cleaning services near me</strong>{" "}
              or a meticulous <strong>house cleaning</strong> quote, our system
              accounts for the square footage and specific needs of your LA home
              to ensure complete accuracy.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
              <CalcIcon size={24} />
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Specialized Services
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
              Get instant rates for premium <strong>upholstery cleaning</strong>{" "}
              and heavy-duty <strong>furniture cleaning</strong>. Perfect for
              removing tough spots and fully refreshing your home layout.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Detailed Transitions
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
              Scheduling an intensive <strong>empty home detail clean</strong>?
              Our calculator is optimized for complete{" "}
              <strong>turnover maintenance</strong> requirements, delivering an
              elite, top-to-bottom hygienic clean before or after moving gear.
            </p>
          </div>
        </section>

        {/* --- TRUST FOOTER --- */}
        <div className="pb-24 text-center">
          <p className="mb-4 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">
            Need a manual quote?
          </p>
          <a
            href={`tel:${numericPhone}`}
            className="text-2xl font-black text-primary-blue decoration-2 underline-offset-8 hover:underline"
          >
            {companyPhone}
          </a>
        </div>
      </div>
    </main>
  )
}
