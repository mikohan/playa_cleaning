import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ChevronRight, Home, MapPin, Sparkles } from "lucide-react"

// Data Imports
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"
import { servicePages } from "@/app/data/seo-data"

// Component Imports
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { HeroSection } from "@/components/newCleaning/HeroSection"
import { ServiceScope } from "@/components/newCleaning/ServiceScope"
import { FeaturesSection } from "@/components/newCleaning/FeaturesSection"
import { Testimonials } from "@/components/cleaning/Testimonials"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { CarpetCallToAction } from "@/components/cleaning/CarpetCallToAction"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

interface Props {
  params: Promise<{ slug: string; location: string }>
}

/**
 * 1. DYNAMIC METADATA
 * Uses the canonical URL to prevent "Duplicate Content" penalties.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, location } = await params
  const service = servicePages.find((s) => s.slug === slug)
  const area = LOS_ANGELES_AREAS.find((a) => a.slug === location)

  if (!service || !area) return { title: "Service Not Found" }

  const title = `${service.page} in ${area.name}, CA | Playa Cleaning`
  const description = `Looking for ${service.page.toLowerCase()} in ${area.name}? Playa Cleaning offers professional, flat-rate cleaning services with a 100% satisfaction guarantee. Book your ${area.name} cleaner today!`

  return {
    title,
    description,
    alternates: {
      canonical: `https://playacleaning.com/services/${slug}/${location}`,
    },
    openGraph: {
      title,
      description,
      url: `https://playacleaning.com/services/${slug}/${location}`,
      siteName: "Playa Cleaning",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
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

/**
 * 2. STATIC PARAM GENERATION
 * Pre-builds all 400+ combinations at build time for instant loading.
 */
export async function generateStaticParams() {
  const paths = []
  for (const service of servicePages) {
    for (const area of LOS_ANGELES_AREAS) {
      paths.push({ slug: service.slug, location: area.slug })
    }
  }
  return paths
}

export default async function CityServicePage({ params }: Props) {
  const { slug, location } = await params
  const service = servicePages.find((s) => s.slug === slug)
  const area = LOS_ANGELES_AREAS.find((a) => a.slug === location)

  if (!service || !area) notFound()

  // --- SEO NEIGHBORHOOD LOGIC ---

  // 1. Get neighbors from data, or fallback to cities in the same region
  const neighboringCities = LOS_ANGELES_AREAS.filter((a) =>
    area.neighborSlugs?.includes(a.slug)
  ).slice(0, 6)

  // 2. Regional fallback if neighborSlugs are not yet defined for this entry
  if (neighboringCities.length === 0) {
    neighboringCities.push(
      ...LOS_ANGELES_AREAS.filter(
        (a) => a.region === area.region && a.slug !== location
      ).slice(0, 6)
    )
  }

  // 3. Filter other services for cross-linking (Tier 2 of the Silo)
  const otherServices = servicePages.filter((s) => s.slug !== slug).slice(0, 4)
  const carpet = slug.includes("upholstery") || slug.includes("carpet")

  return (
    <main className="min-h-screen bg-background font-jakarta text-foreground">
      <Navbar />

      {/* --- BREADCRUMBS --- */}
      <nav className="container mx-auto px-6 pt-18" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">
          <li className="flex items-center">
            <Link href="/" className="transition-colors hover:text-primary">
              <Home className="h-3 w-3" />
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <Link
              href="/services"
              className="transition-colors hover:text-primary"
            >
              Services
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <Link
              href={`/services/${slug}`}
              className="transition-colors hover:text-primary"
            >
              {service.page}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-primary">{area.name}</li>
        </ol>
      </nav>

      {/* --- CORE PAGE SECTIONS --- */}
      <HeroSection city={area.name} serviceName={service.page} slug={slug} />

      <FeaturesSection />

      <ServiceScope serviceSlug={slug} />

      <Testimonials />

      {/* --- GEOGRAPHIC SILO LINKING --- */}
      <section className="container mx-auto border-t border-border/40 px-6 py-16">
        <div className="flex flex-col gap-12">
          {/* Neighbors: Pill Tags */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground/80">
              <MapPin className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                Neighboring Service Areas
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {neighboringCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/${slug}/${city.slug}`}
                  className="rounded-full border border-border bg-muted/20 px-3.5 py-1.5 text-[11px] font-bold transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cross-Service: Minimalist Row */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground/80">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                Other Services in {area.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/${location}`}
                  className="flex items-center justify-between rounded-full border border-border bg-background/50 px-4 py-3 text-xs font-bold transition-all hover:border-primary/50 hover:text-primary hover:shadow-sm"
                >
                  {s.page + " in " + area.name}
                  <ChevronRight className="h-3 w-3 opacity-40" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          {carpet ? <CarpetCallToAction /> : <CallToAction />}
        </div>
      </section>
      <CalculatorCTA />
      <Footer />
    </main>
  )
}
