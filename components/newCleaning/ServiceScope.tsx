"use client"

import React from "react"
import { Check, Plus, Sparkles } from "lucide-react"
// Assuming your data file can handle slug-based lookups
import { upholsteryScope, getScopeBySlug } from "@/app/data/cleaning-details"

interface ServiceScopeProps {
  serviceSlug?: string // Consistent naming with your new routes
}

export const ServiceScope = ({ serviceSlug }: ServiceScopeProps) => {
  // Use a helper to get specific data for Upholstery, Move-out, etc.
  // Falls back to the general scope if no slug matches
  const displayScope = serviceSlug
    ? getScopeBySlug(serviceSlug)
    : upholsteryScope

  const sections = Object.entries(displayScope)

  return (
    <section className="mx-auto max-w-7xl pt-24">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
            {serviceSlug
              ? "What's included in this service?"
              : "What's included in the clean?"}
          </h2>
          <p className="text-xl font-medium text-muted-foreground">
            A professional cleaner will arrive at your door and handle
            everything.
          </p>
        </div>

        <div className="space-y-16">
          {/* TOP ROW: Titles and Included Items */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {sections.map(([key, section]) => (
              <div key={`${key}-top`} className="flex flex-col">
                <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
                  <h3 className="text-2xl font-black text-primary-blue">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase">
                    Included in Price
                  </p>
                  <ul className="space-y-3">
                    {section.included.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-bold text-foreground/80"
                      >
                        <div className="mt-0.5 rounded-full bg-primary-blue/10 p-1 text-primary-blue">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM ROW: Add-ons Only */}
          <div className="grid grid-cols-1 gap-12 border-t border-border/50 pt-12 md:grid-cols-3">
            {sections.map(([key, section]) => (
              <div key={`${key}-bottom`} className="space-y-4">
                {section.extras && section.extras.length > 0 && (
                  <>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase">
                      Add-ons Available
                    </p>
                    <ul className="space-y-3">
                      {section.extras.map((extra, i) => (
                        <li
                          key={i}
                          className="group flex cursor-pointer items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary-blue">
                            <Plus
                              size={14}
                              className="text-muted-foreground group-hover:text-primary-blue"
                            />
                            {extra.name}
                          </div>
                          <div className="text-xs font-black text-foreground">
                            ${extra.price}
                            {extra.unit && (
                              <span className="text-[10px] font-medium text-muted-foreground">
                                {" "}
                                / {extra.unit}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner - Only show for residential slugs */}
        {(!serviceSlug || serviceSlug === "deep-cleaning") && (
          <div className="relative mt-24 flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-primary-blue p-8 text-white shadow-2xl md:flex-row md:p-12">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">
                <Sparkles size={14} /> Premium Service Upgrade
              </div>
              <h3 className="text-3xl font-black">
                Want the ultimate deep clean?
              </h3>
              <p className="max-w-xl font-bold opacity-90">
                Our Premium package includes inside all appliances, walls, and
                baseboards for a total home transformation.
              </p>
            </div>
            <button className="relative z-10 rounded-2xl bg-white px-8 py-4 text-lg font-black whitespace-nowrap text-primary-blue shadow-xl transition-all hover:scale-105 active:scale-95">
              Add Premium for $80
            </button>
            <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          </div>
        )}
      </div>
    </section>
  )
}
