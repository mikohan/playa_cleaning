"use client"
import { motion, HTMLMotionProps, TargetAndTransition } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define the variants using CVA
const shinyButtonVariants = cva(
  "radial-gradient relative rounded-2xl transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
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

// 2. Extend Framer Motion props to allow standard div attributes
interface Props
  extends HTMLMotionProps<"div">, VariantProps<typeof shinyButtonVariants> {
  text: string
}

export const ButtonShiny = ({ text, className, size, ...props }: Props) => {
  return (
    <motion.div
      // Merge CVA variants with any custom className
      className={cn(
        shinyButtonVariants({ size }),
        "font-blauerMedium",
        className
      )}
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
      {...props} // Spread remaining props (onClick, etc.)
    >
      <span className="linear-mask relative block h-full w-full cursor-pointer font-light tracking-wide text-white">
        {text}
      </span>
      <span className="linear-overlay pointer-events-none absolute inset-0 block rounded-[inherit] p-1"></span>
    </motion.div>
  )
}
