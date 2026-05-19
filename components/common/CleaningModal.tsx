"use client"
import { useState, useEffect, useRef, useActionState } from "react"
import { FormState, sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { X } from "lucide-react"

type GtmFormSubmitPayload = {
  event: string
  event_id: string
  form_type: string
  estimated_value: number
  service_type: string
}

type CleaningModalProps = {
  text?: string | undefined
}

export const CleaningModal = ({ text }: CleaningModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const notify = () =>
    toast.success("Request sent! We'll text/call you with a price shortly.", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
    })

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

  const [state, action, isLoading] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const phone = formData.get("phone") as string
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

      if (!phoneRegex.test(phone)) {
        toast.error("Please enter a valid phone: (XXX) XXX-XXXX")
        return { success: false, message: "Invalid phone format" }
      }

      const result = await sendEmail(prevState, formData, "manager")
      await sendEmail(prevState, formData, "customer")
      return result
    },
    { success: false }
  )

  // Tracking Effect Hook Pipeline
  useEffect(() => {
    if (state && state.success && state.eventId) {
      if (typeof window !== "undefined") {
        const formData = formRef.current ? new FormData(formRef.current) : null
        const beds = String(formData?.get("bedrooms") || "1")
        const baths = String(formData?.get("bathrooms") || "1")

        // Cast window properties inline to cleanly adhere to the lowercase primitive 'object' rule
        const targetWindow = window as unknown as { dataLayer?: object[] }

        targetWindow.dataLayer = targetWindow.dataLayer || []

        const trackingPayload: GtmFormSubmitPayload = {
          event: "form_submit",
          event_id: String(state.eventId),
          form_type: "modal_quick_quote",
          estimated_value: 129,
          service_type: `Modal Quick Quote - ${beds}B/${baths}B`,
        }

        targetWindow.dataLayer.push(trackingPayload as unknown as object)
      }

      const postSubmitDelay = setTimeout(() => {
        handleClose()
        notify()
        formRef.current?.reset()
      }, 500)

      return () => clearTimeout(postSubmitDelay)
    }
  }, [state])

  useEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = "hidden"
    } else {
      dialog.close()
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const buttonText = text ? text : "Get Price"

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
      {/* TRIGGER */}
      <div onClick={handleOpen} className="group inline-block cursor-pointer">
        <AnimatedButton>
          <ButtonShiny
            text={text}
            size="lg"
            bgColor="var(--color-primary-blue)"
          />
        </AnimatedButton>
      </div>

      <dialog
        ref={modalRef}
        onClick={(e) => e.target === modalRef.current && handleClose()}
        className="bg-transparent outline-none backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
      >
        <div
          className="relative w-[95%] max-w-md transform animate-in rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all duration-300 fade-in zoom-in md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-slate-300 transition-colors hover:text-slate-600"
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

          <form ref={formRef} action={action} className="space-y-4">
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

      <ToastContainer theme="colored" />
    </>
  )
}
