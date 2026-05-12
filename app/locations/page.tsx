import Link from "next/link"
import { LocationDataResponse, LocationRecord } from "@/app/types/locationTypes"
import { Metadata } from "next"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"

// ─────────────────────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────────────────────

async function getAllLocations(): Promise<LocationRecord[]> {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.playacleaning.com"
  const API_TOKEN = process.env.STRAPI_API_TOKEN

  // We only need a few fields for the listing page to keep the payload light
  const query = new URLSearchParams({
    "filters[active][$eq]": "true",
    "fields[0]": "city_name",
    "fields[1]": "slug",
    "fields[2]": "local_hook",
    "fields[3]": "zip_codes",
    "fields[4]": "documentId",
  })

  const res = await fetch(`${STRAPI_URL}/api/locations?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error("Failed to fetch locations")
    return []
  }

  // Use the interface as the expected JSON shape
  const json: LocationDataResponse = await res.json()

  return json.data || []
}
// ─────────────────────────────────────────────────────────────
// 1. DYNAMIC METADATA
// ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Service Areas | Professional Cleaning Across Los Angeles | Playa Cleaning",
  description:
    "Playa Cleaning provides premium residential and commercial cleaning across Los Angeles. View our service areas including Santa Monica, Venice, Culver City, and more.",
  alternates: { canonical: "https://www.playacleaning.com/locations" },
  openGraph: {
    title: "Our Los Angeles Service Areas | Playa Cleaning",
    description:
      "Professional cleaning services in your neighborhood. Serving the greater Los Angeles area with 5-star upholstery and home care.",
    url: "https://www.playacleaning.com/locations",
    siteName: "Playa Cleaning",
    type: "website",
  },
}
function LocationsSchema({ locations }: { locations: LocationRecord[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Playa Cleaning Service Areas",
    description: "List of cities served by Playa Cleaning in Los Angeles, CA.",
    itemListElement: locations.map((loc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.playacleaning.com/locations/${loc.slug}`,
      name: `Cleaning Services in ${loc.city_name}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────

export default async function LocationsListingPage() {
  const locations = await getAllLocations()

  return (
    <>
      <LocationsSchema locations={locations} />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary-blue/20">
        <BreadCrumbsUniversal />
        {/* 1. HERO */}
        <section className="relative overflow-hidden border-b border-border bg-slate-50/50 pt-32 pb-20">
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h1 className="mb-6 font-jakarta text-5xl font-bold tracking-tight md:text-7xl">
              Professional Cleaning <br /> Across{" "}
              <span className="text-primary-blue">Los Angeles</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
              From the tech lofts of Silicon Beach to the historic estates of
              Santa Monica, Angara Streamers provides premium upholstery care
              right in your neighborhood.
            </p>
          </div>
        </section>

        {/* 2. LOCATION GRID */}
        <section className="container mx-auto px-6 py-24">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 border-b border-border pb-8 md:flex-row">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight italic">
                Our Service Areas
              </h2>
              <p className="text-lg text-muted-foreground">
                Select your city for localized pricing and availability.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-5 py-2 text-sm font-bold text-primary-blue">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-blue opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-blue"></span>
              </span>
              Now Serving {locations.length} Neighborhoods
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.id} // Preferred over documentId for React keys if available
                href={`/locations/${loc.slug}`}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-blue hover:shadow-2xl hover:shadow-primary-blue/10"
              >
                <h3 className="mb-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-blue">
                  {loc.city_name}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">
                  {loc.local_hook}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                  <span className="font-mono text-xs font-medium text-slate-400">
                    {loc.zip_codes?.split(",")[0] || "LA Area"} & more
                  </span>
                  <span className="flex items-center gap-1 text-sm font-bold text-primary-blue transition-all group-hover:gap-3">
                    View Area <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. SOCIAL PROOF */}
        <section className="bg-slate-900 py-24 text-white">
          <div className="container mx-auto px-6 text-center">
            <p className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
              Trusted by thousands
            </p>
            <h2 className="mb-8 text-3xl font-bold">
              5-Star Upholstery Care in Every Zip Code
            </h2>
            <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-slate-500 italic">
              [ Reviews Component Integration ]
            </div>
          </div>
        </section>

        {/* 4. SEO VALUE SECTION */}
        <section className="container mx-auto max-w-4xl px-6 py-24">
          <div className="prose prose-slate lg:prose-xl dark:prose-invert mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Specialized Equipment for LA Architecture
            </h2>
            <p className="leading-relaxed text-slate-600">
              Operating a mobile cleaning service in Los Angeles requires more
              than just a van. We&apos;ve optimized our operations for the
              specific logistics of the Westside. Whether it’s navigating the
              tight parking structures in <strong>Downtown Santa Monica</strong>
              or meeting the strict LEED-certified building requirements in{" "}
              <strong>Playa Vista</strong>, our teams arrive with portable,
              high-powered extraction units that reach where truck-mounts
              can&apos;t.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
