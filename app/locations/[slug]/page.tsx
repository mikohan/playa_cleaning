import { notFound, permanentRedirect } from "next/navigation"
import { strapiRequest } from "@/lib/strapi"
import LocationNeighbors from "@/components/cleaning/LocationNighbors"
import {
  LocationRecord,
  LocationDataResponse,
  LocationNeighbor,
} from "@/app/types/locationTypes"
import { ServiceData, StrapiResponse } from "@/app/types/serviceTypes"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import LocationContext from "@/components/cleaning/LocationContext"
import { WaveDivider } from "@/components/common/WaveDivider"
import LocationFAQ from "@/components/cleaning/LocationFAQ"
import { Testimonials } from "@/components/cleaning/Testimonials"
import ServiceGrid from "@/components/cleaning/ServiceGrid"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { Metadata } from "next"
import GoogleMap from "@/components/common/GoogleMap"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"
import { getProjectsByLocation } from "@/lib/projects"
import { RecentJobs } from "@/components/projects/RecentJobs"
import { businessRef, GOOGLE_RATING } from "@/lib/business-schema"

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.playacleaning.com"

// ─────────────────────────────────────────────────────────────
// Type Declarations for Structured Schema Data
// ─────────────────────────────────────────────────────────────
// A city page describes the service in that city; the business itself is
// one node (lib/business-schema), referenced here as the provider.
interface SchemaLocalBusiness {
  "@type": "Service"
  "@id": string
  name: string
  image: string
  url: string
  description: string
  serviceType: string
  provider: { "@id": string }
  areaServed: {
    "@type": "City"
    name: string
    geo: {
      "@type": "GeoCoordinates"
      latitude: number
      longitude: number
    }
  }
  hasOfferCatalog: {
    "@type": "OfferCatalog"
    name: string
    itemListElement: Array<{
      "@type": "Offer"
      position: number
      itemOffered: {
        "@type": "Service"
        name: string
        description: string
      }
    }>
  }
}

interface SchemaFAQPage {
  "@type": "FAQPage"
  "@id": string
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

type SchemaGraphNode = SchemaLocalBusiness | SchemaFAQPage

interface SchemaMainStructure {
  "@context": "https://schema.org"
  "@graph": SchemaGraphNode[]
}

// ─────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────

const LOCATION_POPULATE_PARAMS = {
  "populate[location_image][fields][0]": "url",
  "populate[location_image][fields][1]": "alternativeText",
  "populate[left_col][populate][location_image][fields][0]": "url",
  "populate[right_col][populate][location_image][fields][0]": "url",
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

async function getServicesData(): Promise<ServiceData[]> {
  try {
    const response = await strapiRequest<StrapiResponse<ServiceData>>(
      "services",
      {
        "fields[0]": "name",
        "fields[1]": "slug",
        "fields[2]": "meta_description",
        "fields[3]": "header",
        "populate[photo][fields][0]": "url",
      }
    )
    return response.data || []
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// Dynamic Metadata
// ─────────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationData(slug)

  if (!location) return { title: "Location Not Found" }

  // Title and description say what people search for: the service + the city
  const pageTitle = `House & Deep Cleaning in ${location.city_name}`
  const title = `${pageTitle} | Playa Cleaning`
  const description = `House cleaning in ${location.city_name}: deep cleaning, regular cleaning and move-in/move-out cleaning by Alicia. Rated ${GOOGLE_RATING.ratingValue} on Google. Get a free quote.`
  const url = `https://playacleaning.com/locations/${slug}`

  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    keywords: `cleaning service ${location.city_name}, house cleaning ${location.city_name}, maid service ${location.city_name}, upholstery cleaning ${location.city_name}, professional cleaners ${location.city_name}, local maids ${location.city_name}`,
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
          url: location.location_image?.url
            ? `${STRAPI_URL}${location.location_image.url}`
            : "",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

// ─────────────────────────────────────────────────────────────
// STRUCTURED DATA COMPONENT (JSON-LD)
// ─────────────────────────────────────────────────────────────
function JsonLd({
  location,
  services,
}: {
  location: LocationRecord
  services: ServiceData[]
}) {
  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437
  const pageUrl = `https://playacleaning.com/locations/${location.slug}`
  const businessId = `${pageUrl}#service`

  const dynamicDescription =
    location.local_hook ||
    `House cleaning in ${location.city_name} by Playa Cleaning.`

  const graphArray: SchemaGraphNode[] = [
    {
      "@type": "Service",
      "@id": businessId,
      name: `House Cleaning in ${location.city_name}`,
      image: location.location_image?.url
        ? `${STRAPI_URL}${location.location_image.url}`
        : "",
      url: pageUrl,
      description: dynamicDescription,
      serviceType: "House cleaning",
      provider: businessRef,
      areaServed: {
        "@type": "City",
        name: location.city_name,
        geo: {
          "@type": "GeoCoordinates",
          latitude: lat,
          longitude: lng,
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cleaning Services",
        itemListElement: services.map((s, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description:
              s.meta_description ||
              `${s.name} service in ${location.city_name}`,
          },
        })),
      },
    },
  ]

  if (location.faq_location && location.faq_location.length > 0) {
    graphArray.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: location.faq_location.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    })
  }

  const mainSchema: SchemaMainStructure = {
    "@context": "https://schema.org",
    "@graph": graphArray,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
    />
  )
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

  // Fetch location and services in parallel
  const [location, services, recentJobs] = await Promise.all([
    getLocationData(slug),
    getServicesData(),
    getProjectsByLocation(slug, 4),
  ])

  if (!location) permanentRedirect("/locations")

  // Logic: Deduplicate neighbors from columns
  const neighbors = Array.from(
    new Map(
      [...(location.left_col || []), ...(location.right_col || [])]
        .filter((n) => n.slug !== location.slug)
        .map((n) => [
          n.slug,
          {
            id: n.id,
            slug: n.slug,
            city_name: n.city_name,
            zip_codes: n.zip_codes,
            location_image: n.location_image,
          },
        ])
    ).values()
  ) as LocationNeighbor[]

  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437

  return (
    <>
      <JsonLd location={location} services={services} />
      <div className="bg-background">
        <BreadCrumbsUniversal />
        <section>
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
          <ServiceGrid cityName={location.city_name} services={services} />
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

        <section className="relative overflow-x-clip">
          <div className="absolute -top-18 left-80 -z-10 h-100 w-100 border bg-top-blur/60 blur-[150px]"></div>
          <LocationFAQ
            cityName={location.city_name}
            items={location.faq_location}
          />
        </section>

        <section>
          <Testimonials />
        </section>

        <RecentJobs
          projects={recentJobs}
          title={`Recent Cleaning Jobs in ${location.city_name}`}
          intro={`Photos from homes we cleaned in ${location.city_name}.`}
          allJobsText="See jobs in other cities"
        />

        <CallToAction />

        <section>
          <LocationNeighbors
            currentCityName={location.city_name}
            neighbors={neighbors}
          />
        </section>

        <section className="container mx-auto px-6 py-16">
          <h2 className="mb-8 text-3xl font-black tracking-tighter uppercase">
            Our Service Area in {location.city_name}
          </h2>
          <GoogleMap lat={lat} lng={lng} zoom={13} className="h-125" />
        </section>

        <CalculatorCTA />
      </div>
    </>
  )
}
