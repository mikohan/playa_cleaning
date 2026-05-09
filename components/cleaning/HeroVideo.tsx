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
      <div className="aspect-1080/1350 w-full animate-pulse rounded-4xl bg-slate-200" />
    ),
  }
)

interface HeroVideoProps {
  title: string // The H1 text
  subtitle: string // The H2 text
  highlightIndex?: number // The word index to circle (0-based)
  showNotation?: boolean // Toggle for RoughNotation
}

function HeroVideo({
  title,
  subtitle,
  highlightIndex = 1,
  showNotation = true,
}: HeroVideoProps) {
  // Split the title into words to apply notation to a specific one
  // Safe check: if title is somehow null or undefined, split doesn't blow up
  const words = (title || "").split(" ")

  // If title is empty, we don't want to render a broken H1
  if (!title) return null

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

          {/* Media Section */}
          <div className="flex w-full items-center justify-center md:flex-1">
            <div className="relative aspect-1080/1350 w-full max-w-150 overflow-hidden rounded-4xl shadow-2xl">
              <VideoComponent
                source="/videos/ol-deep.mp4"
                width="1080"
                height="1350"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroVideo }
