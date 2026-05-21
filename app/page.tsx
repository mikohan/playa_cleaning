import { Metadata } from "next"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { CleaningPricing } from "@/components/newCleaning/CleaningPricing"
import { ServiceAreasSection } from "@/components/newCleaning/ServiceAreasSection"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { ServiceTicker } from "@/components/common/ServiceTicker"
import { getAllServices } from "@/lib/strapi"
import { WhyMeVideo } from "@/components/cleaning/WhyMeVideo"
import { getFooterLocations } from "@/lib/get-locations"

// ─────────────────────────────────────────────────────────────
// 1. WORLD-CLASS SEO METADATA STATIC PAYLOAD
// ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Premium Maid Services & Residential Cleaning Los Angeles | Playa Cleaning",
  description:
    "Meticulous, reliable, and pet-safe residential house cleaning services across Los Angeles. Experience luxury-tier maid services tailored to your home from Alicia at Playa Cleaning.",
  keywords: [
    "maid service Los Angeles",
    "residential house cleaning LA",
    "Playa Vista home cleaning",
    "premium maid cleaning service",
    "apartment deep cleaning service",
    "reliable cleaning company West LA",
    "luxury house cleaning services",
    "Alicia cleaning service",
  ],
  alternates: {
    canonical: "https://www.playacleaning.com",
  },
  openGraph: {
    title:
      "Premium Maid Services & Residential Cleaning Los Angeles | Playa Cleaning",
    description:
      "Meticulous, eco-friendly, and kid-safe professional residential cleaning services across Greater LA. Experience absolute attention to detail with Alicia.",
    url: "https://www.playacleaning.com",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://www.playacleaning.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Premium Residential Maid Services Los Angeles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Residential Maid Services Los Angeles",
    description:
      "Meticulous, reliable, and pet-safe professional home cleaning across Los Angeles with Alicia.",
    images: ["https://www.playacleaning.com/og-image.jpg"],
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
}

// ─────────────────────────────────────────────────────────────
// 2. MAIN PAGE STRUCTURAL ROUTE WITH DYNAMIC JSON-LD
// ─────────────────────────────────────────────────────────────
export default async function Page() {
  // Fetch dynamic content streams from Strapi
  const services = await getAllServices()
  const locations = await getFooterLocations()

  // Dynamic values parsed from Environment or targeted fallback structures
  const phoneNumber = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"

  // Dynamically map locations into Administrative Area objects for areaServed
  const dynamicAreas =
    locations && locations.length > 0
      ? locations.map((loc) => ({
          "@type": "AdministrativeArea",
          name: loc.city_name, //|| loc.name,
        }))
      : [
          { "@type": "AdministrativeArea", name: "Playa Vista" },
          { "@type": "AdministrativeArea", name: "Marina Del Rey" },
          { "@type": "AdministrativeArea", name: "Santa Monica" },
          { "@type": "AdministrativeArea", name: "Culver City" },
          { "@type": "AdministrativeArea", name: "Venice" },
          { "@type": "AdministrativeArea", name: "Los Angeles" },
        ]

  // Dynamically map services into semantic keywords for knowsAbout
  const dynamicSkills =
    services && services.length > 0
      ? services.map((svc) => svc.name)
      : [
          "Residential House Cleaning",
          "Premium Maid Services",
          "Deep Cleaning Services",
          "Apartment Cleaning",
          "Move In Move Out Cleaning",
          "Reliable Housekeeping",
        ]

  // High-density dynamic schema semantic schema tree
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://www.playacleaning.com/#localbusiness",
        name: "Playa Cleaning",
        image: "https://www.playacleaning.com/og-image.jpg",
        url: "https://www.playacleaning.com",
        telephone: phoneNumber,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
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
          closes: "18:00",
        },
        areaServed: dynamicAreas,
        knowsAbout: dynamicSkills,
      },
    ],
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Structural Dynamic JSON-LD Injection Node */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BreadCrumbsUniversal />

      <HeroVideo
        title="Residential Cleaning With Real Attention to Details"
        subtitle="I’m Alicia. I love cleaning, I love people, and I clean your home with the same care and precision I use in my own."
        highlightIndex={1}
        showNotation
      />

      <LogoTicker className="h-48" />

      {/* Isolated Benefits Layout Boundary Block */}
      <section className="relative z-10 clear-both bg-background">
        <BenefitsSection />
      </section>

      {/* Dynamic Services Rolling Strip inside an isolated section layer */}
      <section className="relative z-30 clear-both bg-top-blur/20">
        <div className="w-full">
          <ServiceTicker
            services={services}
            className="flex h-44 items-center bg-transparent"
          />
        </div>
      </section>

      <CleaningPricing />

      <WhyMe />

      <Testimonials />

      <CallToAction />

      <FAQSection />

      <WhyMeVideo />

      {/* High-Density Modern SEO Location Grid Component */}
      <ServiceAreasSection />
    </div>
  )
}
