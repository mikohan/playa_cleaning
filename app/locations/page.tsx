import Link from "next/link"
import { LocationDataResponse, LocationRecord } from "@/app/types/locationTypes"
import { Metadata } from "next"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LocationGrid } from "@/components/cleaning/LocationGrid"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"
import { ServiceTicker } from "@/components/common/ServiceTicker"
import { getAllServices } from "@/lib/strapi"
import { CallToAction } from "@/components/cleaning/CallToAction"

// ─────────────────────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────────────────────

async function getAllLocations(): Promise<LocationRecord[]> {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"
  const API_TOKEN = process.env.STRAPI_API_TOKEN

  // We only need a few fields for the listing page to keep the payload light
  const query = new URLSearchParams({
    "filters[active][$eq]": "true",
    "fields[0]": "city_name",
    "fields[1]": "slug",
    "fields[2]": "local_hook",
    "fields[3]": "zip_codes",
    "fields[4]": "documentId",
  })

  const res = await fetch(`${STRAPI_URL}/api/locations?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error("Failed to fetch locations")
    return []
  }

  // Use the interface as the expected JSON shape
  const json: LocationDataResponse = await res.json()

  return json.data || []
}
// ─────────────────────────────────────────────────────────────
// 1. DYNAMIC METADATA
// ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Service Areas | Professional Cleaning Across Los Angeles | Playa Cleaning",
  description:
    "Playa Cleaning provides premium residential and commercial cleaning across Los Angeles. View our service areas including Santa Monica, Venice, Culver City, and more.",
  alternates: { canonical: "https://www.playacleaning.com/locations" },
  openGraph: {
    title: "Our Los Angeles Service Areas | Playa Cleaning",
    description:
      "Professional cleaning services in your neighborhood. Serving the greater Los Angeles area with 5-star upholstery and home care.",
    url: "https://www.playacleaning.com/locations",
    siteName: "Playa Cleaning",
    type: "website",
  },
}
function LocationsSchema({ locations }: { locations: LocationRecord[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Playa Cleaning Service Areas",
    description: "List of cities served by Playa Cleaning in Los Angeles, CA.",
    itemListElement: locations.map((loc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.playacleaning.com/locations/${loc.slug}`,
      name: `Cleaning Services in ${loc.city_name}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────

export default async function LocationsListingPage() {
  const locations = await getAllLocations()
  const services = await getAllServices()

  return (
    <>
      <LocationsSchema locations={locations} />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary-blue/20">
        <BreadCrumbsUniversal />
        {/* 1. HERO */}
        <section className="mx-auto max-w-7xl">
          <HeroVideo
            title="Professional Cleaning
Across Los Angeles"
            subtitle="From the tech lofts of Silicon Beach to the historic estates of Santa Monica, Angara Streamers provides premium upholstery care right in your neighborhood."
            highlightIndex={1}
          />
        </section>

        <LocationGrid locations={locations} />

        {/* 3. SOCIAL PROOF */}
        <section className="container mx-auto">
          <TeamBentoGrid />
        </section>

        {/* 4. SEO VALUE SECTION */}
        <section className="container mx-auto max-w-4xl">
          <ServiceTicker services={services} />
        </section>
        <section>
          <CallToAction />
        </section>
      </div>
    </>
  )
}
