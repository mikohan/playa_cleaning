export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  url: string
  hash: string
  ext: string
  mime: string
  size: number
  width: number | null
  height: number | null
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface FAQService {
  id: number
  question: string
  answer: string
}

export interface ServiceAddon {
  id: number
  documentId: string
  name: string
  price: number
  description: string
  unit: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ServiceData {
  id: number
  documentId: string
  slug: string
  header: string
  subheader: string
  name: string
  meta_title: string
  meta_description: string
  button_text: string
  seo_text_rich: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  faq_service: FAQService[]
  photo: StrapiImage
  service_addons_included: ServiceAddon[]
}

export interface StrapiMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

// Unified response type to handle both v4 (attributes) and v5 (flat)
export interface StrapiResponse<T> {
  data: Array<T & { attributes?: T }>
  meta: StrapiMeta
}
