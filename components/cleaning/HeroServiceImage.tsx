"use client"
import Image, { StaticImageData } from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import { ServiceData } from "@/app/types/serviceTypes" // Adjust path to your interfaces
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"

interface ServiceHeroProps {
  service: ServiceData
  heroImage: StaticImageData | string
  professionalName: string
  buttonText?: string
}

export const HeroServiceImage = ({
  service,
  heroImage,
  professionalName,
  buttonText,
}: ServiceHeroProps) => {
  const features = [
    "Eco-friendly Products",
    "Verified Professionals",
    "Satisfaction Guaranteed",
    "Flexible Scheduling",
  ]
  return (
    <section className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:items-start">
      {/* --- Left Side: Content --- */}
      <div className="lg:col-span-7">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
          <span className="text-xs font-black tracking-widest uppercase">
            Premium Service
          </span>
        </div>

        <h1 className="mb-6 text-5xl leading-tight font-black tracking-tight text-foreground md:text-7xl">
          {service.header || service.name}
        </h1>

        <p className="mb-8 text-xl font-bold text-primary-blue">
          {service.subheader}
        </p>

        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {service.meta_description}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-sm font-bold text-foreground/80"
            >
              <CheckCircle2 size={18} className="text-primary-blue" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-16 flex w-full flex-col items-center gap-4 sm:flex-row">
          <CleaningModal text={buttonText} />
          <ModalVideo />
        </div>
      </div>

      {/* --- Right Side: Sticky Sidebar Card --- */}
      <div className="lg:sticky lg:top-24 lg:col-span-5">
        <div className="relative aspect-4/5 overflow-hidden rounded-[40px] border border-border shadow-2xl shadow-primary-blue/5">
          <Image
            src={heroImage}
            alt={professionalName}
            fill
            className="object-cover"
            priority // High priority as it's above the fold
            sizes="(min-width: 1540px) 610px, (min-width: 1280px) 504px, (min-width: 1040px) 397px, (min-width: 780px) 766px, (min-width: 740px) 638px, calc(96.19vw - 55px)"
          />

          {/* Glassmorphism Badge */}
          <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
                  Expert Lead
                </p>
                <p className="text-xl font-black">{professionalName}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex gap-0.5 text-accent-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-[10px] font-bold uppercase">
                  Top Rated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
