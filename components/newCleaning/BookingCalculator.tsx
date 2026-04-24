"use client"
import React, { useState } from "react"

interface BookingCalculatorProps {
  basePrice?: number
  onBook?: (data: {
    beds: string
    baths: string
    phone: string
    price: number
  }) => void
}

export const BookingCalculator = ({
  basePrice = 129,
}: BookingCalculatorProps) => {
  const [beds, setBeds] = useState("2")
  const [baths, setBaths] = useState("2")
  const [phone, setPhone] = useState("")

  const totalPrice = basePrice + parseInt(beds) * 30 + parseInt(baths) * 20

  const selectStyle =
    "appearance-none cursor-pointer rounded-2xl border-none bg-muted p-5 pr-12 font-bold outline-none ring-primary-blue focus:ring-2 transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%230066FF%22%20stroke-width%3D%223%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:18px] bg-[position:right_1.5rem_center]"

  const inputStyle =
    "rounded-2xl border-none bg-muted p-5 font-bold outline-none ring-primary-blue focus:ring-2 transition-all placeholder:text-muted-foreground/50 w-full"

  return (
    <div className="max-w-xl rounded-3xl border border-border bg-card p-3 shadow-2xl">
      {/* Changed to 2 columns on desktop to create two rows */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* ROW 1: Selections */}
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

        {/* ROW 2: Contact & Action */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputStyle}
        />

        <button className="rounded-2xl bg-primary-blue py-5 text-lg font-black text-white transition-all hover:bg-primary-blue/90 active:scale-95">
          Book for ${totalPrice}
        </button>
      </div>
    </div>
  )
}
