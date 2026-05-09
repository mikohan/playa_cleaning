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
import { Metadata } from "next"
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
// ─────────────────────────────────────────────────────────────
// Dynamic Metadata Function
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationData(slug)

  if (!location) return { title: "Location Not Found" }

  const title = `Professional Cleaning Services in ${location.city_name} | Playa Cleaning`
  const description = `${location.local_hook || `Top-rated residential and commercial cleaning services in ${location.city_name}. Trusted local professionals, instant quotes, and 5-star service.`}`
  const url = `https://www.playacleaning.com/locations/${slug}`
  const imageUrl = location.location_image?.url
    ? `${STRAPI_URL}${location.location_image.url}`
    : "https://www.playacleaning.com/og-default.jpg"

  // Dynamic coordinates from Strapi
  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437

  return {
    title,
    description,
    alternates: { canonical: url },
    // Injecting Geo Metadata for local SEO crawlers
    other: {
      "geo.region": "US-CA",
      "geo.placename": location.city_name,
      "geo.position": `${lat};${lng}`,
      ICBM: `${lat}, ${lng}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Playa Cleaning",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Cleaning services in ${location.city_name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// ─────────────────────────────────────────────────────────────
// SEO Structured Data Component (DECLARED OUTSIDE)
// ─────────────────────────────────────────────────────────────
function JsonLd({ location }: { location: LocationRecord }) {
  // Extracting dynamic coordinates
  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: `Playa Cleaning ${location.city_name}`,
    image: location.location_image?.url
      ? `${STRAPI_URL}${location.location_image.url}`
      : "",
    telephone: process.env.COMPANY_PHONE || "+1-213-598-77-63", // Updated to your business phone
    url: `https://www.playacleaning.com/locations/${location.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city_name,
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
      geoRadius: "15000", // 15km service radius
    },
    areaServed: {
      "@type": "City",
      name: location.city_name,
    },
    priceRange: "$$",
  }

  const faqJsonLd = location.faq_location && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faq_location.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  )
}
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
    <>
      {/* 1. SEO Structured Data Injection */}
      <JsonLd location={location} />
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
    </>
  )
}
