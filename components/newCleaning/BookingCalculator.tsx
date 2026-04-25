"use client"
import React, { useState } from "react"
import { sendBookingEmail } from "@/lib/send-booking"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface BookingCalculatorProps {
  basePrice?: number
}

export const BookingCalculator = ({
  basePrice = 129,
}: BookingCalculatorProps) => {
  const [beds, setBeds] = useState("2")
  const [baths, setBaths] = useState("2")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")

  const totalPrice = basePrice + parseInt(beds) * 30 + parseInt(baths) * 20

  // --- Option 2: Formatting Logic ---
  const formatPhoneNumber = (value: string) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, "") // Remove all non-digits
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value)
    // Limit to 14 characters to prevent extra digits: (XXX) XXX-XXXX
    if (formattedValue.length <= 14) {
      setPhone(formattedValue)
    }
  }

  const handleBooking = async () => {
    // Basic US Phone Validation: (XXX) XXX-XXXX
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      return alert("Please enter a valid phone number: (XXX) XXX-XXXX")
    }

    setStatus("sending")
    const result = await sendBookingEmail({
      beds,
      baths,
      phone,
      price: totalPrice,
    })

    if (result.success) {
      setStatus("success")
    } else {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const selectStyle =
    "appearance-none cursor-pointer rounded-2xl border-none bg-muted p-5 pr-12 font-bold outline-none ring-primary-blue focus:ring-2 transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%230066FF%22%20stroke-width%3D%223%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:18px] bg-[position:right_1.5rem_center]"
  const inputStyle =
    "rounded-2xl border-none bg-muted p-5 font-bold outline-none ring-primary-blue focus:ring-2 transition-all placeholder:text-muted-foreground/50 w-full"

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

  return (
    <div className="max-w-xl rounded-3xl border border-border bg-card p-3 shadow-2xl">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className={selectStyle}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Bedroom" : "Bedrooms"}
            </option>
          ))}
        </select>

        <select
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          className={selectStyle}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Bathroom" : "Bathrooms"}
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
