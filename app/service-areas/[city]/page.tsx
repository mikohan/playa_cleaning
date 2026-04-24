// app/service-areas/[city]/page.tsx

import { Testimonials } from "@/components/cleaning/Testimonials"
import { Footer } from "@/components/common/Footer"
import { Navbar } from "@/components/common/Navbar"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { GeoSection } from "@/components/newCleaning/GeoSection"
import { HeroSection } from "@/components/newCleaning/HeroSection"

export async function generateStaticParams() {
  const cities = ["culver-city", "santa-monica", "playa-vista", "venice"]
  return cities.map((city) => ({
    city: city,
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
      <HeroSection city={cityName} />
      <FeaturesSection />
      <Testimonials />
      <GeoSection city={cityName} />
      {/* Other components */}
      <Footer />
    </main>
  )
}
