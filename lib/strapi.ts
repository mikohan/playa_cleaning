import { ServiceData, StrapiResponse } from "@/app/types/serviceTypes"

/**
 * Core request helper for Strapi API
 */
export async function strapiRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const baseUrl = process.env.STRAPI_URL
  const token = process.env.STRAPI_API_TOKEN

  if (!baseUrl || !token) {
    throw new Error("Missing Strapi Environment Variables (URL or Token)")
  }

  const query = params
    ? "?" +
      Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&")
    : ""

  const url = `${baseUrl}/api/${endpoint}${query}`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!res.ok) {
    const errorLog = await res.json().catch(() => ({}))
    console.error("Strapi Request Failed:", {
      url,
      status: res.status,
      errorLog,
    })
    throw new Error(`Strapi Error: ${res.status}`)
  }

  return res.json()
}

/**
 * Fetch a single service by slug with all relations (FAQ, Photo, Addons)
 */
export async function getServiceBySlug(
  slug: string
): Promise<ServiceData | null> {
  const response = await strapiRequest<StrapiResponse<ServiceData>>(
    "services",
    {
      "filters[slug][$eq]": slug,
      populate: "*", // CRITICAL: This fetches your photo and arrays
    }
  )

  if (!response?.data || response.data.length === 0) return null

  const item = response.data[0]

  // Flattening: prioritize attributes (v4) or fallback to root (v5/flattened)
  return {
    ...item,
    ...(item.attributes ? item.attributes : {}),
  } as ServiceData
}

/**
 * Fetch all slugs for generateStaticParams
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  const response = await strapiRequest<
    StrapiResponse<Pick<ServiceData, "slug">>
  >("services", {
    "fields[0]": "slug",
    "pagination[pageSize]": 100,
  })

  if (!response?.data) return []

  return response.data.map((item) => {
    const data = item.attributes ? item.attributes : item
    return data.slug
  })
}
