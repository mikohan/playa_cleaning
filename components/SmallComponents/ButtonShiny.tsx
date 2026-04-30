"use client"
import { motion, HTMLMotionProps, TargetAndTransition } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const shinyButtonVariants = cva(
  "radial-gradient relative overflow-hidden transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "rounded-lg px-4 py-2 text-sm",
        md: "rounded-xl px-6 py-3 text-base",
        lg: "rounded-2xl px-8 py-4 text-xl",
        xl: "rounded-3xl px-10 py-5 text-2xl",
        icon: "flex h-10 w-10 items-center justify-center rounded-md",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

interface Props
  extends HTMLMotionProps<"div">, VariantProps<typeof shinyButtonVariants> {
  text?: string
  // Pass any CSS color (hex, rgb, or tailwind variable)
  bgColor?: string
}

export const ButtonShiny = ({
  text,
  className,
  size,
  bgColor = "var(--color-primary-blue)", // Default Playa Cleaning Blue
  style,
  ...props
}: Props) => {
  return (
    <motion.div
      // Merge CVA with custom classes
      className={cn(
        shinyButtonVariants({ size }),
        "font-blauerMedium",
        className
      )}
      // Use inline styles to inject the dynamic color
      style={
        {
          backgroundColor: bgColor,
          ...style,
        } as React.CSSProperties
      }
      initial={{ "--x": "100%" } as TargetAndTransition}
      animate={{ "--x": "-100%" } as TargetAndTransition}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
      }}
      {...props}
    >
      <span className="linear-mask relative z-10 block h-full w-full cursor-pointer font-light tracking-wide text-white">
        {text ? text : "Book now"}
      </span>
      {/* Overlay for the shimmer effect */}
      <span className="linear-overlay pointer-events-none absolute inset-0 block rounded-[inherit] p-1"></span>
    </motion.div>
  )
}
