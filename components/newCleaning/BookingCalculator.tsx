"use client"
import React, { useState } from "react"
import { sendBookingEmail } from "@/lib/send-booking"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { PRICING_MATRICES } from "@/app/data/pricing"

/**
 * TYPE DEFINITIONS
 * Derived directly from your pricing matrix to ensure 100% sync
 */
type BedKey = keyof typeof PRICING_MATRICES.STANDARD

export const BookingCalculator = () => {
  // State for keys (strings)
  const [beds, setBeds] = useState<BedKey>("2")
  const [baths, setBaths] = useState<string>("2")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")

  const matrix = PRICING_MATRICES.STANDARD

  /**
   * CALCULATION LOGIC
   * 1. Get the row for the selected bedrooms
   * 2. Cast the row as a Record to allow string-based bathroom lookup
   * 3. Result is a number (the price)
   */
  const bedData = matrix[beds]
  const totalPrice: number = (bedData as Record<string, number>)[baths] || 0

  /**
   * EVENT HANDLERS
   * Synchronous state updates prevent cascading render errors
   */
  const handleBedChange = (newBedValue: BedKey) => {
    setBeds(newBedValue)

    // Check if current bathroom count exists in the new bedroom's pricing row
    const availableBaths = Object.keys(matrix[newBedValue])
    if (!availableBaths.includes(baths)) {
      // Reset bathroom to the first available option for that bedroom count
      setBaths(availableBaths[0])
    }
  }

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
    if (formattedValue.length <= 14) {
      setPhone(formattedValue)
    }
  }

  const handleBooking = async () => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      return alert("Please enter a valid phone number: (XXX) XXX-XXXX")
    }

    setStatus("sending")
    const result = await sendBookingEmail({
      beds: String(beds), // Converts number or BedKey to string
      baths: String(baths), // Converts number or string to string
      phone,
      price: totalPrice, // Price remains a number
    })

    if (result.success) {
      setStatus("success")
    } else {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  // STYLES
  const selectStyle =
    "appearance-none cursor-pointer rounded-2xl border-none bg-muted p-5 pr-12 font-bold outline-none ring-primary-blue focus:ring-2 transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%230066FF%22%20stroke-width%3D%223%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:18px] bg-[position:right_1.5rem_center]"

  const inputStyle =
    "rounded-2xl border-none bg-muted p-5 font-bold outline-none ring-primary-blue focus:ring-2 transition-all placeholder:text-muted-foreground/50 w-full"

  // SUCCESS STATE
  if (status === "success") {
    return (
      <div className="max-w-xl rounded-3xl border border-border bg-card p-12 text-center shadow-2xl">
        <CheckCircle2 className="mx-auto mb-4 text-green-500" size={64} />
        <h3 className="text-2xl font-black">Booking Sent!</h3>
        <p className="mt-2 text-muted-foreground">
          We will call you at{" "}
          <span className="font-bold text-foreground">{phone}</span> shortly to
          confirm.
        </p>
        <button
          onClick={() => {
            setPhone("")
            setStatus("idle")
          }}
          className="mt-6 font-bold text-primary-blue hover:underline"
        >
          New Calculation
        </button>
      </div>
    )
  }

  // RENDER FORM
  return (
    <div className="max-w-xl rounded-3xl border border-border bg-card p-3 shadow-2xl">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* BEDROOM SELECT */}
        <select
          value={beds}
          onChange={(e) => handleBedChange(e.target.value as BedKey)}
          className={selectStyle}
        >
          {(Object.keys(matrix) as BedKey[]).map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "Bedroom" : "Bedrooms"}
            </option>
          ))}
        </select>

        {/* BATHROOM SELECT */}
        <select
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          className={selectStyle}
        >
          {Object.keys(matrix[beds]).map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "Bathroom" : "Bathrooms"}
            </option>
          ))}
        </select>

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
            `Book for $${totalPrice}`
          )}
        </button>
      </div>
    </div>
  )
}
