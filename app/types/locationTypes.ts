// types/location.ts
export interface IServiceItem {
  title: string
  description: string
  icon: string
}

export interface LocationNeighbor {
  id: number
  slug: string
  city_name: string
}

export interface LocationDataResponse {
  data: LocationRecord[]
}

export interface LocationRecord {
  id: number
  documentId: string
  slug: string
  city_name: string
  active: boolean
  zip_codes: string
  coordinates: Coordinates
  createdAt: string // ISO Date string
  updatedAt: string
  publishedAt: string
  local_hook: string
  neighborhood_context: string
  faq_location: FAQLocation[]
  location_image: LocationImage | null
  // These appear to be self-referencing or related location records
  left_col: LocationRecord[]
  right_col: LocationRecord[]
}

export interface Coordinates {
  lat: number
  lng: number
  zoom: number
  address_hint: string
}

export interface FAQLocation {
  id?: number
  question: string
  answer: string
}

export interface LocationImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: string | null
  width: number
  height: number
  formats: ImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ImageFormats {
  large?: ImageSize
  medium?: ImageSize
  small?: ImageSize
  thumbnail?: ImageSize
}

export interface ImageSize {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}
export interface IServiceItem {
  title: string
  description: string
  icon: string
}
export interface LocationNeighbor {
  id: number
  slug: string
  city_name: string
  zip_codes?: string // Add this
  location_image?: {
    url: string
    alternativeText?: string
  }
}
