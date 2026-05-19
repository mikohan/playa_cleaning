"use server"
import { Resend } from "resend"
import { createHash } from "crypto" // Built-in Node tool used for required Meta SHA-256 hashing

const companyWebsite = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || ""

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

export const sendEmail = async (
  prevState: FormState,
  formData: FormData,
  toWhom: "manager" | "customer" = "manager"
): Promise<FormState> => {
  // 1. Generate a unified unique event ID token immediately on execution
  // This binds the server event and browser event together natively
  const sharedEventId = `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`

  // 2. Data Extraction
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone Provided"
  const customerEmail = (formData.get("email") as string) || ""
  const bedrooms = (formData.get("bedrooms") as string) || "N/A"
  const bathrooms = (formData.get("bathrooms") as string) || "N/A"
  const serviceType = (formData.get("serviceType") as string) || "Standard"
  const pageFrom = (formData.get("pageFrom") as string) || "Main"

  // Hidden Tracking / Source Fields
  const pageUrl = (formData.get("pageUrl") as string) || "Unknown Source"
  const customNotes =
    (formData.get("customNotes") as string) || "No extra notes provided."

  // 🌟 FIX: Even on validation failures, ensure you return the eventId so the browser tracking loop handles it safely
  if (toWhom === "customer" && !customerEmail) {
    return {
      success: false,
      message: "No customer email provided.",
      eventId: sharedEventId,
    }
  }

  const managerEmail = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"
  const targetEmail = toWhom === "customer" ? customerEmail : managerEmail
  const fromEmail = "Playa Cleaning <info@angaracleaning.com>"

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  // 3. Plain Text Templates
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
PageFrom: ${pageFrom}

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
    // 4. Dispatch Email Notification Via Resend
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject:
        toWhom === "manager"
          ? `NEW LEAD: ${bedrooms}BR/${bathrooms}BA - ${username}`
          : "We received your cleaning quote request!",
      text: toWhom === "manager" ? managerText : customerText,
    })

    if (error) {
      console.error("Resend API Error:", error)
      return {
        success: false,
        message: error.message,
        eventId: sharedEventId, // Pass the ID out even during api connection drops
      }
    }

    // 5. META CONVERSIONS API FIRE
    // Only fire CAPI during the 'manager' email sequence to prevent dual-firing duplicate data on customer copies
    if (toWhom === "manager") {
      const pixelId = process.env.META_PIXEL_ID
      const accessToken = process.env.META_CAPI_TOKEN

      if (pixelId && accessToken) {
        // Normalize the phone number structure (Meta prefers raw strings of digits)
        const cleanPhone = phone.replace(/[^\d]/g, "")

        const capiPayload = {
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              event_id: sharedEventId, // Must match browser exact tag value
              action_source: "website",
              user_data: {
                ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
                em: customerEmail ? [sha256Hash(customerEmail)] : [],
              },
              custom_data: {
                currency: "USD",
              },
            },
          ],
          test_event_code: "TEST83239",
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
          .then((resData) => console.log("Meta CAPI Log:", resData))
          .catch((err) => console.error("Meta CAPI Transmission Error:", err))
      } else {
        console.warn(
          "Meta credentials missing from environment variables. Skipping CAPI execution."
        )
      }
    }

    // Return success state along with the eventId to the front-end client UI
    return {
      success: true,
      message: "Email sent successfully!",
      eventId: sharedEventId,
    }
  } catch (err: unknown) {
    console.error("Server Action Exception:", err)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again!",
      eventId: sharedEventId, // Ensure fallback string pattern matches browser expectations
    }
  }
}
