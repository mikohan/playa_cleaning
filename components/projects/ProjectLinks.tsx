import Image from "next/image"
import Link from "next/link"
import { Project } from "@/app/types/projectTypes"
import { mediaUrl, serviceShortName, stableIndex } from "@/lib/projects"

const linkClass =
  "font-semibold text-primary-blue underline decoration-primary-blue/30 underline-offset-4 hover:decoration-primary-blue"

/**
 * One plain sentence with in-text links to the service page and the city page.
 * The wording changes from job to job (picked from the slug, so it stays the
 * same on every build), which keeps the link text natural across the site.
 */
export function ProjectLinkSentence({ project }: { project: Project }) {
  const { service, location } = project
  if (!service && !location) return null

  const short = serviceShortName(service?.name)
  const S = service ? (
    <Link href={`/services/${service.slug}`} className={linkClass}>
      {short}
    </Link>
  ) : (
    <>{short}</>
  )
  const C = location ? (
    <Link href={`/locations/${location.slug}`} className={linkClass}>
      {location.city_name}
    </Link>
  ) : null

  if (!C) {
    return <p className="text-lg text-muted-foreground">This job was a {S}.</p>
  }

  const variants = [
    <>This job was a {S} for a home in {C}.</>,
    <>We did this {S} for a client in {C}.</>,
    <>Here is a {S} we finished in {C}.</>,
    <>This home in {C} got our {S}.</>,
  ]
  const pick = variants[stableIndex(project.slug, variants.length)]

  return <p className="text-lg leading-relaxed text-muted-foreground">{pick}</p>
}

function NavCard({
  href,
  title,
  label,
  imageSrc,
  imageAlt,
}: {
  href: string
  title: string
  label: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background p-4 transition-all hover:border-primary-blue/40 hover:shadow-lg"
    >
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-bold transition-colors group-hover:text-primary-blue">
        {title}
      </h3>
      <span className="mt-3 text-sm font-semibold text-primary-blue">
        {label} →
      </span>
    </Link>
  )
}

/** Two cards under the job: the service page and the city page. */
export function ProjectNavCards({ project }: { project: Project }) {
  const { service, location } = project
  if (!service && !location) return null
  const placeholder = "/images/placeholder-cleaning.jpg"

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {service && (
        <NavCard
          href={`/services/${service.slug}`}
          title={service.name}
          label={`What our ${serviceShortName(service.name)} includes`}
          imageSrc={service.photo?.url ? mediaUrl(service.photo.url) : placeholder}
          imageAlt={service.name}
        />
      )}
      {location && (
        <NavCard
          href={`/locations/${location.slug}`}
          title={`House Cleaning in ${location.city_name}`}
          label={`Our cleaning service in ${location.city_name}`}
          imageSrc={
            location.location_image?.url
              ? mediaUrl(location.location_image.url)
              : placeholder
          }
          imageAlt={`House cleaning in ${location.city_name}`}
        />
      )}
    </div>
  )
}
