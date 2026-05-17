import React from "react"
import { Metadata } from "next"

// 1. UI & Common
import { AvatarGroup } from "@/components/ui/avatar"
import { LogoTicker } from "@/components/cleaning/LogoTicker"

// 2. Hero Variants
import { HeroImage } from "@/components/cleaning/HeroImage"
import { HeroImageGemini } from "@/components/cleaning/HeroImageGemini"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { HeroVideo } from "@/components/cleaning/HeroVideo"

// 3. Functional / Calculators
import { BookingCalculator } from "@/components/newCleaning/BookingCalculator"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculatorOffer"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

// 4. Content Sections
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { CleaningPricing } from "@/components/newCleaning/CleaningPricing"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { GeoSection } from "@/components/newCleaning/GeoSection"
import { ServiceAreasSection } from "@/components/newCleaning/ServiceAreasSection"
import { ServiceComparison } from "@/components/cleaning/ServiceComparison"
import { ServiceExclusions } from "@/components/newCleaning/ServiceExclusion"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import { ServiceList } from "@/components/newCleaning/ServicesList" // Fixed: Named Import

// 5. Social & Trust
import { CallToAction } from "@/components/cleaning/CallToAction"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { WhyMeVideo } from "@/components/cleaning/WhyMeVideo"

// MASK FROM SEARCH ENGINES
export const metadata: Metadata = {
  title: "Style Guide | Internal UI Kit",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

const SectionWrapper = ({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) => (
  <section id={id} className="scroll-mt-24 space-y-4 py-12">
    <div className="flex items-center gap-4">
      <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
    <div className="overflow-hidden rounded-3xl border border-dashed border-border bg-slate-50/30 p-4">
      {children}
    </div>
  </section>
)

const StyleGuidePage = () => {
  const components = [
    { name: "Avatar Group", id: "avatar", component: <AvatarGroup /> },
    {
      name: "Benefits Section",
      id: "benefits",
      component: <BenefitsSection />,
    },
    {
      name: "Booking Calculator",
      id: "booking-calc",
      component: <BookingCalculator />,
    },
    { name: "Calculator CTA", id: "calc-cta", component: <CalculatorCTA /> },
    { name: "Call To Action", id: "cta", component: <CallToAction /> },
    {
      name: "Cleaning Calculator",
      id: "cleaning-calc",
      component: <CleaningCalculator />,
    },
    { name: "Cleaning Pricing", id: "pricing", component: <CleaningPricing /> },
    { name: "FAQ Section", id: "faq", component: <FAQSection /> },
    {
      name: "Features Section",
      id: "features",
      component: <FeaturesSection />,
    },
    { name: "Geo Section", id: "geo", component: <GeoSection /> },
    { name: "Hero Image", id: "hero-img", component: <HeroImage /> },
    {
      name: "Hero Image Gemini",
      id: "hero-gemini",
      component: <HeroImageGemini />,
    },
    {
      name: "Hero Section New",
      id: "hero-new",
      component: <HeroSection city="Playa Vista" />,
    },
    {
      name: "Hero Video",
      id: "hero-video",
      component: <HeroVideo title="Title" subtitle="subtitle" />,
    },
    { name: "Logo Ticker", id: "ticker", component: <LogoTicker /> },
    {
      name: "Service Area Section",
      id: "service-area",
      component: <ServiceAreasSection />,
    },
    {
      name: "Service Comparison",
      id: "comparison",
      component: <ServiceComparison />,
    },
    {
      name: "Service Exclusion",
      id: "exclusion",
      component: <ServiceExclusions />,
    },
    {
      name: "Service List",
      id: "service-list",
      component: <ServiceList services={[]} />,
    },
    { name: "Service Scope", id: "scope", component: <ServiceScope /> },
    { name: "Team Bento Grid", id: "team", component: <TeamBentoGrid /> },
    { name: "Testimonials", id: "testimonials", component: <Testimonials /> },
    { name: "Why Me", id: "why-me", component: <WhyMe /> },
    { name: "Why Me Video", id: "why-me-video", component: <WhyMeVideo /> },
  ]

  return (
    <main className="min-h-screen bg-background font-jakarta text-foreground">
      <div className="container mx-auto px-6 py-20 md:px-20">
        <header className="mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary-blue/10 px-4 py-1 text-xs font-bold text-primary-blue">
            Development Mode
          </div>
          <h1 className="mb-2 text-5xl font-black tracking-tighter uppercase">
            Internal UI Kit
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A living documentation of components for Playa Cleaning and Angara
            Lab. Use this to verify responsiveness and visual consistency.
          </p>
        </header>

        {/* Quick Links Menu */}
        <nav className="mb-20 flex flex-wrap gap-2">
          {components.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium transition-all hover:border-primary-blue hover:text-primary-blue"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="space-y-8">
          {components.map((item) => (
            <SectionWrapper key={item.id} id={item.id} title={item.name}>
              {item.component}
            </SectionWrapper>
          ))}
        </div>
      </div>
    </main>
  )
}

export default StyleGuidePage
