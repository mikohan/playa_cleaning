"use client"
import { useState, useEffect, useRef, useActionState } from "react"
import Link from "next/link"

import { FormState, sendEmail } from "@/lib/resend"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { ButtonShiny } from "../SmallComponents/ButtonShiny"
export const ModalDaisy = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const notify = () =>
    toast.success("Email was sent successfully! I'll contact you ASAP.", {
      position: "top-left",
      autoClose: 5000,
      closeOnClick: true,
      containerId: "oneContainer",
    })

  const [state, action, isLoading] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      // 1. Call the actual server action
      const result = await sendEmail(prevState, formData, "manager")
      const resultCustomer = await sendEmail(prevState, formData, "customer")

      // 2. Execute your callback logic based on the result
      if (result.success) {
        // console.log("Success callback activated!");
        handleClose()
        notify()
      }

      // 3. Return the result so 'state' updates
      return result
    },
    { success: false } // Initial state
  )

  // handling modal
  const modal = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = modal.current
    if (!dialog) return

    // Handle outside clicks
    const handleOutsideClick = (e: MouseEvent) => {
      // If the target of the click IS the <dialog> itself,
      // it means the user clicked the backdrop (outside the content).
      if (e.target === dialog) {
        setIsOpen(false)
      }
    }

    dialog.addEventListener("click", handleOutsideClick)

    // Sync visibility
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }

    return () => dialog.removeEventListener("click", handleOutsideClick)
  }, [isOpen])

  return (
    <>
      <div onClick={handleOpen}>
        <AnimatedButton>
          <ButtonShiny text="Schedule Cleaning Now" size={"lg"}></ButtonShiny>
        </AnimatedButton>
      </div>
      <dialog ref={modal} className="modal font-blauerRegular">
        <div className="w-full max-w-md rounded-2xl bg-white p-8">
          <h2 className="font-blauerMedium text-couchDarkBlue mb-6 text-center text-2xl">
            Steam Cleaning Reservation
          </h2>

          <form action={action} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                Full Name
              </label>
              <input
                required
                name="username"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Email Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="your-email@gmail.com"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                Phone Number
              </label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Seating Capacity Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tell what would you like to clean. E.g: Couch Size (Capacity),
                or size of the Rug, Mattress.
              </label>
              <input
                name="couch"
                type="text"
                placeholder="e.g. 3 person seater"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Specify how many people can sit on the couch.
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-gray-500">
              We care about your data. Read our{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
                aria-label="Cancel"
              >
                Cancel
              </button>

              <AnimatedButton
                className="flex-1 cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                type="submit"
              >
                {isLoading ? (
                  <span className="loading loading-bars"></span>
                ) : (
                  "Send"
                )}
              </AnimatedButton>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer
        containerId="oneContainer"
        limit={1}
        toastClassName="bg-green-400 p-4 rounded-md"
      />
    </>
  )
}
