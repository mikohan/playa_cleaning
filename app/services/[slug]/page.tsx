import { notFound } from "next/navigation"
import { Metadata } from "next"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
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

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.playacleaning.com"

const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"

// ─────────────────────────────────────────────────────────────
// Dynamic Metadata Infusion
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return { title: "Service Not Found" }

  const url = `https://www.playacleaning.com/services/${slug}`
  const title =
    service.meta_title || `${service.name} | Playa Cleaning Los Angeles`
  const description =
    service.meta_description ||
    `Professional ${service.name} in Los Angeles. 5-star rated, eco-friendly, and meticulous care for your space.`

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: `${service.name} los angeles, professional ${service.name}, specialized deep cleaning, best ${service.name} near me`,
    other: {
      "geo.region": "US-CA",
      "geo.placename": "Los Angeles",
      "geo.position": "34.0522;-118.2437",
      ICBM: "34.0522, -118.2437",
    },
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
          url: service.photo?.url
            ? `${STRAPI_URL}${service.photo.url}`
            : "https://www.playacleaning.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.name} Services in Los Angeles`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        service.photo?.url
          ? `${STRAPI_URL}${service.photo.url}`
          : "https://www.playacleaning.com/og-image.jpg",
      ],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─────────────────────────────────────────────────────────────
// Page Component Execution
// ─────────────────────────────────────────────────────────────
export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  const services = await getAllServices()

  if (!service) notFound()

  const isCarpetService = slug.includes("carpet") || slug.includes("upholstery")

  let heroImage = isCarpetService ? HeroMeColor.src : OlesyaImage.src
  if (service.photo?.url) {
    heroImage = `${STRAPI_URL}${service.photo.url}`
  }

  const professionalName = isCarpetService ? "Vlad V." : "Alisia V."

  // ─────────────────────────────────────────────────────────────
  // Error-Free Nested Google-Validated Local Schema
  // ─────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.playacleaning.com/#organization",
        name: "Playa Cleaning",
        url: "https://www.playacleaning.com",
        telephone: companyPhone,
        priceRange: "$$",
        image: "https://www.playacleaning.com/logo.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          "@id": `https://www.playacleaning.com/services/${slug}/#catalog`,
          name: service.name,
          description:
            service.meta_description ||
            `Premium professional ${service.name} configuration in Los Angeles.`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.meta_description,
                url: `https://www.playacleaning.com/services/${slug}`,
                areaServed: {
                  "@type": "City",
                  name: "Los Angeles",
                },
                provider: {
                  "@id": "https://www.playacleaning.com/#organization",
                },
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.playacleaning.com/services/${slug}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.playacleaning.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.playacleaning.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `https://www.playacleaning.com/services/${slug}`,
          },
        ],
      },
    ],
  }

  let showIncludes = false
  if (slug === "deep-cleaning" || slug === "maid-service") {
    showIncludes = true
  }

  const video_url = service.video?.url
    ? `${STRAPI_URL}${service.video.url}`
    : null
  const buttonText = service.button_text || "Get Instant Quote"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="container mx-auto px-8 md:px-0">
          <BreadCrumbs serviceName={service.name} />
          <div className="container mx-auto">
            <HeroServiceImage
              heroImage={heroImage}
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

        {video_url && (
          <section>
            <WhyMeVideo video={video_url} />
          </section>
        )}

        <Testimonials />
        {isCarpetService ? <CarpetCallToAction /> : <CallToAction />}

        {/* --- Rich Text Section (SEO Context Injection) --- */}
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

        {service.faq_service && service.faq_service.length > 0 && (
          <LocationFAQ serviceName={service.name} items={service.faq_service} />
        )}

        <CalculatorCTA />
      </main>
    </>
  )
}
