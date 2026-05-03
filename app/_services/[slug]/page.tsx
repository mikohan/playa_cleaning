import { servicePages } from "@/app/data/seo-data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image" // Import Next.js Image component
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { MapPin, Star } from "lucide-react" // Using lucide-react for consistent styling
import OlesyaImage from "@/public/images/cleaning/ol-2.png"
import { CarpetCallToAction } from "@/components/cleaning/CarpetCallToAction"
import { CallToAction } from "@/components/cleaning/CallToAction"
import HeroMeColor from "@/public/images/cleaning/hero-me-color.png"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

interface Props {
  params: Promise<{ slug: string }>
}

// 1. FULL METADATA ENGINE (Unchanged for SEO stability)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicePages.find((p) => p.slug === slug)

  if (!service) return { title: "Service Not Found" }

  const url = `https://playacleaning.com/services/${slug}`
  const title = service.seo.title
  const description = service.seo.description

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: service.seo.og_data["og:title"] || title,
      description: service.seo.og_data["og:description"] || description,
      url,
      siteName: "Playa Cleaning",
      images: [
        {
          url: "https://playacleaning.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://playacleaning.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export async function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = servicePages.find((p) => p.slug === slug)

  if (!service) notFound()
  const carpet: boolean = slug.includes("carpet") || slug.includes("upholstery")
  const src = carpet ? HeroMeColor : OlesyaImage

  return (
    <main className="min-h-screen bg-background font-jakarta">
      {/* 2. FULL LD+JSON SCHEMA (Unchanged) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...service.ld_json,
            description: service.seo.description,
            url: `https://playacleaning.com/services/${slug}`,
            logo: "https://playacleaning.com/logo.png",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Los Angeles",
              addressRegion: "CA",
              addressCountry: "US",
            },
          }),
        }}
      />

      <Navbar />

      <div className="mx-auto max-w-7xl px-6">
        <div className="pt-8 pb-4">
          <BreadCrumbs serviceName={service.page} />
        </div>

        {/* 3. Main Hero & Content Section (Grid layout for Content vs Alicia) */}
        <section className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading and Professional Copy */}
          <div className="lg:col-span-8">
            <h1 className="mb-10 max-w-3xl text-5xl leading-tight font-black tracking-tight text-primary-blue md:text-6xl">
              {service.page}
            </h1>

            <div className="max-w-2xl space-y-6">
              <p className="text-xl leading-relaxed font-medium text-foreground/90 [word-spacing:0.05rem]">
                {service.bodyText}
              </p>
              <p className="leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
                {service.seo.description}
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Showcase of Alicia (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-24 lg:col-span-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-[32px] border border-border shadow-2xl shadow-primary-blue/5">
              <Image
                src={src} // *** REPLACE WITH YOUR ACTUAL IMAGE PATH ***
                alt="Alicia, Playa Cleaning Professional"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 400px"
              />
              {/* Trust Overlay */}
              <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-border/50 bg-background/80 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-widest text-primary-blue/70 uppercase">
                    Trusted Expert
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400" />
                    <span className="text-sm font-bold text-foreground">
                      5.0
                    </span>
                  </div>
                </div>
                <p className="text-base font-extrabold tracking-tight text-foreground">
                  {carpet ? "Vlad V." : "Alisia V."}{" "}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 opacity-60" />
                  <span className="text-xs font-semibold">Serving LA</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {carpet ? <CarpetCallToAction /> : <CallToAction />}

      {/* 4. Bottom Inline Keywords Section (Full width just above Footer) */}
      <section className="mt-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary-blue text-lg font-black text-white">
                P
              </div>
              <div>
                <h3 className="text-xs font-black tracking-[0.2em] text-primary-blue uppercase">
                  Expertise in {service.page}
                </h3>
                <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase [word-spacing:0.1rem]">
                  Professional, specialized cleaning solutions
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2 md:justify-end">
              {service.target_keywords.map((keyword, index) => (
                <li
                  key={index}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase transition-all hover:border-primary-blue/30 hover:text-primary-blue hover:shadow-sm"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CalculatorCTA />
      <Footer />
    </main>
  )
}
