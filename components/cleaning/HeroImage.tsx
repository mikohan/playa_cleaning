"use client"
import Image from "next/image"
import HeroImg from "@/public/images/cleaning/ImageBage.png"
import HeroImg2 from "@/public/images/cleaning/hero-2.png"

import { GoogleStars } from "./GoogleStars"
import { AvatarGroup } from "./AvatarGroup"
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"

export function HeroImage() {
  return (
    <section className="bg-gradient relative pt-8 md:pt-20 md:pb-32">
      <div className="absolute bottom-0 left-0 -z-10 h-[30%] w-full bg-linear-360 from-top-blur/50 to-background"></div>
      <div className="container mx-auto max-w-7xl px-6">
        {/* Wrapper for text and image */}
        <div className="justify-center md:flex">
          {/* Text and buttons section */}
          <div className="md:flex-1">
            <div className="inline-flex items-center gap-4">
              <AvatarGroup />
              <GoogleStars starsCount={5} rating="4.99/5" />
            </div>
            {/* Wrapper for text and button without rating */}
            <div className="flex flex-col md:w-full md:items-center">
              <RoughNotationGroup show={true}>
                <h1 className="font-gradient mt-4 text-3xl font-bold md:mt-8 md:text-5xl md:leading-14">
                  Residential{" "}
                  <RoughNotation
                    type="circle"
                    color="#51a2ff"
                    padding={1}
                    strokeWidth={2}
                  >
                    Cleaning{" "}
                  </RoughNotation>
                  With Real Attention to Details
                </h1>
              </RoughNotationGroup>
              <h2 className="font-blauerRegular mt-4 text-lg tracking-normal text-foreground/70 md:mt-8 md:text-2xl">
                I’m Alicia. I love cleaning, I love people, and I clean your
                home with the same care and precision I use in my own.
              </h2>
              <div className="mt-16 flex w-full items-center justify-center md:mt-20 md:gap-4">
                <CleaningModal />
                <ModalVideo />
              </div>
            </div>
          </div>
          {/* Image container wrapper */}
          <div className="mt-16 flex items-center justify-center md:mt-0 md:flex-1">
            <div className="relative aspect-702/812 w-full md:w-[80%]">
              <Image
                fetchPriority="high"
                src={HeroImg2}
                priority
                alt="some"
                className="rounded-4xl"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
