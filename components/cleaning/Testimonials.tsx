"use client"
import { ITestimonial, testimonials } from "@/app/data/data"
import { Tag } from "../SmallComponents/Tag"
import Image from "next/image"
import { GoogleStars } from "./GoogleStars"
import { motion } from "framer-motion"

const TestimonialsColumn = (props: {
  className?: string
  testimonials: ITestimonial[]
  duration?: number
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        y: "-50%",
      }}
      transition={{
        duration: props.duration || 25,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-8 pb-8"
    >
      {/* 1. Spread twice to ensure the loop is visually infinite */}
      {[...props.testimonials, ...props.testimonials].map(
        ({ text, image, userName }, i) => (
          <div
            key={i}
            className="card font-blauerRegular w-full rounded-3xl border border-border bg-background p-8 shadow-sm"
          >
            <div className="mb-4 inline-flex items-center gap-4">
              <Image
                width={40}
                height={40}
                src={image}
                alt={userName}
                className="rounded-full object-cover"
              />
              <div className="font-blauerSemibold text-xl tracking-tight">
                {userName}
              </div>
            </div>
            <GoogleStars starsCount={5} inline text="" rating="" />
            <div className="mt-4 leading-relaxed text-muted-foreground">
              {text}
            </div>
          </div>
        )
      )}
    </motion.div>
  </div>
)

export function Testimonials() {
  // 2. Slice the data into three equal parts
  const firstCol = testimonials.slice(0, 6)
  const secondCol = testimonials.slice(6, 12)
  const thirdCol = testimonials.slice(12, 18)

  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center">
          <Tag text="Testimonials" />
          <h2 className="h2-header mt-8 text-center font-bold">
            What our customers say
          </h2>
          <p className="subheader mt-4 mb-16 max-w-md text-center">
            Our customers love the results. All reviews are verified from our
            Google Business profile.{" "}
            <a
              href="https://share.google/oDULc3KpCXQC52z9f"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline"
            >
              Check it here.
            </a>
          </p>
        </div>

        {/* 3. Columns Container - Exact same width logic */}
        <div className="flex max-h-[730px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          {/* flex-1 min-w-0 forces all columns to share space equally */}
          <TestimonialsColumn
            testimonials={firstCol}
            duration={20}
            className="min-w-0 flex-1"
          />
          <TestimonialsColumn
            duration={25}
            testimonials={secondCol}
            className="hidden min-w-0 flex-1 md:block"
          />
          <TestimonialsColumn
            duration={18}
            testimonials={thirdCol}
            className="hidden min-w-0 flex-1 lg:block"
          />
        </div>
      </div>
    </section>
  )
}
