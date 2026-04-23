"use client"
import React from "react"
import Image from "next/image"
import { CalendarDays, Phone } from "lucide-react"

// Replace with your actual path
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
import { WaveDivider } from "../common/WaveDivider"

export const CallToAction = () => {
  return (
    <section className="relative py-24 md:pt-60">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 lg:gap-16">
          {/* Column 1: Alicia's Portrait */}
          {/* Added h-[500px] for mobile visibility and z-10 */}
          <div className="group relative z-10 aspect-auto h-125 overflow-hidden rounded-3xl bg-muted md:col-span-2 md:aspect-4/5 md:h-full">
            <Image
              src={AliciaPortrait}
              alt="Alicia Vostrikova - Playa Cleaning"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Theme-compatible gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent"></div>
          </div>

          {/* Column 2: Content */}
          <div className="space-y-8 md:col-span-3">
            <div className="space-y-4">
              <span className="font-blauerMedium text-sm font-bold tracking-widest text-primary uppercase">
                Ready to Experience the Difference?
              </span>
              <h2 className="font-blauerMedium text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-5xl">
                Reclaim Your Time. <span className="text-primary"></span>{" "}
                <br className="hidden md:block" />
                Invest in Your Transformation.
              </h2>
              <p className="font-blauerRegular max-w-2xl pt-2 text-lg text-muted-foreground">
                Stop trading your weekends for chores and start waking up in a
                home that fuels your energy. By offloading the environmental
                mental load to an expert, you gain more than a pristine
                space—you gain the clarity, focus, and freedom to dedicate
                yourself to what truly matters.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="sm:row flex flex-col gap-4 pt-4">
              {/* Primary CTA - Themed */}
              <button className="inline-flex items-center justify-center rounded-3xl bg-primary-blue px-8 py-5 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Book Online Now
              </button>

              {/* Secondary CTA - Phone - Fixed Closing Tags */}
              <a
                href="tel:2135987763"
                className="inline-flex items-center justify-center gap-3 rounded-3xl border border-border bg-background px-8 py-5 text-lg font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                <Phone className="h-5 w-5 text-primary" />
                (213) 598-77-63
              </a>
            </div>

            {/* Micro-Benefit Bar */}
            <div className="font-blauerRegular flex items-center gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <span>
                No long-term contracts. Consistent personalized service.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
