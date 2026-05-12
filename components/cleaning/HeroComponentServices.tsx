import Image from "next/image"
import { Sparkles, Star } from "lucide-react"
import AliciaImage from "@/public/images/cleaning/hero-4.png"

export function HeroComponentServices() {
  return (
    <section className="relative overflow-hidden pt-4 pb-16 md:pt-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* Image Block */}
          <div className="relative aspect-[4/5] w-full shrink-0 md:w-5/12">
            <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-primary-blue/5" />
            <Image
              src={AliciaImage}
              alt="Alicia - Lead Concierge"
              fill
              className="rounded-[2.5rem] object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
              priority
            />

            {/* Float Badge */}
            <div className="absolute -right-6 -bottom-6 max-w-[180px] rounded-3xl bg-footer p-6 text-white shadow-xl dark:border dark:border-border dark:bg-card">
              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-primary-blue stroke-0 text-primary-blue"
                  />
                ))}
              </div>
              <p className="text-xs leading-tight font-bold italic">
                {`"Every service is supervised for 5-star quality."`}
              </p>
              <p className="mt-2 text-[10px] font-black tracking-widest text-primary-blue uppercase">
                — Alicia C.
              </p>
            </div>
          </div>

          {/* Content Block */}
          <div className="flex flex-col items-center gap-2 space-y-6 md:w-7/12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 px-4 py-1.5 text-[10px] font-black tracking-widest text-primary-blue uppercase">
              <Sparkles size={14} className="fill-current" />
              Los Angeles Premier Care
            </div>
            <h1 className="text-5xl leading-[0.9] font-bold tracking-tighter md:text-7xl">
              Professional <br />
              <span className="text-primary-blue italic">Care</span> for every{" "}
              <br />
              environment.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              From luxury residences in Santa Monica to creative studios in
              DTLA, our specialized teams provide the meticulous attention your
              space deserves.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
