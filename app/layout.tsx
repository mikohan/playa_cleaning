import { Plus_Jakarta_Sans, Inter } from "next/font/google"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"

import "./globals.css"
import "lenis/dist/lenis.css"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"

// Import your helper and types
import { strapiRequest } from "@/lib/strapi"
import { ServiceData, StrapiResponse } from "@/app/types/serviceTypes"
import { LocationRecord } from "@/app/types/locationTypes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// --- Fonts ---
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// --- Metadata ---
export const metadata: Metadata = {
  metadataBase: new URL("https://playacleaning.com"),
  title: {
    default: "Playa Cleaning | Professional House Cleaning Los Angeles",
    template: "%s | Playa Cleaning",
  },
  description: "Premium flat-rate house cleaning services in Los Angeles.",
  openGraph: {
    images: "/og-image.jpg",
  },
  appleWebApp: {
    title: "PlayaCleaning",
    statusBarStyle: "default",
    capable: true,
  },
}

const gtmId = process.env.NEXT_PUBLIC_TAG_MANAGER_ID || "GTM-PQNQ5K5R"

/**
 * Optimized fetcher for global navigation data
 */
async function getGlobalData() {
  try {
    // 1. Fetch Services
    const servicesRes = await strapiRequest<StrapiResponse<ServiceData>>(
      "services",
      {
        "fields[0]": "name",
        "fields[1]": "slug",
        "fields[2]": "meta_description",
        "pagination[pageSize]": 20,
      }
    )

    // 2. Fetch Locations
    const locationsRes = await strapiRequest<StrapiResponse<LocationRecord>>(
      "locations",
      {
        "fields[0]": "city_name",
        "fields[1]": "slug",
        "pagination[pageSize]": 100, // Fetch all cities for the sitemap
      }
    )

    // Flattening logic
    const services =
      (servicesRes?.data?.map((item) => ({
        ...item,
        ...(item.attributes ? item.attributes : {}),
      })) as ServiceData[]) || []

    const locations =
      (locationsRes?.data?.map((item) => ({
        ...item,
        ...(item.attributes ? item.attributes : {}),
      })) as LocationRecord[]) || []

    return { services, locations }
  } catch (error) {
    console.error("Layout Data Fetch Error:", error)
    return { services: [], locations: [] }
  }
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Playa Cleaning",
  url: "https://www.playacleaning.com",
  logo: "https://www.playacleaning.com/logo.png", // Must be a direct link to your logo image
  sameAs: [
    "https://www.instagram.com/playa_cleaning",
    "https://www.facebook.com/profile.php?id=61555670068109",
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch both datasets once
  const { services, locations } = await getGlobalData()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        jakarta.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body>
        <GoogleTagManager gtmId={gtmId} />
        <ThemeProvider>
          <main>
            {/* Pass both to Navbar for the "Services" and "Locations" dropdowns */}
            <Navbar services={services ?? []} locations={locations ?? []} />
            {children}
            <Footer services={services ?? []} />
            <ToastContainer theme="colored" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
