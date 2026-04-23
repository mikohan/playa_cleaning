"use client"
import React from "react"

export const WaveDividerBottom = ({ fill = "white" }: { fill?: string }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block h-5 w-full md:h-10"
        style={{ fill: fill }}
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C41.4,14.63,89.58,34.1,133,48.16,173.12,61.1,235.61,72.3,321.39,56.44Z"></path>
      </svg>
    </div>
  )
}
