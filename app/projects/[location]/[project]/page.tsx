import { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { Calendar, MapPin, Sparkles } from "lucide-react"
import {
  cardImageUrl,
  coverImage,
  formatJobDate,
  getProjectBySlug,
  getProjects,
  getRelatedProjects,
  projectPath,
  serviceShortName,
  splitMedia,
} from "@/lib/projects"
import { projectJsonLd, projectMetadata } from "@/lib/project-seo"
import { ProjectBreadcrumbs } from "@/components/projects/ProjectBreadcrumbs"
import { ProjectGallery } from "@/components/projects/ProjectGallery"
import {
  ProjectLinkSentence,
  ProjectNavCards,
} from "@/components/projects/ProjectLinks"
import { RecentJobs } from "@/components/projects/RecentJobs"
import { RichTextRenderer } from "@/components/common/RichTextRenderer"
import { WaveDivider } from "@/components/common/WaveDivider"
import { CallToAction } from "@/components/cleaning/CallToAction"
import { CalculatorCTA } from "@/components/newCleaning/CalculatorCTA"
import GoogleMap from "@/components/common/GoogleMap"

interface Props {
  params: Promise<{ location: string; project: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects(500)
  return projects.map((p) => ({
    location: p.location?.slug || "los-angeles",
    project: p.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: "Job Not Found", robots: { index: false } }
  return projectMetadata(project)
}

export default async function ProjectPage({ params }: Props) {
  const { location, project: slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  // One URL per job: send /projects/<wrong-city>/<slug> to the real one
  const canonicalPath = projectPath(project)
  if (canonicalPath !== `/projects/${location}/${slug}`) {
    permanentRedirect(canonicalPath)
  }

  const related = await getRelatedProjects(project, 3)
  const { images, videos } = splitMedia(project.media_gallery)
  const cover = coverImage(project)
  const city = project.location?.city_name
  const coords = project.location?.coordinates
  const date = project.completion_date || project.publishedAt

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
      <main className="bg-background">
        <ProjectBreadcrumbs
          items={[
            { label: "Recent Jobs", href: "/projects" },
            ...(project.location && city
              ? [{ label: city, href: `/locations/${project.location.slug}` }]
              : []),
            { label: project.header },
          ]}
        />

        <article className="container mx-auto max-w-7xl px-6 pb-16">
          <header className="mb-12 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary-blue" />
                  {city}, CA
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary-blue" />
                  <time dateTime={date}>{formatJobDate(date)}</time>
                </span>
              )}
              {project.service?.name && (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary-blue" />
                  {project.service.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
              {project.header}
            </h1>
            {project.subheader && (
              <p className="text-xl leading-relaxed text-foreground/80">
                {project.subheader}
              </p>
            )}
            <ProjectLinkSentence project={project} />
          </header>

          <ProjectGallery
            images={images}
            videos={videos}
            title={project.header}
            posterUrl={cover ? cardImageUrl(cover) : undefined}
            serviceName={
              project.service ? serviceShortName(project.service.name) : undefined
            }
            cityName={city}
          />
        </article>

        {project.seo_text_rich && (
          <section className="relative py-20">
            <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
            <WaveDivider position="top" fill="var(--color-background)" />
            <div className="container mx-auto max-w-4xl px-6">
              <RichTextRenderer content={project.seo_text_rich} />
            </div>
          </section>
        )}

        <section className="container mx-auto max-w-5xl px-6 py-16">
          <ProjectNavCards project={project} />
        </section>

        {coords?.lat && coords?.lng && city && (
          <section className="container mx-auto max-w-7xl px-6 py-16">
            <h2 className="mb-8 text-3xl font-black tracking-tighter uppercase">
              Where this job was: {city}
            </h2>
            <GoogleMap
              lat={coords.lat}
              lng={coords.lng}
              zoom={coords.zoom || 13}
              className="h-100 w-full"
            />
          </section>
        )}

        <CallToAction />

        <RecentJobs
          projects={related}
          title={city ? `More Recent Jobs Near ${city}` : "More Recent Jobs"}
          allJobsText="All recent jobs"
        />

        <CalculatorCTA />
      </main>
    </>
  )
}
