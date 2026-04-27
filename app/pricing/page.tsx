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
