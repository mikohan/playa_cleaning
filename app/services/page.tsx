import Link from "next/link"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { Metadata } from "next"
import ServicesList from "@/components/newCleaning/ServicesList"
import Image from "next/image"
import AliciaImage from "@/public/images/cleaning/hero-4.png"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import { strapiRequest } from "@/lib/strapi"
import { StrapiResponse, ServiceData } from "@/app/types/serviceTypes"

// 1. FULL METADATA ENGINE
export const metadata: Metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "Explore our full range of professional cleaning services in LA. From deep home cleaning and move-out specials to specialized upholstery care.",
  alternates: { canonical: "https://playacleaning.com/services" },
}

export default async function ServicesListPage() {
  // Fetch data from Strapi with robust typing
  const response = await strapiRequest<StrapiResponse<ServiceData>>(
    "services",
    {
      populate: "*",
    }
  )

  // Flatten the response data to match the ServiceData interface
  const services: ServiceData[] = response.data.map((item) => ({
    ...item,
    ...(item.attributes ? item.attributes : {}),
  }))

  // 2. LD+JSON ITEMLIST SCHEMA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Playa Cleaning Services",
    description:
      "A comprehensive list of professional cleaning services offered in Los Angeles.",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        url: `https://playacleaning.com/services/${service.slug}`,
        description: service.meta_description,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background font-jakarta">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Ensure ServicesList component expects ServiceData[] */}
      <ServicesList services={services} />

      <div className="mx-auto max-w-7xl px-6 pt-20">
        <BreadCrumbs />

        <section className="relative overflow-hidden pt-24 pb-16">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="relative aspect-[4/5] w-full shrink-0 md:w-5/12">
                <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-primary-blue/5" />
                <Image
                  src={AliciaImage}
                  alt="Alicia - Lead Concierge"
                  fill
                  className="relative z-10 rounded-[2.5rem] object-cover shadow-2xl grayscale-[25%] transition-all duration-700 hover:grayscale-0"
                  priority
                />
                <div className="absolute -right-6 -bottom-6 z-20 max-w-[180px] rounded-3xl bg-footer p-6 text-white shadow-xl dark:border dark:border-border dark:bg-card">
                  <div className="mb-2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-accent-yellow stroke-0 text-accent-yellow"
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-tight font-bold italic">
                    {`"Every service is supervised for 5-star quality."`}
                  </p>
                  <p className="mt-2 text-[10px] font-black tracking-widest text-accent-yellow uppercase">
                    — Alicia C.
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:w-7/12">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary-blue uppercase">
                  <Sparkles size={14} className="fill-primary-blue stroke-0" />{" "}
                  Los Angeles Premier Care
                </div>
                <h1 className="text-5xl leading-tight font-bold md:text-7xl">
                  Professional <br />
                  <span className="text-primary-blue">Care</span> for every{" "}
                  <br />
                  environment.
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                  From luxury residences in Santa Monica to creative studios in
                  DTLA, our specialized teams provide the meticulous attention
                  your space deserves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
              <Sparkles size={18} />
              <span className="text-sm font-bold tracking-wider uppercase">
                Our Expertise
              </span>
            </div>
            <h2 className="mb-6 text-5xl font-black tracking-tight text-foreground md:text-7xl">
              Cleaning Services <br />
              <span className="text-primary-blue">
                Tailored for Los Angeles
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-[32px] border border-border bg-card p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-blue/5"
              >
                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-black tracking-tight transition-colors group-hover:text-primary-blue">
                    {service.name}
                  </h3>
                  <p className="mb-8 line-clamp-3 text-sm leading-relaxed font-medium text-muted-foreground">
                    {service.meta_description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black tracking-widest text-primary-blue uppercase">
                    View Details
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary-blue/5 transition-transform duration-500 group-hover:scale-150" />
              </Link>
            ))}
          </div>

          <div className="mt-24 rounded-[40px] bg-foreground p-12 text-center text-background shadow-2xl">
            <h2 className="mb-6 text-3xl font-black tracking-tight">
              Not sure which service you need?
            </h2>
            <Link
              href="/estimate"
              className="inline-block rounded-2xl bg-primary-blue px-10 py-5 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105 hover:bg-primary-blue/90 active:scale-95"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </div>
      <CalculatorCTA />
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
