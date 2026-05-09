"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { services, ServiceItem } from "@/app/data/serviceData"

export default function ServiceGrid({ cityName }: { cityName: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* SEO Header */}
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
              From high-end residences to sprawling commercial complexes, Playa
              Cleaning delivers unmatched standards across every sector.
            </p>
          </motion.div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary-blue/40 hover:shadow-2xl hover:shadow-primary-blue/10"
              >
                {/* Visual Header with Gradient Overlay */}
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <div
                    className={`absolute inset-0 z-10 bg-linear-to-br ${service.gradient} opacity-60 transition-opacity group-hover:opacity-40`}
                  />

                  {/* Placeholder for Strapi Image */}
                  <Image
                    src={`https://picsum.photos/seed/${service.id}/600/400`} // Professional placeholder
                    alt={service.title}
                    fill
                    className="object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                  />

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[10px] font-black tracking-tighter text-foreground uppercase backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-grow flex-col p-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl leading-tight font-bold text-foreground transition-colors group-hover:text-primary-blue">
                      {service.title}
                    </h3>
                    <div className="rounded-full border border-border p-2 transition-colors group-hover:bg-primary-blue group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <span className="text-[10px] font-black tracking-widest text-primary-blue uppercase opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                      Learn More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
