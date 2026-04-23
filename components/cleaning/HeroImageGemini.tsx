"use client"
import Image from "next/image"
import HeroImg2 from "@/public/images/cleaning/hero-2.png"

import { GoogleStars } from "./GoogleStars"
import { AvatarGroup } from "./AvatarGroup"
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { WaveDividerBottom } from "../common/WaveDividerBottom"

export function HeroImageGemini() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
      {/* Background Gradient Detail */}
      <div className="absolute bottom-0 left-0 -z-10 h-[30%] w-full bg-linear-360 from-top-blur/50 to-background"></div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text Content: Centered on mobile, Left-aligned on Desktop */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Social Proof Row */}
            <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
              <AvatarGroup />
              <div className="hidden h-6 w-px bg-slate-200 sm:block" />
              <GoogleStars starsCount={5} rating="4.99/5" />
            </div>

            <RoughNotationGroup show={true}>
              <h1 className="font-blauerMedium mt-10 text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.1]">
                Residential{" "}
                <RoughNotation
                  type="circle"
                  color="var(--color-primary-blue)"
                  padding={6}
                  strokeWidth={3}
                >
                  Cleaning
                </RoughNotation>
                <span className="mt-3 block">
                  With Real Attention to Detail
                </span>
              </h1>
            </RoughNotationGroup>

            <p className="font-blauerRegular mt-8 max-w-xl text-lg leading-relaxed text-foreground/70 md:text-xl">
              I’m Alicia. I love cleaning and I love people. I’ll treat your
              home with the same care and precision I use in my own.
            </p>

            {/* CTA Container: Stacked on mobile, Row on tablet/desktop */}
            <div className="mt-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="w-full sm:w-auto">
                <CleaningModal />
              </div>
              <div className="w-full sm:w-auto">
                <ModalVideo />
              </div>
            </div>
          </div>

          {/* Visual Section: Responsive Image Box */}
          <div className="relative mt-8 flex justify-center lg:mt-0 lg:justify-end">
            {/* Decorative Glow */}
            <div className="absolute -inset-6 -z-10 rounded-full bg-blue-400/5 blur-3xl" />

            <div className="relative aspect-702/812 w-full max-w-lg overflow-hidden rounded-[2.5rem] shadow-2xs lg:max-w-none">
              <Image
                src={HeroImg2}
                alt="Professional Cleaning by Alicia"
                priority
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      <WaveDividerBottom fill="white" />
    </section>
  )
}
