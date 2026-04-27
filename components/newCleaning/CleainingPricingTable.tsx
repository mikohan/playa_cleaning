"use client"

import React from "react"
import { Check, Info, Zap, CalendarDays, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const regularPricing = [
  { rooms: "1 Bed 1 Bath", weekly: 110, biweekly: 125, monthly: 140 },
  { rooms: "2 Bed 1 Bath", weekly: 135, biweekly: 155, monthly: 175 },
  { rooms: "2 Bed 2 Bath", weekly: 150, biweekly: 175, monthly: 195 },
  { rooms: "3 Bed 2 Bath", weekly: 180, biweekly: 210, monthly: 240 },
  { rooms: "4 Bed 3 Bath", weekly: 220, biweekly: 255, monthly: 290 },
]

const deepCleaningAddons = [
  { item: "Inside Oven", price: "$35", desc: "Heavy degreasing & scrub" },
  { item: "Inside Fridge", price: "$35", desc: "Sanitization & organization" },
  { item: "Inside Cabinets", price: "$45", desc: "Vacuum & hand-wipe" },
  { item: "Interior Windows", price: "$5/ea", desc: "Streak-free detail" },
  { item: "Baseboard Wiping", price: "$50+", desc: "Hand-scrubbed finish" },
]

export default function CleaningPricing() {
  return (
    <div className="space-y-32 py-20">
      {/* 1. REGULAR CLEANING - RECURRING FREQUENCY TABLE */}
      <section className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary-blue uppercase">
            <CalendarDays size={14} /> Subscription Maintenance
          </div>
          <h2 className="mt-6 text-5xl font-bold tracking-tighter [word-spacing:0.15em] md:text-6xl">
            Regular <span className="text-primary-blue italic">Maid</span> Plans
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted/30 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  <th className="px-8 py-8">Home Size</th>
                  <th className="px-6 py-8">Weekly (Save 20%)</th>
                  {/* Default/Featured Column Header */}
                  <th className="relative bg-primary-blue/[0.02] px-6 py-8 text-primary-blue">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-primary-blue" />
                    <span className="flex items-center gap-1.5">
                      Bi-Weekly <Star size={10} className="fill-primary-blue" />
                    </span>
                    <div className="mt-1 text-[8px] opacity-70">
                      Recommended Default
                    </div>
                  </th>
                  <th className="px-6 py-8 pr-8 text-right">Once a Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {regularPricing.map((row) => (
                  <tr
                    key={row.rooms}
                    className="group transition-colors hover:bg-muted/20"
                  >
                    <td className="px-8 py-6 font-bold text-foreground">
                      {row.rooms}
                    </td>
                    <td className="px-6 py-6 font-medium text-muted-foreground">
                      ${row.weekly}
                    </td>
                    {/* Default/Featured Column Body */}
                    <td className="bg-primary-blue/[0.02] px-6 py-6 font-black text-primary-blue">
                      ${row.biweekly}
                    </td>
                    <td className="px-6 py-6 pr-8 text-right font-medium text-muted-foreground">
                      ${row.monthly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-footer p-6 text-center">
            <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
              * Rates are based on standard square footage. Supplies included.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DEEP CLEANING - DETAIL & ADD-ONS */}
      <section className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-yellow/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-accent-yellow uppercase">
                <Zap size={14} className="fill-accent-yellow stroke-0" /> The
                Restoration Detail
              </div>
              <h2 className="mt-6 text-5xl font-bold tracking-tighter [word-spacing:0.15em]">
                Deep{" "}
                <span className="text-primary-blue italic">Restoration</span>
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground [word-spacing:0.05em]">
              Ideal for homes that haven’t been professionally cleaned in 30+
              days. We move beyond the surface, focusing on vertical grime,
              buildup in wet areas, and deep-dust extraction.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Baseboard Scrubbing",
                "Grout Refresh",
                "Vent Sanitization",
                "Light Fixture Detail",
                "Door Frame Wiping",
                "High-Dust Removal",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/10 text-accent-green">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-black tracking-widest text-foreground/80 uppercase">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Alicia Quote Overlay (Optional styling touch) */}
            <div className="absolute -top-6 -right-6 z-10 hidden rounded-2xl bg-footer p-4 shadow-xl lg:block">
              <p className="text-[10px] font-bold text-white italic">
                {"Perfect for seasonal refreshes."}
              </p>
            </div>

            <div className="rounded-[3rem] border border-border bg-card p-10 shadow-2xl">
              <h3 className="mb-8 text-2xl font-bold tracking-tight">
                Essential Add-ons
              </h3>
              <div className="space-y-6">
                {deepCleaningAddons.map((addon) => (
                  <div
                    key={addon.item}
                    className="group flex items-center justify-between border-b border-border pb-6 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-black tracking-widest uppercase transition-colors group-hover:text-primary-blue">
                        {addon.item}
                      </p>
                      <p className="text-[10px] font-medium tracking-tight text-muted-foreground uppercase">
                        {addon.desc}
                      </p>
                    </div>
                    <span className="rounded-xl bg-primary-blue/5 px-4 py-2 text-xs font-black text-primary-blue">
                      {addon.price}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-10 w-full rounded-2xl bg-primary-blue py-5 text-xs font-black tracking-[0.3em] text-white uppercase shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary-blue/20 active:scale-95">
                Book Detailed Clean
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
