"use client"
import React from "react"
import { Search, Clock, ShieldCheck, ClipboardCheck, Heart } from "lucide-react"
import { WaveDivider } from "../common/WaveDivider"

const BENEFITS = [
  {
    title: "Detailed Cleaning",
    subtitle: "Every Corner, Every Time",
    description:
      "I don’t skip the small things. The details—baseboards, corners, and hidden edges—are what make your home feel truly clean.",
    icon: <Search className="h-6 w-6" />,
  },
  {
    title: "Always On Time",
    subtitle: "Never Rushed",
    description:
      "You get a professional who respects your schedule. I arrive as promised and stay until the job is done to my elite standard.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "Pro Equipment",
    subtitle: "Industrial‑Grade Supplies",
    description:
      "I bring everything needed, including an industrial-grade HEPA vacuum, for a deeper, longer‑lasting clean you can actually feel.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Personalized Care",
    subtitle: "Your Instructions Exactly",
    description:
      "Tell me what matters most to you. I clean your home exactly the way you want it—every single visit.",
    icon: <ClipboardCheck className="h-6 w-6" />,
  },
  {
    title: "Trustworthy & Warm",
    subtitle: "Great With Pets",
    description:
      "A friendly, educated person in your home—not a rotating stranger. I work safely and calmly around your furry family members.",
    icon: <Heart className="h-6 w-6" />,
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-24 md:pt-60">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex w-full flex-col items-center text-center">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Why People Choose
              <span className="text-primary-blue"> Playa Cleaning</span>
            </h2>
            <p className="font-blauerRegular mt-6 text-lg text-muted-foreground">
              Experience a specialized level of care that goes beyond
              surface-level wiping. I focus on health, consistency, and the
              details that others skip.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-foreground/10 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-blue/5"
            >
              {/* Icon Wrapper */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue transition-colors duration-300 group-hover:bg-primary-blue group-hover:text-white">
                {benefit.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="font-blauerMedium text-xl font-bold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm font-bold tracking-widest text-primary-blue/80 uppercase">
                  {benefit.subtitle}
                </p>
                <p className="font-blauerRegular leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}

          {/* Contact Card (Fill the empty grid spot) */}
          <div className="flex flex-col justify-center rounded-3xl bg-primary-blue p-8 text-white">
            <h3 className="font-blauerMedium mb-4 text-2xl font-bold">
              Ready for a cleaner home?
            </h3>
            <p className="mb-8 opacity-90">
              Schedule your first detailed clean and feel the difference
              immediately.
            </p>
            <a
              href="tel:2135987763"
              className="hover:bg-opacity-90 w-fit rounded-xl bg-white px-6 py-3 font-bold text-primary-blue transition-all"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
