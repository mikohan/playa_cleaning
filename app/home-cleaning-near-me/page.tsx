import { Navbar } from "@/components/common/Navbar"
import { HeroImageGemini } from "@/components/cleaning/HeroImageGemini"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { Footer } from "@/components/common/Footer"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { ServiceComparison } from "@/components/cleaning/ServiceComparison"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best House Cleaning Near Me in Los Angeles | Instant Quote",
  description:
    "Looking for top-rated house cleaning near you? Get an instant flat-rate price with our online calculator. Professional, background-checked cleaners serving all of Los Angeles. Book in seconds!",
  keywords: [
    "house cleaning near me",
    "maid service Los Angeles",
    "local cleaning company LA",
    "best home cleaners near me",
    "apartment cleaning services",
    "Playa Cleaning LA",
    "instant cleaning quote",
  ],
  alternates: {
    canonical: "https://playacleaning.com/home-cleaning-near-me",
  },

  // Open Graph (Social Media)
  openGraph: {
    title: "Find Top-Rated House Cleaning Near You in Los Angeles",
    description:
      "Instant pricing and easy booking for professional home cleaning. See why your neighbors trust Playa Cleaning for a spotless home.",
    url: "https://playacleaning.com/home-cleaning-near-me",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Professional house cleaning service in Los Angeles",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LA's Most Reliable House Cleaning Near You",
    description:
      "Flat-rate pricing, professional cleaners, and 100% satisfaction guaranteed. Get your price online.",
    images: ["/og-image.jpg"],
  },
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroImageGemini />
      <LogoTicker />
      <CallToAction />
      <WhyMe />
      <CleaningCalculator />
      <div className="hidden md:block">
        <ServiceComparison />
      </div>
      <Testimonials />
      <BenefitsSection />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
