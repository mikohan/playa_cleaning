"use client"
import React, { useState, Suspense } from "react"

import { useSearchParams, useRouter } from "next/navigation"
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  ChevronLeft,
  Calendar,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
// 1. Import your action and the type
import { sendEmail } from "@/lib/resend"

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bookingMode, setBookingMode] = useState<"pay" | "query">("query")

  const bookingData = {
    price: searchParams.get("price") || "0",
    type: searchParams.get("type") || "Maintenance",
    sqft: searchParams.get("sqft") || "1200",
    rooms: searchParams.get("rooms") || "2/2", // Default fallback for splitting
    addons: searchParams.get("addons") || "None selected",
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    // 2. Map Calculator Data to match your Action's formData.get() calls
    const [beds, baths] = bookingData.rooms.replace(/[^0-9/]/g, "").split("/")
    formData.append("bedrooms", beds || "1")
    formData.append("bathrooms", baths || "1")
    formData.append("serviceType", bookingData.type)
    formData.append("price", bookingData.price)

    try {
      // 3. Trigger the Server Action for the Manager
      // We pass an empty object as prevState since we aren't using useActionState here
      const result = await sendEmail({}, formData, "manager")

      if (result.success) {
        // Optional: Trigger confirmation to customer
        await sendEmail({}, formData, "customer")

        if (bookingMode === "pay") {
          const email = (formData.get("email") as string) || ""
          const stripeUrl = `${process.env.NEXT_PUBLIC_STRIPE_URL}?prefilled_email=${encodeURIComponent(email)}`
          router.push(stripeUrl)
        } else {
          router.push("/thank-you")
        }
      } else {
        // Handle Resend/Server errors
        alert(result.message || "Failed to send request. Please try again.")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("A system error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-2 text-sm font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Edit Estimate
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Finalize Your <span className="text-primary-blue">Booking</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Provide your details to lock in this specialized care.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground/50"
                      size={18}
                    />
                    {/* 4. Changed 'name' to 'username' to match your Server Action */}
                    <input
                      required
                      name="username"
                      type="text"
                      placeholder="Vladimir Vostrikov"
                      className="w-full rounded-2xl border-border bg-card p-4 pl-12 shadow-sm ring-ring transition-all outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="ml-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground/50"
                      size={18}
                    />
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(310) 000-0000"
                      className="w-full rounded-2xl border-border bg-card p-4 pl-12 shadow-sm ring-ring transition-all outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground/50"
                    size={18}
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="vlad@example.com"
                    className="w-full rounded-2xl border-border bg-card p-4 pl-12 shadow-sm ring-ring transition-all outline-none focus:ring-2 focus:ring-accent-green"
                  />
                </div>
              </div>

              <div className="space-y-2 pb-4">
                <label className="ml-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground/50"
                    size={18}
                  />
                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="123 Ocean Ave, Santa Monica, CA"
                    className="w-full rounded-2xl border-border bg-card p-4 pl-12 shadow-sm ring-ring transition-all outline-none focus:ring-2 focus:ring-accent-green"
                  />
                </div>
              </div>

              {/* TOGGLE & BUTTONS REMAIN THE SAME */}
              <div className="relative space-y-4 rounded-3xl border border-border bg-card p-3 shadow-[0_0_40px_-15px_var(--top-blur)]">
                <div className="absolute -top-3 left-6 rounded-full bg-accent-green px-3 py-1 text-[9px] font-black tracking-widest text-primary-foreground uppercase shadow-sm">
                  Choose Booking Type
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingMode("query")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all",
                      bookingMode === "query"
                        ? "border-accent-green bg-background text-foreground shadow-sm"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <MessageSquare
                      size={18}
                      className={
                        bookingMode === "query" ? "text-accent-green" : ""
                      }
                    />
                    <span className="text-[10px] tracking-tighter uppercase">
                      Request a Call
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingMode("pay")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all",
                      bookingMode === "pay"
                        ? "border-accent-green bg-background text-foreground shadow-sm"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <CreditCard
                      size={18}
                      className={
                        bookingMode === "pay" ? "text-accent-green" : ""
                      }
                    />
                    <span className="text-[10px] tracking-tighter uppercase">
                      Pay & Confirm
                    </span>
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className={cn(
                  "group mt-4 flex w-full items-center justify-center gap-3 rounded-2xl py-7 text-xl font-bold text-primary-foreground shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70",
                  bookingMode === "pay"
                    ? "bg-accent-green shadow-accent-green/20"
                    : "bg-primary shadow-primary/20"
                )}
              >
                {loading
                  ? "Processing..."
                  : bookingMode === "pay"
                    ? "Secure My Slot"
                    : "Submit Request"}
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>

          {/* SIDEBAR REMAINS THE SAME */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl">
              <div className="bg-primary-blue p-8 text-white">
                <div className="flex items-center justify-between opacity-70">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                    Booking Value
                  </span>
                  <Calendar size={20} />
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xl font-bold opacity-70">$</span>
                  <span className="text-7xl font-bold tracking-tighter">
                    {bookingData.price}
                  </span>
                </div>
              </div>
              <div className="space-y-6 p-8">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      Service
                    </span>
                    <span className="text-xs font-black text-primary-blue uppercase">
                      {bookingData.type}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      Specs
                    </span>
                    <span className="text-xs font-black uppercase">
                      {bookingData.rooms} • {bookingData.sqft} sqft
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-muted p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-accent-yellow" />
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                      Add-ons Locked
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed font-bold text-foreground italic">
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
        <div className="flex min-h-screen items-center justify-center font-bold tracking-widest text-muted-foreground uppercase">
          Initializing...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}
