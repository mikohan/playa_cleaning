import { getImageProps } from "next/image"
import { preload } from "react-dom"
import AliciaImage from "@/public/images/cleaning/hero-4.webp"
import { LazyVideo, VideoSource } from "@/components/common/LazyVideo"

// Poster through the Next image optimizer: right size + modern format
// getImageProps gives "url 1x, url 2x": take the 1x (640px) one
const { props: posterProps } = getImageProps({
  src: AliciaImage,
  alt: "",
  width: 640,
  quality: 75,
})
const optimizedPoster =
  posterProps.srcSet?.split(",")[0]?.trim().split(" ")[0] || posterProps.src

interface VideoComponentProps {
  source_webm?: string
  source_mp4: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  width?: string
  height?: string
  poster?: string
  strategy?: "afterLoad" | "inView" | "now"
}

export function VideoComponent({
  source_webm,
  source_mp4,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280",
  poster = optimizedPoster,
  strategy = "inView",
}: VideoComponentProps) {
  // The hero poster is the biggest thing on screen: ask for it early
  if (strategy === "afterLoad" && poster) {
    preload(poster, { as: "image", fetchPriority: "high" })
  }

  const sources: VideoSource[] = [
    ...(source_webm ? [{ src: source_webm, type: "video/webm" }] : []),
    { src: source_mp4, type: "video/mp4" },
  ]

  return (
    <div className="relative h-full w-full p-1">
      <LazyVideo
        sources={sources}
        poster={poster}
        width={width}
        height={height}
        controls
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        strategy={strategy}
        className="h-full w-full rounded-2xl object-cover"
      />
    </div>
  )
}
