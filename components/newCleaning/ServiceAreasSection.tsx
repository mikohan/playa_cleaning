import Link from "next/link"
import { MapPin, Navigation } from "lucide-react"
import { strapiRequest } from "@/lib/strapi"
import { LocationDataResponse, LocationRecord } from "@/app/types/locationTypes"

// ─────────────────────────────────────────────────────────────
// DATA FETCHING LAYER (DECOUPLED FUNCTION)
// ─────────────────────────────────────────────────────────────
async function getLiveServiceAreas(): Promise<LocationRecord[]> {
  try {
    const response = await strapiRequest<LocationDataResponse>("locations", {
      "filters[active][$eq]": "true",
      "fields[0]": "city_name",
      "fields[1]": "slug",
      "pagination[pageSize]": 100,
    })
    return response?.data || []
  } catch (error) {
    console.error("❌ Error fetching service areas for SEO links:", error)
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// REFACTORED HIGH-DESIGN SEO COMPONENT
// ─────────────────────────────────────────────────────────────
export async function ServiceAreasSection() {
  const liveLocations = await getLiveServiceAreas()

  if (!liveLocations || liveLocations.length === 0) return null

  return (
    /* Stripped wrapper border. Added a deep, premium background gradient with organic lighting radial anchors */
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-20">
      {/* Decorative background light orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/5 blur-[120px]" />

      <div className="container mx-auto max-w-6xl px-6">
        {/* Minimalist Grid Header (No outer border layout blocks) */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 animate-pulse items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue">
              <Navigation size={16} className="rotate-45" />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-[0.2em] text-primary-blue uppercase">
                Service Network
              </h2>
              <p className="mt-0.5 text-sm font-bold tracking-tight text-foreground">
                Premium professional coverage across Greater Los Angeles
              </p>
            </div>
          </div>
          <div className="mx-8 hidden h-px flex-1 bg-gradient-to-r from-primary-blue/20 via-border/40 to-transparent sm:block" />
        </div>

        {/* High-Density Modern Card Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {liveLocations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-3.5 text-[14px] font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-blue/40 hover:bg-background hover:text-foreground hover:shadow-md hover:shadow-primary-blue/5"
            >
              {/* Micro Location Accent Pin Indicator */}
              <MapPin
                size={14}
                className="shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:scale-110 group-hover:text-primary-blue"
              />

              <span className="truncate transition-colors duration-200">
                {loc.city_name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
