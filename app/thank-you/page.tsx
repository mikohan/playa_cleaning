"use client"

import React, { useEffect, useRef, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PartyPopper, CheckCircle2 } from "lucide-react"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"

// Create a sub-component to handle the logic that uses useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams()
  const hasTriggered = useRef(false)

  const status = searchParams.get("status")
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (status === "paid" && sessionId && !hasTriggered.current) {
      hasTriggered.current = true
      fetch("/api/notify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
    }
  }, [status, sessionId])

  const ownerName = process.env.NEXT_PUBLIC_COMPANY_OWNER || "Alicia"
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763"
  const numericPhone = companyPhone.replace(/[^0-9+]/g, "")

  return (
    <div className="flex flex-col justify-center p-8 md:p-16">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-blue-600">
          <PartyPopper size={20} />
          <span className="text-xs font-black tracking-widest uppercase">
            {status === "paid" ? "Payment Confirmed" : "Quote Request Received"}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          {status === "paid"
            ? "You're All Set!"
            : "Thanks! We've Got You Covered."}
        </h1>

        <p className="text-lg leading-relaxed text-slate-600">
          {status === "paid"
            ? "Your payment was successful. We've notified the team and will reach out shortly to finalize your appointment."
            : `${ownerName} and the team are reviewing your details now. We will reach out shortly with your custom price estimate.`}
        </p>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-600" />{" "}
            <span className="text-sm font-bold">Priority Scheduling</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-600" />{" "}
            <span className="text-sm font-bold">Confirmation in ~15 mins</span>
          </div>
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
