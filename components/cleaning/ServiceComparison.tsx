"use client"

import React from "react"
import { Check, Minus, Zap, Star, Home, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { WaveDivider } from "../common/WaveDivider"

const COMPARISON_DATA = [
  {
    feature: "Professional Vacuuming & Mopping",
    maintenance: true,
    deep: true,
    move: true,
  },
  {
    feature: "Dusting All Accessible Surfaces",
    maintenance: true,
    deep: true,
    move: true,
  },
  {
    feature: "Bathroom Sanitization",
    maintenance: true,
    deep: true,
    move: true,
  },
  {
    feature: "Kitchen Exterior Surfaces",
    maintenance: true,
    deep: true,
    move: true,
  },
  {
    feature: "Baseboards & Door Frames",
    maintenance: false,
    deep: true,
    move: true,
  },
  {
    feature: "Air Vents & Light Switches",
    maintenance: false,
    deep: true,
    move: true,
  },
  {
    feature: "Inside Oven (Detailing)",
    maintenance: "$35",
    deep: "Included",
    move: "Included",
  },
  {
    feature: "Interior Windows (First 5)",
    maintenance: "$75",
    deep: "Included",
    move: "Included",
  },
  {
    feature: "Inside Refrigerator",
    maintenance: "$35",
    deep: "$35",
    move: "Included",
  },
  {
    feature: "Inside Kitchen Cabinets",
    maintenance: "N/A",
    deep: "N/A",
    move: "Included",
  },
  {
    feature: "Appliance Move & Detailing",
    maintenance: "N/A",
    deep: "N/A",
    move: "Included",
  },
]

export function ServiceComparison() {
  return (
    <section className="relative py-24">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="font-blauerMedium text-4xl font-bold tracking-tight">
            Compare Our Tiers
          </h2>
          <p className="font-blauerRegular mx-auto max-w-2xl text-muted-foreground italic">
            Whether it is a routine refresh or a total environmental reset,
            choose the depth that fits your current transformation.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm">
          <div className="grid grid-cols-12 border-b border-border bg-muted/30">
            <div className="col-span-6 p-8 text-xs font-bold tracking-widest text-primary uppercase">
              Service Features
            </div>
            <div className="col-span-2 flex flex-col items-center gap-2 p-8 text-center">
              <Home size={18} className="text-muted-foreground" />
              <span className="text-[10px] font-bold tracking-tighter uppercase">
                Maintenance
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-center gap-2 border-x border-border bg-primary/5 p-8 text-center">
              <Sparkles size={18} className="text-primary" />
              <span className="text-[10px] font-bold tracking-tighter text-primary uppercase">
                Deep Clean
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-center gap-2 p-8 text-center">
              <Zap size={18} className="text-muted-foreground" />
              <span className="text-[10px] font-bold tracking-tighter uppercase">
                Move In/Out
              </span>
            </div>
          </div>

          {COMPARISON_DATA.map((row, index) => (
            <div
              key={index}
              className={cn(
                "grid grid-cols-12 border-b border-border transition-colors last:border-0 hover:bg-muted/20",
                index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
              )}
            >
              <div className="font-blauerRegular col-span-6 flex items-center p-6 text-sm text-foreground">
                {row.feature}
              </div>

              {/* Maintenance Column */}
              <div className="col-span-2 flex items-center justify-center border-l border-border p-6">
                {renderValue(row.maintenance)}
              </div>

              {/* Deep Clean Column (Highlighted) */}
              <div className="col-span-2 flex items-center justify-center border-x border-border bg-primary/5 p-6">
                {renderValue(row.deep, true)}
              </div>

              {/* Move In/Out Column */}
              <div className="col-span-2 flex items-center justify-center p-6">
                {renderValue(row.move)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          <div className="flex items-center gap-2">
            <Star size={12} className="fill-primary text-primary" /> Premium
            Results
          </div>
          <div className="flex items-center gap-2">
            <Star size={12} className="fill-primary text-primary" /> No
            Shortcuts
          </div>
          <div className="flex items-center gap-2">
            <Star size={12} className="fill-primary text-primary" /> Price
            Locked
          </div>
        </div>
      </div>
    </section>
  )
}

function renderValue(val: boolean | string, isPrimary = false) {
  if (val === true) return <Check className="h-5 w-5 text-primary" />
  if (val === false || val === "N/A")
    return <Minus className="h-5 w-5 text-muted-foreground/30" />

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-[10px] font-bold",
        val === "Included"
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-muted text-muted-foreground"
      )}
    >
      {val}
    </span>
  )
}
