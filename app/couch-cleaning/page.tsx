import { Navbar } from "@/components/common/Navbar"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { Footer } from "@/components/common/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Upholstery & Steam Cleaning LA | Playa Cleaning",
  description:
    "Advanced high-heat steam cleaning for sofas, mattresses, and carpets in Los Angeles. Eco-friendly, deep-extraction technology for a healthier home. Book your professional steam clean today!",
  keywords: [
    "upholstery cleaning Los Angeles",
    "steam cleaning services LA",
    "sofa cleaning Los Angeles",
    "mattress sanitization LA",
    "Angara Steamers",
    "deep carpet extraction",
    "eco-friendly steam cleaning",
  ],
  alternates: {
    canonical: "https://playacleaning.com/couch-cleaning", // Update to your actual slug
  },

  // Open Graph (Social Media)
  openGraph: {
    title: "Expert Upholstery Steaming & Deep Cleaning | Los Angeles",
    description:
      "Watch our high-pressure steam extraction in action. We remove deep-seated allergens and stains from your furniture and carpets.",
    url: "https://playacleaning.com/couch-cleaning",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg", // A high-action shot of steam cleaning
        width: 1200,
        height: 630,
        alt: "Professional steam cleaning in progress",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Deep Steam Cleaning Services in LA",
    description:
      "Professional upholstery and carpet restoration using industrial-grade steam technology.",
    images: ["/og-image.jpg"],
  },
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroVideo />
      <LogoTicker />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}
