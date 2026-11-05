import React from "react"
import Link from "next/link"
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { BreadCrumbsUniversal } from "@/components/common/BreadCrumbsUniversal"

export const metadata: Metadata = {
  title: "Privacy Policy | Los Angeles",
  description:
    "Learn how Playa Cleaning (Angara Steamers) collects, uses, and protects your personal data. We are committed to your privacy and the security of your information.",
  keywords: [
    "Playa Cleaning privacy policy",
    "data protection",
    "cleaning service legal",
    "privacy terms Los Angeles",
  ],
  alternates: {
    canonical: "https://playacleaning.com/privacy-policy",
  },

  // Open Graph
  openGraph: {
    title: "Privacy Policy | Playa Cleaning",
    description:
      "Our commitment to protecting your privacy and personal information at Playa Cleaning.",
    url: "https://playacleaning.com/privacy-policy",
    siteName: "Playa Cleaning",
    images: [
      {
        url: "/og-image.jpg", // A neutral, professional legal-themed image
        width: 1200,
        height: 630,
        alt: "Playa Cleaning Legal and Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Robots - We want it indexed as a trust signal, but not a priority for snippets
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="font-blauerRegular min-h-screen bg-slate-50 px-6 py-12 lg:px-8">
      <BreadCrumbsUniversal />
      <div className="mx-auto max-w-3xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Legal
            </span>
          </div>
          <h1 className="font-blauerMedium mb-4 text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-slate-500">Last updated: {lastUpdated}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-slate-100 p-2 text-slate-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  1. Information We Collect
                </h2>
                <p className="leading-relaxed text-slate-600">
                  At <strong>Playa Cleaning</strong>, we collect information
                  that you provide directly to us when you request a quote or
                  book a service. This includes:
                </p>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-slate-600">
                  <li>Name and contact information (Email and Phone)</li>
                  <li>Service address for cleaning appointments</li>
                  <li>
                    Details about your home or furniture (e.g., couch size, rug
                    dimensions)
                  </li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-slate-100 p-2 text-slate-600">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  2. How We Use Your Data
                </h2>
                <p className="leading-relaxed text-slate-600">
                  Your data is used strictly to provide professional cleaning
                  services. We use it to:
                </p>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-slate-600">
                  <li>Schedule and confirm your cleaning reservations</li>
                  <li>Send service-related notifications and receipts</li>
                  <li>Improve our cleaning techniques and customer support</li>
                  <li>Comply with local Los Angeles business regulations</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-slate-100 p-2 text-slate-600">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  3. Data Security
                </h2>
                <p className="leading-relaxed text-slate-600">
                  We implement a variety of security measures to maintain the
                  safety of your personal information. We never sell, trade, or
                  otherwise transfer your personally identifiable information to
                  outside parties except for the purpose of delivering the
                  service requested.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-slate-100 p-2 text-slate-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  4. YouTube API Services
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">
                  <p>
                    We use YouTube API Services to upload videos of our own
                    cleaning work to our own YouTube channel. Watching our
                    videos on YouTube is covered by the{" "}
                    <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      YouTube Terms of Service
                    </a>{" "}
                    and the{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Google Privacy Policy
                    </a>
                    .
                  </p>
                  <p>
                    Our upload tool connects only to YouTube channels owned by
                    our company. It reads and stores only what it needs to
                    publish: an access token for our own channel, kept on our
                    private server, and the IDs and titles of the videos we
                    upload. It collects no information about website visitors
                    or other YouTube users.
                  </p>
                  <p>
                    The channel owner can revoke this access at any time in{" "}
                    <a href="https://security.google.com/settings/security/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Google security settings
                    </a>
                    . We delete stored tokens within 7 days after access is
                    revoked, or sooner on request to hello@playacleaning.com.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="font-blauerMedium mb-4 text-xl font-bold text-slate-900">
              5. Contact Us
            </h2>
            <p className="leading-relaxed text-slate-600">
              If you have questions regarding this privacy policy or our
              treatment of your personal data, please write to us by email at:
            </p>
            <div className="mt-6 inline-block rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-blue-600">
                hello@playacleaning.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-12 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Playa Cleaning LLC. All rights
          reserved.
        </footer>
      </div>
    </div>
  )
}
