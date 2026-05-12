"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { LocationNeighbor } from "@/app/types/locationTypes"

interface LocationNeighborsProps {
  neighbors: LocationNeighbor[]
  currentCityName: string
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function LocationNeighbors({
  neighbors,
  currentCityName,
}: LocationNeighborsProps) {
  if (!neighbors?.length) return null

  const getImageUrl = (path?: string) => {
    if (!path) return "/images/placeholder-cleaning.jpg"
    return path.startsWith("http") ? path : `${STRAPI_URL}${path}`
  }

  return (
    <section className="bg-background py-24">
      {/* Centered container with 7xl max-width */}
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 text-primary-blue">
              <MapPin className="h-5 w-5" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Service Expansion
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Nearby Service Areas
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Playa Cleaning provides premium residential and commercial
              services throughout the neighborhoods surrounding{" "}
              <span className="font-semibold text-foreground">
                {currentCityName}
              </span>
              .
            </p>
          </motion.div>
        </div>

        {/* Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {neighbors.map((neighbor) => (
            <motion.div
              key={neighbor.id || neighbor.slug}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                href={`/locations/${neighbor.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-border bg-card transition-all duration-500 hover:border-primary-blue/50 hover:shadow-2xl hover:shadow-primary-blue/10"
              >
                {/* Thumbnail Wrapper */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <Image
                    src={getImageUrl(neighbor.location_image?.url)}
                    alt={`Playa Cleaning services in ${neighbor.city_name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    priority
                  />

                  {/* Theme-aware Badge using CSS variables */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-foreground backdrop-blur-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      {neighbor.city_name}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-grow flex-col p-8">
                  <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary-blue">
                    {neighbor.city_name}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {neighbor.zip_codes
                      ? `Serving Zip Codes: ${neighbor.zip_codes}`
                      : "Full local residential & commercial coverage"}
                  </p>

                  <div className="mt-8 flex items-center text-[10px] font-black tracking-[0.2em] text-primary-blue uppercase">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
