"use client"

import { useEffect } from "react"

/**
 * Google Tag Manager, started on the visitor's first scroll/tap/key press,
 * or after 15 s on the page, whichever comes first.
 *
 * GTM (and the tags inside it: GA4, Meta Pixel, etc.) costs a phone ~3 s of
 * main-thread work. Starting it on first interaction keeps that work out of
 * page load completely. A visitor has to tap the form to fill it in, so GTM
 * is always running before any form can be submitted.
 *
 * Events pushed to window.dataLayer before GTM starts are queued and
 * processed by GTM as soon as it loads, so no conversions are lost.
 */
export function DelayedGTM({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    if (!gtmId) return
    const w = window as Window & {
      dataLayer?: Record<string, unknown>[]
      __gtmStarted?: boolean
    }

    const interactions = ["scroll", "pointerdown", "keydown", "touchstart"]

    const start = () => {
      if (w.__gtmStarted) return
      w.__gtmStarted = true
      interactions.forEach((e) => window.removeEventListener(e, start))
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
      const s = document.createElement("script")
      s.async = true
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
      document.head.appendChild(s)
    }

    // Backup for visitors who read without touching the page
    const timer = window.setTimeout(start, 15000)

    interactions.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    )

    return () => {
      window.clearTimeout(timer)
      interactions.forEach((e) => window.removeEventListener(e, start))
    }
  }, [gtmId])

  return null
}
