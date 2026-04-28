"use client"
import React, { useMemo } from "react"
import Link from "next/link"
import { MapPin, Sparkles, ChevronRight } from "lucide-react"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"
import { servicePages } from "@/app/data/seo-data"

interface SiloProps {
  currentCitySlug: string
  currentServiceSlug?: string // Optional: if provided, it links to "Service X in City Y"
}

// Deterministic random helper to keep links permanent per page
const getSeedRandom = (seed: string) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return () => {
    hash = (hash * 16807) % 2147483647
    return (hash - 1) / 2147483646
  }
}

export const GeographicSilo = ({
  currentCitySlug,
  currentServiceSlug,
}: SiloProps) => {
  const currentArea = LOS_ANGELES_AREAS.find((a) => a.slug === currentCitySlug)

  const siloData = useMemo(() => {
    if (!currentArea) return { neighbors: [], hubs: [], otherServices: [] }

    // 1. Get 5 Immediate Neighbors
    const neighbors = LOS_ANGELES_AREAS.filter((a) =>
      currentArea.neighborSlugs?.includes(a.slug)
    ).slice(0, 5)

    // 2. Get 3 Permanent "Random" Hubs from other regions
    const otherRegionHubs = LOS_ANGELES_AREAS.filter(
      (a) => a.region !== currentArea.region && a.type === "city"
    )
    const rng = getSeedRandom(currentArea.name)
    const hubs = [...otherRegionHubs].sort(() => rng() - 0.5).slice(0, 3)

    // 3. Get 4 Other Services (if a service context is provided)
    const otherServices = currentServiceSlug
      ? servicePages.filter((s) => s.slug !== currentServiceSlug).slice(0, 4)
      : []

    return { neighbors, hubs, otherServices }
  }, [currentArea, currentServiceSlug])

  if (!currentArea) return null

  return (
    <section className="container mx-auto max-w-7xl border-t border-border/40 px-6 py-16">
      <div className="flex flex-col gap-12">
        {/* ROW 1: NEIGHBORING AREAS (The Spider Web) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <MapPin className="h-4 w-4 text-primary-blue" />
            <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
              Local & Regional Service Network
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* The Active Location (Static Tag) */}
            <span className="rounded-full border border-primary-blue/20 bg-primary-blue/5 px-3.5 py-1.5 text-[11px] font-bold text-primary-blue">
              {currentArea.name}
            </span>

            {/* Combined Neighbors and Hubs */}
            {[...siloData.neighbors, ...siloData.hubs].map((city) => (
              <Link
                key={city.slug}
                href={
                  currentServiceSlug
                    ? `/services/${currentServiceSlug}/${city.slug}`
                    : `/service-areas/${city.slug}`
                }
                className="rounded-full border border-border bg-muted/20 px-3.5 py-1.5 text-[11px] font-bold transition-all hover:border-primary-blue hover:bg-primary-blue/5 hover:text-primary-blue"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ROW 2: CROSS-SERVICE LINKS (Tier 2 Silo) */}
        {currentServiceSlug && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground/80">
              <Sparkles className="h-4 w-4 text-primary-blue" />
              <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                Premium Services in {currentArea.name}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {siloData.otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/${currentCitySlug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-4 text-xs font-bold transition-all hover:border-primary-blue hover:shadow-sm"
                >
                  <span className="truncate">{s.page}</span>
                  <ChevronRight className="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-1 group-hover:text-primary-blue" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
