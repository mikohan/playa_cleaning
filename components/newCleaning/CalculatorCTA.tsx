import React from "react"
import Link from "next/link"
import { Calculator, ArrowRight } from "lucide-react"

export const CalculatorCTA = () => {
  return (
    <section className="px-6 py-12">
      {/* Container using your theme variables:
        - Background: primary-blue (defined in your @theme)
        - Dark Mode: Uses your custom 'card' variable for a cohesive dark UI
      */}
      <div className="mx-auto max-w-5xl rounded-3xl bg-primary-blue p-8 shadow-xl shadow-primary-blue/20 md:p-12 dark:border dark:border-border dark:bg-card dark:shadow-none">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            {/* Badge: Using your accent-green for high visibility */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-black tracking-widest text-white uppercase dark:bg-accent-green/10 dark:text-accent-green">
              <Calculator size={14} />
              Instant Quote
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl dark:text-foreground">
              Wondering about the cost?
            </h2>

            <p className="mt-4 font-jakarta text-lg text-white/80 dark:text-muted-foreground">
              Get a room-by-room price estimate in less than 60 seconds with our
              transparent cleaning calculator.
            </p>
          </div>

          <div className="flex shrink-0">
            <Link
              href="/cleaning-calculator"
              className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-primary-blue transition-all hover:bg-secondary hover:shadow-lg active:scale-95 dark:bg-primary dark:text-primary-foreground"
            >
              Try Calculator
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
