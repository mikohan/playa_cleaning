import Link from "next/link"
import { MapPin } from "lucide-react"
import { LOS_ANGELES_AREAS } from "@/app/data/la-areas-all"

// Defining a strict interface based on your data structure
interface Area {
  name: string
  slug: string
  type: string
  region: string
  zipCodes: string[]
  neighborSlugs: string[]
}

export function ServiceAreasSection() {
  // Using Record to define the accumulator shape: Key is region string, Value is Area array
  const groupedAreas = LOS_ANGELES_AREAS.reduce<Record<string, Area[]>>(
    (acc, area) => {
      const region = area.region || "Other Areas"
      if (!acc[region]) {
        acc[region] = []
      }
      acc[region].push(area)
      return acc
    },
    {}
  )

  return (
    <section className="mt-32 border-t border-border pt-24 pb-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
              <MapPin size={16} />
              <span className="text-sm font-bold tracking-wider uppercase">
                Local Coverage
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Serving our neighbors across{" "}
              <span className="text-primary-blue">Greater Los Angeles.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-muted-foreground">
            Don&apos;t see your neighborhood? We are constantly expanding.
            Contact us for custom service outside these areas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groupedAreas).map(([region, areas]) => (
            <div key={region} className="space-y-6">
              <h3 className="border-b border-primary-blue/10 pb-4 text-xs font-black tracking-[0.2em] text-primary-blue uppercase">
                {region}
              </h3>
              <ul className="grid gap-3">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="group flex items-center text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="h-1 w-0 bg-primary-blue transition-all group-hover:mr-2 group-hover:w-3" />
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-muted/30 p-8">
          <p className="mb-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            Popular Service Zones
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {LOS_ANGELES_AREAS.slice(0, 15).map((area) => (
              <Link
                key={`footer-${area.slug}`}
                href={`/service-areas/${area.slug}`}
                className="text-xs font-bold text-muted-foreground/60 transition-colors hover:text-primary-blue"
              >
                {area.name} Cleaning
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
