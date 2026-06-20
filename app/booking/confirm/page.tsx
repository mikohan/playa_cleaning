"use client"

import React, { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Calendar,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react"

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const bookingData = {
    price: searchParams.get("price") || "0",
    type: searchParams.get("type") || "Standard",
    rooms: searchParams.get("rooms") || "2BR/2BA",
    addons: searchParams.get("addons") || "None",
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: bookingData.price,
          email: formData.get("email"),
          serviceType: bookingData.type,
          rooms: bookingData.rooms,
          addons: bookingData.addons,
        }),
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error)
    } catch (error) {
      alert("Failed to start payment")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
        >
          <ChevronLeft size={16} /> Edit Estimate
        </button>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Form Column */}
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12 lg:col-span-7">
            <h1 className="mb-8 text-4xl font-extrabold text-slate-900">
              Finalize Your <span className="text-blue-600">Booking</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  required
                  name="username"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  required
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                name="address"
                placeholder="Service Address"
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-5 text-lg font-bold text-white transition-all hover:bg-slate-800"
              >
                {loading ? "Processing..." : "Secure My Slot"}
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
              <div className="bg-blue-600 p-8 text-white">
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                  Booking Total
                </p>
                <div className="mt-2 text-6xl font-extrabold">
                  ${bookingData.price}
                </div>
              </div>
              <div className="space-y-6 p-8">
                <div className="flex items-center justify-between border-b pb-4 text-sm font-bold">
                  <span className="tracking-wider text-slate-400 uppercase">
                    Service
                  </span>
                  <span>{bookingData.type}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4 text-sm font-bold">
                  <span className="tracking-wider text-slate-400 uppercase">
                    Specs
                  </span>
                  <span>{bookingData.rooms}</span>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <span className="mb-2 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                    <Sparkles size={12} /> Add-ons
                  </span>
                  <p className="text-sm font-medium text-slate-700 italic">
                    {bookingData.addons}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}
