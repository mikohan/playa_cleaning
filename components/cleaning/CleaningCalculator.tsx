"use client"

import React, { useState, useMemo } from "react"
import { Info, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

// --- TYPES ---
type ServiceType = "maintenance" | "deep" | "move"

interface PricingConfig {
  base: number
  sqftRate: number
  bedRate: number
  bathRate: number
  multipliers: Record<ServiceType, number>
}

// --- CONFIG ---
const PRICING: PricingConfig = {
  base: 120,
  sqftRate: 0.08,
  bedRate: 30,
  bathRate: 50,
  multipliers: {
    maintenance: 1,
    deep: 1.5,
    move: 1.9,
  },
}

export function CleaningCalculator() {
  const [sqft, setSqft] = useState<number[]>([1200])
  const [beds, setBeds] = useState<string>("2")
  const [baths, setBaths] = useState<string>("2")
  const [type, setType] = useState<ServiceType>("maintenance")

  const totalPrice = useMemo(() => {
    const hardware =
      PRICING.base +
      sqft[0] * PRICING.sqftRate +
      Number(beds) * PRICING.bedRate +
      Number(baths) * PRICING.bathRate

    return Math.round(hardware * PRICING.multipliers[type])
  }, [sqft, beds, baths, type])

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Inputs */}
          <div className="space-y-10 lg:col-span-7">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight uppercase">
                Estimate Your Transformation
              </h2>
              <p className="font-medium text-muted-foreground italic">
                Select your home hardware. No hidden fees, just transparency.
              </p>
            </div>

            {/* 1. Square Footage Slider */}
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <label className="text-xs font-bold tracking-widest text-primary uppercase">
                  01. Home Size
                </label>
                <span className="text-2xl font-bold">
                  {sqft[0]}
                  <span className="ml-2 text-xs font-normal text-muted-foreground uppercase">
                    Sq Ft
                  </span>
                </span>
              </div>
              <Slider
                value={sqft}
                onValueChange={setSqft}
                max={5000}
                min={500}
                step={50}
                className="py-4"
              />
            </div>

            {/* 2. Beds & Baths Hardware */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest text-primary uppercase">
                  02. Bedrooms
                </label>
                <ToggleGroup
                  type="single"
                  value={beds}
                  onValueChange={(v) => v && setBeds(v)}
                  className="justify-start gap-2"
                >
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <ToggleGroupItem
                      key={num}
                      value={num}
                      className="h-12 w-12 rounded-xl border border-border transition-all hover:bg-primary/5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {num}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest text-primary uppercase">
                  03. Bathrooms
                </label>
                <ToggleGroup
                  type="single"
                  value={baths}
                  onValueChange={(v) => v && setBaths(v)}
                  className="justify-start gap-2"
                >
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <ToggleGroupItem
                      key={num}
                      value={num}
                      className="h-12 w-12 rounded-xl border border-border transition-all hover:bg-primary/5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {num}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>

            {/* 3. Service Level */}
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-widest text-primary uppercase">
                04. Service Depth
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    id: "maintenance" as const,
                    label: "Maintenance",
                    desc: "For regular upkeep",
                  },
                  {
                    id: "deep" as const,
                    label: "Deep Clean",
                    desc: "Environmental reset",
                  },
                  {
                    id: "move" as const,
                    label: "Move In/Out",
                    desc: "Total detailing",
                  },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setType(s.id)}
                    className={cn(
                      "cursor-pointer rounded-2xl border-2 p-5 transition-all",
                      type === s.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/20"
                    )}
                  >
                    <p className="text-lg font-bold">{s.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Price Lock Card */}
          <div className="sticky top-24 lg:col-span-5">
            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-muted/50 shadow-2xl">
              <div className="bg-primary p-10 text-primary-foreground">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase opacity-80">
                    Estimated Investment
                  </span>
                  <ShieldCheck className="h-7 w-7 opacity-90" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-bold tracking-tighter">
                    ${totalPrice}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium opacity-90">
                  Locked-in price based on your home hardware.
                </p>
              </div>

              <CardContent className="space-y-8 bg-card p-10">
                <ul className="space-y-4">
                  {[
                    "HEPA Industrial Vacuuming Included",
                    "No-Rush Detail Guarantee",
                    "Pet-Safe Supplies Included",
                    "Single Expert (Alicia) Service",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-sm font-medium"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-8">
                  <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
                    <Zap className="h-5 w-5 fill-primary text-primary" />
                    <span>
                      Next Available:{" "}
                      <span className="font-bold text-foreground">
                        Tuesday at 9:00 AM
                      </span>
                    </span>
                  </div>

                  <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-7 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Secure This Price
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              <Info className="h-3 w-3" />
              Final price subject to accurate hardware selection
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
