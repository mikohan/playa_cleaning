"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import PetsKids1 from "@/public/images/cleaning/PetsKids-1.png"
import PetsKids2 from "@/public/images/cleaning/PetsKids-2.png"
import PetsKids3 from "@/public/images/cleaning/PetsKids-3.png"
import PetsKids4 from "@/public/images/cleaning/PetsKids.png"

const logos = [
  { src: PetsKids1, alt: "Safe for Pets 1" },
  { src: PetsKids2, alt: "Safe for Pets 2" },
  { src: PetsKids3, alt: "Safe for Pets 3" },
  { src: PetsKids4, alt: "Safe for Pets 4" },
]

export const LogoTicker = () => {
  return (
    <div className="overflow-hidden bg-white py-8 md:py-16">
      <div className="container mx-auto">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex flex-none items-center gap-16 pr-16"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 30, // Slower is often smoother for tickers
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* We render the array twice. 
                The animation moves -50%, which is exactly one full set of logos.
            */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex flex-none items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain opacity-80 transition-opacity hover:opacity-100 md:h-14"
                  // width/height required for Next/Image but overridden by className h-10 w-auto
                  width={200}
                  height={60}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
