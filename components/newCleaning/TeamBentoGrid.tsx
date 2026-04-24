"use client"
"use client"
import React from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Quote, Sparkles } from "lucide-react"

// 1. The Photo Array with your specific paths and alt tags
const teamPhotos = [
  {
    src: "/images/cleaning/ol-1.png",
    alt: "Playa Cleaning professional performing a deep clean in a Los Angeles home",
    quote: "A spotless home is the foundation of a happy life.",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/cleaning/ol-2.png",
    alt: "Meticulous dusting of high-reach surfaces by our cleaning team",
    quote: "Every corner, every surface—meticulous care.",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/cleaning/ol-3.png",
    alt: "Organized cleaning supplies and professional staff ready for service",
    quote: "Hospital-grade standards, home-style comfort.",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    src: "/images/cleaning/ol-4.png",
    alt: "Eco-friendly cleaning products used for residential maintenance",
    quote: null,
    size: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/cleaning/ol-10.png",
    alt: "Playa Cleaning team members in the local Los Angeles area",
    quote: "We don't just tidy up; we sanitize your sanctuary.",
    size: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/images/cleaning/ol-11.png",
    alt: "Playa Cleaning team members in the local Los Angeles area",
    quote: "We don't just tidy up; we sanitize your sanctuary.",
    size: "md:col-span-2 md:row-span-1",
  },
]

export const TeamBentoGrid = () => {
  // Explicitly typing variants to fix the TypeScript 'ease' error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-1 text-xs font-black tracking-widest text-primary-blue uppercase">
          <Sparkles size={14} /> The Playa Cleaning Standard
        </div>
        <h2 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl">
          Meet Your <span className="text-primary-blue">Sanctuary</span> Team
        </h2>
        <p className="mx-auto max-w-2xl text-xl font-medium text-muted-foreground">
          Our specialized team is trained to deliver high-end residential
          maintenance. We bring the sparkle back to your home so you can focus
          on what matters most.
        </p>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
      >
        {teamPhotos.map((photo, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-3xl bg-muted transition-all duration-500 hover:shadow-2xl ${photo.size} min-h-[300px]`}
          >
            {/* Image */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay for Quote */}
            {photo.quote && (
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Quote
                  className="mb-2 text-primary-blue"
                  size={24}
                  fill="currentColor"
                />
                <p className="text-lg leading-tight font-bold text-white italic">
                  &ldquo;{photo.quote}&rdquo;
                </p>
              </div>
            )}

            {/* Subtle Overlay Border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
