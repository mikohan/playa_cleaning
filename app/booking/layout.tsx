import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Booking Confirmed ",
  description: "The best cleaning service in USA",
  // This tells crawlers not to index the page or follow any links on it
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function BookingConfirmLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* You can wrap your confirmation page in a specific 
          container or add a specialized booking-only header here 
      */}
      {children}
    </div>
  )
}
