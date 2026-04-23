"use client"
import React from "react"
import Image from "next/image"
import {
  Wind,
  ShieldCheck,
  Heart,
  Sparkles,
  Clock,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Replace with the actual path to your photo
import AliciaPhoto from "@/public/images/cleaning/hero-3.png"
import { WaveDivider } from "../common/WaveDivider"

const BentoCard = ({
  children,
  className,
  title,
  icon: Icon,
}: {
  children: React.ReactNode
  className?: string
  title: string
  icon: LucideIcon
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 transition-all hover:shadow-lg md:p-8",
      className
    )}
  >
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue">
      <Icon size={24} />
    </div>
    <h3 className="font-blauerMedium mb-2 text-xl font-bold text-foreground">
      {title}
    </h3>
    <div className="font-blauerRegular leading-relaxed text-muted-foreground">
      {children}
    </div>
  </div>
)

export const WhyMe = () => {
  return (
    <section className="relative py-24 md:pt-60">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto px-6">
        <div className="mb-16 w-full text-center">
          <h2 className="font-blauerMedium mb-32 text-4xl font-bold tracking-tight md:text-5xl">
            What You Get With <br />
            <span className="text-primary-blue">Playa Cleaning</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 lg:gap-6">
          {/* Main Photo - Alicia */}
          <div className="relative h-100 overflow-hidden rounded-3xl bg-slate-100 md:col-span-2 md:row-span-2 md:h-auto">
            <Image
              src={AliciaPhoto}
              alt="Alicia - Founder of Playa Cleaning"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            {/* Overlay Label */}
            <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
              <p className="font-blauerMedium text-lg font-bold">
                Alicia - Owner of Playa Cleaning
              </p>
              <p className="text-sm opacity-90">
                Professional Cleaner & Founder
              </p>
            </div>
          </div>

          {/* Benefit 1: HEPA Air (Wide) */}
          <BentoCard
            title="Cleaner Air & Less Dust"
            icon={Wind}
            className="md:col-span-2"
          >
            My professional equipment removes fine dust, allergens, and pet
            dander instead of blowing them back into the air. You’ll notice less
            dust settling and easier breathing.
          </BentoCard>

          {/* Benefit 2: Consistency */}
          <BentoCard
            title="Consistent Quality"
            icon={ShieldCheck}
            className="md:col-span-2"
          >
            No “good one time, rushed the next.” I clean with the same elite
            standard every single visit. No rotating teams, just me.
          </BentoCard>

          {/* Benefit 3: Detailed Clean (Tall) */}
          <BentoCard
            title="Actually Feels Clean"
            icon={Sparkles}
            className="md:row-span-1"
          >
            Not just wiped surfaces—a real, detailed clean you can feel the
            moment you walk in.
          </BentoCard>

          {/* Benefit 4: Reliable Experience */}
          <BentoCard
            title="Calm & Reliable"
            icon={Clock}
            className="md:row-span-1"
          >
            On-time arrival, clear communication, and exact following of your
            instructions. No stress, no surprises.
          </BentoCard>

          {/* Benefit 5: Respect & Care */}
          <BentoCard
            title="Genuine Respect"
            icon={Heart}
            className="md:col-span-2"
          >
            Your belongings, your pets, and your routines are handled with
            genuine care. I treat your home as if it were my own.
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
