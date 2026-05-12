import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"

import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { HeroComponentServices } from "@/components/cleaning/HeroComponentServices"
import { ServiceList } from "@/components/newCleaning/ServicesList"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

import AliciaImage from "@/public/images/cleaning/hero-4.png"
import { strapiRequest } from "@/lib/strapi"
import { StrapiResponse, ServiceData } from "@/app/types/serviceTypes"
import ServiceGrid from "@/components/cleaning/ServiceGrid"

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "Explore our full range of professional cleaning services in LA. From deep home cleaning to specialized upholstery care.",
  alternates: { canonical: "https://playacleaning.com/services" },
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
    "@type": "ItemList",
    name: "Playa Cleaning Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        url: `https://playacleaning.com/services/${s.slug}`,
      },
    })),
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
