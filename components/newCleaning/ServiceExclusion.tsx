import React from "react"
import Link from "next/link"
import { AlertCircle, ArrowRight, Home, Info } from "lucide-react"

type Props = {
  city?: string
}

export const ServiceExclusions = ({ city }: Props) => {
  const citySlug = city?.toLowerCase().replace(" ", "-") || "los-angeles"

  const pricing = [
    { type: "Studio / 1-Bedroom", price: 159, icon: <Home size={20} /> },
    { type: "2-Bedroom Apartment", price: 199, icon: <Home size={20} /> },
    { type: "3-Bedroom Apartment", price: 249, icon: <Home size={20} /> },
  ]

  const exclusions = [
    "Deep stain removal (ink, wine, heavy grease)",
    "Wall dusting or washing",
    "Cleaning in unreachable or hazardous areas",
    "More than two cleaners per session",
    "Storage unit or deep pantry organization",
    "Biohazard cleanup (mold, pest remains)",
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* LEFT: What's NOT included */}
        <div className="rounded-3xl bg-muted/30 p-8 md:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-red-500/10 p-2 text-accent-yellow">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-3xl font-black">What’s not included</h2>
          </div>

          <p className="mb-8 text-lg font-bold text-muted-foreground">
            Try a{" "}
            <Link
              href={`/deep-cleaning/${citySlug}`}
              className="text-primary-blue underline hover:opacity-80"
            >
              Deep Clean
            </Link>{" "}
            if you need any of the services below:
          </p>

          <ul className="space-y-4">
            {exclusions.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-sm font-bold text-foreground/70"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link
              href={`/deep-cleaning/${citySlug}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-sm font-black text-white transition-all hover:bg-foreground/90"
            >
              Learn about Deep Cleaning <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* RIGHT: Pricing Estimates */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 space-y-4">
            <h2 className="text-4xl font-black">Flat-Rate Pricing</h2>
            <p className="text-lg font-medium text-muted-foreground">
              In {city || "Los Angeles"}, we charge by the number of rooms, not
              the square footage.
            </p>
          </div>

          <div className="space-y-4">
            {pricing.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-primary-blue/10 p-3 text-primary-blue">
                    {item.icon}
                  </div>
                  <span className="text-lg font-black">{item.type}</span>
                </div>
                <div className="text-2xl font-black text-primary-blue">
                  from ${item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-primary-blue/5 p-4 text-sm font-bold text-primary-blue">
            <Info size={20} className="shrink-0" />
            <p>
              Prices shown are estimates. Final cost is calculated at checkout
              based on your specific bedroom and bathroom count.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
