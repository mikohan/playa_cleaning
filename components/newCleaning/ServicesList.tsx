"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  ChevronRight,
} from "lucide-react"
import { servicePages } from "@/app/data/seo-data"
import { cn } from "@/lib/utils"
import AliciaImage from "@/public/images/cleaning/hero-4.png"

export default function ServicesList() {
  return (
    <div className="bg-background font-jakarta text-foreground">
      {/* 1. HERO SECTION: Editorial Intro with Alicia */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            {/* Alicia Image Block */}
            <div className="relative aspect-[4/5] w-full shrink-0 md:w-5/12">
              {/* Decorative Background Shape */}
              <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-primary-blue/5" />

              <Image
                src={AliciaImage}
                alt="Alicia - Lead Concierge"
                fill
                className="relative z-10 rounded-[2.5rem] object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
                priority
              />

              {/* Float Badge */}
              <div className="absolute -right-6 -bottom-6 z-20 max-w-[180px] rounded-3xl bg-footer p-6 text-white shadow-xl dark:border dark:border-border dark:bg-card">
                <div className="mb-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-accent-yellow stroke-0 text-accent-yellow"
                    />
                  ))}
                </div>
                <p className="text-xs leading-tight font-bold italic">
                  {`"Every service is supervised for 5-star quality."`}
                </p>
                <p className="mt-2 text-[10px] font-black tracking-widest text-accent-yellow uppercase">
                  — Alicia C.
                </p>
              </div>
            </div>

            {/* Content Block */}
            <div className="space-y-6 md:w-7/12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary-blue uppercase">
                <Sparkles size={14} className="fill-primary-blue stroke-0" />{" "}
                Los Angeles Premier Care
              </div>

              <h1 className="text-5xl leading-[0.9] font-bold tracking-tighter md:text-7xl">
                Professional <br />
                <span className="text-primary-blue italic">Care</span> for every{" "}
                <br />
                environment.
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                From luxury residences in Santa Monica to creative studios in
                DTLA, our specialized teams provide the meticulous attention
                your space deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="relative py-20">
        {/* CSS Background Graphics - No hardcoded colors */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary-blue/10 blur-[100px]" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-yellow/5 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-primary-blue/30 hover:shadow-2xl"
              >
                {/* Visual Accent on Hover */}
                <div className="absolute -top-10 -right-10 h-32 w-32 scale-0 rounded-full bg-primary-blue/5 transition-transform duration-700 group-hover:scale-100" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="rounded-full bg-primary-blue/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary-blue uppercase">
                      {service.intent.split("/")[1] || "Service"}
                    </div>
                    <span className="text-4xl font-black italic opacity-10">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-blue">
                    {service.page}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground opacity-80">
                    {service.bodyText}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-border pt-6">
                  <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-2">
                    View Details{" "}
                    <ChevronRight size={14} className="text-primary-blue" />
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-footer text-white transition-colors group-hover:bg-primary-blue">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MINIMALIST TRUST BANNER */}
      <section className="pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-footer p-12 text-white dark:border dark:border-border dark:bg-card">
            {/* SVG Graphic using currentStroke/Fill */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 100 C 20 0 50 0 100 100"
                  stroke="currentColor"
                  strokeWidth="0.1"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Not sure which service fits?
                </h2>
                <p className="font-medium opacity-60">
                  Alicia is available for custom site walks and enterprise
                  quotes.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
                <ShieldCheck className="text-accent-green" size={24} />
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-40">
                    Fully Bonded
                  </p>
                  <p className="text-sm font-bold">Playa Licensed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
