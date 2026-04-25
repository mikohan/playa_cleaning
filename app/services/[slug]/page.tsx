import { servicePages } from "@/app/data/seo-data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Navbar } from "@/components/common/Navbar"

interface Props {
  params: Promise<{ slug: string }> // Update interface to a Promise
}

// 1. Fixed Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params // MUST await this now
  const service = servicePages.find((p) => p.slug === slug)

  if (!service) return {}

  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.og_data["og:title"],
      description: service.seo.og_data["og:description"],
    },
  }
}

// 2. Static Params remain the same (they handle the promise internally)
export async function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }))
}

// 3. Fixed Page Component
export default async function ServicePage({ params }: Props) {
  const { slug } = await params // MUST await this here too
  const service = servicePages.find((p) => p.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service.ld_json) }}
        />
        <div>
          <h1 className="mb-4 text-4xl font-black text-primary-blue">
            {service.page}
          </h1>
          <p className="text-muted-foreground">{service.seo.description}</p>
        </div>
      </div>
    </main>
  )
}
