"use client"
import React from "react"
import {
  Wind,
  ShieldCheck,
  Heart,
  Sparkles,
  Clock,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Path to your assets
import AliciaPoster from "@/public/images/cleaning/hero-3.png"
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
      "relative flex flex-col justify-center overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 transition-all hover:shadow-lg md:p-8",
      className
    )}
  >
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue">
      <Icon size={24} />
    </div>
    <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
    <div className="leading-relaxed text-muted-foreground">{children}</div>
  </div>
)
type Props = {
  video?: string
}

export const WhyMeVideo = ({ video }: Props) => {
  const video_url = video ? video : "/videos/ol-deep.mp4"
  return (
    <section className="relative py-24 md:pt-60">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 w-full text-center">
          <h2 className="mb-32 text-4xl font-bold tracking-tight md:text-5xl">
            What You Get With <br />
            <span className="text-primary-blue">Playa Cleaning</span>
          </h2>
        </div>

        {/* GRID SETUP:
            We use 3 rows (md:grid-rows-3).
            The Video takes all 3 rows on the left.
            The Bento boxes are distributed to fill 3 rows on the right.
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 lg:gap-6">
          {/* Vertical Video Section - Rows 1, 2, and 3 */}
          <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-slate-900 md:col-span-2 md:row-span-3 md:aspect-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={AliciaPoster.src}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            >
              <source src={video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
              <p className="text-lg font-bold">Alicia - Founder</p>
              <p className="text-sm opacity-90">Watch our process</p>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT - STACKED TO MATCH VIDEO HEIGHT */}

          {/* Card 1 - Row 1 */}
          <BentoCard
            title="Cleaner Air & Less Dust"
            icon={Wind}
            className="md:col-span-1 md:row-span-1"
          >
            My professional equipment removes fine dust and allergens instead of
            blowing them back into the air.
          </BentoCard>
          <BentoCard
            title="Genuine Respect"
            icon={Heart}
            className="md:col-span-1 md:row-span-1"
          >
            I treat your home and pets as if they were my own.
          </BentoCard>

          {/* Card 2 - Row 2 */}
          <BentoCard
            title="Consistent Quality"
            icon={ShieldCheck}
            className="md:col-span-2 md:row-span-1"
          >
            No rotating teams, just me. I clean with the same elite standard
            every single visit.
          </BentoCard>

          {/* Cards 3 & 4 - Row 3 (Shared) */}
          <BentoCard
            title="Actually Feels Clean"
            icon={Sparkles}
            className="md:col-span-1 md:row-span-1"
          >
            A real, detailed clean you can feel.
          </BentoCard>

          <BentoCard
            title="Calm & Reliable"
            icon={Clock}
            className="md:col-span-1 md:row-span-1"
          >
            On-time arrival and clear communication.
          </BentoCard>

          {/* Card 5 - Bottom span (This will push to a new row if not handled, 
              so we'll actually put the 5th card as a full width under the others 
              OR we adjust the layout to be 3 rows total. 
              Below is the 3-row perfect-alignment version): */}
        </div>
      </div>
    </section>
  )
}
