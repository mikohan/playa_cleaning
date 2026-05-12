import { Metadata } from "next"

import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { HeroComponentServices } from "@/components/cleaning/HeroComponentServices"
import { ServiceList } from "@/components/newCleaning/ServicesList"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

import { strapiRequest } from "@/lib/strapi"
import { StrapiResponse, ServiceData } from "@/app/types/serviceTypes"

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "Expert residential and commercial cleaning across Los Angeles. Specializing in deep cleans, upholstery, and eco-friendly services. Book your 5-star clean today.",
  alternates: {
    canonical: "https://playacleaning.com/services",
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
      "From Santa Monica to DTLA, we provide meticulous cleaning for homes and offices.",
    url: "https://playacleaning.com/services",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://playacleaning.com/og-services.jpg", // Create this image!
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Professional Staff",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Cleaning Services in Los Angeles",
    description:
      "Expert cleaning for every environment. 5-star service guaranteed.",
    images: ["https://playacleaning.com/og-services.jpg"],
  },
}

export default async function ServicesListPage() {
  const response = await strapiRequest<StrapiResponse<ServiceData>>(
    "services",
    { populate: "*" }
  )
  const services: ServiceData[] = response.data.map((item) => ({
    ...item,
    ...(item.attributes ? item.attributes : {}),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Our Cleaning Services",
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.name,
            description: s.meta_description,
            url: `https://playacleaning.com/services/${s.slug}`,
            provider: {
              "@type": "LocalBusiness",
              name: "Playa Cleaning",
              image: "https://playacleaning.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://playacleaning.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://playacleaning.com/services",
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
        {/* Existing grid logic can go here or inside ServicesList */}
        {/* <ServicesList services={services} /> */}
        <ServiceList services={services} />
      </section>

      <CalculatorCTA />
    </main>
  )
}
