import Image from "next/image"
import Star from "@/public/images/star.svg"

interface GoogleProps {
  rating: string
  text?: string | undefined
  starsCount: number
  inline?: boolean | undefined
}

function GoogleStars({ rating, text, starsCount, inline = true }: GoogleProps) {
  const rat = rating ?? "4.99"
  const cnt = starsCount ?? 5
  const inln = inline ? "flex gap-2" : "block"

  return (
    <div className={`${inln} items-center justify-center`}>
      <div className="inline-flex gap-1">
        {new Array(cnt).fill(0).map((_, i) => (
          <div key={i}>
            <Image height={20} width={20} src={Star} alt="Review stars" />
          </div>
        ))}
      </div>
      <div className="text-lg font-semibold tracking-wider">
        {rat} {text}
      </div>
    </div>
  )
}
export { GoogleStars }
