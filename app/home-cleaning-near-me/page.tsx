import { Navbar } from "@/components/common/Navbar"
import { HeroImage } from "@/components/cleaning/HeroImage"
import { HeroImageGemini } from "@/components/cleaning/HeroImageGemini"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { Footer } from "@/components/common/Footer"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { CleaningCalculator } from "@/components/cleaning/CleaningCalculator"
import { CleaningCalculatorAdons } from "@/components/cleaning/CleaningCalculatorAdons"
import { ServiceComparison } from "@/components/cleaning/ServiceComparison"

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroImageGemini />
      <LogoTicker />
      <WhyMe />
      <CleaningCalculatorAdons />
      <ServiceComparison />
      <Testimonials />
      <BenefitsSection />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
