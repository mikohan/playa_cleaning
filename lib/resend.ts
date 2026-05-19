"use server"
import { Resend } from "resend"
import { createHash } from "crypto"

export type FormState = {
  success?: boolean
  error?: string
  message?: string
  eventId?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

function sha256Hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export const sendEmail = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  // Extract the unique token created by the browser form submission event
  const sharedEventId =
    (formData.get("clientEventId") as string) ||
    `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`

  // Data Extraction
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone Provided"
  const bedrooms = (formData.get("bedrooms") as string) || "1"
  const bathrooms = (formData.get("bathrooms") as string) || "1"
  const serviceType = (formData.get("serviceType") as string) || "Deep"
  const pageUrl = (formData.get("pageUrl") as string) || "Unknown Source"
  const customNotes =
    (formData.get("customNotes") as string) || "No extra notes provided."

  const managerEmail = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"
  const fromEmail = "Playa Cleaning <info@angaracleaning.com>"
  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  const managerText = `
NEW LEAD RECEIVED:
--------------------------
Name: ${username}
Phone: ${phone}

DETAILS:
Bedrooms: ${bedrooms}
Bathrooms: ${bathrooms}
Service: ${serviceType}

SOURCE INFO:
Sent From: ${pageUrl}
Notes: ${customNotes}
Time: ${orderTime}
  `.trim()

  try {
    // Send Notification to Manager
    const managerEmailPayload = await resend.emails.send({
      from: fromEmail,
      to: [managerEmail],
      subject: `NEW LEAD: ${bedrooms}BR/${bathrooms}BA - ${username}`,
      text: managerText,
    })

    if (managerEmailPayload.error) {
      console.error("Resend Manager Email Error:", managerEmailPayload.error)
      return {
        success: false,
        message: managerEmailPayload.error.message,
        eventId: sharedEventId,
      }
    }

    // META CONVERSIONS API FIRE
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_CAPI_TOKEN

    if (pixelId && accessToken) {
      const cleanPhone = phone.replace(/[^\d]/g, "")
      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: sharedEventId,
            action_source: "website",
            user_data: {
              ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
            },
            custom_data: {
              currency: "USD",
              value: 129,
            },
          },
        ],
        test_event_code: "TEST83239",
      }

      try {
        const capiResponse = await fetch(
          `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(capiPayload),
          }
        )
        await capiResponse.json()
      } catch (capiErr) {
        console.error("Meta CAPI Execution Error:", capiErr)
      }
    }

    return {
      success: true,
      message: "Form processed successfully!",
      eventId: sharedEventId,
    }
  } catch (err) {
    console.error("Server Action Exception:", err)
    return {
      success: false,
      message: "An unexpected error occurred.",
      eventId: sharedEventId,
    }
  }
}
