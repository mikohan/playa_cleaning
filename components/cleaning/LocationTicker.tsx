"use client"
import React from "react"
import { motion } from "framer-motion"
import { MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LOS_ANGELES_AREAS } from "@/app/data/west-side-areas"

export const LocationTicker = () => {
  return (
    <div className="overflow-hidden py-16">
      <div className="container mx-auto">
        {/* Mask provides the soft fade-out effect on the edges */}
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex flex-none items-center gap-12 pr-12"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 45, // Adjusted for the larger list of areas
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the imported data for a seamless loop */}
            {[...LOS_ANGELES_AREAS, ...LOS_ANGELES_AREAS].map((area, index) => (
              <Link
                key={`${area.slug}-${index}`}
                href={`/locations/${area.slug}`}
                className="group flex flex-none items-center gap-3 px-4 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-blue transition-colors group-hover:bg-primary-blue group-hover:text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                      {area.name}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground/50">
                      {area.region}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="-translate-y-1 text-primary-blue opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
