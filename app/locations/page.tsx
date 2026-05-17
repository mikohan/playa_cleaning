import { LocationDataResponse, LocationRecord } from "@/app/types/locationTypes"
import { Metadata } from "next"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LocationGrid } from "@/components/cleaning/LocationGrid"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"
import { ServiceTicker } from "@/components/common/ServiceTicker"
import { getAllServices } from "@/lib/strapi"
import { CallToAction } from "@/components/cleaning/CallToAction"

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"

// ─────────────────────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────────────────────

async function getAllLocations(): Promise<LocationRecord[]> {
  const API_TOKEN = process.env.STRAPI_API_TOKEN

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

  const json: LocationDataResponse = await res.json()
  return json.data || []
}

// ─────────────────────────────────────────────────────────────
// 1. MAXIMUM SEO METADATA INFUSION
// ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Service Areas | Professional Cleaning Across Los Angeles | Playa Cleaning",
  description:
    "Playa Cleaning provides premium residential, commercial, and technical upholstery cleaning across Los Angeles. Serving Santa Monica, Venice, Culver City, Marina del Rey, and surrounding neighborhoods.",
  alternates: { canonical: "https://www.playacleaning.com/locations" },
  keywords:
    "cleaning services los angeles, maid service santa monica, house cleaning venice ca, upholstery cleaning culver city, commercial office cleaning la, playa cleaning service areas, professional cleaners lakers area",
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Los Angeles",
    "geo.position": "34.0522;-118.2437",
    ICBM: "34.0522, -118.2437",
  },
  openGraph: {
    title: "Our Los Angeles Service Areas | Playa Cleaning",
    description:
      "Professional cleaning services in your neighborhood. Serving the greater Los Angeles area with 5-star house, maid, and premium upholstery care.",
    url: "https://www.playacleaning.com/locations",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://cms.playacleaning.com/uploads/hero_4_8f4caab2a5.webp",
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Premium Los Angeles Service Areas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Los Angeles Service Areas | Playa Cleaning",
    description:
      "Looking for premium cleaning services near you in Los Angeles? Explore our standard service maps including Santa Monica, Venice, and Culver City.",
    images: ["https://cms.playacleaning.com/uploads/hero_4_8f4caab2a5.webp"],
  },
}

// ─────────────────────────────────────────────────────────────
// 2. ERROR-FREE GOOGLE VALIDATED SCHEMA
// ─────────────────────────────────────────────────────────────
function LocationsSchema({ locations }: { locations: LocationRecord[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.playacleaning.com/#organization",
        name: "Playa Cleaning",
        url: "https://www.playacleaning.com",
        telephone: "+1-213-598-77-63",
        priceRange: "$$",
        image: "https://cms.playacleaning.com/uploads/hero_4_8f4caab2a5.webp",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          "@id": "https://www.playacleaning.com/locations/#catalog",
          name: "Playa Cleaning Service Directory",
          description:
            "Comprehensive list of coverage areas and service sectors optimized across Los Angeles.",
          itemListElement: locations.map((loc, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebPage",
              "@id": `https://www.playacleaning.com/locations/${loc.slug}`,
              url: `https://www.playacleaning.com/locations/${loc.slug}`,
              name: `Professional Cleaning Services in ${loc.city_name}`,
              description:
                loc.local_hook ||
                `Top-rated home, maid, and professional upholstery deep cleaning in ${loc.city_name}, CA.`,
            },
          })),
        },
      },
    ],
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
            title="Professional Cleaning Across Los Angeles"
            subtitle="From the tech lofts of Silicon Beach to the historic estates of Santa Monica, Playa Cleaning provides premium residential, commercial, and technical upholstery care right in your neighborhood."
            highlightIndex={1}
          />
        </section>

        {/* 2. LOCATIONS GRID MAP */}
        <LocationGrid locations={locations} />

        {/* 3. SOCIAL PROOF SOCIAL MATRIX */}
        <section className="container mx-auto">
          <TeamBentoGrid />
        </section>

        {/* 4. SEO VALUE SECTION REPEATER */}
        <section className="container mx-auto max-w-4xl">
          <ServiceTicker services={services} />
        </section>

        {/* 5. CALL TO ACTION INTERCEPT */}
        <section>
          <CallToAction />
        </section>
      </div>
    </>
  )
}
