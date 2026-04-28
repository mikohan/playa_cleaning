import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"
import { MapPin, Star, ShieldCheck, Clock } from "lucide-react"
import OlesyaImage from "@/public/images/cleaning/ol-6.png"
import { ServiceAreasSection } from "@/components/newCleaning/ServiceAreasSection"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

export const metadata: Metadata = {
  title:
    "Service Areas | Professional Cleaning Across Los Angeles | Playa Cleaning",
  description:
    "Playa Cleaning provides premium house, deep, and move-out cleaning services throughout Los Angeles. From Santa Monica and Venice to Pasadena and Silver Lake, find a professional cleaner in your neighborhood.",
  keywords: [
    "cleaning services Los Angeles",
    "maid service Santa Monica",
    "house cleaning Pasadena",
    "West Hollywood cleaning company",
    "Culver City maid service",
    "Beverly Hills house cleaners",
    "Playa Vista cleaning services",
    "South Bay cleaning",
  ],
  alternates: {
    canonical: "https://playacleaning.com/locations",
  },

  // Open Graph
  openGraph: {
    title: "Playa Cleaning Service Areas | Local LA House Cleaners",
    description:
      "Reliable, professional home cleaning available across all major Los Angeles neighborhoods. Check if we serve your zip code today!",
    url: "https://playacleaning.com/locations",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg", // A map-style graphic or a clean home shot
        width: 1200,
        height: 630,
        alt: "Map of Playa Cleaning service areas in Los Angeles",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Where We Clean: Playa Cleaning Service Locations",
    description:
      "Serving Santa Monica, Culver City, West LA, and beyond. Professional cleaning you can trust, right in your neighborhood.",
    images: ["/og-image.jpg"],
  },
}

export default function LocationsPage() {
  // Grouping areas by region for a clean Silo structure
  const regions = Array.from(
    new Set(LOS_ANGELES_AREAS.map((area) => area.region))
  )

  return (
    <main className="min-h-screen bg-background font-jakarta text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6">
        <div className="pt-8">
          <BreadCrumbs serviceName="Service Areas" />
        </div>

        {/* --- HERO SECTION --- */}
        <section className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="mb-8 text-5xl leading-[1.1] font-black tracking-tight text-primary-blue md:text-7xl">
              Clean Homes, <br />
              <span className="text-foreground/20">All Over LA.</span>
            </h1>
            <div className="max-w-xl space-y-6">
              <p className="text-xl leading-relaxed font-medium text-foreground/80 [word-spacing:0.05rem]">
                From the beach cities of the Westside to the historic
                neighborhoods of the San Gabriel Valley, Playa Cleaning brings a
                premium, high-standard clean to every corner of Los Angeles
                County.
              </p>
              <p className="leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
                We’ve optimized our routes to ensure that whether you are in a
                Santa Monica condo or a Pasadena estate, you receive the same
                punctual, 5-star service Alicia and her team are known for.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary-blue" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Licensed & Bonded
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-blue" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    7 Days a Week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alicia Showcase */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden rounded-[40px] border border-border shadow-2xl">
              <Image
                src={OlesyaImage}
                alt="Alicia, our Lead Service Coordinator"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 500px"
              />
              <div className="absolute right-8 bottom-8 left-8 rounded-3xl border border-white/20 bg-background/90 p-6 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-snug font-bold">
                  &quot;We serve a 50-mile radius around LA to ensure every
                  neighborhood has access to a truly deep clean.&quot;
                </p>
                <p className="mt-2 text-[10px] font-black tracking-widest text-primary-blue uppercase">
                  — Alicia M.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- LOCATION DIRECTORY --- */}
        <section className="border-t border-border/50 py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-[10px] font-black tracking-[0.3em] text-primary-blue uppercase">
              Directory
            </h2>
            <p className="text-3xl font-black tracking-tight">
              Find Your Neighborhood
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
            {regions.sort().map((region) => (
              <div key={region} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <MapPin className="h-4 w-4 text-primary-blue" />
                  <h3 className="text-sm font-black tracking-widest uppercase">
                    {region}
                  </h3>
                </div>
                <ul className="grid grid-cols-1 gap-y-3">
                  {LOS_ANGELES_AREAS.filter((area) => area.region === region)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={`/services/house-cleaning/${area.slug}`}
                          className="group flex justify-between text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary-blue"
                        >
                          <span>{area.name}</span>
                          <span className="text-[10px] font-black tracking-tighter uppercase opacity-0 transition-opacity group-hover:opacity-100">
                            View Rates
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- SEO FOOTER TEXT --- */}
        <section className="pt-12 pb-24">
          <div className="mx-auto max-w-4xl rounded-[32px] bg-muted/30 p-12 text-center">
            <h2 className="mb-6 text-2xl font-black tracking-tight">
              The Trusted Choice for Los Angeles Residents
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground [word-spacing:0.02rem]">
              Playa Cleaning is more than just a maid service; we are a local
              Los Angeles institution dedicated to improving the quality of life
              for our clients. By providing comprehensive coverage across the
              Greater Los Angeles area, we ensure that whether you need a
              <strong> Move Out Cleaning in Santa Monica</strong>, a{" "}
              <strong>Deep Clean in Pasadena</strong>, or{" "}
              <strong>Recurring Maid Services in Silver Lake</strong>,
              professional help is only a click away. Our teams are fully
              equipped, mobile, and ready to transform your living space today.
            </p>
          </div>
        </section>
      </div>
      <CalculatorCTA />
      <Footer />
    </main>
  )
}
