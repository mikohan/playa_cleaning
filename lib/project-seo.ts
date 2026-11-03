import { Metadata } from "next"
import { Project } from "@/app/types/projectTypes"
import {
  SITE_URL,
  cardImageUrl,
  coverImage,
  mediaUrl,
  projectUrl,
  serviceShortName,
  splitMedia,
} from "@/lib/projects"

const BUSINESS_NAME = "Playa Cleaning"
const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343"
const ORG_ID = `${SITE_URL}/#organization`
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`
const SAME_AS = [
  "https://www.instagram.com/playa_cleaning/",
  "https://www.youtube.com/@PlayaCleaningUS",
  "https://www.facebook.com/playacleaning",
]

export const PROJECTS_LIST_TITLE =
  "Recent House Cleaning Jobs in Playa Vista & West LA"
export const PROJECTS_LIST_DESCRIPTION =
  "Photos and notes from real Playa Cleaning jobs: deep cleanings, regular cleanings and move-out cleanings in Playa Vista, Marina del Rey, Culver City, Santa Monica and nearby."

// ─────────────────────────────────────────────────────────────
// Shared nodes
// ─────────────────────────────────────────────────────────────

function businessNode() {
  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: "$$",
    sameAs: SAME_AS,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Playa Vista",
      addressRegion: "CA",
      postalCode: "90094",
      addressCountry: "US",
    },
  }
}

export function projectTitle(p: Project) {
  return p.meta_title || p.header
}

export function projectDescription(p: Project) {
  const city = p.location?.city_name
  const service = serviceShortName(p.service?.name)
  return (
    p.meta_description ||
    p.subheader ||
    `Photos from a recent ${service} job${city ? ` in ${city}` : ""} by Playa Cleaning.`
  )
}

// ─────────────────────────────────────────────────────────────
// Detail page: metadata
// ─────────────────────────────────────────────────────────────

export function projectMetadata(p: Project): Metadata {
  const url = projectUrl(p)
  const title = projectTitle(p)
  const description = projectDescription(p)
  const { images, videos } = splitMedia(p.media_gallery)
  const city = p.location?.city_name
  const lat = p.location?.coordinates?.lat
  const lng = p.location?.coordinates?.lng

  const ogImages = images.length
    ? images.slice(0, 4).map((img) => ({
        url: cardImageUrl(img),
        alt: img.alternativeText || p.header,
        ...(img.width && img.height
          ? { width: img.width, height: img.height }
          : {}),
      }))
    : [{ url: DEFAULT_OG, width: 1200, height: 630, alt: p.header }]

  // Thin page guard: no photos/videos and no text → keep out of the index
  const isThin = !images.length && !videos.length && !p.seo_text_rich

  return {
    // Layout template adds "| Playa Cleaning" unless the title already has it
    title: /playa cleaning/i.test(title) ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: isThin
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    other: {
      "geo.region": "US-CA",
      ...(city ? { "geo.placename": city } : {}),
      ...(lat && lng
        ? { "geo.position": `${lat};${lng}`, ICBM: `${lat}, ${lng}` }
        : {}),
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: BUSINESS_NAME,
      locale: "en_US",
      images: ogImages,
      publishedTime: p.completion_date || p.publishedAt,
      modifiedTime: p.updatedAt,
      ...(videos[0] ? { videos: [{ url: mediaUrl(videos[0].url) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((i) => i.url),
    },
  }
}

// ─────────────────────────────────────────────────────────────
// Detail page: JSON-LD graph
// ─────────────────────────────────────────────────────────────

export function projectJsonLd(p: Project) {
  const url = projectUrl(p)
  const { images, videos } = splitMedia(p.media_gallery)
  const city = p.location?.city_name
  const coords = p.location?.coordinates
  const serviceUrl = p.service ? `${SITE_URL}/services/${p.service.slug}` : null
  const cityUrl = p.location ? `${SITE_URL}/locations/${p.location.slug}` : null
  const imageUrls = images.map((img) => mediaUrl(img.url))
  const date = p.completion_date || p.publishedAt

  const breadcrumb = [
    { name: "Home", item: SITE_URL },
    { name: "Recent Jobs", item: `${SITE_URL}/projects` },
    ...(city && cityUrl ? [{ name: city, item: cityUrl }] : []),
    { name: p.header, item: url },
  ]

  const graph: Record<string, unknown>[] = [
    businessNode(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: projectTitle(p),
      description: projectDescription(p),
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: imageUrls[0]
        ? { "@type": "ImageObject", url: imageUrls[0] }
        : undefined,
      inLanguage: "en-US",
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: p.header,
      description: projectDescription(p),
      datePublished: date,
      dateModified: p.updatedAt,
      image: imageUrls.length ? imageUrls : [DEFAULT_OG],
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      ...(city
        ? {
            contentLocation: {
              "@type": "Place",
              name: `${city}, CA`,
              address: {
                "@type": "PostalAddress",
                addressLocality: city,
                addressRegion: "CA",
                addressCountry: "US",
              },
              ...(coords?.lat && coords?.lng
                ? {
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: coords.lat,
                      longitude: coords.lng,
                    },
                  }
                : {}),
            },
          }
        : {}),
      ...(p.service && serviceUrl
        ? {
            about: {
              "@type": "Service",
              "@id": `${serviceUrl}#service`,
              name: p.service.name,
              url: serviceUrl,
              provider: { "@id": ORG_ID },
              ...(city ? { areaServed: { "@type": "City", name: city } } : {}),
            },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
    ...videos.map((v, i) => ({
      "@type": "VideoObject",
      "@id": `${url}#video-${i + 1}`,
      name: v.caption || v.alternativeText || `${p.header} video`,
      description: v.caption || projectDescription(p),
      contentUrl: mediaUrl(v.url),
      thumbnailUrl: imageUrls[0] || DEFAULT_OG,
      uploadDate: date,
    })),
  ]

  return { "@context": "https://schema.org", "@graph": graph }
}

// ─────────────────────────────────────────────────────────────
// List page (/projects)
// ─────────────────────────────────────────────────────────────

export function projectsListMetadata(projects: Project[]): Metadata {
  const url = `${SITE_URL}/projects`
  const first = projects.map(coverImage).find(Boolean)
  const image = first ? cardImageUrl(first) : DEFAULT_OG
  return {
    title: { absolute: `${PROJECTS_LIST_TITLE} | ${BUSINESS_NAME}` },
    description: PROJECTS_LIST_DESCRIPTION,
    alternates: { canonical: url },
    other: {
      "geo.region": "US-CA",
      "geo.placename": "Playa Vista",
      "geo.position": "33.9787;-118.4211",
      ICBM: "33.9787, -118.4211",
    },
    openGraph: {
      type: "website",
      url,
      title: PROJECTS_LIST_TITLE,
      description: PROJECTS_LIST_DESCRIPTION,
      siteName: BUSINESS_NAME,
      locale: "en_US",
      images: [{ url: image, alt: PROJECTS_LIST_TITLE }],
    },
    twitter: {
      card: "summary_large_image",
      title: PROJECTS_LIST_TITLE,
      description: PROJECTS_LIST_DESCRIPTION,
      images: [image],
    },
  }
}

export function projectsListJsonLd(projects: Project[]) {
  const url = `${SITE_URL}/projects`
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessNode(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: PROJECTS_LIST_TITLE,
        description: PROJECTS_LIST_DESCRIPTION,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: projectUrl(p),
          name: p.header,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Recent Jobs", item: url },
        ],
      },
    ],
  }
}
