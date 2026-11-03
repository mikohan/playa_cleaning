// Types for Strapi "project" collection (Recent Jobs)

export interface StrapiMediaFormat {
  url: string
  width: number
  height: number
  mime?: string
}

export interface StrapiMedia {
  id: number
  documentId?: string
  name: string
  alternativeText: string | null
  caption: string | null
  url: string
  mime: string
  width: number | null
  height: number | null
  formats?: {
    large?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    small?: StrapiMediaFormat
    thumbnail?: StrapiMediaFormat
  } | null
}

export interface ProjectLocation {
  id: number
  documentId: string
  slug: string
  city_name: string
  zip_codes?: string
  coordinates?: {
    lat: number
    lng: number
    zoom?: number
    address_hint?: string
  } | null
  location_image?: StrapiMedia | null
}

export interface ProjectService {
  id: number
  documentId: string
  slug: string
  name: string
  meta_description?: string
  photo?: StrapiMedia | null
}

export interface Project {
  id: number
  documentId: string
  slug: string
  header: string
  subheader: string | null
  completion_date: string | null
  featured: boolean | null
  meta_title: string | null
  meta_description: string | null
  seo_text_rich: string | null
  publishedAt: string
  updatedAt: string
  media_gallery: StrapiMedia[] | null
  location: ProjectLocation | null
  service: ProjectService | null
}

export interface ProjectListResponse {
  data: Project[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
