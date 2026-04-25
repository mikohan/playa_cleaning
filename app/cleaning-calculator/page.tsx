import React from "react"
import Image from "next/image"
import { Metadata } from "next"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Calculator as CalcIcon,
} from "lucide-react"
import OlesyaImage from "@/public/images/cleaning/ol-2.png"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculator"

export const metadata: Metadata = {
  title:
    "Instant Cleaning Quote | Price Estimator Los Angeles | Playa Cleaning",
  description:
    "Get an instant cleaning estimate for your LA home. Our transparent calculator covers deep cleaning, move-out services, and specialized upholstery care.",
  alternates: { canonical: "https://playacleaning.com/calculator" },
}

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-background font-jakarta text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6">
        <div className="pt-8">
          <BreadCrumbs serviceName="Price Estimator" />
        </div>

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
              get a precise quote for your Los Angeles home or office in under
              60 seconds.
            </p>
          </div>

          {/* Alicia Side Profile */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative ml-auto aspect-square max-w-150">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-primary-blue/20" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-background shadow-2xl">
                <Image
                  src={OlesyaImage}
                  alt="Alicia, Lead Coordinator"
                  fill
                  className="object-cover"
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
          {/* THIS IS WHERE YOUR COMPONENT GOES */}
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
              or a<strong> house cleaning</strong> quote, our system accounts
              for the square footage and specific needs of your LA home to
              ensure accuracy.
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
              Get instant rates for <strong>upholstery cleaning</strong> and
              <strong> furniture steam cleaning</strong> through Angara
              Streamers. Perfect for removing stains from your{" "}
              <strong>sofa cleaning service</strong> needs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Move-Out Precision
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
              Planning an <strong>apartment move out cleaning</strong>? Our
              calculator is optimized for{" "}
              <strong>end of tenancy cleaning</strong> requirements, helping you
              secure your security deposit with a data-backed estimate.
            </p>
          </div>
        </section>

        {/* --- TRUST FOOTER --- */}
        <div className="pb-24 text-center">
          <p className="mb-4 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">
            Need a manual quote?
          </p>
          <a
            href="tel:2135987763"
            className="text-2xl font-black text-primary-blue decoration-2 underline-offset-8 hover:underline"
          >
            (213) 598-77-63
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
