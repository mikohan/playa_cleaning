import Link from "next/link"
import { ClipboardCheck } from "lucide-react"
import { Project } from "@/app/types/projectTypes"
import { ProjectCard } from "@/components/projects/ProjectCard"

interface RecentJobsProps {
  projects: Project[]
  title: string
  intro?: string
  /** Text for the link to /projects. Hidden when empty. */
  allJobsText?: string
  className?: string
}

/** Grid of recent job cards. Renders nothing when there are no jobs. */
export function RecentJobs({
  projects,
  title,
  intro,
  allJobsText = "See all recent jobs",
  className = "",
}: RecentJobsProps) {
  if (!projects?.length) return null

  return (
    <section id="recent-jobs" className={`bg-background py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-primary-blue">
              <ClipboardCheck className="h-5 w-5" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Recent Jobs
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {intro && (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
          {allJobsText && (
            <Link
              href="/projects"
              className="shrink-0 text-sm font-bold text-primary-blue underline decoration-primary-blue/30 underline-offset-4 hover:decoration-primary-blue"
            >
              {allJobsText} →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.documentId || p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
