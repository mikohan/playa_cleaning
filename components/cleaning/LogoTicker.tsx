import React from "react"
import { ShieldCheck, Leaf, MapPin, Clock, Sparkles, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const ADVANTAGES = [
  { icon: ShieldCheck, text: "Licensed & Insured" },
  { icon: Leaf, text: "Eco-Friendly Solutions" },
  { icon: MapPin, text: "Serving All of Los Angeles" },
  { icon: Clock, text: "Reliable Scheduling" },
  { icon: Heart, text: "Pet & Kid Safe" },
  { icon: Sparkles, text: "Hospital-Grade Clean" },
]
interface Props {
  className?: string
}

export const LogoTicker = ({ className }: Props) => {
  return (
    <div className={cn(className, "flex items-center overflow-hidden")}>
      <div className="container mx-auto">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div
            className="flex flex-none items-center gap-12 pr-12 animate-marquee-x"
            style={{ "--marquee-duration": "25s" } as React.CSSProperties}
          >
            {/* Double the array for seamless infinite looping */}
            {[...ADVANTAGES, ...ADVANTAGES].map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="group flex flex-none items-center gap-3 px-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-semibold tracking-wide text-foreground/70 uppercase md:text-base">
                    {advantage.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
