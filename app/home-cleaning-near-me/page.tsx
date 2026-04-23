import { Navbar } from "@/components/common/Navbar"
import { HeroImage } from "@/components/cleaning/HeroImage"
import { HeroImageGemini } from "@/components/cleaning/HeroImageGemini"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { Footer } from "@/components/common/Footer"
import { FAQSection } from "@/components/cleaning/FAQSection"
import { BenefitsSection } from "@/components/cleaning/BenefitsSection"

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroImageGemini />
      <LogoTicker />
      <WhyMe />
      <Testimonials />
      <BenefitsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
