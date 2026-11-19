/**
 * Playa Cleaning business facts for JSON-LD, used on every page.
 * One place to update: hours, rating and profile links must match the
 * Google Business Profile (checked weekly by the SEO scheduled task).
 */
import { SITE_URL } from "@/lib/projects"

export const BUSINESS_ID = `${SITE_URL}/#localbusiness`
export const BUSINESS_NAME = "Playa Cleaning"
export const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343"

import { GOOGLE_RATING } from "@/lib/google-rating"
export { GOOGLE_RATING }

/** Profiles that belong to Playa Cleaning */
export const SAME_AS = [
  "https://www.google.com/maps?cid=805311876569482031",
  "https://www.yelp.com/biz/playa-cleaning-los-angeles-2",
  "https://nextdoor.com/pages/playa-cleaning-playa-vista-ca/",
  "https://www.instagram.com/playa_cleaning/",
  "https://www.facebook.com/playacleaning",
  "https://www.youtube.com/@PlayaCleaningUS",
]

/** Reference to the business from other nodes */
export const businessRef = { "@id": BUSINESS_ID }

/** The business node, same on every page */
export function businessNode() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: "order@playacleaning.com",
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Playa Vista",
      addressRegion: "CA",
      postalCode: "90094",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.9754,
      longitude: -118.4214,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_RATING.ratingValue,
      reviewCount: GOOGLE_RATING.reviewCount,
      bestRating: "5",
    },
    sameAs: SAME_AS,
  }
}
