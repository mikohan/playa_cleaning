"use server"
import { Resend } from "resend"
import { createHash } from "crypto" // Built-in Node tool used for required Meta SHA-256 hashing

const resend = new Resend(process.env.RESEND_API_KEY)

const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Playa Cleaning <info@angaracleaning.com>"
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com" // Cleaned up the trailing unclosed quote block string

/**
 * Helper function to securely hash user parameters into SHA-256 for Meta CAPI compliance
 */
function sha256Hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function sendBookingEmail(formData: {
  beds: string
  baths: string
  phone: string
  price: number
}) {
  // 1. Generate a unified unique event ID token immediately on execution
  // This binds the server event and browser event together natively
  const sharedEventId = `calc_lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`

  try {
    // 2. Dispatch Email Notification Via Resend
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [COMPANY_EMAIL],
      subject: `New Booking Request: ${formData.beds} Bed / ${formData.baths} Bath`,
      html: `
        <h1>New Booking Inquiry</h1>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service:</strong> ${formData.beds} Bedrooms, ${formData.baths} Bathrooms</p>
        <p><strong>Quoted Price:</strong> $${formData.price}</p>
      `,
    })

    if (error) return { success: false, error }

    // 3. META CONVERSIONS API FIRE
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_CAPI_TOKEN

    if (pixelId && accessToken) {
      // Normalize the phone number structure (Meta prefers raw strings of digits)
      const cleanPhone = formData.phone.replace(/[^\d]/g, "")

      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: sharedEventId, // Must match browser exact tag value
            action_source: "website",
            user_data: {
              ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
            },
            custom_data: {
              currency: "USD",
              value: formData.price,
              content_category: "Embedded Calculator Quick Lead",
              content_name: `${formData.beds} Bed / ${formData.baths} Bath`,
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
        .then((resData) => console.log("Meta CAPI Calculator Log:", resData))
        .catch((err) =>
          console.error("Meta CAPI Calculator Transmission Error:", err)
        )
    } else {
      console.warn(
        "Meta credentials missing from environment variables. Skipping CAPI execution."
      )
    }

    // Return success state along with the eventId to the front-end client UI
    return { success: true, eventId: sharedEventId }
  } catch (err) {
    return { success: false, error: err }
  }
}
