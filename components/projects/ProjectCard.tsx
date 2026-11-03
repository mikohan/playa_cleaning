import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ArrowUpRight } from "lucide-react"
import { Project } from "@/app/types/projectTypes"
import {
  cardImageUrl,
  coverImage,
  formatJobDate,
  projectPath,
} from "@/lib/projects"

export function ProjectCard({ project }: { project: Project }) {
  const cover = coverImage(project)
  const date = project.completion_date || project.publishedAt

  return (
    <article className="h-full">
      <Link
        href={projectPath(project)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background transition-all duration-300 hover:border-primary-blue/40 hover:shadow-xl"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          <Image
            src={cardImageUrl(cover)}
            alt={cover?.alternativeText || project.header}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-4 bottom-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-primary-blue" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {project.location?.city_name && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {project.location.city_name}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={date}>{formatJobDate(date)}</time>
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-blue md:text-lg">
            {project.header}
          </h3>
          {project.service?.name && (
            <span className="mt-auto text-xs font-bold tracking-widest text-primary-blue uppercase">
              {project.service.name}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
