import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import VideoIcon from "@/public/images/cleaning/video-icon.svg"
import { AnimatedButton } from "../SmallComponents/AnimatedButton"
import { VideoComponent } from "../cleaning/VideoComponent"

export const ModalVideo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

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
        <div className="group hidden cursor-pointer items-center gap-4 transition-transform duration-300 hover:scale-105 md:inline-flex">
          <div className="border-couchBlue/50 items-ceter flex aspect-square h-[75px] w-[75px] justify-center rounded-full border-4 bg-transparent shadow-md">
            <Image
              src={VideoIcon}
              height={24}
              width={24}
              alt="button"
              className="ml-1 block"
            />
          </div>
          <div className="block">Watch Video</div>
        </div>
      </div>
      <dialog ref={modal} className="modal font-blauerRegular">
        <div className="w-full max-w-md rounded-2xl bg-white p-8">
          <h2 className="font-blauerMedium text-couchDarkBlue mb-6 text-center text-2xl">
            Watch Video about my cleanig process
          </h2>

          <div className="h-full w-auto space-y-5">
            {/* Name Field */}
            <div>
              <VideoComponent source="/videos/process.mp4" />
            </div>
            {/* Action Buttons */}

            <div className="flex gap-3 pt-4">
              <div onClick={handleClose}>
                <AnimatedButton className="flex-1 cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50">
                  Close
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
