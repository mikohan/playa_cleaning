import { blauerNue } from "@/app/fonts"
import ReactLenis from "lenis/react"
import "lenis/dist/lenis.css"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Plus_Jakarta_Sans, Inter, Geist } from "next/font/google"

// const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
export const metadata: Metadata = {
  title: "Playa Cleaning | Professional House & Deep Cleaning Los Angeles",
  description:
    "Top-rated house cleaning and deep cleaning services in Playa Vista, Santa Monica, and Los Angeles. Book your professional cleaner online in 60 seconds.",
  keywords: [
    "house cleaning Los Angeles",
    "deep cleaning Playa Vista",
    "maid service Santa Monica",
    "apartment cleaning 90094",
  ],

  // SEO & Geo-Targeting
  authors: [{ name: "Playa Cleaning" }],
  creator: "Playa Cleaning",
  publisher: "Playa Cleaning",
  formatDetection: {
    email: false,
    address: true,
    telephone: true, // This highlights your 213-598-7763 number for mobile users
  },

  // Open Graph (Facebook/Instagram)
  openGraph: {
    title: "Playa Cleaning | Top-Rated Home Cleaning in LA",
    description:
      "Eco-friendly and reliable professional cleaning services tailored for your home.",
    url: "https://playacleaning.com",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "https://playacleaning.com/og-image.jpg", // Ensure this file exists in /public
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Professional Staff",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Playa Cleaning | Los Angeles House Cleaning",
    description:
      "Professional cleaning services in Playa Vista and Santa Monica.",
    images: ["https://playacleaning.com/og-image.jpg"],
  },

  // Robots & Canonical
  alternates: {
    canonical: "https://playacleaning.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    rel: "preconnect",
    url: "https://fonts.googleapis.com",
  },
}
// Separate Viewport Export (Required in newer Next.js versions)
export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

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

const gtmId = process.env.NEXT_PUBLIC_TAG_MANAGER_ID || "GTM-PQNQ5K5R"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        blauerNue.variable,
        jakarta.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <GoogleTagManager gtmId={gtmId} />
      <ReactLenis root>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  )
}
