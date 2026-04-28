"use client"
import React from "react"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"

interface GeoSectionProps {
  city?: string
  // Removing neighborhoods from props as we will now derive them dynamically
}

export const GeoSection = ({ city = "Playa Vista" }: GeoSectionProps) => {
  // 1. Find the current area object based on the city name or slug
  const currentArea = LOS_ANGELES_AREAS.find(
    (a) =>
      a.name.toLowerCase() === city.toLowerCase() ||
      a.slug === city.toLowerCase()
  )

  // 2. Get the neighbor data objects so we have both the Name and the Slug
  const neighborAreas = currentArea
    ? LOS_ANGELES_AREAS.filter((a) =>
        currentArea.neighborSlugs.includes(a.slug)
      )
    : []

  return (
    <section className="relative py-20 md:py-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          {/* LEFT: SEO COPY */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-[10px] font-black tracking-widest text-primary-blue uppercase">
              <MapPin size={12} /> Local Service Area
            </div>

            <h2 className="text-4xl font-black tracking-tight text-foreground uppercase md:text-5xl">
              Professional Cleaning in {currentArea?.name || city}.
            </h2>

            <p className="max-w-xl text-lg leading-relaxed font-semibold text-muted-foreground">
              Serving {currentArea?.name || city} and surrounding areas with
              verified flat-rate cleaning. Our teams are dispatched locally to
              ensure same-day availability and punctual arrivals.
            </p>

            {/* DYNAMIC NEIGHBORHOOD LINKS */}
            <div className="pt-4">
              <p className="mb-4 text-xs font-black tracking-widest text-foreground uppercase">
                Nearby Service Areas:
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Always include the current city as a static, non-linkable tag */}
                <span className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-sm font-bold text-primary-blue opacity-80">
                  {currentArea?.name || city}
                </span>

                {/* Map through the actual neighbors found in your data file */}
                {neighborAreas.map((neighbor) => (
                  <Link
                    key={neighbor.slug}
                    href={`/service-areas/${neighbor.slug}`}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition-all hover:border-primary-blue hover:text-primary-blue hover:shadow-md"
                  >
                    {neighbor.name}
                  </Link>
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
                All cleaners assigned to {currentArea?.name || city} have passed
                local background checks and technical proficiency tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
