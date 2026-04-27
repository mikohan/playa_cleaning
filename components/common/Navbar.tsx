"use client"

import React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, TreePalm } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    href: "/services",
    isDropdown: true,
    subItems: [
      { name: "Regular Cleaning", href: "/services/house-cleaning" },
      { name: "Deep Cleaning", href: "/services/deep-cleaning" },
      { name: "Commercial & Office", href: "/services/office-cleaning" },
      { name: "Move Out Cleaning", href: "/services/move-out-cleaning" },
      { name: "Airbnb Cleaning", href: "/services/airbnb-cleaning" },
      { name: "Carpet & Upholstery", href: "/services/upholstery-cleaning" },
    ],
  },
  { title: "Locations", href: "/locations" },
  { title: "Estimator", href: "/cleaning-calculator" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const handleToggle = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-90"
        >
          <TreePalm className="h-7 w-7 text-primary-blue" />
          <span className="text-xl font-black tracking-tighter text-foreground">
            Playa<span className="text-primary-blue">Cleaning</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.isDropdown ? (
                    <>
                      <Link href={item.href} passHref>
                        <div className="cursor-pointer">
                          <NavigationMenuTrigger className="cursor-pointer bg-transparent text-[10px] font-black tracking-[0.2em] uppercase transition-colors hover:text-primary-blue">
                            {item.title}
                          </NavigationMenuTrigger>
                        </div>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 rounded-2xl border border-border bg-background p-6 shadow-xl md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.subItems?.map((sub) => (
                            <li key={sub.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sub.href}
                                  className="block space-y-1 rounded-xl p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-primary-blue"
                                >
                                  <div className="text-[11px] font-black tracking-wider uppercase">
                                    {sub.name}
                                  </div>
                                  <p className="line-clamp-2 text-[10px] leading-snug font-medium tracking-tight text-muted-foreground uppercase opacity-70">
                                    Professional {sub.name.toLowerCase()} for
                                    your home.
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-colors hover:text-primary-blue",
                          "nav-animation-underline"
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-4 sm:flex">
            <ThemeToggle />
            <Link href="/cleaning-calculator">
              <AnimatedButton>
                <ButtonShiny text="Get Price" size="sm" />
              </AnimatedButton>
            </Link>
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 outline-none">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col gap-8 px-8 py-12"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <TreePalm className="h-6 w-6 text-primary-blue" />
                    <span className="text-xl font-black tracking-tighter uppercase">
                      Playa<span className="text-primary-blue">Cleaning</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-6 pt-10">
                  {navItems.map((item) => (
                    <div key={item.title} className="flex flex-col gap-4">
                      <Link
                        href={item.href}
                        className="text-2xl font-black tracking-tight text-foreground uppercase hover:text-primary-blue"
                      >
                        {item.title}
                      </Link>
                      {item.isDropdown &&
                        item.subItems?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="pl-4 text-sm font-bold tracking-widest text-muted-foreground uppercase hover:text-primary-blue"
                          >
                            — {sub.name}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <Link href="/calculator">
                    <ButtonShiny text="Order Cleaning" />
                  </Link>
                  <div
                    onClick={handleToggle}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border p-3 text-[10px] font-black tracking-widest uppercase transition-colors hover:bg-muted"
                  >
                    <ThemeToggle /> Toggle Theme
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
