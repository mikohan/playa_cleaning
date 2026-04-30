import Image from "next/image"
import Star from "@/public/images/star.svg"
import { cn } from "@/lib/utils"

interface GoogleProps {
  rating: string
  text?: string | undefined
  starsCount: number
  inline?: boolean | undefined
  size?: number
}

function GoogleStars({
  rating,
  text,
  starsCount,
  size,
  inline = true,
}: GoogleProps) {
  const rat = rating ?? "4.99"
  const cnt = starsCount ?? 5
  const inln = inline ? "flex gap-2" : "block"
  const starSize = size ?? 20
  let font = "text-lg"
  switch (starSize) {
    case 10:
      font = "text-xs"
    case 14:
      font = "text-sm"
    case 16:
      font = "text-md"
  }

  return (
    <div className={`${inln} items-center justify-center`}>
      <div className="inline-flex gap-1">
        {new Array(cnt).fill(0).map((_, i) => (
          <div key={i}>
            <Image
              height={starSize}
              width={starSize}
              src={Star}
              alt="Review stars"
            />
          </div>
        ))}
      </div>
      <div className={cn(font, "font-bold tracking-wider")}>
        {rat} {text}/5
      </div>
    </div>
  )
}
export { GoogleStars }
