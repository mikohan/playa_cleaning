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

export default async function Page() {
  const services = await getAllServices()
  return (
    <div>
      <BreadCrumbsUniversal />
      <HeroVideo
        title="Residential Cleaning With Real Attention to Details"
        subtitle="I’m Alicia. I love cleaning, I love people, and I clean your home with the same care and precision I use in my own."
        highlightIndex={1}
        showNotation
      />
      <LogoTicker className="h-48" />
      <BenefitsSection />
      <section className="bg-top-blur/20">
        <ServiceTicker services={services} className="flex h-44 items-center" />
      </section>
      <CleaningPricing />
      <WhyMe />
      <Testimonials />
      <CallToAction />
      <FAQSection />
      <WhyMeVideo />
      <ServiceAreasSection />
    </div>
  )
}
