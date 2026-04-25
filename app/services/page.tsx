import Link from "next/link"
import { servicePages } from "@/app/data/seo-data"
import { ArrowRight, Sparkles } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { BreadCrumbs } from "@/components/common/BreadCrumbs"
import { Metadata } from "next"

// 1. FULL METADATA ENGINE
export const metadata: Metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "Explore our full range of professional cleaning services in LA. From deep home cleaning and move-out specials to specialized upholstery care with Angara Streamers.",
  alternates: { canonical: "https://playacleaning.com/services" },
  openGraph: {
    title: "Premium Cleaning Services for Los Angeles Homes & Offices",
    description:
      "Expert cleaning solutions tailored for LA. Deep cleaning, maid services, and specialty upholstery care.",
    url: "https://playacleaning.com/services",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://playacleaning.com/og-services.jpg", // Replace with actual asset
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Service Menu",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Cleaning Services in Los Angeles",
    description:
      "From Venice to Pasadena, explore our full range of cleaning expertise.",
    images: ["https://playacleaning.com/og-services.jpg"],
  },
}

export default function ServicesListPage() {
  // 2. LD+JSON ITEMLIST SCHEMA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Playa Cleaning Services",
    description:
      "A comprehensive list of professional cleaning services offered in Los Angeles.",
    itemListElement: servicePages.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.page,
        url: `https://playacleaning.com/services/${service.slug}`,
        description: service.seo.description,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background font-jakarta">
      {/* Injecting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-20">
        <BreadCrumbs />

        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
              <Sparkles size={18} />
              <span className="text-sm font-bold tracking-wider uppercase">
                Our Expertise
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-black tracking-tight text-foreground md:text-7xl">
              Cleaning Services <br />
              <span className="text-primary-blue">
                Tailored for Los Angeles
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed font-medium text-muted-foreground [word-spacing:0.02rem]">
              Professional, reliable, and thorough cleaning solutions for your
              home, office, and furniture.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-[32px] border border-border bg-card p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-blue/5"
              >
                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-black tracking-tight transition-colors group-hover:text-primary-blue">
                    {service.page}
                  </h3>
                  <p className="mb-8 line-clamp-3 text-sm leading-relaxed font-medium text-muted-foreground">
                    {service.seo.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-black tracking-widest text-primary-blue uppercase">
                    View Details
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </div>
                </div>

                {/* Subtle Decorative Background Element */}
                <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary-blue/5 transition-transform duration-500 group-hover:scale-150" />
              </Link>
            ))}
          </div>

          {/* Trust Bar / CTA */}
          <div className="shadow-3xl mt-24 rounded-[40px] bg-foreground p-12 text-center text-background">
            <h2 className="mb-4 text-3xl font-black tracking-tight">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg font-medium opacity-70">
              Our team is ready to help you choose the right cleaning package
              for your specific lifestyle and home.
            </p>
            <button className="rounded-2xl bg-primary-blue px-10 py-5 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105 hover:bg-primary-blue/90 active:scale-95">
              Get a Free Estimate
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
