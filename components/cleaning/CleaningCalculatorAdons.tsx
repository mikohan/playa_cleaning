"use client"

import React, { useState, useMemo, useCallback } from "react"
import {
  Plus,
  Minus,
  Check,
  Refrigerator,
  Cookie,
  Eye,
  Move,
  PawPrint,
  Waves,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  LucideIcon,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// --- TYPES ---

interface AddonConfig {
  label: string
  price: number
  icon: LucideIcon
}

interface PricingConfig {
  base: number
  sqftRate: number
  bedRate: number
  bathRate: number
  multipliers: Record<string, number>
  addons: Record<string, AddonConfig>
}

// --- CONSTANTS ---

const INCLUSIONS: Record<string, string[]> = {
  maintenance: [],
  deep: ["oven", "windows"],
  move: ["oven", "windows", "fridge", "moveAppliances"],
}

const PRICING: PricingConfig = {
  base: 120,
  sqftRate: 0.08,
  bedRate: 30,
  bathRate: 50,
  multipliers: {
    maintenance: 1,
    deep: 1.6,
    move: 2.1,
  },
  addons: {
    fridge: { label: "Inside Fridge", price: 35, icon: Refrigerator },
    oven: { label: "Inside Oven", price: 35, icon: Cookie },
    moveAppliances: { label: "Move Fridge/Oven", price: 60, icon: Move },
    pets: { label: "Heavy Pet Hair", price: 45, icon: PawPrint },
    windows: { label: "Interior Windows", price: 15, icon: Waves },
    blinds: { label: "Hand-Wipe Blinds", price: 12, icon: Eye },
  },
}

type AddonKey = keyof typeof PRICING.addons

export function CleaningCalculatorAdons() {
  // --- STATE ---
  const [sqft, setSqft] = useState<number[]>([1200])
  const [beds, setBeds] = useState<string>("2")
  const [baths, setBaths] = useState<string>("2")
  const [type, setType] = useState<keyof typeof INCLUSIONS>("maintenance")
  const [selectedToggles, setSelectedToggles] = useState<string[]>([])
  const [counters, setCounters] = useState<{ windows: number; blinds: number }>(
    {
      windows: 0,
      blinds: 0,
    }
  )

  // --- LOGIC ---

  const isIncluded = useCallback(
    (id: string): boolean => {
      return INCLUSIONS[type].includes(id)
    },
    [type]
  )

  const totalPrice = useMemo(() => {
    const hardwareBase: number =
      PRICING.base +
      sqft[0] * PRICING.sqftRate +
      Number(beds) * PRICING.bedRate +
      Number(baths) * PRICING.bathRate

    const subtotal: number = hardwareBase * PRICING.multipliers[type]

    const togglesTotal: number = selectedToggles.reduce(
      (sum: number, id: string) => {
        const addonId = id as AddonKey
        return isIncluded(addonId) ? sum : sum + PRICING.addons[addonId].price
      },
      0
    )

    const freeWindows: number = isIncluded("windows") ? 5 : 0
    const windowPrice: number =
      Math.max(0, counters.windows - freeWindows) * PRICING.addons.windows.price
    const blindsPrice: number = counters.blinds * PRICING.addons.blinds.price

    return Math.round(subtotal + togglesTotal + windowPrice + blindsPrice)
  }, [sqft, beds, baths, type, selectedToggles, counters, isIncluded])

  // --- HANDLERS ---
  const toggleAddon = (id: string): void => {
    if (isIncluded(id)) return
    setSelectedToggles((prev: string[]) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const updateCounter = (id: "windows" | "blinds", delta: number): void => {
    setCounters((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }))
  }

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* INPUTS COLUMN */}
          <div className="space-y-10 lg:col-span-7">
            <header>
              <h2 className="font-blauerMedium mb-2 text-3xl font-bold tracking-tight uppercase">
                Estimate Your Transformation
              </h2>
              <p className="font-blauerRegular text-muted-foreground italic">
                Our Price Lock Guarantee ensures no surprises at the door.
              </p>
            </header>

            {/* 01. Size Slider */}
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  01. Home Size
                </label>
                <span className="font-blauerMedium text-2xl font-bold">
                  {sqft[0]}{" "}
                  <small className="font-blauerRegular text-xs uppercase opacity-50">
                    Sq Ft
                  </small>
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

            {/* 02/03. Hardware */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  02. Bedrooms
                </label>
                <div className="flex gap-2">
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBeds(num)}
                      className={cn(
                        "h-12 w-12 rounded-xl border-2 text-sm font-bold transition-all",
                        beds === num
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  03. Bathrooms
                </label>
                <div className="flex gap-2">
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBaths(num)}
                      className={cn(
                        "h-12 w-12 rounded-xl border-2 text-sm font-bold transition-all",
                        baths === num
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 04. Service Depth */}
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                04. Service Depth
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {Object.keys(PRICING.multipliers).map((k) => (
                  <button
                    key={k}
                    onClick={() => setType(k as keyof typeof INCLUSIONS)}
                    className={cn(
                      "rounded-2xl border-2 p-5 text-left transition-all",
                      type === k
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/20"
                    )}
                  >
                    <p className="font-blauerMedium font-bold text-foreground capitalize">
                      {k === "move" ? "Move In/Out" : k}
                    </p>
                    <p className="font-blauerRegular mt-1 text-[10px] leading-tight text-muted-foreground">
                      {k === "maintenance"
                        ? "Regular upkeep for clean homes."
                        : k === "deep"
                          ? "Deep reset + Oven + 5 Windows."
                          : "Full detailing + Fridge + Oven + Moving appliances."}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 05. Custom Add-ons */}
            <div className="space-y-6">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                05. Custom Add-ons
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Windows */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Waves size={20} className="text-primary" />
                    <div>
                      <p className="font-blauerMedium text-xs font-bold">
                        Interior Windows
                      </p>
                      {isIncluded("windows") && (
                        <p className="text-[9px] font-bold text-primary uppercase">
                          First 5 Free
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCounter("windows", -1)}
                      className="rounded-lg border border-border p-1 hover:bg-accent"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-bold">
                      {counters.windows}
                    </span>
                    <button
                      onClick={() => updateCounter("windows", 1)}
                      className="rounded-lg border border-border p-1 hover:bg-accent"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Blinds */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Eye size={20} className="text-primary" />
                    <p className="font-blauerMedium text-xs font-bold">
                      Hand-Wipe Blinds
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCounter("blinds", -1)}
                      className="rounded-lg border border-border p-1 hover:bg-accent"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-bold">
                      {counters.blinds}
                    </span>
                    <button
                      onClick={() => updateCounter("blinds", 1)}
                      className="rounded-lg border border-border p-1 hover:bg-accent"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Toggle Add-ons */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {(
                  ["fridge", "oven", "moveAppliances", "pets"] as AddonKey[]
                ).map((id) => {
                  const item = PRICING.addons[id]
                  const included = isIncluded(id)
                  const active = selectedToggles.includes(id) || included
                  const Icon = item.icon
                  return (
                    <button
                      key={id}
                      disabled={included}
                      onClick={() => toggleAddon(id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all",
                        included
                          ? "cursor-default border-primary/30 bg-primary/5"
                          : active
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border text-muted-foreground hover:border-primary/20"
                      )}
                    >
                      {included && (
                        <Check
                          className="absolute top-2 right-2 text-primary"
                          size={14}
                        />
                      )}
                      <Icon size={20} />
                      <span className="font-blauerMedium text-center text-[10px] leading-tight font-bold">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold opacity-80">
                        {included ? "FREE" : `+$${item.price}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="sticky top-24 lg:col-span-5">
            <div className="rounded-t-[2.5rem] bg-primary p-10 text-primary-foreground shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
                  Price Lock Active
                </span>
                <ShieldCheck size={28} className="opacity-90" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold opacity-70">$</span>
                <span className="font-blauerMedium text-8xl font-bold tracking-tighter">
                  {totalPrice}
                </span>
              </div>
            </div>
            <div className="space-y-8 rounded-b-[2.5rem] border-x border-b border-border bg-card p-10">
              <ul className="space-y-5">
                {[
                  "Single-Expert Premium Service",
                  "HEPA Industrial Filtration",
                  "Eco-Friendly, Pet-Safe Supplies",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="font-blauerRegular flex items-center gap-4 text-sm text-foreground"
                  >
                    <Check size={18} className="shrink-0 text-primary" /> {text}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-8">
                <div className="font-blauerRegular mb-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <Zap
                    size={16}
                    className="animate-pulse fill-primary text-primary"
                  />
                  <span>
                    Next Slot:{" "}
                    <span className="font-bold text-foreground italic underline decoration-primary underline-offset-4">
                      This Tuesday @ 9:00 AM
                    </span>
                  </span>
                </div>
                <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-7 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Secure This Investment <ArrowRight size={22} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                <Info size={12} /> Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
