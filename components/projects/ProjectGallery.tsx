import Image from "next/image"
import { StrapiMedia } from "@/app/types/projectTypes"
import { mediaUrl } from "@/lib/projects"

interface ProjectGalleryProps {
  images: StrapiMedia[]
  videos: StrapiMedia[]
  title: string
  posterUrl?: string
  /** e.g. "deep cleaning" — used when a photo has no alt text/caption in Strapi */
  serviceName?: string
  cityName?: string
}

/** Description for a photo that has no alt text in Strapi. */
function fallbackText(i: number, total: number, service?: string, city?: string) {
  const what = service ? `${service[0].toUpperCase()}${service.slice(1)}` : "Cleaning"
  const where = city ? ` in ${city}` : ""
  return `${what}${where}: photo ${i + 1} of ${total}`
}

export function ProjectGallery({
  images,
  videos,
  title,
  posterUrl,
  serviceName,
  cityName,
}: ProjectGalleryProps) {
  if (!images.length && !videos.length) return null

  return (
    <div className="space-y-12">
      {images.length > 0 && (
        <section aria-label={`Photos: ${title}`}>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Job photos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => {
              const auto = fallbackText(i, images.length, serviceName, cityName)
              const alt = img.alternativeText || auto
              const caption = img.caption || img.alternativeText || auto
              return (
                <figure
                  key={img.id || img.url}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={mediaUrl(img.url)}
                      alt={alt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                      className="object-cover"
                    />
                  </div>
                  {caption && (
                    <figcaption className="p-4 text-sm text-muted-foreground">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section aria-label={`Videos: ${title}`}>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Job videos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((vid, i) => (
              <figure
                key={vid.id || vid.url}
                className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30"
              >
                <div className="aspect-9/16 w-full bg-black">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={posterUrl}
                  >
                    <source src={mediaUrl(vid.url)} type={vid.mime} />
                  </video>
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">
                  {vid.caption ||
                    vid.alternativeText ||
                    `${fallbackText(i, videos.length, serviceName, cityName).replace("photo", "video")}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
