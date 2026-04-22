import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import Ava1 from "@/public/images/cleaning/ava1.png"
import Ava2 from "@/public/images/cleaning/ava2.png"
import Ava3 from "@/public/images/cleaning/ava3.png"

function AvatarGroup({ className }: { className?: string }) {
  const avatarArr = [
    { src: Ava1, alt: "Customer 1" },
    { src: Ava2, alt: "Customer 2" },
    { src: Ava3, alt: "Customer 3" },
  ]

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {avatarArr.map((avatar, i) => (
        <Avatar
          key={i}
          className="h-8 w-8 border-2 border-blue-100 md:h-12 md:w-12"
        >
          <AvatarImage asChild src={avatar.src.src}>
            <Image src={avatar.src} alt={avatar.alt} width={48} height={48} />
          </AvatarImage>
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      ))}

      {/* The "+99" Placeholder */}
      <Avatar className="h-8 w-8 border-2 border-blue-100 md:h-12 md:w-12">
        <AvatarFallback className="text-[10px] font-medium md:text-sm">
          +99
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export { AvatarGroup }
