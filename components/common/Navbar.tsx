"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, Rocket, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Contact", href: "/contact" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-90"
        >
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            ANGARA
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
                    className={navigationMenuTriggerStyle()}
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
          <div className="hidden items-center space-x-2 sm:flex">
            <ThemeToggle />
            <Button size="sm" className="px-5">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader className="mb-4 border-b pb-4">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>Navigation</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="border-b border-transparent py-2 text-lg font-semibold transition-colors hover:border-border hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                    <Button className="w-full">Get Started</Button>
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
