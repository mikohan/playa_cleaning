"use client"

import { useRef, useState } from "react"
import { preload } from "react-dom"
import { Volume2, VolumeX } from "lucide-react"

interface ProjectVideoPlayerProps {
  src: string
  type: string
  poster?: string
  label: string
}

/**
 * Job video: the cover loads with the page, the video file loads only on the first tap.
 * Big play button in the middle (like the review videos on Angara Steamers); playback
 * starts with sound; tapping the video pauses it; a small button toggles the sound.
 */
export function ProjectVideoPlayer({ src, type, poster, label }: ProjectVideoPlayerProps) {
  if (poster) preload(poster, { as: "image", fetchPriority: "high" })
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const toggle = async () => {
    const v = ref.current
    if (!v) return
    if (!started) {
      setStarted(true)
      v.src = src // attach the file only now, so nothing downloads before the tap
      v.load()
    }
    if (v.paused) {
      v.muted = muted
      try {
        await v.play()
      } catch {
        // A browser that refuses sound still plays the video, muted
        v.muted = true
        setMuted(true)
        await v.play().catch(() => undefined)
      }
    } else {
      v.pause()
    }
  }

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className="h-full w-full cursor-pointer object-cover"
        poster={poster}
        preload="none"
        playsInline
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        aria-label={label}
        data-type={type}
      />

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play video: ${label}`}
          className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary-blue/70 ring-8 ring-white/25 backdrop-blur-sm transition-transform duration-300 hover:scale-110 md:h-28 md:w-28"
        >
          <svg viewBox="0 0 24 24" className="ml-1.5 h-11 w-11 fill-white md:h-12 md:w-12" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        </button>
      )}

      {started && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute right-3 bottom-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </div>
  )
}
