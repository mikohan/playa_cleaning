"use client"

import React, { Suspense, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PartyPopper, CheckCircle2 } from "lucide-react"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"

// Create a sub-component to handle the logic that uses useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams()

  // paid = Stripe deposit/full payment, requested = booking page "pay later",
  // anything else = the quick quote forms
  const status = searchParams.get("status")
  const bookingId = searchParams.get("booking")

  // Booking is done: drop the saved booking-form draft
  useEffect(() => {
    try {
      sessionStorage.removeItem("playa-booking-draft")
    } catch {
      /* ignore */
    }
  }, [])

  const ownerName = process.env.NEXT_PUBLIC_COMPANY_OWNER || "Alicia"
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(424) 356-2343"
  const numericPhone = companyPhone.replace(/[^0-9+]/g, "")

  const copy =
    status === "paid"
      ? {
          tag: "Payment received",
          title: "You're all set!",
          text: `Your payment went through and a receipt is on its way to your email. ${ownerName} will call or text you soon to confirm the exact date and time.`,
          points: ["Receipt sent to your email", "Full refund if you cancel at least one day before"],
        }
      : status === "requested"
        ? {
            tag: "Booking request received",
            title: "Thank you! Your request is in.",
            text: `${ownerName} will call or text you soon to confirm the date and time. You pay after the cleaning.`,
            points: ["Confirmation email sent", "Nothing to pay today"],
          }
        : {
            tag: "Quote request received",
            title: "Thanks! We've got you covered.",
            text: `${ownerName} and the team are reviewing your details now. We will reach out shortly with your custom price estimate.`,
            points: ["Priority scheduling", "Confirmation in ~15 mins"],
          }

  return (
    <div className="flex flex-col justify-center p-8 md:p-16">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary-blue">
          <PartyPopper size={20} />
          <span className="text-xs font-black tracking-widest uppercase">{copy.tag}</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{copy.title}</h1>

        <p className="text-lg leading-relaxed text-foreground/75">{copy.text}</p>

        {bookingId && (
          <p className="text-sm text-muted-foreground">
            Booking number: <span className="font-bold text-foreground">{bookingId}</span>
          </p>
        )}

        <div className="space-y-4 pt-4">
          {copy.points.map((p) => (
            <div key={p} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-green-600" />{" "}
              <span className="text-sm font-bold">{p}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          <Link
            href="/"
            className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-sm font-bold text-white transition-all hover:bg-blue-700"
          >
            Return Home
          </Link>
          <a
            href={`tel:${numericPhone}`}
            className="flex-1 rounded-xl bg-slate-100 py-4 text-center text-sm font-bold transition-all hover:bg-slate-200"
          >
            {companyPhone}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm md:grid-cols-2">
        <div className="relative aspect-square bg-slate-100 md:aspect-auto">
          <Image
            src={AliciaPortrait}
            alt="Playa Cleaning"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Suspense boundary is required here */}
        <Suspense fallback={<div className="p-16">Loading...</div>}>
          <ThankYouContent />
        </Suspense>
      </div>
    </div>
  )
}
