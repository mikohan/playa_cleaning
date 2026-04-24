"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
type Props = {
  city?: string
}
export const HeroSection = ({ city }: Props) => {
  const [beds, setBeds] = useState("2")
  const [baths, setBaths] = useState("2")
  const [phone, setPhone] = useState("") // New state for business logic

  const basePrice = 129
  const totalPrice = basePrice + parseInt(beds) * 30 + parseInt(baths) * 20

  const selectStyle =
    "appearance-none cursor-pointer rounded-2xl border-none bg-muted p-5 pr-12 font-bold outline-none ring-primary-blue focus:ring-2 transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%230066FF%22%20stroke-width%3D%223%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:18px] bg-[position:right_1.5rem_center]"

  // Styled specifically for text input to match the selects
  const inputStyle =
    "rounded-2xl border-none bg-muted p-5 font-bold outline-none ring-primary-blue focus:ring-2 transition-all placeholder:text-muted-foreground/50"

  return (
    <section className="relative flex min-h-screen items-center bg-background py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        {/* LEFT: The High-Conversion Offer */}
        <div className="space-y-8 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-xs font-black tracking-widest text-primary-blue uppercase">
            <Sparkles size={14} /> Available Today in Playa Vista
          </div>

          <h1 className="text-5xl leading-tight font-black tracking-tight text-foreground md:text-7xl">
            Regualr <br />
            <span className="text-primary-blue">
              Flat-Rate Clean
              <span className="text-primary-blue">
                {city ? " in " + city : ""}
              </span>
            </span>
          </h1>

          <p className="max-w-xl text-xl font-semibold text-muted-foreground">
            Custom Priority Clean. Your instructions. Our professinalism. Exact
            results. Fixed price. Same-day booking.
          </p>

          {/* THE CALCULATOR CARD */}
          <div className="max-w-2xl rounded-3xl border border-border bg-card p-2 shadow-2xl">
            {/* Changed to grid-cols-2 on mobile and 4 columns on desktop to fit the new field */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className={selectStyle}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Bedroom" : "Bedrooms"}
                  </option>
                ))}
              </select>

              <select
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className={selectStyle}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Bathroom" : "Bathrooms"}
                  </option>
                ))}
              </select>

              {/* NEW: Phone Number Field */}
              <input
                type="tel"
                placeholder="(310) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputStyle}
              />

              <button className="rounded-2xl bg-primary-blue py-5 text-lg font-black text-white transition-all hover:bg-primary-blue/90 active:scale-95 md:py-0">
                Book for ${totalPrice}
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <ShieldCheck className="text-accent-green" size={20} /> $1M
              Insurance
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <Zap className="text-accent-green" size={20} /> Same-Day
              Availability
            </div>
          </div>
        </div>

        {/* RIGHT: Modern Square Portrait */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-3xl border-8 border-card shadow-2xl">
            <Image
              src={AliciaPortrait}
              alt="Playa Cleaning Founder"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Satisfaction Badge */}
          <div className="absolute -right-6 -bottom-6 hidden rounded-3xl border border-border bg-background p-6 shadow-2xl md:block">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-green text-white">
                <Check size={28} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                  Guarantee
                </p>
                <p className="text-lg font-bold text-foreground">100% Happy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
