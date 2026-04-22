type props = {
  source: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  width?: string
  heigh?: string
}
export function VideoComponent({
  source,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  heigh = "1280",
}: props) {
  return (
    <video
      width={width}
      height={heigh}
      controls
      preload="auto"
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className="rounded-2xl"
      playsInline
    >
      <source src={source} type="video/mp4" />
      <track
        // src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  )
}
