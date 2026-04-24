import React from "react"
import Image from "next/image"
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react"
import AliciaPortrait from "@/public/images/cleaning/hero-4.webp"
import { BookingCalculator } from "./BookingCalculator"

type Props = {
  city?: string
}

export const HeroSection = ({ city }: Props) => {
  return (
    <section className="relative flex min-h-screen items-center bg-background py-16 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        {/* LEFT CONTENT */}
        <div className="space-y-8 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-xs font-black tracking-widest text-primary-blue uppercase">
            <Sparkles size={14} /> Available Today in {city || "Los Angeles"}
          </div>

          <h1 className="text-4xl leading-tight font-black tracking-tight text-foreground md:text-6xl">
            Regular <br />
            <span className="text-primary-blue">
              Flat-Rate Clean
              {city ? ` in ${city}` : ""}
            </span>
          </h1>

          <p className="max-w-xl text-xl font-semibold text-muted-foreground">
            Custom Priority Clean. Your instructions. Our professionalism. Exact
            results. Fixed price. Same-day booking.
          </p>

          {/* REUSABLE CALCULATOR */}
          <BookingCalculator />

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <ShieldCheck className="text-accent-green" size={20} /> $1M
              Insurance
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <Zap className="text-accent-green" size={20} /> Same-Day
              Availability
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-3xl border-8 border-card bg-muted shadow-2xl">
            <Image
              src={AliciaPortrait}
              alt={`Professional cleaning service in ${city || "Los Angeles"}`}
              fill
              priority
              sizes="(min-width: 1540px) 576px, (min-width: 1280px) 469px, (min-width: 1040px) 363px, (min-width: 780px) 704px, (min-width: 680px) 576px, calc(94.44vw - 47px)"
              className="object-cover"
            />
          </div>

          <div className="absolute -right-6 -bottom-6 hidden rounded-3xl border border-border bg-background p-6 shadow-2xl md:block">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-green text-white">
                <Check size={28} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                  Guarantee
                </p>
                <p className="text-lg font-bold text-foreground">100% Happy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
