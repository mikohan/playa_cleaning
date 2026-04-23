"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { PartyPopper, ArrowRight, CheckCircle2, Phone } from "lucide-react"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"

export default function ThankYouPage() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: Portrait Section - Clean Square with subtle rounding */}
            <div className="relative aspect-square bg-muted md:aspect-auto">
              <Image
                src={AliciaPortrait}
                alt="Olesya Vostrikova"
                fill
                className="object-cover"
                priority
              />
              {/* Simple Gradient Overlay for text legibility at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent md:hidden" />
            </div>

            {/* RIGHT: Content Section */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="space-y-6">
                {/* Status Header */}
                <div className="flex items-center gap-2 text-primary-blue">
                  <PartyPopper size={20} />
                  <span className="text-xs font-black tracking-widest uppercase">
                    Quote Request Received
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-5xl">
                  Thanks! We&apos;ve <br />
                  <span className="text-primary-blue">Got You Covered.</span>
                </h1>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Alicia and the team are reviewing your details now. We will
                  reach out via text or phone shortly with your custom price
                  estimate.
                </p>

                {/* Next Steps List - Clean and Minimal */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent-green/10 p-1 text-accent-green">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm font-medium">
                      Detailed room-by-room review
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent-green/10 p-1 text-accent-green">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm font-medium">
                      Text confirmation in ~15 mins
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-6 sm:flex-row">
                  <Link
                    href="/"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-blue py-4 text-sm font-bold text-white transition-all hover:bg-primary active:scale-95"
                  >
                    Return Home
                    <ArrowRight size={18} />
                  </Link>
                  <a
                    href="tel:2135987763"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background py-4 text-sm font-bold transition-all hover:bg-muted"
                  >
                    <Phone size={18} className="text-primary-blue" />
                    (213) 598-77-63
                  </a>
                </div>

                {/* Social/Trust Link */}
                <div className="flex items-center justify-between border-t border-border pt-8">
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Playa Vista & Los Angeles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
