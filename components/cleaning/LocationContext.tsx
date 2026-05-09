"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, MapPin, CheckCircle2, Sparkles } from "lucide-react"

interface LocationContextProps {
  cityName: string
  contextText: string
  imageUrl?: string
  imageAlt?: string
}

export default function LocationContext({
  cityName,
  contextText,
  imageUrl,
  imageAlt,
}: LocationContextProps) {
  if (!contextText) return null
  const seoHeading = `Residential & Commercial Cleaning Services in ${cityName}`

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* Left Column: Image with Trust Overlays */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted shadow-xl md:aspect-4/5">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt || `Cleaning services in ${cityName}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary">
                  <Sparkles className="h-12 w-12 text-muted-foreground opacity-20" />
                </div>
              )}

              {/* Floating Trust Badge */}
              <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-4 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green/20 text-accent-green">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-tight text-foreground uppercase">
                    Verified Local
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Service in {cityName}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative background element using primary-blue variable */}
            <div className="absolute -top-4 -left-4 -z-10 h-24 w-24 rounded-full bg-primary-blue/10 blur-3xl" />
          </motion.div>

          {/* Right Column: Context & SEO Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-primary-blue">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-bold tracking-widest uppercase">
                {seoHeading ?? "Commercial & Residential Cleaning Services"}
              </span>
            </div>

            <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl">
              Professional Care for Your{" "}
              <span className="text-primary-blue">{cityName}</span> Home
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {contextText}
              </p>
            </div>

            {/* Trust Amplifiers List */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              {[
                "Deep Upholstery Cleaning",
                "Pet Stain & Odor Removal",
                "Eco-Friendly Products",
                "Same-Day Availability",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary-blue" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground italic">
                Currently serving all residential blocks in the{" "}
                <span className="font-semibold text-foreground">
                  {cityName}
                </span>{" "}
                area and surrounding neighborhoods.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
