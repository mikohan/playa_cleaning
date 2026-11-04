"use client"

import React, { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { ButtonShiny } from "../SmallComponents/ButtonShiny"
import { QuoteForm, type CtaService } from "../cleaning/CallToAction"

interface CleaningModalProps {
  text?: string
  /** Pre-selects the service in the quote form, e.g. on a service page */
  defaultService?: CtaService
}

/** Hero button that opens the same quote form as the page section */
export const CleaningModal = ({ text, defaultService }: CleaningModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

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

  const buttonText = text || "Get My Estimate"

  return (
    <>
      <div onClick={handleOpen} className="group inline-block cursor-pointer">
        <AnimatedButton>
          <ButtonShiny text={buttonText} size="lg" bgColor="var(--color-primary-blue)" />
        </AnimatedButton>
      </div>

      <dialog
        ref={modalRef}
        onClose={handleClose}
        onClick={(e: React.MouseEvent<HTMLDialogElement>) =>
          e.target === modalRef.current && handleClose()
        }
        aria-label="Get your cleaning price"
        className="bg-transparent outline-none backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
      >
        <div
          className="relative max-h-[92dvh] w-[95vw] max-w-xl animate-in overflow-y-auto overscroll-contain rounded-[2rem] bg-background p-5 text-left text-foreground shadow-2xl ring-1 ring-border duration-300 fade-in zoom-in sm:p-8"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-50 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={24} />
          </button>

          <div className="mb-6 pr-8">
            <h2 className="font-blauerMedium text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              See Your <span className="text-primary-blue">Cleaning Price</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap your home details, add your phone, and your exact price shows up right
              away. No payment needed.
            </p>
          </div>

          {isOpen && (
            <QuoteForm
              defaultService={defaultService}
              formType="modal_quick_quote"
              variant="modal"
            />
          )}
        </div>
      </dialog>
    </>
  )
}
