import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Award,
  Star,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AliciaImage from "@/public/images/cleaning/hero-4.webp"
import { GoogleStars } from "../cleaning/GoogleStars"
import { CleaningModal } from "@/components/offers/CleaningModal"
import { LogoTicker } from "../cleaning/LogoTicker"
interface ServiceSection {
  category: string
  items: string[]
}

interface WhatIncludedProps {
  data: {
    hero?: {
      badge: string
      headline: string
      subheadline: string
    }
    included: {
      title: string
      sections: ServiceSection[]
    }
    excluded: {
      title: string
      items: string[]
      upsellNote: string
    }
  }
}

export function HeroImage({ data }: WhatIncludedProps) {
  return (
    <section className="bg-background text-foreground transition-colors duration-300">
      {/* 1. Breadcrumbs */}
      <nav className="container mx-auto max-w-6xl px-4 py-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-primary-blue"
            >
              Home
            </Link>
          </li>
          <ChevronRight size={14} />
          <li>
            <Link
              href="/services"
              className="text-nowrap transition-colors hover:text-primary-blue"
            >
              Cleaning Services
            </Link>
          </li>
          <ChevronRight size={14} />
          <li className="truncate font-medium text-foreground">
            Premium Offer
          </li>
        </ol>
      </nav>

      {/* 2. Split Hero Section */}
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-1.5 text-sm font-bold tracking-wide text-primary-blue">
              <Star size={14} fill="currentColor" />{" "}
              {data.hero?.badge || "Exclusive Local Offer"}
            </div>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-6xl">
              {data.hero?.headline || "Premium Cleaning for Your Home"}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {data.hero?.subheadline ||
                "Experience a deeper level of clean with our specialized tools and professional team."}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {/* <button className="rounded-2xl bg-primary-blue px-8 py-4 font-bold text-white shadow-lg shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-95">
                Book This Offer
              </button> */}
              {/* <ButtonShiny text="Book This Offer" /> */}
              <CleaningModal text="Book This Offer" />
              <div className="ml-2 flex items-center -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-background bg-muted"
                  >
                    <Image
                      src={`/images/cleaning/ava${i}.png`}
                      alt="Client"
                      width={40}
                      height={40}
                      sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 5vw"
                    />
                  </div>
                ))}
                <p className="pl-6 text-sm font-medium text-muted-foreground">
                  <GoogleStars rating="4.99" starsCount={5} size={16} />
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Image of Alicia */}
          <div className="relative aspect-4/5 w-full flex-1 lg:aspect-square">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={AliciaImage}
                alt="Alicia from Playa Cleaning"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Trust Badge Floating on Image */}
              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 shadow-sm backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
                <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                  Available This Week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-top-blur/40">
        <LogoTicker />
      </div>

      {/* 4. Scope Grid (Included/Excluded) */}
      <div className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Included */}
          <div className="rounded-3xl border border-accent-green/20 bg-accent-green/5 p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent-green">
              <CheckCircle2 size={24} /> {data.included.title}
            </h2>
            <div className="space-y-8">
              {data.included.sections.map((section) => (
                <div key={section.category}>
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground">
                    <span className="h-4 w-1 rounded-full bg-accent-green" />
                    {section.category}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 leading-tight"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-accent-green"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Excluded & Tips */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <XCircle className="text-muted-foreground/60" size={24} />{" "}
                {data.excluded.title}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {data.excluded.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 opacity-70">
                    <XCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-muted-foreground"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-primary-blue/20 bg-primary-blue/5 p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3 text-primary-blue">
                <Clock size={24} />
                <h3 className="text-xl font-bold">Pro Tip:</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground italic">
                {data.excluded.upsellNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
