import { Navbar } from "@/components/common/Navbar"
import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroVideo />
      <LogoTicker />
      <Testimonials />
    </div>
  )
}
