"use client"
import dynamic from "next/dynamic"

import { GoogleStars } from "./GoogleStars"
import { AvatarGroup } from "./AvatarGroup"
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
// import { VideoComponent } from "../VideoComponent";
// Load the video component without SSR to save main thread time
const VideoComponent = dynamic(
  () => import("./VideoComponent").then((mod) => mod.VideoComponent),
  {
    ssr: false,
  }
)

function HeroVideo() {
  return (
    <section className="bg-gradient pt-8 pb-16 md:pt-16">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Wrapper for text and image */}
        <div className="justify-center md:flex">
          {/* Text and buttons section */}
          <div className="text-center md:flex-1">
            <div className="inline-flex items-center md:flex-col md:gap-2">
              <GoogleStars starsCount={5} rating="" />
              <AvatarGroup />
            </div>
            {/* Wrapper for text and button without rating */}
            <div className="flex flex-col md:w-full md:items-center">
              <RoughNotationGroup show={true}>
                <h1 className="font-gradient mt-4 text-3xl font-bold md:mt-32 md:text-5xl md:leading-14">
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
              <h2 className="font-blauerRegular text-couchDarkBlue/70 mx-8 mt-4 text-lg tracking-normal md:mt-8 md:text-2xl">
                I’m Alicia. I love cleaning, I love people, and I clean your
                home with the same care and precision I use in my own.
              </h2>
              <div className="mt-16 w-full md:mt-40 md:flex md:items-center md:gap-4">
                <CleaningModal />
                <ModalVideo />
              </div>
            </div>
          </div>
          {/* Image container wrapper */}
          <div className="mt-16 flex items-center justify-center md:mt-0 md:flex-1">
            <div className="relative aspect-1080/1350 w-full md:w-[80%]">
              <VideoComponent
                source="/videos/LandPage1.mp4"
                width="1080"
                heigh="1350"
              />

              {/* <Image
                fetchPriority="high"
                src={VideoImage}
                priority
                alt="some"
                className="rounded-4xl"
                fill
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export { HeroVideo }
