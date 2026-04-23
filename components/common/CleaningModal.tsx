"use client"
import { useState, useEffect, useRef, useActionState } from "react"
import Link from "next/link"
import { FormState, sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"

export const CleaningModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const notify = () =>
    toast.success("Reservation sent! We'll contact you shortly.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
    })

  const [state, action, isLoading] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      // Sending to manager and customer
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
      document.body.style.overflow = "hidden" // Lock scroll
    } else {
      dialog.close()
      document.body.style.overflow = "unset" // Unlock scroll
    }
  }, [isOpen])

  // Handle click on the backdrop to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      handleClose()
    }
  }

  return (
    <>
      {/* TRIGGER: Div wrapper avoids hydration error with AnimatedButton/ButtonShiny */}
      <div onClick={handleOpen} className="group inline-block cursor-pointer">
        <AnimatedButton>
          <ButtonShiny
            text="Schedule Cleaning Now"
            size="lg"
            bgColor="var(--color-primary-blue)"
          />
        </AnimatedButton>
      </div>

      <dialog
        ref={modalRef}
        onClick={handleBackdropClick}
        className="outline-none"
      >
        {/* MODAL CONTENT CARD */}
        <div
          className="w-[90%] max-w-md transform animate-in rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 fade-in zoom-in"
          onClick={(e) => e.stopPropagation()} // Prevents clicks inside form from closing modal
        >
          <h2 className="font-blauerMedium mb-6 text-center text-2xl font-bold tracking-tight text-slate-900">
            Steam Cleaning Reservation
          </h2>

          <form action={action} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                required
                name="username"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Email *
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="vlad@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Phone Number *
              </label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+1 (310) 000-0000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                What needs cleaning?
              </label>
              <input
                name="couch"
                type="text"
                placeholder="e.g. 3-seater couch and 8x10 rug"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-primary-blue py-4 font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isLoading ? "Sending..." : "Confirm Reservation"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            </div>

            <p className="text-center text-[12px] text-slate-400">
              By clicking confirm, you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-slate-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </dialog>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </>
  )
}
