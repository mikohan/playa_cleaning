"use client"
import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WaveDivider } from "../common/WaveDivider"

const FAQ_DATA = [
  {
    question: "Do you really clean the details?",
    answer:
      "Yes. Corners, baseboards, under items, behind things — the areas most cleaners skip. I don’t rush, and I don’t cut corners.",
  },
  {
    question: "What makes your cleaning different?",
    answer:
      "I use professional supplies, an industrial level HEPA vacuum, and I clean with intention. You get a deeper, longer‑lasting clean — not a quick wipe.",
  },
  {
    question: "Are you good with pets?",
    answer:
      "Yes — I love pets. I work around them safely and calmly, and I use pet‑friendly products when needed.",
  },
  {
    question: "Will you follow my instructions?",
    answer:
      "Absolutely. Tell me what matters to you, and I’ll clean it exactly the way you want — every visit.",
  },
  {
    question: "Do you bring your own supplies?",
    answer:
      "Yes. I bring everything: pro‑grade chemicals, microfiber systems, and my HEPA vacuum. You don’t need to provide anything.",
  },
  {
    question: "Are you reliable?",
    answer:
      "Yes. I show up on time, communicate clearly, and never rush through your home.",
  },
  {
    question: "What if I have allergies or asthma?",
    answer:
      "My HEPA vacuum and dust‑removal process significantly reduce airborne particles, making your home easier and safer to breathe in.",
  },
  {
    question: "Will the cleaning be consistent every time?",
    answer:
      "Yes — because I’m the one who cleans your home personally. No rotating teams, no surprises.",
  },
]

export function FAQSection() {
  // Split the data into two halves for the grid
  const half = Math.ceil(FAQ_DATA.length / 2)
  const leftColumn = FAQ_DATA.slice(0, half)
  const rightColumn = FAQ_DATA.slice(half)

  return (
    <section className="relative py-20 md:py-60">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 w-full text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Questions?
            <span className="text-foreground/70"> Answers.</span>
          </h2>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:gap-x-20">
          {/* Left Column Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {leftColumn.map((item, index) => (
              <AccordionItem
                key={`left-${index}`}
                value={`left-item-${index}`}
                className="border-b border-foreground/30 py-2"
              >
                <AccordionTrigger className="group font-blauerMedium py-6 text-left text-xl font-semibold transition-all hover:no-underline">
                  <span className="flex-1 pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="font-blauerRegular max-w-[95%] pb-8 text-lg leading-relaxed text-slate-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {rightColumn.map((item, index) => (
              <AccordionItem
                key={`right-${index}`}
                value={`right-item-${index}`}
                className="border-b border-foreground/30 py-2 last:border-b md:last:border-b"
              >
                <AccordionTrigger className="group font-blauerMedium py-6 text-left text-xl font-semibold transition-all hover:no-underline">
                  <span className="flex-1 pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="font-blauerRegular max-w-[95%] pb-8 text-lg leading-relaxed text-slate-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-4 pt-8">
          <p className="text-primary/60">
            Still have questions?{" "}
            <a
              href="tel:2135987763"
              className="font-medium underline decoration-primary/50 underline-offset-4 transition-all hover:decoration-primary/70"
            >
              Give me a call.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
