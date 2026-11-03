"use client"

import { useEffect, useRef, useState } from "react"

export interface VideoSource {
  src: string
  type: string
}

interface LazyVideoProps {
  sources: VideoSource[]
  poster?: string
  className?: string
  width?: string | number
  height?: string | number
  controls?: boolean
  loop?: boolean
  muted?: boolean
  autoPlay?: boolean
  /**
   * "afterLoad": start downloading once the page has finished loading
   *              (use for the hero video above the fold).
   * "inView":    start downloading when the video gets close to the screen.
   * "now":       start right away (use for videos opened by the user).
   */
  strategy?: "afterLoad" | "inView" | "now"
}

/**
 * <video> that renders only the poster on first paint and attaches the video
 * sources later, so big video files never compete with the page itself.
 */
export function LazyVideo({
  sources,
  poster,
  className,
  width,
  height,
  controls = false,
  loop = true,
  muted = true,
  autoPlay = true,
  strategy = "inView",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(strategy === "now")

  useEffect(() => {
    if (active) return
    const el = ref.current
    if (!el) return

    // Respect "save data" and reduced-motion: keep the poster, load on tap
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (nav.connection?.saveData || reduceMotion) {
      const onPlay = () => setActive(true)
      el.addEventListener("play", onPlay, { once: true })
      el.addEventListener("click", onPlay, { once: true })
      return () => {
        el.removeEventListener("play", onPlay)
        el.removeEventListener("click", onPlay)
      }
    }

    if (strategy === "afterLoad") {
      const start = () => {
        const ric = (
          window as Window & {
            requestIdleCallback?: (cb: () => void, o?: object) => number
          }
        ).requestIdleCallback
        if (ric) ric(() => setActive(true), { timeout: 2500 })
        else setTimeout(() => setActive(true), 1500)
      }
      if (document.readyState === "complete") start()
      else window.addEventListener("load", start, { once: true })
      return () => window.removeEventListener("load", start)
    }

    // inView
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [active, strategy])

  // Sources were just attached: load and (if wanted) start playing
  useEffect(() => {
    if (!active) return
    const el = ref.current
    if (!el) return
    el.load()
    if (autoPlay) el.play().catch(() => {})
  }, [active, autoPlay])

  return (
    <video
      ref={ref}
      width={width}
      height={height}
      poster={poster}
      className={className}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline
      preload={active ? "auto" : "none"}
    >
      {active &&
        sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </video>
  )
}
