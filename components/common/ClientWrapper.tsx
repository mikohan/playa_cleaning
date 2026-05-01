"use client"
import ReactLenis from "lenis/react"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  // Client-side libraries like Lenis often handle their own mounting checks
  return <ReactLenis root>{children}</ReactLenis>
}
