"use client"

import React from "react"
import Link from "next/link"
import { TreePalm } from "lucide-react"

// Optimized React Component Icons
import { InstagramIcon } from "../icons/InstagramIcon"
// import { YouTubeIcon } from "../icons/YoutubeIcon"
import { FacebookIcon } from "@/components/icons/FacebookIcon"
import { TikTokIcon } from "@/components/icons/TickTockIcon"
import { NextdoorIcon } from "@/components/icons/NextdoorIcon"

import { WaveDivider } from "./WaveDivider"
import { YoutubeIcon } from "../icons/YoutubeIcon"

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
    href: "https://nextdoor.com/page/playa-cleaning-playa-vista-ca/", // Update with your actual link
    icon: NextdoorIcon,
    hoverColor: "hover:text-[#00B53F]",
  },
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-16">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--background)" />

      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col items-center space-y-10 text-center">
          {/* Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <TreePalm className="h-8 w-8 text-primary-blue" />
            <span className="text-3xl font-bold">
              Playa<span className="text-primary-blue">Cleaning</span>
            </span>
          </Link>

          {/* Contact & Main Navigation */}
          <div className="space-y-4">
            <p className="font-blauerMedium text-2xl font-semibold md:text-3xl">
              <a
                href="tel:2135987763"
                className="transition-colors hover:text-primary-blue"
              >
                (213) 598-77-63
              </a>
            </p>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-primary/80">
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
                href="#services"
                className="transition-colors hover:text-primary-blue"
              >
                Our Process
              </Link>
            </nav>
          </div>

          {/* Social Media Grid */}
          <div className="flex justify-center gap-6 md:gap-10">
            {SOCIAL_LINKS.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-primary/60 transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <IconComponent className="h-8 w-8" />
                </a>
              )
            })}
          </div>

          {/* Bottom Bar */}
          <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[13px] text-primary/80 md:flex-row">
            <p>© {currentYear} Playa Cleaning LLC. All rights reserved.</p>
            <p className="italic">
              Serving a 50-mile radius around Los Angeles, CA
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
