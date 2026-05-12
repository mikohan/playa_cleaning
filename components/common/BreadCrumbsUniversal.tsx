"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you use shadcn/ui utils

export function BreadCrumbsUniversal() {
  const pathname = usePathname()

  // Split the path into segments and filter out empty strings
  // Example: "/services/upholstery-cleaning" -> ["services", "upholstery-cleaning"]
  const pathSegments = pathname.split("/").filter((item) => item !== "")

  return (
    <nav className="container mx-auto px-6 py-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-[0.15em] text-muted-foreground/60 uppercase [word-spacing:0.2rem]">
        {/* Always show Home */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary-blue"
          >
            <Home className="h-3 w-3 translate-y-[-1px]" />
            <span>Home</span>
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          // Build the href step-by-step
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1

          // Format the label: replace dashes with spaces and capitalize
          const label = segment.replace(/-/g, " ")

          return (
            <li key={href} className="flex items-center gap-3">
              <ChevronRight className="h-3 w-3 opacity-40" />

              {isLast ? (
                // Last segment: Active state, no link
                <span className="font-black text-primary-blue underline decoration-primary-blue/20 decoration-2 underline-offset-4">
                  {label}
                </span>
              ) : (
                // Middle segments: Linkable
                <Link
                  href={href}
                  className="transition-colors hover:text-primary-blue"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
