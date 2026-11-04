"use client"

import React, { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Minus,
  Check,
  Eye,
  Waves,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { WaveDivider } from "../common/WaveDivider"

// --- CONSTANTS ---
import { INCLUSIONS, PRICING_ADDONS } from "@/app/data/pricing"
import { PRICING_MATRICES } from "@/app/data/pricing"
import {
  TOGGLE_ADDONS,
  ToggleAddon,
  ServiceType,
  calculateQuote,
  quoteToParams,
} from "@/lib/booking"

const STANDARD_MATRIX = PRICING_MATRICES.STANDARD
const PRICING = PRICING_ADDONS

type CleaningCalculatorProps = { showHeader?: boolean }
type AddonKey = keyof typeof PRICING.addons

export function CleaningCalculator({
  showHeader = true,
}: CleaningCalculatorProps) {
  const router = useRouter()

  const [beds, setBeds] = useState<string>("2")
  const [baths, setBaths] = useState<string>("2")
  // Safe default target: standard, deep, heavy (instead of move)
  const [type, setType] = useState<keyof typeof INCLUSIONS>("standard")
  const [selectedToggles, setSelectedToggles] = useState<string[]>([])
  const [counters, setCounters] = useState({ windows: 0, blinds: 0 })

  const isIncluded = useCallback(
    (id: string) => INCLUSIONS[type]?.includes(id) || false,
    [type]
  )

  // Price comes from the shared function the server also uses
  const quoteInput = useMemo(
    () => ({
      beds,
      baths,
      type: type as ServiceType,
      addons: selectedToggles.filter((id): id is ToggleAddon =>
        (TOGGLE_ADDONS as readonly string[]).includes(id)
      ),
      windows: counters.windows,
      blinds: counters.blinds,
    }),
    [beds, baths, type, selectedToggles, counters]
  )
  const totalPrice = useMemo(() => calculateQuote(quoteInput).total, [quoteInput])

  const handleRedirect = () => {
    router.push(`/booking/confirm?${quoteToParams(quoteInput).toString()}`)
  }

  const toggleAddon = (id: string) => {
    if (isIncluded(id)) return
    setSelectedToggles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const updateCounter = (id: "windows" | "blinds", delta: number) => {
    setCounters((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }))
  }

  return (
    <section className="relative py-4 md:pb-32">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />

      {showHeader && (
        <div className="container mx-auto mt-32 hidden max-w-7xl px-6 md:block">
          <div className="flex w-full flex-col items-center text-center">
            <div className="mb-16 max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Get Instant Estimate{" "}
                <span className="text-primary-blue">Right Now</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Premium Cleaning for your home. We focus on health, consistency,
                and details others skip.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto mt-16 max-w-7xl rounded-2xl bg-primary-blue/10 p-4 md:p-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <header>
              <h2 className="mb-2 text-xl font-bold tracking-tight uppercase md:text-3xl">
                Estimate Your Cleaning
              </h2>
              <p className="text-sm text-foreground/75 italic md:text-base">
                Our Price Lock Guarantee ensures no surprises at the door.
              </p>
            </header>

            {/* 01. Bedrooms */}
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                01. Bedrooms
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(STANDARD_MATRIX).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBeds(num)}
                    className={cn(
                      "h-12 w-16 rounded-xl border-2 text-sm font-bold transition-all",
                      beds === num
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground/75 hover:border-primary/30"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* 02. Bathrooms */}
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                02. Bathrooms
              </label>
              <div className="flex flex-wrap gap-2">
                {["1", "2", "3", "4", "5+"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBaths(num)}
                    className={cn(
                      "h-12 w-16 rounded-xl border-2 text-sm font-bold transition-all",
                      baths === num
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground/75 hover:border-primary/30"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* 03. Service Depth */}
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                03. Service Detail Level
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {Object.keys(INCLUSIONS).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setType(k as keyof typeof INCLUSIONS)}
                    className={cn(
                      "rounded-2xl border-2 p-5 text-left transition-all",
                      type === k
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/20"
                    )}
                  >
                    <p className="font-bold text-foreground capitalize">
                      {k === "standard"
                        ? "Standard Cleaning"
                        : k === "deep"
                          ? "Deep Cleaning"
                          : "Move in/out Cleaning"}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-foreground/75">
                      {k === "standard"
                        ? "Regular home upkeep."
                        : k === "deep"
                          ? "Deep reset + Oven restoration + 5 Windows."
                          : "Complete baseline transformation + Appliances details."}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 04. Add-ons */}
            <div className="space-y-6">
              <label className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                04. Custom Add-ons
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {["windows", "blinds"].map((id) => (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-2xl border-2 border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      {id === "windows" ? (
                        <Waves size={20} className="text-primary" />
                      ) : (
                        <Eye size={20} className="text-primary" />
                      )}
                      <p className="text-xs font-bold capitalize">{id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateCounter(id as "windows" | "blinds", -1)
                        }
                        aria-label={`Remove one (${id})`}
                        className="rounded-lg border p-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold">
                        {counters[id as keyof typeof counters]}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCounter(id as "windows" | "blinds", 1)
                        }
                        aria-label={`Add one (${id})`}
                        className="rounded-lg border p-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {(
                  ["fridge", "oven", "moveAppliances", "pets"] as AddonKey[]
                ).map((id) => {
                  const item = PRICING.addons[id]
                  if (!item) return null
                  const included = isIncluded(id)
                  const active = selectedToggles.includes(id) || included
                  return (
                    <button
                      key={id}
                      type="button"
                      disabled={included}
                      onClick={() => toggleAddon(id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all",
                        included
                          ? "border-primary/30 bg-primary/5"
                          : active
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border text-foreground/75 hover:border-primary/20"
                      )}
                    >
                      {included && (
                        <Check
                          className="absolute top-2 right-2 text-primary"
                          size={14}
                        />
                      )}
                      <item.icon size={20} />
                      <span className="text-center text-[10px] leading-tight font-bold">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold opacity-80">
                        {included ? "INCLUDED" : `+$${item.price}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="sticky top-24 lg:col-span-5">
            <div className="rounded-t-2xl bg-primary px-4 py-6 text-primary-foreground shadow-2xl md:px-10 md:py-10">
              <div className="mb-4 flex items-center justify-between md:mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
                  Price Lock Active
                </span>
                <ShieldCheck size={28} className="opacity-90" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold opacity-70">$</span>
                <span className="text-5xl font-bold tracking-tighter md:text-8xl">
                  {totalPrice}
                </span>
              </div>
            </div>
            <div className="space-y-8 rounded-b-2xl border-x border-b border-border bg-card p-4 md:p-10">
              <ul className="space-y-5">
                {[
                  "Single-Expert Premium Service",
                  "HEPA Industrial Filtration",
                  "Eco-Friendly, Pet-Safe Supplies",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-sm text-foreground"
                  >
                    <Check size={18} className="shrink-0 text-primary" /> {text}
                  </li>
                ))}
              </ul>
              <div className="border-t pt-8">
                <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <Zap
                    size={16}
                    className="animate-pulse fill-primary text-primary"
                  />
                  <span>
                    Next Available Opening:{" "}
                    <span className="font-bold text-foreground italic underline decoration-primary underline-offset-4">
                      Tomorrow Session
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRedirect}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-2 font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] md:py-7 md:text-xl"
                >
                  Secure This Investment <ArrowRight size={22} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                <Info size={16} /> Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
