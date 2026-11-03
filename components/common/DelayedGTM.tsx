"use client"

import { useEffect } from "react"

/**
 * Google Tag Manager, started after the page has finished loading.
 *
 * GTM (and the tags inside it: GA4, Meta Pixel, etc.) costs a phone ~3 s of
 * main-thread work. Loading it after `load` + idle keeps that work off the
 * critical path. It also starts on the first scroll/tap/key press, so it is
 * always running before a visitor can fill in a form.
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
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
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

    const afterLoad = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 3000 })
      else setTimeout(start, 2000)
    }

    interactions.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    )
    if (document.readyState === "complete") afterLoad()
    else window.addEventListener("load", afterLoad, { once: true })

    return () => {
      interactions.forEach((e) => window.removeEventListener(e, start))
      window.removeEventListener("load", afterLoad)
    }
  }, [gtmId])

  return null
}
