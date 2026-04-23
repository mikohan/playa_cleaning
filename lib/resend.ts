"use server"
import ManagerTable from "./../emails/Manager"
import { Resend } from "resend"
import Welcome from "@/emails/Welcome"

const companyWebsite = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || ""

export type FormState = {
  success?: boolean
  error?: string
  message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  prevState: FormState,
  formData: FormData,
  toWhom: "manager" | "customer" = "manager"
) => {
  // 1. Safe Data Extraction with Fallbacks
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone Provided"
  const customerEmail = (formData.get("email") as string) || ""

  const bedrooms = (formData.get("bedrooms") as string) || "N/A"
  const bathrooms = (formData.get("bathrooms") as string) || "N/A"
  const serviceType = (formData.get("serviceType") as string) || "Standard"

  // 2. Critical Check: Prevent crash if customer email is missing
  if (toWhom === "customer" && !customerEmail) {
    return { success: false, message: "No customer email provided." }
  }

  const managerEmail = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"
  const targetEmail = toWhom === "customer" ? customerEmail : managerEmail
  const price = (formData.get("price") as string) || "0"

  // Ensure your domain is verified in Resend for this email
  // const fromEmail = "Playa Cleaning <info@playacleaning.com>";
  const fromEmail = "Playa Cleaning <info@angaracleaning.com>"

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  try {
    // 3. Execution without the artificial delay to prevent 408 timeouts
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject:
        toWhom === "manager"
          ? `NEW LEAD: $${price} ${bedrooms}BR/${bathrooms}BA - ${username}`
          : "We received your cleaning quote request!",
      react:
        toWhom === "manager"
          ? ManagerTable({
              username,
              phone,
              email: customerEmail,
              bedrooms,
              bathrooms,
              serviceType,
              orderTime,
              price,
            })
          : Welcome({ username, companyWebsite }),
    })

    if (error) {
      console.error("Resend API Error:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Email sent successfully!" }
  } catch (err: unknown) {
    console.error("Server Action Exception:", err)

    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred. Please try again!"

    return {
      success: false,
      message: errorMessage,
    }
  }
}
