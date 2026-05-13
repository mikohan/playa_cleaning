"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Location {
  id: string | number
  slug: string
  city_name: string
  local_hook: string
  zip_codes?: string
}

interface ServiceAreasProps {
  locations: Location[]
  className?: string
}

export const LocationGrid = ({
  locations = [],
  className,
}: ServiceAreasProps) => {
  return (
    <section className={cn("container mx-auto px-6 py-24", className)}>
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-end justify-between gap-6 border-b border-border pb-8 md:flex-row">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground italic">
            Our Service Areas
          </h2>
          <p className="text-lg text-muted-foreground">
            Select your city for localized pricing and availability.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-5 py-2 text-sm font-bold text-primary-blue">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-blue opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-blue"></span>
          </span>
          Now Serving {locations.length} Neighborhoods
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.id}
            href={`/locations/${loc.slug}`}
            className={cn(
              "group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-500",
              "hover:-translate-y-2 hover:border-primary-blue hover:shadow-2xl hover:shadow-primary-blue/10",
              "dark:hover:bg-accent/50" // Subtle lift for dark mode
            )}
          >
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-blue">
              {loc.city_name}
            </h3>
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {loc.local_hook}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
              <span className="font-mono text-xs font-medium text-muted-foreground/60">
                {loc.zip_codes?.split(",")[0] || "LA Area"} & more
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-primary-blue transition-all group-hover:gap-3">
                View Area <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
