"use client"

import React from "react"
import Link from "next/link"
import { TreePalm } from "lucide-react"
import { servicePages } from "@/app/data/seo-data"

// Optimized React Component Icons
import { InstagramIcon } from "../icons/InstagramIcon"
import { FacebookIcon } from "@/components/icons/FacebookIcon"
import { TikTokIcon } from "@/components/icons/TickTockIcon"
import { NextdoorIcon } from "@/components/icons/NextdoorIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { WaveDivider } from "./WaveDivider"

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/playa_cleaning/",
    icon: InstagramIcon,
    hoverColor: "hover:text-[#E4405F]",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@PlayaCleaningUS",
    icon: YoutubeIcon,
    hoverColor: "hover:text-[#FF0000]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/playacleaning",
    icon: FacebookIcon,
    hoverColor: "hover:text-[#1877F2]",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@playacleaning",
    icon: TikTokIcon,
    hoverColor: "hover:text-[#000000]",
  },
  {
    name: "Nextdoor",
    href: "https://nextdoor.com/page/playa-cleaning-playa-vista-ca/",
    icon: NextdoorIcon,
    hoverColor: "hover:text-[#00B53F]",
  },
]

// Top locations for SEO silo linking
const TOP_LOCATIONS = [
  { name: "Santa Monica", slug: "santa-monica" },
  { name: "Venice Beach", slug: "venice" },
  { name: "Culver City", slug: "culver-city" },
  { name: "West Los Angeles", slug: "west-la" },
  { name: "Marina Del Rey", slug: "marina-del-rey" },
  { name: "Playa Vista", slug: "playa-vista" },
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-foreground pt-16 text-background">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />

      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* Changed to grid-cols-2 on small tablets and grid-cols-4 on desktop */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col items-center space-y-6 md:items-start">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <TreePalm className="h-8 w-8 text-primary-blue" />
              <span className="text-3xl font-bold">
                Playa<span className="text-primary-blue">Cleaning</span>
              </span>
            </Link>
            <p className="font-blauerMedium text-center text-2xl font-semibold md:text-left">
              <a
                href="tel:2135987763"
                className="transition-colors hover:text-primary-blue"
              >
                (213) 598-77-63
              </a>
            </p>
            <div className="flex gap-4 text-foreground">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-background/60 transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: The 8 Services (SEO Powerhouse) */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 text-sm font-black tracking-widest text-primary-blue uppercase">
              Our Services
            </h4>
            <nav className="grid grid-cols-1 gap-y-3 text-center md:text-left">
              {servicePages.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium text-background/80 transition-colors hover:text-primary-blue"
                >
                  {service.page}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Service Areas (New Section) */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 text-sm font-black tracking-widest text-primary-blue uppercase">
              Service Areas
            </h4>
            <nav className="grid grid-cols-1 gap-y-3 text-center md:text-left">
              {TOP_LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/services/house-cleaning/${loc.slug}`}
                  className="text-sm font-medium text-background/80 transition-colors hover:text-primary-blue"
                >
                  {loc.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Navigation & Area */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 text-sm font-black tracking-widest text-primary-blue uppercase">
              Company
            </h4>
            <nav className="flex flex-col gap-y-3 text-center text-sm font-medium text-background/80 md:text-left">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-primary-blue"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-primary-blue"
              >
                Terms of Service
              </Link>
              <Link
                href="/services"
                className="transition-colors hover:text-primary-blue"
              >
                Our Process
              </Link>
              <Link
                href="/pricing"
                className="transition-colors hover:text-primary-blue"
              >
                Pricing{" "}
              </Link>
              <p className="mt-4 max-w-50 text-xs leading-relaxed text-background italic opacity-70">
                Proudly serving a 50-mile radius around Los Angeles, CA.
              </p>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[13px] text-background/80 md:flex-row">
          <p>© {currentYear} Playa Cleaning LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="font-bold text-primary-blue">
              Licensed & Bonded
            </span>
            <span>•</span>
            <span>Los Angeles, CA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
