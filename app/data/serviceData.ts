export interface ServiceItem {
  id: number
  title: string
  slug: string
  description: string
  category: "Residential" | "Commercial" | "Specialty"
  gradient: string
}

const initialServices: ServiceItem[] = [
  {
    id: 1,
    title: "Deep House Cleaning",
    slug: "deep-house-cleaning",
    category: "Residential",
    description:
      "Comprehensive top-to-bottom sanitization for your entire home.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Office Maintenance",
    slug: "office-cleaning",
    category: "Commercial",
    description:
      "Daily or weekly janitorial services to keep your workspace productive.",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: 3,
    title: "Post-Construction",
    slug: "post-construction-cleaning",
    category: "Specialty",
    description:
      "Detailed dust and debris removal after renovations or new builds.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 4,
    title: "Move-In/Move-Out",
    slug: "move-in-out-cleaning",
    category: "Residential",
    description:
      "Making sure your new or old home is spotless for the next chapter.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 5,
    title: "Retail Storefronts",
    slug: "retail-cleaning",
    category: "Commercial",
    description: "Ensure a pristine shopping experience for your customers.",
    gradient: "from-sky-500/20 to-blue-600/20",
  },
  {
    id: 6,
    title: "Airbnb & Rental Turnovers",
    slug: "airbnb-cleaning",
    category: "Residential",
    description:
      "Quick, reliable turnaround services for high-rated hospitality.",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
]

// Generate the remaining 18 items with explicit typing
const generatedServices: ServiceItem[] = Array.from({ length: 18 }).map(
  (_, i) => ({
    id: i + 7,
    title: `Professional Service ${i + 7}`,
    slug: `service-${i + 7}`,
    // The 'as const' or explicit casting tells TS this isn't just any string
    category: (i % 2 === 0 ? "Residential" : "Commercial") as
      | "Residential"
      | "Commercial",
    description:
      "High-quality cleaning solution tailored to your specific needs and schedule.",
    gradient: "from-primary-blue/10 to-transparent",
  })
)

export const services: ServiceItem[] = [
  ...initialServices,
  ...generatedServices,
]
