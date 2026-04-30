"use client"
import { useState, useEffect, useRef, useActionState } from "react"
import { FormState, sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { X, ChevronDown } from "lucide-react"

type CleaningModalProps = {
  text?: string | undefined
}

export const CleaningModal = ({ text }: CleaningModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)

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

      if (result.success) {
        handleClose()
        notify()
      }
      return result
    },
    { success: false }
  )

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

  // Base input styling that adapts to light/dark themes
  const inputClassName = `
    w-full appearance-none rounded-2xl border-2 px-5 py-4 text-base font-medium transition-all outline-none
    bg-muted/50 border-border text-foreground placeholder:text-muted-foreground
    focus:border-primary-blue focus:bg-background focus:ring-4 focus:ring-primary-blue/10
    dark:bg-slate-900/50 dark:border-slate-800 dark:focus:border-primary-blue
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
        className="bg-transparent outline-none backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
      >
        <div
          className="relative w-[95%] max-w-md transform animate-in rounded-[2.5rem] border border-border bg-background p-8 text-foreground shadow-2xl transition-all duration-300 fade-in zoom-in md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={24} />
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic">
              Playa<span className="text-primary-blue">Cleaning</span>
            </h2>
            <p className="mt-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Fast Quote • Los Angeles, CA
            </p>
          </div>

          <form action={action} className="space-y-4">
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
            <div>
              <input
                type="hidden"
                name="pageUrl"
                value={
                  typeof window !== "undefined" ? window.location.href : ""
                }
              />
              <input
                type="hidden"
                name="customNotes"
                value="Playa Cleaning $129 Offer"
              />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Bedrooms Select Wrapper */}
                <div className="group relative">
                  <select name="bedrooms" className={inputClassName}>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground transition-colors group-focus-within:text-primary-blue">
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Bathrooms Select Wrapper */}
                <div className="group relative">
                  <select name="bathrooms" className={inputClassName}>
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3+">3+ Baths</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground transition-colors group-focus-within:text-primary-blue">
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-primary-blue py-5 text-xl font-black tracking-tight text-white uppercase shadow-xl shadow-primary-blue/30 transition-all hover:opacity-90 active:scale-95 disabled:bg-primary-blue/40"
            >
              {isLoading ? "Sending..." : buttonText}
            </button>

            <p className="px-4 text-center text-[10px] leading-relaxed font-medium text-muted-foreground">
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
