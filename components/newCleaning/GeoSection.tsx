"use client"
import React, { useMemo } from "react"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"

// Simple seed-based random function to ensure permanent "random" links
const getDeterministicRandom = (seed: string) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return () => {
    hash = (hash * 16807) % 2147483647
    return (hash - 1) / 2147483646
  }
}

export const GeoSection = ({ city = "Playa Vista" }: { city?: string }) => {
  const currentArea = LOS_ANGELES_AREAS.find(
    (a) =>
      a.name.toLowerCase() === city.toLowerCase() ||
      a.slug === city.toLowerCase()
  )

  const balancedLinks = useMemo(() => {
    if (!currentArea) return []

    // 1. Get 5 Immediate Neighbors
    const neighbors = LOS_ANGELES_AREAS.filter((a) =>
      currentArea.neighborSlugs.includes(a.slug)
    ).slice(0, 5)

    // 2. Get 3 Permanent "Random" Hubs from other regions
    const otherRegionAreas = LOS_ANGELES_AREAS.filter(
      (a) => a.region !== currentArea.region && a.type === "city"
    )

    // Use city name as seed so these 3 cities are permanent for this page
    const rng = getDeterministicRandom(currentArea.name)
    const shuffled = [...otherRegionAreas].sort(() => rng() - 0.5)
    const permanentHubs = shuffled.slice(0, 3)

    return [...neighbors, ...permanentHubs]
  }, [currentArea])

  if (!currentArea) return null

  return (
    <section className="relative py-20 md:py-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-[10px] font-black tracking-widest text-primary-blue uppercase">
              <MapPin size={12} /> Local Service Area
            </div>

            <h2 className="text-4xl font-black tracking-tight text-foreground uppercase md:text-5xl">
              Professional Cleaning in {currentArea.name}.
            </h2>

            <p className="max-w-xl font-jakarta text-lg leading-relaxed font-semibold text-muted-foreground">
              Serving {currentArea.name} and the wider Los Angeles area with
              verified flat-rate cleaning. Our teams are dispatched locally to
              ensure same-day availability and punctual arrivals.
            </p>

            <div className="pt-4">
              <p className="mb-4 text-xs font-black tracking-widest text-foreground uppercase">
                Service Area Network:
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Active City Tag */}
                <span className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-sm font-bold text-primary-blue opacity-80">
                  {currentArea.name}
                </span>

                {/* Deterministic Balanced Links */}
                {balancedLinks.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/service-areas/${area.slug}`}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition-all hover:border-primary-blue hover:text-primary-blue hover:shadow-md"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Operational Stats */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <Clock className="mb-4 text-primary-blue" size={32} />
              <h3 className="text-xl font-black tracking-tight uppercase">
                Availability
              </h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                Monday — Sunday <br /> 8:00 AM — 8:00 PM
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <CheckCircle2 className="mb-4 text-primary-blue" size={32} />
              <h3 className="text-xl font-black tracking-tight uppercase">
                Vetted Teams
              </h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                All cleaners assigned to {currentArea.name} have passed local
                background checks and technical proficiency tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
