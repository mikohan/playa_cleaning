"use client"
import { ITestimonial, testimonials } from "@/app/data/data"
import { Tag } from "../SmallComponents/Tag"
import Image from "next/image"
import { GoogleStars } from "./GoogleStars"
import { motion } from "framer-motion"
import { WaveDivider } from "../common/WaveDivider"

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
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center">
          <Tag text="Testimonials" />
          <h2 className="mt-8 text-center text-3xl font-bold md:text-5xl">
            What our customers say
          </h2>
          <p className="mt-4 max-w-md text-center text-xl text-foreground/70">
            Our customers love the results. All reviews are verified from our
            Google Business profile.{" "}
          </p>
          <a
            href="https://share.google/oDULc3KpCXQC52z9f"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-24 text-sm font-medium text-primary-blue underline"
          >
            Check it here.
          </a>
        </div>

        {/* 3. Columns Container - Exact same width logic */}
        <div className="flex max-h-182 justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          {/* flex-1 min-w-0 forces all columns to share space equally */}
          <TestimonialsColumn
            testimonials={firstCol}
            duration={85}
            className="min-w-0 flex-1"
          />
          <TestimonialsColumn
            duration={112}
            testimonials={secondCol}
            className="hidden min-w-0 flex-1 md:block"
          />
          <TestimonialsColumn
            duration={92}
            testimonials={thirdCol}
            className="hidden min-w-0 flex-1 lg:block"
          />
        </div>
      </div>
    </section>
  )
}
