import { Navbar } from "@/components/common/Navbar"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { Footer } from "@/components/common/Footer"

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
