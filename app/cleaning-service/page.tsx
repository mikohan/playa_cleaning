import { Navbar } from "@/components/common/Navbar"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { Footer } from "@/components/common/Footer"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { Metadata } from "next"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

export const metadata: Metadata = {
  title: "Professional House Cleaning Los Angeles | Playa Cleaning",
  description:
    "Top-rated professional house cleaning and upholstery steaming in Los Angeles. Flat-rate pricing, eco-friendly products, and background-checked cleaners. Book your home cleaning in 60 seconds!",
  keywords: [
    "house cleaning Los Angeles",
    "maid service LA",
    "upholstery cleaning Los Angeles",
    "apartment cleaning LA",
    "deep cleaning services",
    "Angara Steamers",
    "Playa Cleaning",
  ],
  alternates: {
    canonical: "https://playacleaning.com/",
  },

  // Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Playa Cleaning | #1 Rated House Cleaning in Los Angeles",
    description:
      "Experience a spotless home with LA's most reliable cleaning team. Instant online booking and professional steam cleaning available.",
    url: "https://playacleaning.com",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image-main.jpg", // Create a 1200x630px image of a clean LA home
        width: 1200,
        height: 630,
        alt: "Playa Cleaning professional service in Los Angeles",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "House Cleaning & Steaming in Los Angeles | Playa Cleaning",
    description:
      "Get an instant flat-rate quote for your LA home. Professional cleaners, reliable service, 100% satisfaction guarantee.",
    images: ["/og-image-main.jpg"],
  },

  // Search Engine Directives
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

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="font-jakarta">
        <HeroSection city="Los Angeles" />
        <LogoTicker />
        <FeaturesSection />
        <Testimonials />
        <CallToAction />
        <CalculatorCTA />
        <Footer />
      </div>
    </div>
  )
}
