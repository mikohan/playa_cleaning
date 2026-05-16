import { LocationRecord } from "@/app/types/locationTypes"
import { ServiceData } from "@/app/types/serviceTypes"

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.playacleaning.com"

export default function JsonLd({
  location,
  services,
}: {
  location: LocationRecord
  services: ServiceData[]
}) {
  const lat = location.coordinates?.lat || 34.0522
  const lng = location.coordinates?.lng || -118.2437
  const pageUrl = `https://www.playacleaning.com/locations/${location.slug}`
  const businessId = `${pageUrl}#cleaning-service`

  // Using Record<string, unknown> provides strict safety compared to any
  const graphArray: Array<Record<string, unknown>> = [
    {
      "@type": ["LocalBusiness", "CleaningService"] as const,
      "@id": businessId,
      name: `Playa Cleaning ${location.city_name}`,
      image: location.location_image?.url
        ? `${STRAPI_URL}${location.location_image.url}`
        : "",
      telephone: "+1-213-598-77-63",
      url: pageUrl,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress" as const,
        addressLocality: location.city_name,
        addressRegion: "CA",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates" as const,
        latitude: lat,
        longitude: lng,
      },
      aggregateRating: {
        "@type": "AggregateRating" as const,
        ratingValue: "4.9",
        reviewCount: "158",
      },
      areaServed: {
        "@type": "City" as const,
        name: location.city_name,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog" as const,
        name: "Cleaning Services",
        itemListElement: services.map((s, index) => ({
          "@type": "Offer" as const,
          position: index + 1,
          itemOffered: {
            "@type": "Service" as const,
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
      "@type": ["FAQPage"] as const,
      "@id": `${pageUrl}#faq`,
      mainEntity: location.faq_location.map((faq) => ({
        "@type": "Question" as const,
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: faq.answer,
        },
      })),
    })
  }

  const mainSchema = {
    "@context": "https://schema.org" as const,
    "@graph": graphArray,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
    />
  )
}
