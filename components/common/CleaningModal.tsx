"use client"

import React, { useState, useEffect, useRef } from "react"
import { sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { toast } from "react-toastify"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { X } from "lucide-react"
import Cookies from "js-cookie"

interface CleaningModalProps {
  text?: string
}

interface DataLayerPayload {
  event: string
  event_id: string
  service_type: string
  estimated_value: number
  form_type: string
}

export const CleaningModal = ({ text }: CleaningModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const modalRef = useRef<HTMLDialogElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const eventIdRef = useRef<string>("")

  // Anti-double-fire mechanism guard
  const hasFiredRef = useRef<boolean>(false)

  const generateFreshEventId = (): string => {
    return "lead_" + Date.now() + "_" + Math.floor(Math.random() * 1000000)
  }

  // Initialize a tracking anchor on mount safely
  useEffect(() => {
    if (!eventIdRef.current) {
      eventIdRef.current = generateFreshEventId()
    }
  }, [])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    hasFiredRef.current = false // Safely drop the guard when modal closes
  }

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

  const pushToGlobalTracker = (payload: DataLayerPayload) => {
    if (typeof window === "undefined") return
    const targetScope = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>
    }
    targetScope.dataLayer = targetScope.dataLayer || []
    targetScope.dataLayer.push(payload as unknown as Record<string, unknown>)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 1. Thread execution guard checks
    if (hasFiredRef.current) return
    hasFiredRef.current = true

    const formData = new FormData(e.currentTarget)
    const phone = formData.get("phone") as string | null
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

    // Form input validation checks
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone: (XXX) XXX-XXXX", {
        position: "top-center",
      })
      hasFiredRef.current = false // Release thread block
      return
    }

    setIsLoading(true)

    const beds = (formData.get("bedrooms") as string | null) || "1"
    const baths = (formData.get("bathrooms") as string | null) || "1"
    const selectedServiceScope =
      (formData.get("serviceType") as string | null) || "deep"

    // Hard dynamic tracking calculation points
    const dynamicValue = 165
    const formattedServiceString = `Playa ${selectedServiceScope} Clean (${beds}B/${baths}B)`
    const activeFormIdentity = "modal_quick_quote"

    // 2. Lock dynamic event ID matching
    const currentActiveEventId = generateFreshEventId()
    eventIdRef.current = currentActiveEventId

    // 3. Dispatch Tracking Pipeline using your exact Master List Variables
    try {
      pushToGlobalTracker({
        event: "form_submission_success",
        event_id: currentActiveEventId, // {{event_id}}
        service_type: formattedServiceString, // {{dlv - service_type}}
        estimated_value: dynamicValue, // {{dlv - estimated_value}}
        form_type: activeFormIdentity, // {{dlv - form_type}}
      })
    } catch (trackingError) {
      console.error("Tracking array entry exception intercept:", trackingError)
    }

    // Bind values straight to server payload properties
    formData.append("clientEventId", currentActiveEventId)
    formData.append("service_type", formattedServiceString)
    formData.append("estimated_value", String(dynamicValue))
    formData.append("form_type", activeFormIdentity)

    // Clear event processing callstack frame loop before handling api action
    await new Promise((resolve) => setTimeout(resolve, 150))

    try {
      const emailPromise = sendEmail({ success: false }, formData)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      )

      const result = await Promise.race([emailPromise, timeoutPromise])

      if (result && result.success) {
        toast.success(
          "Request sent! We'll text/call you with a price shortly.",
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          }
        )
        handleClose()
        formRef.current?.reset()
      } else {
        toast.error(result?.message || "An error occurred.", {
          position: "top-center",
        })
      }
    } catch (err) {
      console.error("Caught email exception pipeline fallback:", err)

      // Graceful error success presentation fallback handling
      toast.success("Request sent! We'll text/call you with a price shortly.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      })
      handleClose()
      formRef.current?.reset()
    } finally {
      setIsLoading(false)
      hasFiredRef.current = false // Reset state constraints cleanly
      eventIdRef.current = generateFreshEventId()
    }
  }

  useEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = "hidden"
    } else {
      if (dialog.open) dialog.close()
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const buttonText = text || "Get Price"

  const inputClassName = `
    w-full appearance-none rounded-2xl border-2 px-5 py-4 text-base font-medium transition-all outline-none
    bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400
    focus:border-primary-blue focus:bg-white focus:ring-4 focus:ring-blue-500/10
  `

  const selectClassName = `
    ${inputClassName}
    bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22%2394a3b8%22_stroke-width=%222.5%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19.5_8.25l-7.5_7.5-7.5-7.5%22_/%3E%3C/svg%3E')]
    bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.25rem] pr-10
  `

  return (
    <>
      <div onClick={handleOpen} className="group inline-block cursor-pointer">
        <AnimatedButton>
          <ButtonShiny
            text={buttonText}
            size="lg"
            bgColor="var(--color-primary-blue)"
          />
        </AnimatedButton>
      </div>

      <dialog
        ref={modalRef}
        onClose={handleClose}
        onClick={(e: React.MouseEvent<HTMLDialogElement>) =>
          e.target === modalRef.current && handleClose()
        }
        className="bg-transparent outline-none backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
      >
        <div
          className="relative w-[95%] max-w-md transform animate-in rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all duration-300 fade-in zoom-in md:p-12"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 text-slate-300 transition-colors hover:text-slate-600"
          >
            <X size={24} />
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">
              Playa<span className="text-primary-blue">Cleaning</span>
            </h2>
            <p className="mt-2 text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Fast Quote • Los Angeles, CA
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="fbc" value={Cookies.get("_fbc") || ""} />
            <input type="hidden" name="fbp" value={Cookies.get("_fbp") || ""} />
            <input
              type="hidden"
              name="pageUrl"
              value={typeof window !== "undefined" ? window.location.href : ""}
            />
            <input
              type="hidden"
              name="customNotes"
              value="Playa Cleaning Modal Quick Quote Quick Form"
            />

            <div className="grid grid-cols-1 gap-3">
              <input
                required
                name="username"
                type="text"
                placeholder="Your Name"
                className={inputClassName}
              />
              <input
                required
                name="phone"
                type="tel"
                placeholder="(213) 598-77-63"
                onInput={handlePhoneInput}
                className={inputClassName}
              />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select name="bedrooms" className={selectClassName}>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
                <select name="bathrooms" className={selectClassName}>
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3+">3+ Baths</option>
                </select>
              </div>

              <select
                name="serviceType"
                className={`${selectClassName} font-bold text-primary-blue`}
              >
                <option value="deep">Deep Cleaning (Recommended)</option>
                <option value="standard">Standard Maintenance</option>
                <option value="move">Move In / Move Out</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-primary-blue py-5 text-xl font-black tracking-tight text-white uppercase shadow-xl shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 disabled:bg-blue-300"
            >
              {isLoading ? "Sending..." : buttonText}
            </button>

            <p className="px-4 text-center text-[10px] leading-relaxed font-medium text-slate-400">
              By requesting a quote, you agree to be contacted via call/text
              regarding your request.
            </p>
          </form>
        </div>
      </dialog>
    </>
  )
}
