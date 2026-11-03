import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const shinyButtonVariants = cva(
  "radial-gradient shiny-sweep relative overflow-hidden transition-[box-shadow,transform] active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shinyButtonVariants> {
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
    <div
      className={cn(
        shinyButtonVariants({ size }),
        "font-blauerMedium",
        className
      )}
      style={{ backgroundColor: bgColor, ...style }}
      {...props}
    >
      <span className="relative z-10 block h-full w-full cursor-pointer font-light tracking-wide text-white">
        {text ? text : "Book now"}
      </span>
    </div>
  )
}
