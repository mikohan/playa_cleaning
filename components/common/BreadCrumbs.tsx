import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function BreadCrumbs({ serviceName }: { serviceName?: string }) {
  const activClass = serviceName
    ? ""
    : "font-black text-primary-blue underline decoration-primary-blue/20 underline-offset-4"

  return (
    <nav className="container mx-auto px-6 py-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-3 text-[10px] font-bold tracking-[0.15em] text-muted-foreground/60 uppercase [word-spacing:0.2rem]">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary-blue"
          >
            <Home className="h-3 w-3 translate-y-[-1px]" />
            <span>Home</span>
          </Link>
        </li>

        <ChevronRight className="h-3 w-3 opacity-40" />

        <li className={activClass}>
          <Link
            href="/services"
            className="transition-colors hover:text-primary-blue"
          >
            Services
          </Link>
        </li>
        {serviceName && (
          <>
            <ChevronRight className="h-3 w-3 opacity-40" />

            <li className="font-black text-primary-blue underline decoration-primary-blue/20 underline-offset-4">
              {serviceName}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
