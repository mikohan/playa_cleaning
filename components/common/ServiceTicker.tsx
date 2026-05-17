"use client"
import React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface ServiceData {
  name: string
  slug: string
  category?: string
}

interface ServiceTickerProps {
  services: ServiceData[]
  className?: string
}

export const ServiceTicker = ({
  services,
  className = "",
}: ServiceTickerProps) => {
  if (!services || services.length === 0) return null

  return (
    <div className={`w-full overflow-hidden py-12 ${className}`}>
      <div className="w-full">
        {/* CRITICAL FIX: Standardized CSS Mask Properties for cross-browser support.
          This applies a true Alpha Channel fade directly onto the rendering engine.
        */}
        <div
          className="flex overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex h-24 flex-none items-center gap-12 pr-12"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the array for a seamless infinite loop */}
            {[...services, ...services].map((service, index) => (
              <Link
                key={`${service.slug}-${index}`}
                href={`/services/${service.slug}`}
                className="group flex flex-none items-center gap-4 px-4 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue/5 text-primary-blue transition-all group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-widest text-foreground/70 uppercase transition-colors group-hover:text-primary-blue">
                      {service.name}
                    </span>
                    {service.category && (
                      <span className="text-[9px] font-bold tracking-tight text-foreground/60 uppercase">
                        {service.category}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="-translate-x-1 translate-y-1 text-primary-blue opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
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
