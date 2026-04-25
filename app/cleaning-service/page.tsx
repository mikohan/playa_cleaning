import { Navbar } from "@/components/common/Navbar"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { Footer } from "@/components/common/Footer"
import { CallToAction } from "@/components/cleaning/CallToAction"

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
        <Footer />
      </div>
    </div>
  )
}
