"use client"

import React from "react"
import Link from "next/link"
import { TreePalm } from "lucide-react"
import { ServiceData } from "@/app/types/serviceTypes"

// Icons
import { InstagramIcon } from "../icons/InstagramIcon"
import { FacebookIcon } from "@/components/icons/FacebookIcon"
import { TikTokIcon } from "@/components/icons/TikTokIcon"
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

interface FooterProps {
  services: ServiceData[]
}

export const Footer = ({ services }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  // Dynamic branding parameters
  const ownerName = process.env.NEXT_PUBLIC_COMPANY_OWNER || "Alicia"
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"
  const companyEmail =
    process.env.NEXT_PUBLIC_COMPANY_EMAIL || "order@playacleaning.com"
  const numericPhone = companyPhone.replace(/[^0-9+]/g, "")

  // SEO Optimization: Slice list for strict footer scannability
  const visibleServices = (services ?? []).slice(0, 8)

  return (
    <footer className="relative bg-foreground pt-16 text-background">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />

      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* Optimized from 4 columns to 3 columns to hold balanced layout weight */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand & Dynamic Contact Layout */}
          <div className="flex flex-col items-center space-y-5 md:items-start">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <TreePalm className="h-8 w-8 text-primary-blue" />
              <span className="text-3xl font-bold">
                Playa<span className="text-primary-blue">Cleaning</span>
              </span>
            </Link>

            <div className="flex flex-col items-center space-y-2 md:items-start">
              <p className="font-blauerMedium text-center text-2xl font-semibold md:text-left">
                <a
                  href={`tel:${numericPhone}`}
                  className="transition-colors hover:text-primary-blue"
                >
                  {companyPhone}
                </a>
              </p>
              <p className="text-center text-sm font-medium text-background/80 md:text-left">
                <a
                  href={`mailto:${companyEmail}`}
                  className="underline underline-offset-4 transition-colors hover:text-primary-blue"
                >
                  {companyEmail}
                </a>
              </p>
            </div>

            <div className="flex gap-4 pt-2">
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

          {/* Column 2: Clean Dynamic Services Directory */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 text-sm font-black tracking-widest text-primary-blue uppercase">
              Our Cleaning Programs
            </h4>
            <nav className="grid grid-cols-1 gap-y-3 text-center md:text-left">
              {visibleServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium text-background/80 transition-colors hover:text-primary-blue"
                >
                  {service.name}
                </Link>
              ))}
              {services?.length > 8 && (
                <Link
                  href="/services"
                  className="pt-2 text-xs font-bold tracking-widest text-primary-blue uppercase hover:underline"
                >
                  All Options →
                </Link>
              )}
            </nav>
          </div>

          {/* Column 3: Corporate Info & Disclaimers */}
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
                href="/pricing"
                className="transition-colors hover:text-primary-blue"
              >
                Pricing Structure
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-primary-blue"
              >
                About Us
              </Link>
              <p className="mt-4 max-w-50 text-xs leading-relaxed text-background/60 italic">
                Managed by {ownerName} & team. Premium residential resets and
                scheduled upkeep.
              </p>
            </nav>
          </div>
        </div>

        {/* Bottom Safety Bar */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 text-[13px] text-background/80 md:flex-row">
          <p>© {currentYear} Playa Cleaning LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="font-bold text-primary-blue">
              Licensed & Bonded
            </span>
            <span>•</span>
            <span>Los Angeles County</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
