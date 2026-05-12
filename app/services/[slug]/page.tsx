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
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/strapi"

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

  if (!service) notFound()

  const isCarpetService = slug.includes("carpet") || slug.includes("upholstery")
  const heroImage = isCarpetService ? HeroMeColor : OlesyaImage
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background font-jakarta">
        <div className="mx-auto max-w-7xl px-6">
          <div className="pt-8 pb-4">
            <BreadCrumbs serviceName={service.name} />
          </div>

          {/* --- Hero Section --- */}
          <section className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
                <span className="text-xs font-black tracking-widest uppercase">
                  Premium Service
                </span>
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-black tracking-tight text-foreground md:text-7xl">
                {service.header || service.name}
              </h1>

              <p className="mb-8 text-xl font-bold text-primary-blue">
                {service.subheader}
              </p>

              <div className="max-w-2xl">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {service.meta_description}
                </p>
              </div>

              {/* Placeholder for Service Highlights / Features */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  "Eco-friendly Products",
                  "Verified Professionals",
                  "Satisfaction Guaranteed",
                  "Flexible Scheduling",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm font-bold text-foreground/80"
                  >
                    <CheckCircle2 size={18} className="text-primary-blue" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Sticky Sidebar Card --- */}
            <div className="lg:sticky lg:top-24 lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden rounded-[40px] border border-border shadow-2xl shadow-primary-blue/5">
                <Image
                  src={heroImage}
                  alt={professionalName}
                  fill
                  className="object-cover"
                  sizes="(max-w-1024px) 100vw, 500px"
                />

                <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
                        Expert Lead
                      </p>
                      <p className="text-xl font-black">{professionalName}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex gap-0.5 text-accent-yellow">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current" />
                        ))}
                      </div>
                      <p className="mt-1 text-[10px] font-bold uppercase">
                        Top Rated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Rich Text Section (Reusable Component Target) --- */}
          <section className="border-t border-border py-20">
            <div className="max-w-4xl">
              <h2 className="mb-10 text-3xl font-black">Detailed Overview</h2>

              {/* Placeholder for your future <RichTextRenderer content={service.seo_text_rich} /> */}
              <div
                className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
                dangerouslySetInnerHTML={{ __html: service.seo_text_rich }}
              />
            </div>
          </section>
        </div>

        {isCarpetService ? <CarpetCallToAction /> : <CallToAction />}

        <CalculatorCTA />
      </main>
    </>
  )
}
