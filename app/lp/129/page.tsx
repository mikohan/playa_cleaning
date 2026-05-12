import { Metadata } from "next"
import { HeroImage } from "@/components/offers/HeroImage"
import { PREMIUM_OFFER_CONTENT } from "@/app/data/offers/one-twenty-nine"
import { WhyMe } from "@/components/cleaning/WhyMe"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { TeamBentoGrid } from "@/components/newCleaning/TeamBentoGrid"
import { CallToAction } from "@/components/cleaning/CallToAction"

// 2. SEO Metadata using the data object
export const metadata: Metadata = {
  title: PREMIUM_OFFER_CONTENT.metadata.title,
  description: PREMIUM_OFFER_CONTENT.metadata.description,
  keywords: PREMIUM_OFFER_CONTENT.metadata.keywords,
  openGraph: {
    title: PREMIUM_OFFER_CONTENT.metadata.title,
    description: PREMIUM_OFFER_CONTENT.metadata.description,
    type: "website",
    locale: "en_US",
    url: `https://playacleaning.com/lp/${PREMIUM_OFFER_CONTENT.slug}`,
  },
}

export default function PremiumOfferPage() {
  return (
    <div className="font-jakarta">
      <main>
        {/* Passing the content object to your existing HeroImage component */}
        <HeroImage data={PREMIUM_OFFER_CONTENT} />
        <WhyMe />
        <Testimonials />
        <TeamBentoGrid />
        <CallToAction />
      </main>
    </div>
  )
}
