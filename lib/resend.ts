"use server"
import { Resend } from "resend"

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
  // 1. Data Extraction (including your new custom fields)
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone Provided"
  const customerEmail = (formData.get("email") as string) || ""
  const bedrooms = (formData.get("bedrooms") as string) || "N/A"
  const bathrooms = (formData.get("bathrooms") as string) || "N/A"
  const serviceType = (formData.get("serviceType") as string) || "Standard"

  // New Hidden Fields
  const pageUrl = (formData.get("pageUrl") as string) || "Unknown Source"
  const customNotes =
    (formData.get("customNotes") as string) || "No extra notes provided."

  if (toWhom === "customer" && !customerEmail) {
    return { success: false, message: "No customer email provided." }
  }

  const managerEmail = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"
  const targetEmail = toWhom === "customer" ? customerEmail : managerEmail
  const fromEmail = "Playa Cleaning <info@angaracleaning.com>"

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  // 2. Plain Text Templates
  const managerText = `
NEW LEAD RECEIVED:
--------------------------
Name: ${username}
Phone: ${phone}
Email: ${customerEmail}

DETAILS:
Bedrooms: ${bedrooms}
Bathrooms: ${bathrooms}
Service: ${serviceType}

SOURCE INFO:
Sent From: ${pageUrl}
Notes: ${customNotes}

Time: ${orderTime}
  `.trim()

  const customerText = `
Hi ${username},

Thank you for reaching out to Playa Cleaning! We have received your request for a cleaning quote. 

One of our team members will review your details and text/call you shortly with a price and availability.

Best regards,
The Playa Cleaning Team
${companyWebsite}
  `.trim()

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject:
        toWhom === "manager"
          ? `NEW LEAD: ${bedrooms}BR/${bathrooms}BA - ${username}`
          : "We received your cleaning quote request!",
      text: toWhom === "manager" ? managerText : customerText, // Switched to text
    })

    if (error) {
      console.error("Resend API Error:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Email sent successfully!" }
  } catch (err: unknown) {
    console.error("Server Action Exception:", err)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again!",
    }
  }
}
