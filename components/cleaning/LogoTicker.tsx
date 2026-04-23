"use client"
import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Leaf, MapPin, Clock, Sparkles, Heart } from "lucide-react"

const ADVANTAGES = [
  { icon: ShieldCheck, text: "Licensed & Insured" },
  { icon: Leaf, text: "Eco-Friendly Solutions" },
  { icon: MapPin, text: "Serving All of Los Angeles" },
  { icon: Clock, text: "Reliable Scheduling" },
  { icon: Heart, text: "Pet & Kid Safe" },
  { icon: Sparkles, text: "Hospital-Grade Clean" },
]

export const LogoTicker = () => {
  return (
    <div className="overflow-hidden bg-background py-8">
      <div className="container mx-auto">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex flex-none items-center gap-12 pr-12"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 25, // Adjusted speed for text readability
              repeat: Infinity,
              ease: "linear",
            }}
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}
