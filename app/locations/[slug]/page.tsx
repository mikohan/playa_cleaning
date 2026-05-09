import { notFound } from "next/navigation"
import Image from "next/image"
import { strapiRequest } from "@/lib/strapi"
import LocationNeighbors from "@/components/cleaning/LocationNighbors"
import {
  LocationRecord,
  LocationDataResponse,
  LocationNeighbor,
  FAQLocation,
} from "@/app/types/locationTypes"
import { Navbar } from "@/components/common/Navbar"

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.playacleaning.com"

// ─────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────

const LOCATION_POPULATE_PARAMS = {
  // Explicit Media Population (Avoids 'related' validation error)
  "populate[location_image][fields][0]": "url",
  "populate[location_image][fields][1]": "alternativeText",

  // Explicit Component Population
  "populate[left_col][populate][location_image][fields][0]": "url",
  "populate[right_col][populate][location_image][fields][0]": "url",

  // NOTE: faq_location and coordinates are JSON attributes.
  // DO NOT add them to populate; they are returned by default.
} as const

// ─────────────────────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const response = await strapiRequest<LocationDataResponse>("locations", {
      "fields[0]": "slug",
    })
    return response.data.map((loc) => ({ slug: loc.slug }))
  } catch (error) {
    return []
  }
}

async function getLocationData(slug: string): Promise<LocationRecord | null> {
  try {
    const response = await strapiRequest<LocationDataResponse>("locations", {
      "filters[slug][$eq]": slug,
      ...LOCATION_POPULATE_PARAMS,
    })
    return response.data?.[0] || null
  } catch (error) {
    return null
  }
}

// ─────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = await getLocationData(slug)

  if (!location) notFound()

  // Logic: Deduplicate neighbors from columns
  const neighbors = Array.from(
    new Map(
      [...(location.left_col || []), ...(location.right_col || [])]
        .filter((n) => n.slug !== location.slug)
        .map((n) => {
          // DEBUG LOG: See what Strapi is actually giving you for the neighbor
          console.log(`Mapping neighbor ${n.city_name}:`, n.location_image)

          return [
            n.slug,
            {
              id: n.id,
              slug: n.slug,
              city_name: n.city_name,
              zip_codes: n.zip_codes,
              // Ensure we are grabbing the URL from the nested Strapi object
              location_image: n.location_image,
            },
          ]
        })
    ).values()
  ) as LocationNeighbor[]

  return (
    <div>
      <Navbar />
      {/* Hero */}
      <section className="relative flex h-[60vh] items-center justify-center">
        {location.location_image && (
          <Image
            src={`${STRAPI_URL}${location.location_image.url}`}
            alt={location.location_image.alternativeText || location.city_name}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="relative z-10 px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">
            Cleaning in{" "}
            <span className="text-blue-400">{location.city_name}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            {location.local_hook}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="container mx-auto grid gap-16 px-6 py-20 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section>
            <h2 className="mb-6 text-3xl font-bold">Service Area Context</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              {location.neighborhood_context}
            </p>
          </section>

          {/* Render JSON FAQs */}
          {location.faq_location && Array.isArray(location.faq_location) && (
            <section>
              <h2 className="mb-8 text-3xl font-bold">Local Questions</h2>
              <div className="space-y-6">
                {location.faq_location.map((faq: FAQLocation, i: number) => (
                  <div key={i} className="border-l-4 border-blue-500 py-2 pl-6">
                    <h3 className="mb-2 text-xl font-bold">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar / Info */}
        <aside className="space-y-8">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
            <h3 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
              Coverage
            </h3>
            <p className="font-mono font-bold text-blue-600">
              {location.zip_codes}
            </p>
          </div>

          <div className="rounded-3xl bg-blue-600 p-8 text-white">
            <h3 className="mb-2 text-xl font-bold">Ready to Book?</h3>
            <p className="mb-6 text-blue-100">
              Professional upholstery cleaning in {location.city_name}.
            </p>
            <button className="w-full rounded-xl bg-white py-4 font-bold text-blue-600 transition-colors hover:bg-blue-50">
              Get an Instant Quote
            </button>
          </div>
        </aside>
      </main>

      <LocationNeighbors
        neighbors={neighbors}
        currentCityName={location.city_name}
      />

      <footer className="border-t py-12 text-center text-sm text-slate-400">
        <p className="mb-2 font-bold text-slate-600 uppercase">Service Hub</p>
        <p>{location.coordinates?.address_hint}</p>
      </footer>
    </div>
  )
}
