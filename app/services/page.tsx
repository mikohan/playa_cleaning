import { Metadata } from "next"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { HeroComponentServices } from "@/components/cleaning/HeroComponentServices"
import { ServiceList } from "@/components/newCleaning/ServicesList"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import { strapiRequest } from "@/lib/strapi"
import { StrapiResponse, ServiceData } from "@/app/types/serviceTypes"
import { LocationTicker } from "@/components/cleaning/LocationTicker"

// ─────────────────────────────────────────────────────────────
// 1. MAXIMUM SEO METADATA INFUSION - SANITIZED FOR POLICY SAFETY
// ─────────────────────────────────────────────────────────────

const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"
export const metadata: Metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "Expert residential, commercial, and technical upholstery cleaning services across Los Angeles. Specializing in routine maid services, deep cleans, and eco-friendly practices. Book your 5-star professional clean today.",
  alternates: {
    canonical: "https://www.playacleaning.com/services",
  },
  keywords:
    "cleaning services los angeles, professional cleaners la, house cleaning service, maid service near me, office cleaning company, technical upholstery cleaning, deep cleaning solutions, eco friendly cleaners",
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Los Angeles",
    "geo.position": "34.0522;-118.2437",
    ICBM: "34.0522, -118.2437",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Top-Rated Cleaning Services in LA | Playa Cleaning",
    description:
      "From Santa Monica and Venice to DTLA, we provide meticulous, top-tier professional cleaning services for homes, living areas, and offices.",
    url: "https://www.playacleaning.com/services",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://cms.playacleaning.com/uploads/hero_4_8f4caab2a5.webp",
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Professional Staff and Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Cleaning Services in Los Angeles",
    description:
      "Expert cleaning services tailored for every environment. 5-star home, commercial, and upholstery cleaning guaranteed.",
    images: ["https://cms.playacleaning.com/uploads/hero_4_8f4caab2a5.webp"],
  },
}

// ─────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────

export default async function ServicesListPage() {
  const response = await strapiRequest<StrapiResponse<ServiceData>>(
    "services",
    { populate: "*" }
  )
  const services: ServiceData[] = response.data.map((item) => ({
    ...item,
    ...(item.attributes ? item.attributes : {}),
  }))

  // ─────────────────────────────────────────────────────────────
  // 2. ERROR-FREE GOOGLE VALIDATED SCHEMA
  // ─────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.playacleaning.com/#organization",
        name: "Playa Cleaning",
        url: "https://www.playacleaning.com",
        telephone: companyPhone,
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
          "@id": "https://www.playacleaning.com/services/#catalog",
          name: "Our Professional Cleaning Services",
          description:
            "Full catalog of high-fidelity residential, maid, commercial, and technical upholstery cleaning options.",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description:
                s.meta_description ||
                `Premium professional ${s.name} solutions across Los Angeles.`,
              url: `https://www.playacleaning.com/services/${s.slug}`,
              provider: {
                "@id": "https://www.playacleaning.com/#organization",
              },
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.playacleaning.com/services/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.playacleaning.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.playacleaning.com/services",
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background pb-20 font-jakarta">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto max-w-7xl px-6 pt-6">
        <BreadCrumbs />
      </div>

      <HeroComponentServices />

      <section className="container mx-auto max-w-6xl px-6">
        <ServiceList services={services} />
      </section>

      <LocationTicker />

      <CalculatorCTA />
    </main>
  )
}
