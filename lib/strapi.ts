const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export async function queryStrapi(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    // This ensures Next.js gets fresh data, but you can change
    // to { next: { revalidate: 3600 } } for 1-hour caching
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Strapi Fetch Error: ${res.statusText}`)
  }

  return await res.json()
}
