"use client"
import dynamic from "next/dynamic"
import { GoogleStars } from "./GoogleStars"
import { AvatarGroup } from "./AvatarGroup"
import { CleaningModal } from "../common/CleaningModal"
import { ModalVideo } from "../common/ModalVideo"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"

const VideoComponent = dynamic(
  () => import("./VideoComponent").then((mod) => mod.VideoComponent),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[9/16] w-full animate-pulse rounded-4xl bg-slate-200" />
    ),
  }
)

interface HeroVideoProps {
  title: string
  subtitle: string
  highlightIndex?: number
  showNotation?: boolean
}

function HeroVideo({
  title,
  subtitle,
  highlightIndex = 1,
  showNotation = true,
}: HeroVideoProps) {
  const words = (title || "").split(" ")

  if (!title) return null

  return (
    <section className="bg-gradient py-8">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
          {/* Text Content */}
          <div className="text-center md:flex-1 md:text-left">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <GoogleStars size={20} starsCount={5} rating="4.9" />
                <AvatarGroup />
              </div>

              <RoughNotationGroup show={showNotation}>
                <h1 className="font-gradient mt-4 text-3xl font-bold md:mt-12 md:text-6xl md:leading-tight">
                  {words.map((word, index) => (
                    <span key={index}>
                      {index === highlightIndex ? (
                        <RoughNotation
                          type="circle"
                          color="#51a2ff"
                          padding={8}
                          strokeWidth={3}
                        >
                          {word}
                        </RoughNotation>
                      ) : (
                        word
                      )}
                      {index < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </h1>
              </RoughNotationGroup>

              <h2 className="mt-6 max-w-xl text-lg text-foreground/70 md:text-lg">
                {subtitle}
              </h2>

              <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row">
                <CleaningModal />
                <ModalVideo />
              </div>
            </div>
          </div>

          {/* Media Section - 9:16 Ratio */}
          <div className="flex w-full items-center justify-center md:flex-1">
            <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-4xl shadow-2xl">
              <VideoComponent
                source="/videos/ol-deep.mp4"
                // Ensure your internal VideoComponent uses object-cover
                // to fill this 9:16 container without distortion
                width="1080"
                height="1920"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroVideo }
