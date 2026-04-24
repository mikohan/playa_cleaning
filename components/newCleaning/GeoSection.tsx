"use client"
import React from "react"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"
import { WaveDivider } from "../common/WaveDivider"

interface GeoSectionProps {
  city?: string
  neighborhoods?: string[]
}

export const GeoSection = ({
  city = "Playa Vista",
  neighborhoods = ["Culver City", "Marina Del Rey", "Mar Vista", "Venice"],
}: GeoSectionProps) => {
  return (
    <section className="relative py-20 md:py-40">
      {/* <WaveDivider position="top" fill="var(--color-background)" />
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div> */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          {/* LEFT: SEO COPY */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-[10px] font-black tracking-widest text-primary-blue uppercase">
              <MapPin size={12} /> Local Service Area
            </div>

            <h2 className="text-4xl font-black tracking-tight text-foreground uppercase md:text-5xl">
              Professional Cleaning in {city}.
            </h2>

            <p className="max-w-xl text-lg leading-relaxed font-semibold text-muted-foreground">
              Serving {city} and surrounding areas with verified flat-rate
              cleaning. Our teams are dispatched locally to ensure same-day
              availability and punctual arrivals for every scheduled visit.
            </p>

            {/* NEIGHBORHOOD TAGS */}
            <div className="pt-4">
              <p className="mb-4 text-xs font-black tracking-widest text-foreground uppercase">
                Neighborhoods Served:
              </p>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((area) => (
                  <span
                    key={area}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: OPERATIONAL FACTS */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-5">
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <Clock className="mb-4 text-primary-blue" size={32} />
              <h3 className="text-xl font-black tracking-tight uppercase">
                Availability
              </h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                Monday — Sunday <br />
                8:00 AM — 8:00 PM
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <CheckCircle2 className="mb-4 text-primary-blue" size={32} />
              <h3 className="text-xl font-black tracking-tight uppercase">
                Vetted Teams
              </h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                All cleaners assigned to {city} have passed local background
                checks and technical proficiency tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
