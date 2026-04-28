"use client"
import React, { useActionState, useEffect } from "react"
import Image from "next/image"
import { Phone, CheckCircle2, PartyPopper, Droplets, Info } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { sendSteamEmail, FormState } from "@/lib/resendStamers"
import SteamCleaningImg from "@/public/images/cleaning/capret-2.png"
import { WaveDivider } from "../common/WaveDivider"
import { cn } from "@/lib/utils"

export const CarpetCallToAction = () => {
  const [state, action, isLoading] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      // 1. Phone Regex Validation: (XXX) XXX-XXXX
      const phone = formData.get("phone") as string
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

      if (!phoneRegex.test(phone)) {
        return {
          success: false,
          message: "Please use format: (XXX) XXX-XXXX",
        }
      }

      // 2. Proceed to Server Action
      return await sendSteamEmail(prevState, formData)
    },
    { success: false }
  )

  useEffect(() => {
    if (state.success) {
      toast.success("Steam cleaning request sent!")
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

  const inputClass = `
    w-full rounded-2xl border-none bg-background p-5 text-base text-foreground shadow-sm 
    ring-1 ring-border transition-all outline-none focus:ring-2 focus:ring-primary-blue
  `

  return (
    <section className="overflow-hidden bg-none">
      <div className="relative py-24">
        <div className="absolute top-0 left-0 h-[30%] w-full bg-linear-180 from-top-blur/50 to-background"></div>
        <WaveDivider position="top" fill="var(--color-background)" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 lg:gap-20">
            {/* Left Side: Visual */}
            <div className="group relative z-10 h-[500px] overflow-hidden rounded-[2.5rem] bg-muted md:col-span-2 md:h-[650px]">
              <Image
                src={SteamCleaningImg}
                alt="Playa Cleaning Upholstery Service"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-blue/30 via-transparent to-transparent"></div>
              <div className="absolute top-8 left-8 rounded-2xl bg-white/90 px-4 py-2 shadow-xl backdrop-blur dark:bg-black/90">
                <p className="text-[10px] font-black tracking-widest text-primary-blue uppercase">
                  Playa Cleaning
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="z-30 space-y-10 md:col-span-3">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-sm font-black tracking-[0.2em] text-primary-blue uppercase">
                  <Droplets size={16} /> Sofa & Carpet Revival
                </span>
                <h2 className="text-4xl leading-[1.1] font-black tracking-tight text-foreground md:text-6xl">
                  Reset Your <br />
                  <span className="text-primary-blue underline decoration-primary-blue/20">
                    Furniture & Carpet
                  </span>
                </h2>
                <p className="max-w-md font-medium text-muted-foreground">
                  Professional hot water extraction for sofas, rugs, and
                  mattresses. Get your instant quote below.
                </p>
              </div>

              {state.success ? (
                <div className="max-w-xl animate-in rounded-[2rem] border-2 border-dashed border-primary-blue/20 bg-primary-blue/5 p-10 text-center duration-500 fade-in zoom-in">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-blue text-white shadow-lg shadow-primary-blue/20">
                    <PartyPopper size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Request Received!</h3>
                  <p className="mt-2 text-muted-foreground">
                    We&apos;ll text you a price for your items shortly.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-6 text-sm font-bold text-primary-blue underline hover:opacity-80"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form
                  action={action}
                  className="relative z-20 max-w-xl space-y-4 rounded-[2.5rem] border border-border bg-card p-4 shadow-2xl shadow-primary-blue/5"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      required
                      name="username"
                      placeholder="Full Name"
                      className={inputClass}
                    />
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(213) 598-77-63"
                      onInput={handlePhoneInput}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      required
                      name="itemsToClean"
                      placeholder="What needs cleaning? (e.g., L-shaped sofa, 2 area rugs...)"
                      className={cn(inputClass, "min-h-[120px] resize-none")}
                    />
                    <div className="absolute right-4 bottom-4 text-muted-foreground/30">
                      <Info size={18} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full overflow-hidden rounded-2xl bg-primary-blue py-6 text-xl font-black text-white shadow-xl shadow-primary-blue/20 transition-all hover:bg-primary-blue/90 active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {isLoading ? "Sending Lead..." : "Get My Steam Quote"}
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
      </div>
    </section>
  )
}
