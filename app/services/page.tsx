import Link from "next/link"
import { servicePages } from "@/app/data/seo-data"
import { ArrowRight, Sparkles } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"

export const metadata = {
  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",
  description:
    "From deep home cleaning to specialized upholstery care with Angara Streamers, explore our full range of professional cleaning services in LA.",
}

export default function ServicesListPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl pt-20">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-blue/10 px-4 py-2 text-primary-blue">
              <Sparkles size={18} />
              <span className="text-sm font-bold tracking-wider uppercase">
                Our Expertise
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-black text-foreground md:text-6xl">
              Cleaning Services <br />
              <span className="text-primary-blue">
                Tailored for Los Angeles
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Professional, reliable, and thorough cleaning solutions for your
              home, office, and furniture.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary-blue">
                    {service.page}
                  </h3>
                  <p className="mb-6 line-clamp-3 text-muted-foreground">
                    {service.seo.description}
                  </p>

                  <div className="flex items-center gap-2 font-bold text-primary-blue">
                    View Details
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </div>
                </div>

                {/* Subtle Decorative Background Element */}
                <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary-blue/5 transition-transform duration-500 group-hover:scale-150" />
              </Link>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="mt-20 rounded-3xl bg-muted p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Not sure which service you need?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Our team is ready to help you choose the right cleaning package
              for your specific needs.
            </p>
            <button className="rounded-2xl bg-primary-blue px-8 py-4 text-lg font-black text-white transition-all hover:bg-primary-blue/90">
              Get a Free Estimate
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
