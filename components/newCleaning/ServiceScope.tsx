"use client"

import React from "react"
import { Check, Plus } from "lucide-react"
import { getScopeBySlug } from "@/app/data/pricing"

interface ServiceScopeProps {
  serviceSlug?: string
}

export const ServiceScope = ({
  serviceSlug = "deep-cleaning",
}: ServiceScopeProps) => {
  // Dynamically fetch the correct scope based on the slug
  const displayScope = getScopeBySlug(serviceSlug)
  const sections = Object.entries(displayScope)

  // Logic to determine if we show the "Not Included" warning
  // We only show it for Standard cleaning to push people toward Deep/Add-ons
  const isStandardClean =
    serviceSlug === "house-cleaning" || serviceSlug === "standard-cleaning"

  return (
    <section className="mx-auto max-w-7xl py-24">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
            {serviceSlug.includes("cleaning")
              ? `What's included in our ${serviceSlug.replace("-", " ")}?`
              : "What's included in the service?"}
          </h2>
          <p className="text-xl font-medium text-muted-foreground">
            A professional cleaner will arrive at your door and handle
            everything.
          </p>
        </div>

        <div className="space-y-16">
          {/* TOP ROW: Included Items */}
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

          {/* MIDDLE WARNING: Only for Standard Cleaning */}
          {isStandardClean && (
            <div className="mb-4 font-semibold tracking-tight text-destructive uppercase">
              Notice:{" "}
              <span className="text-foreground">
                Certain items are NOT included in Standard Cleaning
              </span>
            </div>
          )}

          {/* BOTTOM ROW: Add-ons Only */}
          <div className="grid grid-cols-1 gap-12 border-t border-border/50 pt-4 md:grid-cols-3">
            {sections.map(([key, section]) => (
              <div key={`${key}-bottom`} className="space-y-4">
                {section.extras && section.extras.length > 0 && (
                  <>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase">
                      Recommended Add-ons
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
                              <span className="ml-1 text-[10px] font-medium text-muted-foreground">
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
      </div>
    </section>
  )
}
