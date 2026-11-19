import { Metadata } from "next"

// After-booking page: keep it out of Google
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
