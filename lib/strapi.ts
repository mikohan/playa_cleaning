// lib/strapi.ts

export async function strapiRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const baseUrl = process.env.STRAPI_URL
  const token = process.env.STRAPI_API_TOKEN

  // Build query string manually to ensure keys (brackets) aren't double-encoded,
  // but values are safely URI encoded.
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
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    console.error("─── STRAPI FETCH ERROR ───")
    console.error(`Status: ${res.status} | URL: ${url}`)
    console.error(`Detail:`, JSON.stringify(errorBody, null, 2))
    throw new Error(`Strapi Error: ${res.status}`)
  }

  return res.json()
}
