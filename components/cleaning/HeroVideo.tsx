"use client"
import dynamic from "next/dynamic"
import { GoogleStars } from "./GoogleStars"
import { AvatarGroup } from "./AvatarGroup"
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"

// Optimized Dynamic Import with Loading Skeleton
const VideoComponent = dynamic(
  () => import("./VideoComponent").then((mod) => mod.VideoComponent),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-1080/1350 w-full animate-pulse rounded-4xl bg-slate-200" />
    ),
  }
)

function HeroVideo() {
  return (
    <section className="bg-gradient py-8 md:py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
          {/* Text Content */}
          <div className="text-center md:flex-1 md:text-left">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <GoogleStars starsCount={5} rating="" />
                <AvatarGroup />
              </div>

              <RoughNotationGroup show={true}>
                <h1 className="font-gradient mt-4 text-3xl font-bold md:mt-12 md:text-5xl md:leading-tight">
                  Residential{" "}
                  <RoughNotation
                    type="circle"
                    color="#51a2ff"
                    padding={8} // Increased padding to prevent overlap with text
                    strokeWidth={3}
                  >
                    Cleaning
                  </RoughNotation>
                  <br className="hidden md:block" /> With Real Attention to
                  Details
                </h1>
              </RoughNotationGroup>

              <h2 className="font-blauerRegular mt-6 max-w-xl text-lg text-slate-600 md:text-2xl">
                I’m Alicia. I love cleaning, I love people, and I clean your
                home with the same care and precision I use in my own.
              </h2>

              <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row">
                <CleaningModal />
                <ModalVideo />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="flex w-full items-center justify-center md:flex-1">
            <div className="relative aspect-1080/1350 w-full max-w-[450px] overflow-hidden rounded-4xl shadow-2xl">
              <VideoComponent
                source="/videos/ol-deep.mp4"
                width="1080"
                height="1350" // Fixed typo from 'heigh'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroVideo }
