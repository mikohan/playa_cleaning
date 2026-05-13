import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { Star, CheckCircle2 } from "lucide-react"
import OlesyaImage from "@/public/images/cleaning/ol-2.png"
import { CarpetCallToAction } from "@/components/cleaning/CarpetCallToAction"
import { CallToAction } from "@/components/cleaning/CallToAction"
import HeroMeColor from "@/public/images/cleaning/hero-me-color.png"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import {
  getServiceBySlug,
  getAllServiceSlugs,
  getAllServices,
} from "@/lib/strapi"
import { RichTextRenderer } from "@/components/common/RichTextRenderer"
import { ServiceTicker } from "@/components/common/ServiceTicker"
import { HeroServiceImage } from "@/components/cleaning/HeroServiceImage"
import { WaveDivider } from "@/components/common/WaveDivider"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import LocationFAQ from "@/components/cleaning/LocationFAQ"
import { LocationTicker } from "@/components/cleaning/LocationTicker"
import { WhyMeVideo } from "@/components/cleaning/WhyMeVideo"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return { title: "Service Not Found" }

  const url = `https://playacleaning.com/services/${slug}`
  const title =
    service.meta_title || `${service.name} | Playa Cleaning Los Angeles`
  const description =
    service.meta_description ||
    `Professional ${service.name} in Los Angeles. 5-star rated, eco-friendly, and meticulous care for your space.`

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Playa Cleaning",
      images: [
        {
          url: service.photo.url || "https://playacleaning.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.name} Services in Los Angeles`,
        },
      ],
      locale: "en_US",
      type: "article", // Use article for service detail pages
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.photo.url || "https://playacleaning.com/og-image.jpg"],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  const services = await getAllServices()

  if (!service) notFound()

  const isCarpetService = slug.includes("carpet") || slug.includes("upholstery")
  let heroImage = isCarpetService ? HeroMeColor.src : OlesyaImage.src
  if (service.photo.url) {
    heroImage = process.env.STRAPI_URL + service.photo.url
  } else {
    heroImage = isCarpetService ? HeroMeColor.src : OlesyaImage.src
  }
  const professionalName = isCarpetService ? "Vlad V." : "Alisia V."

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.meta_description,
        provider: {
          "@type": "LocalBusiness",
          name: "Playa Cleaning",
          image: "https://playacleaning.com/logo.png",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Los Angeles",
            addressRegion: "CA",
            addressCountry: "US",
          },
          priceRange: "$$",
          telephone: "+1-YOUR-PHONE-NUMBER",
        },
        areaServed: {
          "@type": "City",
          name: "Los Angeles",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name,
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://playacleaning.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://playacleaning.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `https://playacleaning.com/services/${slug}`,
          },
        ],
      },
    ],
  }
  let showIncludes = false
  if (slug === "deep-cleaning" || slug == "maid-service") {
    showIncludes = true
  }
  const video_url = process.env.STRAPI_URL + service.video.url
  const buttonText = service.button_text
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="conatainer mx-auto px-8 md:px-0">
          <BreadCrumbs serviceName={service.name} />
          <div className="container mx-auto">
            <HeroServiceImage
              heroImage={heroImage} // Missing property 1
              professionalName={professionalName}
              service={service}
              buttonText={buttonText}
            />
          </div>
        </section>
        <section className="flex h-24 items-center md:h-48">
          <ServiceTicker services={services} />
        </section>
        {showIncludes && <ServiceScope serviceSlug={slug} />}
        <section>
          <WhyMeVideo video={video_url} />
        </section>

        <Testimonials />
        {isCarpetService ? <CarpetCallToAction /> : <CallToAction />}

        {/* --- Rich Text Section (Reusable Component Target) --- */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
          <WaveDivider position="top" fill="var(--color-background)" />
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl px-8 md:px-0">
              <h2 className="mb-10 text-3xl font-black">Detailed Overview</h2>

              <RichTextRenderer content={service.seo_text_rich} />
            </div>
          </div>
        </section>
        <LocationTicker />
        <LocationFAQ serviceName={service.name} items={service.faq_service} />

        <CalculatorCTA />
      </main>
    </>
  )
}
