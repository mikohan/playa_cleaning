"use client"
import React, { useActionState, useEffect } from "react"
import Image from "next/image"
import { CalendarDays, Phone, CheckCircle2, PartyPopper } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// --- IMPORTS FROM YOUR FILES ---
import { sendEmail, FormState } from "@/lib/resend"
import AliciaPortrait from "@/public/images/cleaning/hero-4.png"
import { WaveDivider } from "../common/WaveDivider"
import { cn } from "@/lib/utils"

export const CallToAction = () => {
  const [state, action, isLoading] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      // 1. Phone Regex Validation
      const phone = formData.get("phone") as string
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

      if (!phoneRegex.test(phone)) {
        return {
          success: false,
          message: "Please enter a valid phone: (XXX) XXX-XXXX",
        }
      }

      // 2. Execute original logic
      const result = await sendEmail(prevState, formData, "manager")
      return result
    },
    { success: false }
  )

  useEffect(() => {
    if (state.success) {
      toast.success("Quote request sent! We'll reach out shortly.")
    } else if (state.message && !state.success) {
      toast.error(state.message)
    }
  }, [state])

  // Automatic Phone Masking (Client Side UX)
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    let value = target.value.replace(/\D/g, "")
    if (value.length > 10) value = value.slice(0, 10)

    const areaCode = value.slice(0, 3)
    const middle = value.slice(3, 6)
    const last = value.slice(6, 10)

    if (value.length > 6) {
      target.value = `(${areaCode}) ${middle}-${last}`
    } else if (value.length > 3) {
      target.value = `(${areaCode}) ${middle}`
    } else if (value.length > 0) {
      target.value = `(${areaCode}`
    }
  }

  const selectClass = `
    w-full appearance-none rounded-2xl border-none bg-card p-5 pr-10 text-sm ring-1 ring-border outline-none 
    focus:ring-2 focus:ring-primary-blue transition-all cursor-pointer
    bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]
    bg-[length:1.25rem] bg-[position:right_1.25rem_center] bg-no-repeat
  `

  return (
    <section className="relative overflow-hidden py-24 md:pt-40">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 lg:gap-20">
          <div className="group relative z-10 h-125 overflow-hidden rounded-[2.5rem] bg-muted md:col-span-2 md:h-[650px]">
            <Image
              src={AliciaPortrait}
              alt="Olesya Vostrikova - Playa Cleaning"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-blue/30 via-transparent to-transparent"></div>
          </div>

          <div className="space-y-10 md:col-span-3">
            <div className="space-y-4">
              <span className="font-blauerMedium inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary-blue uppercase">
                <CheckCircle2 size={16} /> Instant Price Estimate
              </span>
              <h2 className="font-blauerMedium text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-6xl">
                Ready to Reclaim <br /> Your{" "}
                <span className="text-primary-blue underline decoration-primary-blue/20">
                  Time?
                </span>
              </h2>
            </div>

            {state.success ? (
              <div className="max-w-xl animate-in rounded-[2rem] border-2 border-dashed border-primary-blue/20 bg-primary-blue/5 p-10 text-center duration-500 fade-in zoom-in">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-blue text-white shadow-lg shadow-primary-blue/20">
                  <PartyPopper size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Request Received!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Thanks, we have got it! <br />
                  We will text or call you shortly with your custom quote.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 text-sm font-bold text-primary-blue underline transition-colors hover:text-primary"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                action={action}
                className="relative z-20 max-w-xl space-y-4 rounded-[2rem] border border-border bg-card p-2 shadow-sm sm:p-4"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    name="username"
                    placeholder="Full Name"
                    className="w-full rounded-2xl border-none bg-background p-5 text-base text-foreground shadow-sm ring-1 ring-border transition-all outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="(213) 598-77-63"
                    onInput={handlePhoneInput}
                    className="w-full rounded-2xl border-none bg-background p-5 text-base text-foreground shadow-sm ring-1 ring-border transition-all outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <select name="bedrooms" className={selectClass}>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Bed</option>
                    <option value="3">3 Bed</option>
                    <option value="4+">4+ Bed</option>
                  </select>
                  <select name="bathrooms" className={selectClass}>
                    <option value="1">1 Bath</option>
                    <option value="2">2 Bath</option>
                    <option value="3+">3+ Bath</option>
                  </select>
                  <select
                    name="serviceType"
                    className={cn(
                      selectClass,
                      "col-span-2 font-bold text-primary-blue sm:col-span-1"
                    )}
                  >
                    <option value="deep">Deep Clean</option>
                    <option value="standard">Standard</option>
                    <option value="move">Move In/Out</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-2xl bg-primary-blue py-6 text-xl font-black text-white shadow-2xl shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {isLoading ? "Sending..." : "Get Price"}
                  </span>
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a
                href="tel:2135987763"
                className="flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary-blue"
              >
                <div className="rounded-full bg-muted p-3">
                  <Phone size={20} className="text-primary-blue" />
                </div>
                (213) 598-77-63
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  )
}
