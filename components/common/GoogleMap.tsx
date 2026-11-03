"use client"

import React, { useRef } from "react"
import { useNearViewport } from "@/hooks/useNearViewport"
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps"

interface GoogleMapProps {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export default function GoogleMap({
  lat,
  lng,
  zoom = 12,
  className = "h-[400px] w-full",
}: GoogleMapProps) {
  // Use your environment variable for the API Key
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  // Google Maps is ~300 KB of script: load it only when the map is near the screen
  const wrapRef = useRef<HTMLDivElement>(null)
  const near = useNearViewport(wrapRef, "300px")

  if (!API_KEY) {
    return (
      <div
        className={
          className +
          " flex items-center justify-center bg-muted text-xs tracking-widest uppercase"
        }
      >
        Missing Map API Key
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl ${className}`}
    >
      {near && (
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat, lng }}
          defaultZoom={zoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true} // Keeps it clean and minimalist
          mapId={process.env.NEXT_PUBLIC_MAP_ID || "6a451bb00a24b407def5ccb2"} // Required for AdvancedMarker
          className="h-full w-full"
        >
          <AdvancedMarker position={{ lat, lng }}>
            <Pin
              background={"#0070f3"} // Your primary-blue
              glyphColor={"#ffffff"}
              borderColor={"#0051af"}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
      )}
    </div>
  )
}
