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
