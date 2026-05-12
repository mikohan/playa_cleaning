import { HeroVideo } from "@/components/cleaning/HeroVideo"
import { LogoTicker } from "@/components/cleaning/LogoTicker"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"

export default function Page() {
  return (
    <div>
      <BreadCrumbsUniversal />
      <HeroVideo
        title="Residential Cleaning With Real Attention to Details"
        subtitle="I’m Alicia. I love cleaning, I love people, and I clean your home with the same care and precision I use in my own."
        highlightIndex={1}
        showNotation
      />
      <LogoTicker />
      <Testimonials />
      <CallToAction />
    </div>
  )
}
