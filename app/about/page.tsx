import React from "react"
import Image from "next/image"
import { ShieldCheck, MapPin, Sparkles, Heart, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Assets
import AliciaPoster from "@/public/images/cleaning/hero-3.png"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"
import { getAllServices, getSingleType } from "@/lib/strapi"
import { AboutPageData } from "../types/aboutTypes"
import { ServiceTicker } from "@/components/common/ServiceTicker"
import { CallToAction } from "@/components/cleaning/CallToAction"

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col border-l border-primary-blue/20 pl-6">
    <span className="text-3xl font-bold text-foreground">{value}</span>
    <span className="text-sm tracking-wider text-muted-foreground uppercase">
      {label}
    </span>
  </div>
)

export default async function AboutPage() {
  // Pass the interface as the generic type
  const pageData = await getSingleType<AboutPageData>("about")

  if (!pageData) {
    return <div>Could not load page content.</div>
  }

  // Now TypeScript knows pageData has 'title' and 'video'
  const videoUrl = `${process.env.STRAPI_URL}${pageData.video.url}`
  const services = await getAllServices()
  return (
    <div className="relative min-h-screen bg-background">
      <BreadCrumbsUniversal />
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Left Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-2 text-sm font-bold text-primary-blue">
                <Sparkles size={16} />
                <span>The Westside’s Elite Choice</span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                More Than a <br />
                <span className="text-primary-blue italic">
                  Cleaning Service.
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Meet Alicia, the founder of Playa Cleaning. We provide a
                personalized, detailed home care experience designed for the
                unique lifestyles of Playa Vista and Marina del Rey.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button className="flex items-center gap-2 rounded-full bg-primary-blue px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95">
                  Get Your Quote <ArrowRight size={18} />
                </button>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin size={16} className="text-primary-blue" />
                  <span>Serving Playa Vista & MDR</span>
                </div>
              </div>
            </div>

            {/* Right Video - Vertical 9:16 Aspect */}
            <div className="perspective-1000 relative max-w-150">
              <div className="relative aspect-9/16 overflow-hidden rounded-2xl border-8 border-card shadow-2xl transition-transform duration-700 hover:rotate-y-6">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={AliciaPoster.src}
                  className="h-full w-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-6 text-white">
                  <p className="text-xl font-bold">Alicia</p>
                  <p className="text-sm opacity-80">Founder & Lead Detailer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="bg-card py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight italic">
                The Story Behind the Standard
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;ve always believed that a clean home is the foundation of
                a calm life. In Los Angeles, our time is our most precious
                asset. I founded Playa Cleaning because I realized homeowners
                weren&apos;t looking for a rotating crew—they were looking for a
                partner.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <StatCard value="100%" label="Consistency" />
                <StatCard value="0" label="Rotating Teams" />
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-8 lg:p-12">
              <Heart className="mb-6 text-primary-blue" size={40} />
              <h3 className="mb-4 text-xl font-bold">A Neighbor First</h3>
              <p className="text-muted-foreground">
                We aren&apos;t a national franchise. We live here, shop here,
                and care about this community. Whether it&apos;s a high-rise in
                Marina del Rey or a family home in Playa Vista, we understand
                the specific needs of Westside living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">The Playa Standard</h2>
            <p className="mt-4 text-muted-foreground">
              What makes our approach different from the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Personal Consistency",
                desc: "You get me, every time. I learn your routines, your preferences, and exactly how you like your home handled.",
                icon: ShieldCheck,
              },
              {
                title: "Technical Precision",
                desc: "Equipped with professional HEPA filtration and fabric-safe solutions to remove allergens, not spread them.",
                icon: Sparkles,
              },
              {
                title: "Genuine Respect",
                desc: "Your pets, belongings, and privacy are treated with the highest integrity. We treat your home like our own.",
                icon: Heart,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-blue/5"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
                  <item.icon size={24} />
                </div>
                <h4 className="mb-3 text-xl font-bold">{item.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <ServiceTicker services={services} />
      </section>

      {/* --- CALL TO ACTION --- */}
      <section>
        <CallToAction />
      </section>
    </div>
  )
}
