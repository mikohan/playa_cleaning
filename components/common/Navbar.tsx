"use client"

import Link from "next/link"
import { Menu, Search, TreePalm } from "lucide-react"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { title: "Home", href: "/" },
  { title: "Home Cleaning", href: "/home-cleaning-near-me" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Contact", href: "/contact" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative container mx-auto flex h-16 items-center justify-between px-4">
        <div className="absolute top-0 left-0 -z-10 h-16 w-full bg-top-blur blur-2xl"></div>
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-90"
        >
          <TreePalm className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Playa<span className="text-primary-blue">Cleaning</span>
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden items-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className={cn("text-lg", "nav-animation-underline")}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <div className="hidden items-center space-x-4 sm:flex">
            <ThemeToggle />
            <AnimatedButton>
              <ButtonShiny text="Get Price" size={"sm"}></ButtonShiny>
            </AnimatedButton>
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="shrink-0">
                  <Menu className="h-8! w-8!" />
                  <span className="sr-only">Toggle navigation menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-75 flex-col gap-16 px-8 sm:w-100"
              >
                <SheetHeader className="mb-4 border-b pb-4">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <TreePalm className="h-8! w-8! text-primary-blue" />
                    <span className="text-2xl">
                      Playa<span className="text-primary-blue">Cleaning</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="border-b border-transparent py-2 text-2xl font-semibold transition-colors hover:border-border hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4">
                    <ButtonShiny text="Order Cleaning" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
