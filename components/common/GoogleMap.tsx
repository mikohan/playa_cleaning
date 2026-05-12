"use client"

import React from "react"
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
      className={`relative overflow-hidden rounded-3xl border border-border shadow-2xl ${className}`}
    >
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
    </div>
  )
}
