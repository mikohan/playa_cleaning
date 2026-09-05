"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, TreePalm, MapPin } from "lucide-react"
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
import { ServiceData } from "@/app/types/serviceTypes"
import { LocationRecord } from "@/app/types/locationTypes"

interface NavbarProps {
  services: ServiceData[]
  locations: LocationRecord[]
}

export function Navbar({ services, locations }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const handleToggle = () => setTheme(theme === "dark" ? "light" : "dark")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const dynamicServiceItems = services.map((service) => ({
    name: service.name,
    href: `/services/${service.slug}`,
    description:
      service.meta_description ||
      `Professional ${service.name.toLowerCase()} services.`,
  }))

  const dynamicLocationItems = locations.map((loc) => ({
    name: loc.city_name,
    href: `/locations/${loc.slug}`,
    description: `Professional house cleaning in ${loc.city_name}, CA.`,
  }))

  const navItems = [
    { title: "Home", href: "/", className: "" },
    { title: "Pricing", href: "/cleaning-calculator" },
    { title: "About", href: "/about" },
    {
      title: process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343",
      href: process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK || "+14243562343",
      className: "font-black",
      type: "phone",
    },
    {
      title: "Services",
      href: "/services",
      isDropdown: true,
      subItems: dynamicServiceItems,
    },
    {
      title: "Locations",
      href: "/locations",
      isDropdown: true,
      subItems: dynamicLocationItems.slice(0, 12),
    },
  ]

  return (
    <header className="sticky top-0 z-50 max-w-[100vw] border-b border-border/40 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative container mx-auto flex h-20 items-center justify-between px-6">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-top-blur/40 blur-3xl" />
        </div>

        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-90"
        >
          <TreePalm className="h-7 w-7 text-primary-blue" />
          <span className="traking-tighter text-xl font-black text-foreground">
            Playa<span className="text-primary-blue">Cleaning</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.isDropdown ? (
                    <>
                      <Link href={item.href} passHref>
                        <div className="cursor-pointer">
                          <NavigationMenuTrigger
                            className={cn(
                              item.className,
                              "cursor-pointer bg-transparent font-black tracking-widest uppercase transition-colors hover:text-primary-blue"
                            )}
                          >
                            {item.title}
                          </NavigationMenuTrigger>
                        </div>
                      </Link>
                      <NavigationMenuContent className="z-50">
                        <ul className="grid max-w-[100vw] gap-3 rounded-2xl border border-border bg-background p-6 shadow-xl md:w-125 md:grid-cols-2 lg:w-150">
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
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                          {item.title === "Locations" && (
                            <li className="col-span-2 mt-2 border-t border-border pt-2">
                              <Link
                                href="/locations"
                                className={cn(
                                  item.className,
                                  "flex items-center justify-center text-[10px] font-bold text-primary-blue uppercase hover:underline"
                                )}
                              >
                                View All Service Areas{" "}
                                <MapPin className="ml-1 h-3 w-3" />
                              </Link>
                            </li>
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={
                          item.type === "phone" ? `tel:${item.href}` : item.href
                        }
                        className={cn(
                          "px-4 py-2 font-bold tracking-widest text-primary-blue-dark uppercase",
                          "nav-animation-underline",
                          item.className
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

        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-4 sm:flex">
            <ThemeToggle />
            <Link href="/cleaning-calculator">
              <AnimatedButton>
                <ButtonShiny text="Get Price" size="sm" />
              </AnimatedButton>
            </Link>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 outline-none">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col gap-8 overflow-y-auto px-8 py-12"
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
                        href={
                          item.type === "phone" ? `tel:${item.href}` : item.href
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-black tracking-tight text-foreground uppercase hover:text-primary-blue"
                      >
                        {item.title}
                      </Link>
                      {item.isDropdown && (
                        <div className="grid grid-cols-1 gap-2 pl-4">
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm font-bold tracking-widest text-muted-foreground uppercase hover:text-primary-blue"
                            >
                              — {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-8 pb-6">
                  <div
                    onClick={handleToggle}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border p-3 text-[10px] font-black tracking-widest uppercase transition-colors hover:bg-muted"
                  >
                    <ThemeToggle /> Toggle Theme
                  </div>
                  <Link
                    href="/cleaning-calculator"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ButtonShiny text="Order Cleaning" />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
