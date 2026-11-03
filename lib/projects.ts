import { strapiRequest } from "@/lib/strapi"
import {
  Project,
  ProjectListResponse,
  StrapiMedia,
} from "@/app/types/projectTypes"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://playacleaning.com"
).replace(/\/$/, "")

const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "https://cms.playacleaning.com"
).replace(/\/$/, "")

// ─────────────────────────────────────────────────────────────
// Query params
// ─────────────────────────────────────────────────────────────

// Fields needed for cards (lists on /projects, city, service, home pages)
const CARD_PARAMS = {
  "fields[0]": "slug",
  "fields[1]": "header",
  "fields[2]": "subheader",
  "fields[3]": "completion_date",
  "fields[4]": "featured",
  "fields[5]": "publishedAt",
  "populate[media_gallery][fields][0]": "url",
  "populate[media_gallery][fields][1]": "mime",
  "populate[media_gallery][fields][2]": "alternativeText",
  "populate[media_gallery][fields][3]": "formats",
  "populate[media_gallery][fields][4]": "width",
  "populate[media_gallery][fields][5]": "height",
  "populate[location][fields][0]": "slug",
  "populate[location][fields][1]": "city_name",
  "populate[service][fields][0]": "slug",
  "populate[service][fields][1]": "name",
} as const

// Full project for the detail page
const DETAIL_PARAMS = {
  "populate[media_gallery]": "true",
  "populate[location][fields][0]": "slug",
  "populate[location][fields][1]": "city_name",
  "populate[location][fields][2]": "zip_codes",
  "populate[location][fields][3]": "coordinates",
  "populate[location][populate][location_image][fields][0]": "url",
  "populate[service][fields][0]": "slug",
  "populate[service][fields][1]": "name",
  "populate[service][fields][2]": "meta_description",
  "populate[service][populate][photo][fields][0]": "url",
} as const

const NEWEST_FIRST = {
  "sort[0]": "completion_date:desc",
  "sort[1]": "publishedAt:desc",
} as const

// ─────────────────────────────────────────────────────────────
// Fetchers (all return [] / null on error so pages never crash)
// ─────────────────────────────────────────────────────────────

export async function getProjects(limit = 100): Promise<Project[]> {
  try {
    const res = await strapiRequest<ProjectListResponse>("projects", {
      ...CARD_PARAMS,
      ...NEWEST_FIRST,
      "pagination[pageSize]": limit,
    })
    return res.data || []
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await strapiRequest<ProjectListResponse>("projects", {
      "filters[slug][$eq]": slug,
      ...DETAIL_PARAMS,
    })
    return res.data?.[0] || null
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export async function getProjectsByLocation(
  locationSlug: string,
  limit = 4,
  excludeSlug?: string
): Promise<Project[]> {
  try {
    const res = await strapiRequest<ProjectListResponse>("projects", {
      ...CARD_PARAMS,
      ...NEWEST_FIRST,
      "filters[location][slug][$eq]": locationSlug,
      ...(excludeSlug ? { "filters[slug][$ne]": excludeSlug } : {}),
      "pagination[pageSize]": limit,
    })
    return res.data || []
  } catch (error) {
    console.error("Error fetching projects by location:", error)
    return []
  }
}

export async function getProjectsByService(
  serviceSlug: string,
  limit = 4,
  excludeSlug?: string
): Promise<Project[]> {
  try {
    const res = await strapiRequest<ProjectListResponse>("projects", {
      ...CARD_PARAMS,
      ...NEWEST_FIRST,
      "filters[service][slug][$eq]": serviceSlug,
      ...(excludeSlug ? { "filters[slug][$ne]": excludeSlug } : {}),
      "pagination[pageSize]": limit,
    })
    return res.data || []
  } catch (error) {
    console.error("Error fetching projects by service:", error)
    return []
  }
}

/**
 * Jobs for the "More recent jobs" strip on a project page:
 * same city first, then fill up with the newest jobs anywhere else.
 */
export async function getRelatedProjects(
  project: Project,
  limit = 3
): Promise<Project[]> {
  const sameCity = project.location?.slug
    ? await getProjectsByLocation(project.location.slug, limit, project.slug)
    : []
  if (sameCity.length >= limit) return sameCity

  const latest = await getProjects(limit + sameCity.length + 1)
  const taken = new Set([project.slug, ...sameCity.map((p) => p.slug)])
  const fill = latest.filter((p) => !taken.has(p.slug))
  return [...sameCity, ...fill].slice(0, limit)
}

/** Homepage: featured jobs first, then newest. */
export async function getHomepageProjects(limit = 4): Promise<Project[]> {
  const all = await getProjects(limit * 3)
  const featured = all.filter((p) => p.featured)
  const rest = all.filter((p) => !p.featured)
  return [...featured, ...rest].slice(0, limit)
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function mediaUrl(path?: string | null): string {
  if (!path) return ""
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`
}

export function isImage(m?: StrapiMedia | null): boolean {
  return !!m?.mime?.startsWith("image/")
}

export function isVideo(m?: StrapiMedia | null): boolean {
  return !!m?.mime?.startsWith("video/")
}

export function splitMedia(media: StrapiMedia[] | null | undefined) {
  const list = media || []
  return { images: list.filter(isImage), videos: list.filter(isVideo) }
}

export function coverImage(project: Project): StrapiMedia | undefined {
  return (project.media_gallery || []).find(isImage)
}

/** Best size for a card/OG image: medium → large → original. */
export function cardImageUrl(m?: StrapiMedia | null): string {
  if (!m) return "/images/placeholder-cleaning.jpg"
  return mediaUrl(m.formats?.medium?.url || m.formats?.large?.url || m.url)
}

export function projectPath(project: Pick<Project, "slug" | "location">) {
  return `/projects/${project.location?.slug || "los-angeles"}/${project.slug}`
}

export function projectUrl(project: Pick<Project, "slug" | "location">) {
  return `${SITE_URL}${projectPath(project)}`
}

export function formatJobDate(date?: string | null): string {
  if (!date) return ""
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}

/** Stable small number from a string, used to vary link wording per page. */
export function stableIndex(seed: string, size: number): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return Math.abs(h) % size
}

/** "Deep Cleaning Service" → "deep cleaning" */
export function serviceShortName(name?: string | null): string {
  if (!name) return "cleaning"
  return name.replace(/\s+service$/i, "").trim().toLowerCase()
}
