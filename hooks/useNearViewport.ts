"use client"

import { RefObject, useEffect, useState } from "react"

/**
 * true once the element has come within `margin` of the screen.
 * Stays true after that (used to mount heavy widgets only when needed).
 */
export function useNearViewport<T extends Element>(
  ref: RefObject<T | null>,
  margin = "400px"
): boolean {
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (near) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: `${margin} 0px` }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near, ref, margin])

  return near
}
