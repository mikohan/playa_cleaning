// import { blauerNue } from "@/app/fonts"
import ReactLenis from "lenis/react"
import "lenis/dist/lenis.css"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"

export const metadata: Metadata = {
  // Add this line here:
  metadataBase: new URL("https://playacleaning.com"),

  title: {
    default: "Playa Cleaning | Professional House Cleaning Los Angeles",
    template: "%s | Playa Cleaning",
  },
  description: "Premium flat-rate house cleaning services in Los Angeles.",
  openGraph: {
    images: "/og-image.jpg", // Now correctly resolves to https://playacleaning.com/og-image.jpg
  },
}
// const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
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
        // blauerNue.variable,
        jakarta.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <ReactLenis root>
        <body>
          <GoogleTagManager gtmId={gtmId} />
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  )
}
