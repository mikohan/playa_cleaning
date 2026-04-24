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

  // Find the area data from your list to get the correct Name and Zip Codes
  const area = LOS_ANGELES_AREAS.find((a) => a.slug === city)
  const cityName = area ? area.name : city.replace("-", " ").toUpperCase()
  const zipPreview = area?.zipCodes[0] || ""

  return {
    title: `Professional Cleaning Services in ${cityName} | Flat-Rate House Cleaning`,
    description: `Book a verified, flat-rate house cleaning in ${cityName}${zipPreview ? ` (${zipPreview})` : ""}. Same-day availability, vetted cleaners, and 100% quality guarantee.`,
    alternates: {
      canonical: `https://playacleaning.com/service-areas/${city}`,
    },
    openGraph: {
      title: `${cityName} House Cleaning | Playa Cleaning`,
      description: `Trusted maid service in ${cityName}. Pay by the room, not the hour. Book in 60 seconds.`,
      url: `https://playacleaning.com/service-areas/${city}`,
      siteName: "Playa Cleaning",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Cleaning Services in ${cityName}`,
      description: `Premium flat-rate cleaning for ${cityName} residents.`,
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
  params: Promise<{ city: string }> // 1. Define params as a Promise
}) {
  // 2. Resolve the promise first
  const resolvedParams = await params

  // 3. Now you can safely use .replace() on the string
  const cityName = resolvedParams.city.replace("-", " ").toUpperCase()

  return (
    <main>
      <Navbar />
      <div className="font-jakarta">
        <HeroSection city={cityName} />
        <FeaturesSection />
        <ServiceScope />
        <ServiceExclusions />
        <TeamBentoGrid />
        <Testimonials />
        <GeoSection city={cityName} />
        {/* Other components */}
      </div>
      <Footer />
    </main>
  )
}
