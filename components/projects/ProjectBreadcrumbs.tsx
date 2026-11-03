import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export interface Crumb {
  label: string
  href?: string
}

/** Breadcrumbs with explicit labels (JSON-LD version lives in lib/project-seo). */
export function ProjectBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="container mx-auto px-6 py-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-[0.15em] text-muted-foreground/60 uppercase [word-spacing:0.2rem]">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary-blue"
          >
            <Home className="h-3 w-3 -translate-y-px" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((c, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-3">
              <ChevronRight className="h-3 w-3 opacity-40" />
              {isLast || !c.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="line-clamp-1 font-black text-primary-blue underline decoration-primary-blue/20 decoration-2 underline-offset-4"
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-primary-blue"
                >
                  {c.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
