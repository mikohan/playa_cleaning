"use server"
import { Resend } from "resend"

export type FormState = {
  success?: boolean
  error?: string
  message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendSteamEmail = async (
  prevState: FormState,
  formData: FormData
) => {
  // 1. Data Extraction
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone"
  const email = (formData.get("email") as string) || "No Email"
  const itemsToClean =
    (formData.get("itemsToClean") as string) || "Not specified"

  const managerEmail = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"
  const fromEmail = "Playa Leads <info@angaracleaning.com>"

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  // 2. Structured Text Table (Visual but Plain Text)
  const leadTable = `
LEAD DETAILS: PLAYA CLEANING
--------------------------------------------------
SERVICE TYPE: CARPET & UPHOLSTERY CLEANING
--------------------------------------------------
CUSTOMER:     ${username}
PHONE:        ${phone}
EMAIL:        ${email}
ITEMS:        ${itemsToClean}
--------------------------------------------------
RECEIVED:     ${orderTime}
--------------------------------------------------
  `.trim()

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [managerEmail],
      subject: `🔥 STEAM LEAD: ${username}`,
      text: leadTable,
    })

    if (error) {
      console.error("Lead delivery error:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Lead sent to manager." }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error."
    return { success: false, message: errorMessage }
  }
}
