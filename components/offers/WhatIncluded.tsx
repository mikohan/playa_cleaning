import { CheckCircle2, XCircle, Clock } from "lucide-react"

interface ServiceSection {
  category: string
  items: string[]
}

interface ServiceScopeProps {
  data: {
    included: {
      title: string
      sections: ServiceSection[]
    }
    excluded: {
      title: string
      items: string[]
      upsellNote: string
    }
  }
}

export function WhatIncluded({ data }: ServiceScopeProps) {
  return (
    <section className="container mx-auto max-w-6xl bg-background px-4 py-20 text-foreground transition-colors duration-300">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Included Items - Using your theme's accent-green */}
        <div className="rounded-3xl border border-accent-green/20 bg-accent-green/5 p-8 transition-colors">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent-green">
            <CheckCircle2 size={24} />
            {data.included.title}
          </h2>
          <div className="space-y-6">
            {data.included.sections.map((section) => (
              <div key={section.category}>
                <h3 className="mb-2 border-b border-accent-green/20 pb-1 font-bold text-foreground/90">
                  {section.category}
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent-green">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Excluded & Upsells - Using your theme's semantic border and card colors */}
        <div className="rounded-3xl border border-border bg-card p-8 transition-colors">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
            <XCircle className="text-muted-foreground/60" size={24} />
            {data.excluded.title}
          </h2>
          <ul className="mb-8 space-y-2 text-muted-foreground">
            {data.excluded.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-muted-foreground/40">•</span> {item}
              </li>
            ))}
          </ul>

          {/* Pro Tip Box - Using your theme's primary-blue */}
          <div className="rounded-2xl border border-primary-blue/20 bg-background p-6 shadow-sm">
            <p className="mb-2 flex items-center gap-2 font-semibold text-primary-blue">
              <Clock size={18} /> Pro Tip:
            </p>
            <p className="text-sm text-muted-foreground italic">
              {data.excluded.upsellNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
