import React from "react"
import { Metadata } from "next"

// 1. Sort Imports Alphabetically
import { AvatarGroup } from "@/components/ui/avatar"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { BookingCalculator } from "@/components/newCleaning/BookingCalculator"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculatorOffer"
import { CleaningPricing } from "@/components/newCleaning/CleaningPricing"
import { GeoSection } from "@/components/newCleaning/GeoSection"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { Footer } from "@/components/common/Footer"
import { HeroImageGemini } from "@/components/cleaning/HeroImageGemini"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { HeroImage } from "@/components/cleaning/HeroImage"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Navbar } from "@/components/common/Navbar"
import { ServiceComparison } from "@/components/cleaning/ServiceComparison"
import { ServiceAreasSection } from "@/components/newCleaning/ServiceAreasSection"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { ServiceExclusions } from "@/components/newCleaning/ServiceExclusion"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import ServicesList from "@/components/newCleaning/ServicesList"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"

// MASK FROM SEARCH ENGINES
export const metadata: Metadata = {
  title: "Style Guide | Internal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

// Reusable wrapper to handle the sorting labels and separators
const SectionWrapper = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="space-y-4 py-12">
    <div className="flex items-center gap-4">
      <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
        {title}
      </span>
      {/* <div className="h-px flex-1 bg-pink-300" /> */}
    </div>
    <div className="overflow-hidden rounded-xl border border-dashed border-border p-4">
      {children}
    </div>
  </section>
)

const StyleGuidePage = () => {
  // 2. Component Manifest for easy management
  const components = [
    { name: "Avatar Group", component: <AvatarGroup /> },
    { name: "Benefits Section", component: <BenefitsSection /> },
    { name: "Booking Calculator", component: <BookingCalculator /> },
    { name: "Calculator CTA", component: <CalculatorCTA /> },
    { name: "Call To Action", component: <CallToAction /> },
    { name: "Cleaning Calculator", component: <CleaningCalculator /> },
    { name: "Cleaning Pricing", component: <CleaningPricing /> },
    { name: "Geo Section", component: <GeoSection /> },
    { name: "FAQ Section", component: <FAQSection /> },
    { name: "Features Section", component: <FeaturesSection /> },
    { name: "Hero Image Gemini", component: <HeroImageGemini /> },
    { name: "Hero Image", component: <HeroImage /> },
    { name: "Hero Section New", component: <HeroSection city="Playa vista" /> },
    { name: "Hero Video", component: <HeroVideo /> },
    { name: "Logo Ticker", component: <LogoTicker /> },
    { name: "Service Comparison", component: <ServiceComparison /> },
    { name: "Service Area Section", component: <ServiceAreasSection /> },
    { name: "Service Exclusion", component: <ServiceExclusions /> },
    { name: "Service Scope", component: <ServiceScope /> },
    { name: "Service List", component: <ServicesList /> },
    { name: "Testimonials", component: <Testimonials /> },
    { name: "Team Bento Grid", component: <TeamBentoGrid /> },
    { name: "Why Me", component: <WhyMe /> },
  ]

  return (
    <main className="min-h-screen bg-background p-8 font-jakarta text-foreground md:p-20">
      <Navbar />

      <header className="mt-12 mb-16">
        <h1 className="mb-2 text-4xl font-black tracking-tight">
          Internal UI Kit
        </h1>
        <p className="text-lg text-muted-foreground">
          Alphabetical visual review for Playa Cleaning & Angara Lab components.
        </p>
      </header>

      {/* Render sorted components */}
      {components.map((item) => (
        <SectionWrapper key={item.name} title={item.name}>
          {item.component}
        </SectionWrapper>
      ))}

      <Footer />
    </main>
  )
}

export default StyleGuidePage
