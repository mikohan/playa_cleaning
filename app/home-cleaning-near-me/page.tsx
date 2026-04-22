import { Navbar } from "@/components/common/Navbar"
import { HeroImage } from "@/components/cleaning/HeroImage"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <LogoTicker />
      <Testimonials />
    </div>
  )
}
