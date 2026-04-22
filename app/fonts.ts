// app/fo
import localFont from "next/font/local"
import { Geist, Inter, Roboto } from "next/font/google"

export const blauerNue = localFont({
  src: [
    {
      path: "../public/fonts/Blauer-Nue-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Extrabold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Blauer-Nue-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-blauer-nue", // Define a CSS variable for Tailwind or global CSS
  display: "swap", // Optional: Control font display behavior
})

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})
