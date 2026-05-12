import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { ServiceData } from "@/app/types/serviceTypes"

export function ServiceList({ services }: { services: ServiceData[] }) {
  return (
    <section className="relative md:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary-blue/10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-primary-blue/5 blur-[100px]" />
      </div>

      <div className="relative container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-primary-blue/30 hover:shadow-2xl"
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 scale-0 rounded-full bg-primary-blue/5 transition-transform duration-700 group-hover:scale-100" />

              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-full bg-primary-blue/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary-blue uppercase">
                    {service.name.split(" ")[0]}
                  </div>
                  <span className="text-4xl font-black italic opacity-10">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-blue">
                  {service.name}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground opacity-80">
                  {service.meta_description}
                </p>
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t border-border pt-6">
                <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-2">
                  View Details{" "}
                  <ChevronRight size={14} className="text-primary-blue" />
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-footer text-white transition-colors group-hover:bg-primary-blue">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
