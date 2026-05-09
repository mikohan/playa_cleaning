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

// Animation Variants for a staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // Now correctly validated against the Variants type
    },
  },
}

export default function LocationNeighbors({
  neighbors,
  currentCityName,
}: LocationNeighborsProps) {
  if (!neighbors?.length) return null

  return (
    <section className="border-t border-slate-100 bg-slate-50/50 py-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Nearby Service Areas
          </motion.h2>
          <p className="mt-4 text-lg text-slate-600">
            Professional upholstery cleaning available in neighborhoods
            surrounding {currentCityName}.
          </p>
        </div>

        {/* Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {neighbors.map((neighbor) => {
            // Safe URL resolution
            const imagePath = neighbor.location_image?.url
            console.log(imagePath)
            const imageUrl = imagePath
              ? imagePath.startsWith("http")
                ? imagePath
                : `${STRAPI_URL}${imagePath}`
              : "/images/placeholder-cleaning.jpg"

            return (
              <motion.div
                key={neighbor.id || neighbor.slug}
                variants={cardVariants}
              >
                <Link
                  href={`/locations/${neighbor.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageUrl}
                      alt={`Professional cleaning in ${neighbor.city_name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-white backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        {neighbor.city_name}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {neighbor.city_name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {neighbor.zip_codes
                        ? `Zips: ${neighbor.zip_codes}`
                        : "Full residential coverage"}
                    </p>

                    <div className="mt-auto flex items-center pt-6 text-xs font-black tracking-widest text-blue-600 uppercase">
                      Explore Area
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
