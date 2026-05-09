"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface LocationFAQProps {
  cityName: string
  items: FAQItem[]
}

export default function LocationFAQ({ cityName, items }: LocationFAQProps) {
  if (!items?.length) return null

  // SEO TIP: You would ideally inject JSON-LD FAQ Schema here
  // into the <head> using a script tag in your page file.

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Column: Heading */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-primary-blue">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  Common Questions
                </span>
              </div>
              <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl">
                Cleaning Services in {cityName}:{" "}
                <span className="text-primary-blue">What You Need to Know</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to know about our residential and commercial
                cleaning standards in the {cityName} area.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border bg-card px-6 transition-all hover:border-primary-blue/50 data-[state=open]:border-primary-blue data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-bold transition-colors hover:text-primary-blue hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
