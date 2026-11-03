import Image from "next/image"
import { StrapiMedia } from "@/app/types/projectTypes"
import { mediaUrl } from "@/lib/projects"

interface ProjectGalleryProps {
  images: StrapiMedia[]
  videos: StrapiMedia[]
  title: string
  posterUrl?: string
}

export function ProjectGallery({
  images,
  videos,
  title,
  posterUrl,
}: ProjectGalleryProps) {
  if (!images.length && !videos.length) return null

  return (
    <div className="space-y-12">
      {images.length > 0 && (
        <section aria-label={`Photos: ${title}`}>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Job photos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => {
              const alt = img.alternativeText || `${title}, photo ${i + 1}`
              const caption = img.caption || img.alternativeText
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            {videos.map((vid) => (
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
                {(vid.caption || vid.alternativeText) && (
                  <figcaption className="p-4 text-sm text-muted-foreground">
                    {vid.caption || vid.alternativeText}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
