import { notFound } from "next/navigation"
import Image from "next/image"
import { strapiRequest } from "@/lib/strapi"
import LocationNeighbors from "@/components/cleaning/LocationNighbors"
import {
  LocationRecord,
  LocationDataResponse,
  LocationNeighbor,
  FAQLocation,
} from "@/app/types/locationTypes"
import { Navbar } from "@/components/common/Navbar"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import LocationContext from "@/components/cleaning/LocationContext"
import { WaveDivider } from "@/components/common/WaveDivider"
import LocationFAQ from "@/components/cleaning/LocationFAQ"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { Footer } from "@/components/common/Footer"
import ServiceGrid from "@/components/cleaning/ServiceGrid"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import { CallToAction } from "@/components/cleaning/CallToAction"

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.playacleaning.com"

// ─────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────

const LOCATION_POPULATE_PARAMS = {
  // Explicit Media Population (Avoids 'related' validation error)
  "populate[location_image][fields][0]": "url",
  "populate[location_image][fields][1]": "alternativeText",

  // Explicit Component Population
  "populate[left_col][populate][location_image][fields][0]": "url",
  "populate[right_col][populate][location_image][fields][0]": "url",

  // NOTE: faq_location and coordinates are JSON attributes.
  // DO NOT add them to populate; they are returned by default.
} as const

// ─────────────────────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const response = await strapiRequest<LocationDataResponse>("locations", {
      "fields[0]": "slug",
    })
    return response.data.map((loc) => ({ slug: loc.slug }))
  } catch (error) {
    return []
  }
}

async function getLocationData(slug: string): Promise<LocationRecord | null> {
  try {
    const response = await strapiRequest<LocationDataResponse>("locations", {
      "filters[slug][$eq]": slug,
      ...LOCATION_POPULATE_PARAMS,
    })
    return response.data?.[0] || null
  } catch (error) {
    return null
  }
}

// ─────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = await getLocationData(slug)

  if (!location) notFound()

  // Logic: Deduplicate neighbors from columns
  const neighbors = Array.from(
    new Map(
      [...(location.left_col || []), ...(location.right_col || [])]
        .filter((n) => n.slug !== location.slug)
        .map((n) => {
          // DEBUG LOG: See what Strapi is actually giving you for the neighbor

          return [
            n.slug,
            {
              id: n.id,
              slug: n.slug,
              city_name: n.city_name,
              zip_codes: n.zip_codes,
              // Ensure we are grabbing the URL from the nested Strapi object
              location_image: n.location_image,
            },
          ]
        })
    ).values()
  ) as LocationNeighbor[]

  return (
    <div>
      <Navbar />
      <section>
        {/* Hero */}
        <HeroVideo
          title={`Cleaning service in ${location.city_name}`}
          subtitle={location.local_hook}
          highlightIndex={0}
        />
      </section>
      <section>
        <LogoTicker />
      </section>
      <section className="relative mt-16">
        <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
        <WaveDivider position="top" fill="var(--color-background)" />
        <ServiceGrid cityName={location.city_name} />
      </section>
      <section className="relative mt-16">
        <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
        <WaveDivider position="top" fill="var(--color-background)" />
        <LocationContext
          cityName={location.city_name}
          contextText={location.neighborhood_context}
          imageUrl={
            location.location_image?.url
              ? `${STRAPI_URL}${location.location_image.url}`
              : undefined
          }
        />
      </section>
      <section className="relative">
        <div className="absolute -top-18 left-80 -z-10 h-100 w-100 border bg-top-blur/60 blur-[150px]"></div>
        <LocationFAQ
          cityName={location.city_name}
          items={location.faq_location} // Falls back to defaults if empty
        />
      </section>

      <section>
        <Testimonials />
      </section>
      <CallToAction />
      <section>
        <LocationNeighbors
          currentCityName={location.city_name}
          neighbors={neighbors}
        />
      </section>
      <CalculatorCTA />
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
