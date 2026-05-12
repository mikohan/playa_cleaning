"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles, ChevronRight } from "lucide-react"
import { ServiceData } from "@/app/types/serviceTypes"

interface ServiceGridProps {
  cityName: string
  services: ServiceData[] // Updated to accept live data
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"

export default function ServiceGrid({ cityName, services }: ServiceGridProps) {
  // Take only the first 8 items for the grid
  const displayedServices = services.slice(0, 8)

  // Helper to assign visual style based on service intent/category
  const getServiceStyles = (slug: string) => {
    const styles: Record<string, { gradient: string; category: string }> = {
      "home-cleaning": {
        gradient: "from-blue-500/20 to-cyan-500/20",
        category: "Residential",
      },
      "deep-cleaning": {
        gradient: "from-indigo-500/20 to-purple-500/20",
        category: "Detail",
      },
      "maid-service": {
        gradient: "from-rose-500/20 to-pink-500/20",
        category: "Elite",
      },
      "office-cleaning": {
        gradient: "from-slate-600/20 to-slate-900/20",
        category: "Commercial",
      },
      "upholstery-cleaning": {
        gradient: "from-sky-400/20 to-blue-600/20",
        category: "Specialized",
      },
      "carpet-cleaning": {
        gradient: "from-emerald-400/20 to-teal-600/20",
        category: "Steam Care",
      },
    }
    return (
      styles[slug] || {
        gradient: "from-primary-blue/10 to-primary-blue/30",
        category: "Service",
      }
    )
  }

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-bold tracking-widest text-primary-blue uppercase">
              <Sparkles className="h-3 w-3" />
              Our Expertise
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Professional Services in{" "}
              <span className="text-primary-blue">{cityName}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              From hospitality-grade residential care to compliance-driven
              commercial sanitization.
            </p>
          </motion.div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedServices.map((service, index) => {
            const { gradient, category } = getServiceStyles(service.slug)

            // Resolve Strapi Image URL
            const imageUrl = service.photo?.url
              ? `${STRAPI_URL}${service.photo.url}`
              : `https://picsum.photos/id/${index + 20}/600/400`

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary-blue/40 hover:shadow-2xl hover:shadow-primary-blue/10"
                >
                  {/* Visual Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <div
                      className={`absolute inset-0 z-10 bg-gradient-to-br ${gradient} opacity-60 transition-opacity group-hover:opacity-40`}
                    />
                    <Image
                      src={imageUrl}
                      alt={`${service.name} in ${cityName}`}
                      fill
                      className="object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[10px] font-black tracking-tighter text-foreground uppercase backdrop-blur-md">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-grow flex-col p-8">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl leading-tight font-bold text-foreground transition-colors group-hover:text-primary-blue">
                        {service.name}
                      </h3>
                      <div className="rounded-full border border-border p-2 transition-colors group-hover:bg-primary-blue group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {service.meta_description}
                    </p>

                    <div className="mt-auto pt-8">
                      <span className="text-[10px] font-black tracking-widest text-primary-blue uppercase opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Explore All CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary-blue px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:pr-12 hover:shadow-lg hover:shadow-primary-blue/25"
          >
            <span className="relative z-10">Explore All Services</span>
            <ChevronRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}
