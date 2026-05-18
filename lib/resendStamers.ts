"use server"
import { Resend } from "resend"
import { createHash } from "crypto" // Built-in Node tool used for required Meta SHA-256 hashing

export type FormState = {
  success?: boolean
  error?: string
  message?: string
  eventId?: string // Added to pass the shared tracking token back to the browser
}

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Helper function to securely hash user parameters into SHA-256 for Meta CAPI compliance
 */
function sha256Hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export const sendSteamEmail = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  // 1. Generate a unified unique event ID token immediately on execution
  // This binds the server event and browser event together natively
  const sharedEventId = `steam_lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`

  // 2. Data Extraction
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

  // 3. Structured Text Table (Visual but Plain Text)
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
    // 4. Dispatch Lead Notification Email via Resend
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [managerEmail],
      subject: `🔥 STEAM LEAD: ${username}`,
      text: leadTable,
    })

    if (error) {
      console.error("Lead delivery error:", error)
      return { success: false, message: error.message }
    }

    // 5. META CONVERSIONS API FIRE
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_CAPI_TOKEN

    if (pixelId && accessToken) {
      // Normalize the phone number structure (Meta prefers raw strings of digits)
      const cleanPhone = phone.replace(/[^\d]/g, "")
      const cleanEmail = email !== "No Email" ? email : ""

      // Clean tracking strings: strip out line-breaks and quotes from item descriptions
      const sanitizedItems = itemsToClean.replace(/["\r\n]+/g, " ").trim()

      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: sharedEventId, // Must match browser exact tag value
            action_source: "website",
            user_data: {
              ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
              em: cleanEmail ? [sha256Hash(cleanEmail)] : [],
            },
            custom_data: {
              currency: "USD",
              value: 150, // Standard template estimation value baseline
              content_category: "Upholstery & Carpet Cleaning Request",
              content_name: sanitizedItems.slice(0, 75),
            },
          },
        ],
        // UNCOMMENT LINE BELOW FOR LIVE TESTING: Paste string code directly from Event Manager dashboard
        // test_event_code: "TEST12345"
      }

      // Fire and forget server request so it doesn't block client execution load times
      fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload),
        }
      )
        .then((res) => res.json())
        .then((resData) => console.log("Meta CAPI Steam Log:", resData))
        .catch((err) =>
          console.error("Meta CAPI Steam Transmission Error:", err)
        )
    } else {
      console.warn(
        "Meta credentials missing from environment variables. Skipping CAPI execution."
      )
    }

    // Return success state along with the eventId to the front-end client component
    return {
      success: true,
      message: "Lead sent to manager.",
      eventId: sharedEventId,
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error."
    return { success: false, message: errorMessage }
  }
}
