"use client"
import React, { useState } from "react"
import { sendSteamEmail } from "@/lib/resendStamers"
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react"

export const BookingCalculatorCarpet = () => {
  const [phone, setPhone] = useState("")
  const [items, setItems] = useState("")
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")

  // Phone Masking Logic
  const formatPhoneNumber = (value: string) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value)
    if (formattedValue.length <= 14) setPhone(formattedValue)
  }

  const handleBooking = async () => {
    // Validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    if (!phoneRegex.test(phone))
      return alert("Enter valid phone: (XXX) XXX-XXXX")
    if (items.length < 5)
      return alert("Please list a few items (e.g. Sofa, Rug)")

    setStatus("sending")

    // Create FormData to match your resendSteamers.ts extraction
    const formData = new FormData()
    formData.append("username", "Web Estimate")
    formData.append("phone", phone)
    formData.append("itemsToClean", items)

    const result = await sendSteamEmail({ success: false }, formData)

    // STUCTURAL FIX: Only push dataLayer variables if backend submission succeeds
    if (result && result.success) {
      // 🟢 SAFE CLIENT-SIDE DATA LAYER INJECTION (Escapes Component Unmount Lifecycles)
      if (typeof window !== "undefined") {
        const targetWindow = window as Window & {
          dataLayer?: Array<Record<string, string | number>>
        }

        // Clean tracking strings: strip double-quotes/newlines to keep object parameters pristine
        const sanitizedItems = items
          .replace(/["\r\n]+/g, " ")
          .trim()
          .slice(0, 75)

        targetWindow.dataLayer = targetWindow.dataLayer || []
        targetWindow.dataLayer.push({
          event: "form_submission_success", // Restored to legacy name for multi-form tracking consistency
          event_id: result.eventId,
          form_type: "custom_upholstery_quote",
          estimated_value: 150, // Standard baseline configuration for custom item runs
          service_type: `Carpet/Upholstery Custom Request: ${sanitizedItems}`,
        })
      }

      // 🟢 Hold the DOM swap execution briefly so GTM captures script parameters completely
      setTimeout(() => {
        setStatus("success")
      }, 50)
    } else {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const inputStyle =
    "rounded-2xl border-none bg-muted p-5 font-bold outline-none ring-primary-blue focus:ring-2 transition-all placeholder:text-muted-foreground/50 w-full"

  // SUCCESS STATE
  if (status === "success") {
    return (
      <div className="max-w-xl rounded-3xl border border-border bg-card p-12 text-center shadow-2xl">
        <CheckCircle2 className="mx-auto mb-4 text-green-500" size={64} />
        <h3 className="text-2xl font-black">Quote Requested!</h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll text a price for your furniture to{" "}
          <span className="font-bold text-foreground">{phone}</span> shortly.
        </p>
        <button
          onClick={() => {
            setPhone("")
            setStatus("idle")
            setItems("")
          }}
          className="mt-6 font-bold text-primary-blue hover:underline"
        >
          New Estimate
        </button>
      </div>
    )
  }

  // RENDER FORM
  return (
    <div className="max-w-xl rounded-3xl border border-border bg-card p-4 shadow-2xl">
      <div className="space-y-3">
        <div className="relative">
          <textarea
            placeholder="List items: (e.g. 3-seat sofa, 8x10 rug, 2 armchairs...)"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className={cn(inputStyle, "min-h-[100px] resize-none pr-10")}
            disabled={status === "sending"}
          />
          <Info
            className="absolute top-5 right-4 text-primary-blue/30"
            size={18}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="tel"
            placeholder="(310) 555-0123"
            value={phone}
            onChange={handlePhoneChange}
            className={inputStyle}
            disabled={status === "sending"}
          />

          <button
            onClick={handleBooking}
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary-blue py-5 text-lg font-black text-white transition-all hover:bg-primary-blue/90 active:scale-95 disabled:opacity-50"
          >
            {status === "sending" ? (
              <Loader2 className="animate-spin" size={24} />
            ) : status === "error" ? (
              <>
                <AlertCircle size={24} /> Error!
              </>
            ) : (
              "Get Free Quote"
            )}
          </button>
        </div>

        <p className="px-2 text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">
          Professional Steam Extraction • Angara Steamers
        </p>
      </div>
    </div>
  )
}

// Fallback utility function for styling combinations
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
