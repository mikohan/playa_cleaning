"use client"
import React from "react"
import {
  History,
  UserCheck,
  ShieldAlert,
  UserPlus,
  Scale,
  Percent,
  LayoutGrid,
  Smartphone,
  LucideIcon, // Import the type
} from "lucide-react"
import { WaveDivider } from "../common/WaveDivider"

interface Feature {
  title: string
  desc: string
  icon: LucideIcon // Explicit type
}

const features: Feature[] = [
  {
    title: "11 Years Experience",
    desc: "4M+ cleanings completed nationwide.",
    icon: History,
  },
  {
    title: "Vetted Professionals",
    desc: "Strict background checks and technical testing.",
    icon: UserCheck,
  },
  {
    title: "Quality Guarantee",
    desc: "Instant correction if results miss the mark.",
    icon: ShieldAlert,
  },
  {
    title: "Dedicated Cleaners",
    desc: "Request the same professional every visit.",
    icon: UserPlus,
  },
  {
    title: "Full Liability",
    desc: "Insurance coverage for all property damage.",
    icon: Scale,
  },
  {
    title: "Subscription Rates",
    desc: "Lower pricing for recurring schedules.",
    icon: Percent,
  },
  {
    title: "Flat-Rate Model",
    desc: "Pay by room count, not square footage.",
    icon: LayoutGrid,
  },
  {
    title: "Digital Management",
    desc: "Manage schedules via mobile interface.",
    icon: Smartphone,
  },
]

export const FeaturesSection = () => {
  return (
    <section className="relative py-24">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto max-w-7xl px-6">
        {/* SECTION HEADER */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase md:text-5xl">
            The Service Standard.
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-primary-blue" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon // Assign to capitalized variable for JSX
            return (
              <div
                key={i}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary-blue/50 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue/10 transition-colors group-hover:bg-primary-blue">
                    <Icon
                      size={24}
                      className="text-primary-blue transition-colors group-hover:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-widest text-foreground uppercase">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed font-semibold text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
