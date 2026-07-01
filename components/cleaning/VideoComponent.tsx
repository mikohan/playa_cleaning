import AliciaImage from "@/public/images/cleaning/hero-4.webp"

interface VideoComponentProps {
  source: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  width?: string
  height?: string
}
export function VideoComponent({
  source,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280",
}: VideoComponentProps) {
  return (
    // This wrapper handles the "padding" logic
    <div className="relative h-full w-full p-1">
      <video
        width={width}
        height={height}
        controls
        preload="auto"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        // object-cover ensures it fills the aspect ratio correctly
        className="h-full w-full rounded-2xl object-cover"
        playsInline
        poster={AliciaImage.src}
      >
        <source src={source} type="video/mp4" />
        <track kind="subtitles" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
