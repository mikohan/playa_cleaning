"use client"
import { useState, useEffect, useRef, useActionState } from "react"
import { FormState, sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { X } from "lucide-react"

export const CleaningModal = () => {
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

  // 1. Phone Masking Logic (Client Side UX)
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
      // 2. Phone Regex Validation
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

  return (
    <>
      {/* TRIGGER */}
      <div onClick={handleOpen} className="group inline-block cursor-pointer">
        <AnimatedButton>
          <ButtonShiny
            text="Get My Price"
            size="lg"
            bgColor="var(--color-primary-blue)"
          />
        </AnimatedButton>
      </div>

      <dialog
        ref={modalRef}
        onClick={(e) => e.target === modalRef.current && handleClose()}
        className="outline-none backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
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

          <form action={action} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <input
                required
                name="username"
                type="text"
                placeholder="Your Name"
                className="input-style"
              />
              <input
                required
                name="phone"
                type="tel"
                placeholder="(213) 598-77-63"
                onInput={handlePhoneInput} // Added Masking
                className="input-style"
              />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select
                  name="bedrooms"
                  className="input-style appearance-none bg-white"
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
                <select
                  name="bathrooms"
                  className="input-style appearance-none bg-white"
                >
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3+">3+ Baths</option>
                </select>
              </div>

              <select
                name="serviceType"
                className="input-style appearance-none bg-white font-bold text-primary-blue"
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
              {isLoading ? "Sending..." : "Get My Price"}
            </button>

            <p className="px-4 text-center text-[10px] font-medium text-slate-400">
              By requesting a quote, you agree to be contacted via call/text
              regarding your request.
            </p>
          </form>
        </div>
      </dialog>

      <ToastContainer />

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 16px;
          border: 2px solid #f1f5f9;
          background-color: #f8fafc;
          padding: 16px 20px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
          outline: none;
        }
        .input-style:focus {
          border-color: var(--color-primary-blue);
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }
        .input-style::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </>
  )
}
