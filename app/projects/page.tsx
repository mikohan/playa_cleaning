import { Metadata } from "next"
import Link from "next/link"
import { getProjects } from "@/lib/projects"
import {
  PROJECTS_LIST_DESCRIPTION,
  PROJECTS_LIST_TITLE,
  projectsListJsonLd,
  projectsListMetadata,
} from "@/lib/project-seo"
import { ProjectBreadcrumbs } from "@/components/projects/ProjectBreadcrumbs"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjects(100)
  return projectsListMetadata(projects)
}

export default async function ProjectsPage() {
  const projects = await getProjects(100)

  // Cities that have at least one job, with counts, for the city links row
  const cities = Array.from(
    projects
      .reduce((map, p) => {
        if (!p.location) return map
        const cur = map.get(p.location.slug)
        map.set(p.location.slug, {
          slug: p.location.slug,
          name: p.location.city_name,
          count: (cur?.count || 0) + 1,
        })
        return map
      }, new Map<string, { slug: string; name: string; count: number }>())
      .values()
  ).sort((a, b) => b.count - a.count)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsListJsonLd(projects)),
        }}
      />
      <main className="bg-background">
        <ProjectBreadcrumbs items={[{ label: "Recent Jobs" }]} />

        <section className="container mx-auto max-w-7xl px-6 pb-20">
          <header className="mb-12 max-w-3xl space-y-6">
            <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
              {PROJECTS_LIST_TITLE}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {PROJECTS_LIST_DESCRIPTION}
            </p>
          </header>

          {cities.length > 0 && (
            <nav aria-label="Jobs by city" className="mb-12">
              <h2 className="mb-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Jobs by city
              </h2>
              <ul className="flex flex-wrap gap-3">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/locations/${c.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-semibold transition-colors hover:border-primary-blue hover:text-primary-blue"
                    >
                      {c.name}
                      <span className="text-xs text-muted-foreground">
                        {c.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((p) => (
                <ProjectCard key={p.documentId || p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p className="text-lg text-muted-foreground">
              New jobs show up here as we finish them.
            </p>
          )}
        </section>

        <CallToAction />
        <CalculatorCTA />
      </main>
    </>
  )
}
