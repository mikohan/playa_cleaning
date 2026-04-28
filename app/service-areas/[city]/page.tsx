// app/service-areas/[city]/page.tsx

import { Testimonials } from "@/components/cleaning/Testimonials"
import { Footer } from "@/components/common/Footer"
import { Navbar } from "@/components/common/Navbar"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { GeoSection } from "@/components/newCleaning/GeoSection"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"
import { Metadata } from "next"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import { ServiceExclusions } from "@/components/newCleaning/ServiceExclusion"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params

  const area = LOS_ANGELES_AREAS.find((a) => a.slug === city)
  const cityName = area
    ? area.name
    : city
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
  const zipPreview = area?.zipCodes?.slice(0, 3).join(", ") || ""

  return {
    title: `Professional House Cleaning in ${cityName}, CA | Playa Cleaning`,
    description: `Need a reliable cleaner in ${cityName}? We offer flat-rate house cleaning, deep cleaning, and move-out services ${zipPreview ? `across ${zipPreview}` : ""}. Book your 5-star clean in 60 seconds!`,
    keywords: [
      `${cityName} house cleaning`,
      `maid service ${cityName}`,
      `apartment cleaning ${cityName}`,
      `best cleaners in ${cityName} CA`,
      `Playa Cleaning ${cityName}`,
    ],
    alternates: {
      canonical: `https://playacleaning.com/service-areas/${city}`,
    },
    openGraph: {
      title: `Top-Rated House Cleaning in ${cityName} | Playa Cleaning`,
      description: `Trusted local maid service in ${cityName}. Flat-rate pricing, background-checked cleaners, and all supplies included.`,
      url: `https://playacleaning.com/service-areas/${city}`,
      siteName: "Playa Cleaning",
      images: [{ url: "/og-local-service.jpg" }], // Use a generic high-quality cleaning shot
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  //   const cities = ["culver-city", "santa-monica", "playa-vista", "venice"]
  const cities = LOS_ANGELES_AREAS
  return cities.map((city) => ({
    city: city.slug,
  }))
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const resolvedParams = await params
  const area = LOS_ANGELES_AREAS.find((a) => a.slug === resolvedParams.city)
  const cityName = area
    ? area.name
    : resolvedParams.city.replace("-", " ").toUpperCase()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: `Playa Cleaning ${cityName}`,
    description: `Professional residential cleaning services in ${cityName}, California. Specializing in standard, deep, and move-out cleaning.`,
    provider: {
      "@type": "LocalBusiness",
      name: "Playa Cleaning",
      image: "https://playacleaning.com/logo.png",
      telephone: "+13105550123", // Replace with actual
      priceRange: "$$",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      containsPlace: area?.zipCodes?.map((zip) => ({
        "@type": "PostalCode",
        name: zip,
      })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Standard House Cleaning" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Deep Tissue Cleaning" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Move-Out Cleaning" },
        },
      ],
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="font-jakarta">
        <HeroSection city={cityName} />
        <FeaturesSection />
        <ServiceScope />
        <ServiceExclusions />
        <TeamBentoGrid />
        <Testimonials />
        <GeoSection city={cityName} />
      </div>
      <Footer />
    </main>
  )
}
