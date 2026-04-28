import { Navbar } from "@/components/common/Navbar"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { Footer } from "@/components/common/Footer"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { ServiceComparison } from "@/components/cleaning/ServiceComparison"
import CleaningPriceTable from "@/components/newCleaning/CleainingPricingTable"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Flat-Rate House Cleaning Pricing Los Angeles | Playa Cleaning",
  description:
    "View our transparent, flat-rate cleaning prices for Los Angeles homes. No hidden fees. See what's included in our Standard, Deep, and Move-Out cleaning packages.",
  keywords: [
    "house cleaning prices Los Angeles",
    "maid service cost LA",
    "flat rate cleaning Los Angeles",
    "deep cleaning price estimator",
    "move out cleaning cost",
    "Playa Cleaning rates",
    "affordable cleaning LA",
  ],
  alternates: {
    canonical: "https://playacleaning.com/pricing",
  },

  // Open Graph
  openGraph: {
    title: "Transparent Cleaning Pricing | Playa Cleaning",
    description:
      "Get an upfront price for your home cleaning. Choose from our Standard, Deep, or Move-Out packages with zero hidden fees.",
    url: "https://playacleaning.com/pricing",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg", // Image showing your clear pricing tiers
        width: 1200,
        height: 630,
        alt: "Playa Cleaning price list and service tiers",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "How Much Does Cleaning Cost in LA?",
    description:
      "View our flat-rate pricing tiers for standard and deep cleaning services.",
    images: ["/og-image.jpg"],
  },
}

export default function Page() {
  return (
    <div className="font-jakarta">
      <Navbar />
      <CleaningPriceTable />
      <LogoTicker />
      <ServiceScope />
      <BenefitsSection />
      <CallToAction />
      <WhyMe />
      <div className="hidden md:block">
        <ServiceComparison />
      </div>
      <Testimonials />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
