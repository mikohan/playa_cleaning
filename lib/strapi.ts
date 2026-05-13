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

export async function getAllServices(): Promise<ServiceData[]> {
  try {
    const servicesRes = await strapiRequest<StrapiResponse<ServiceData>>(
      "services",
      {
        // Using string keys for fields as per your previous pattern
        "fields[0]": "name",
        "fields[1]": "slug",
        "fields[2]": "meta_description",
        "pagination[pageSize]": 25,
      }
    )

    if (!servicesRes?.data) return []

    // Map and flatten using your unified response interface
    return servicesRes.data.map((item) => {
      // If attributes exist (v4), spread them; otherwise use the item directly (v5)
      const flatData = item.attributes ? { ...item, ...item.attributes } : item

      return {
        id: item.id,
        documentId: flatData.documentId,
        name: flatData.name,
        slug: flatData.slug,
        meta_description: flatData.meta_description,
        // Add defaults for other required ServiceData fields to satisfy the interface
        header: flatData.header || "",
        subheader: flatData.subheader || "",
        seo_text_rich: flatData.seo_text_rich || "",
      } as ServiceData
    })
  } catch (error) {
    console.error("❌ Error fetching services for ticker:", error)
    return []
  }
}

// lib/strapi.ts

/**
 * Fetches a Strapi Single Type.
 * Returns a Promise that resolves to the data object or null if not found.
 */
/**
 * Fetches a Strapi Single Type.
 * Returns a Promise that resolves to the data object or null.
 */
// lib/strapi.ts
import { AboutPageData } from "@/app/types/aboutTypes" // Adjust path as needed

export async function getSingleType<T>(contentType: string): Promise<T | null> {
  const baseUrl = process.env.STRAPI_URL
  const token = process.env.STRAPI_API_TOKEN

  if (!baseUrl || !token) {
    console.error(
      "Strapi configuration missing: Check STRAPI_URL and STRAPI_API_TOKEN"
    )
    return null
  }

  const url = `${baseUrl}/api/${contentType}?populate=*`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.error(
        `Strapi Request Failed: ${contentType} | Status: ${res.status}`
      )
      return null
    }

    // Explicitly typing the JSON response based on the Strapi v5 structure
    const json: { data: T | null } = await res.json()

    return json.data ?? null
  } catch (error) {
    console.error(`Network Error fetching Strapi ${contentType}:`, error)
    return null
  }
}
