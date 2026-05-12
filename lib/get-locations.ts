// lib/get-locations.ts
import { LocationDataResponse, LocationRecord } from "@/app/types/locationTypes"

export async function getFooterLocations(): Promise<LocationRecord[]> {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"

  try {
    const res = await fetch(`${STRAPI_URL}/api/locations?sort=city_name:asc`, {
      next: { revalidate: 3600 },
    })

    const response: LocationDataResponse = await res.json()

    // Return the array of records, or an empty array if data is missing
    return response.data || []
  } catch (error) {
    console.error("Error fetching footer locations:", error)
    return []
  }
}
