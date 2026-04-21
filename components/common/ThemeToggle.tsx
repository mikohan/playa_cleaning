"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Use a microtask or a slight delay to move the setState out of
  // the synchronous execution flow of the effect.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    // If system theme is used, we explicitly switch to the opposite
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
  }

  // To completely avoid hydration errors and the "cascading" warning,
  // we render a button that looks identical but is "hollow" until mounted.
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative" disabled>
        <Sun className="h-6! w-6! opacity-0" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <Sun className="h-6! w-6! scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-6! w-6! scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
