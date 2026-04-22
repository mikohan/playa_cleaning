import { blauerNue } from "@/app/fonts"
import ReactLenis from "lenis/react"
import "lenis/dist/lenis.css"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", blauerNue.variable)}
    >
      <ReactLenis root>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  )
}
