"use server"

import { Resend, CreateEmailOptions } from "resend"
import { createHash } from "crypto"

export type FormState = {
  success?: boolean
  error?: string
  message?: string
  eventId?: string
}

// Unified Configuration Properties
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Playa Cleaning <info@angaracleaning.com>"
const MANAGER_EMAIL = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"

/**
 * Securely hashes sensitive data strings into SHA-256 formatting for Meta CAPI compliance
 */
function sha256Hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

interface PipelinePayload {
  eventIdPrefix: string
  clientEventId?: string
  subject: string
  textMessage: string // Enforced strict plain text
  userData: {
    phone: string
    email?: string
  }
  customData: {
    value: number
    contentName: string
    contentCategory: string
  }
}

/**
 * CORE PIPELINE ENGINE (Private)
 * Orchestrates Transactional Emails (Strict Plain Text) and Meta Conversion API logs.
 */
async function executeLeadPipeline(
  payload: PipelinePayload
): Promise<FormState> {
  const sharedEventId =
    payload.clientEventId ||
    `${payload.eventIdPrefix}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

  try {
    // 1. Dispatch strict plain-text email to management via Resend Engine
    const emailOptions: CreateEmailOptions = {
      from: FROM_EMAIL,
      to: [MANAGER_EMAIL],
      subject: payload.subject,
      text: payload.textMessage, // No HTML fallback options allowed here
    }

    const emailTransmission = await resend.emails.send(emailOptions)

    if (emailTransmission.error) {
      console.error(
        `Resend Transmission Intercept Error [${payload.eventIdPrefix}]:`,
        emailTransmission.error
      )
      return {
        success: false,
        message: emailTransmission.error.message,
        eventId: sharedEventId,
      }
    }

    // 2. Meta Conversions API Execution Loop
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_CAPI_TOKEN

    if (pixelId && accessToken) {
      const cleanPhone = payload.userData.phone.replace(/[^\d]/g, "")
      const cleanEmail = payload.userData.email?.trim().toLowerCase()

      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: sharedEventId,
            action_source: "website",
            user_data: {
              ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
              em:
                cleanEmail && cleanEmail !== "no email"
                  ? [sha256Hash(cleanEmail)]
                  : [],
            },
            custom_data: {
              currency: "USD",
              value: payload.customData.value,
              content_category: payload.customData.contentCategory,
              content_name: payload.customData.contentName.slice(0, 75),
            },
          },
        ],
        test_event_code: "TEST83239",
      }

      fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload),
        }
      )
        .then((res) => res.json())
        .then((resData) =>
          console.log(
            `Meta CAPI Success Log [${payload.eventIdPrefix}]:`,
            resData
          )
        )
        .catch((err) =>
          console.error(
            `Meta CAPI Transmission Failure [${payload.eventIdPrefix}]:`,
            err
          )
        )
    }

    return {
      success: true,
      message: "Lead processed successfully.",
      eventId: sharedEventId,
    }
  } catch (err: unknown) {
    console.error(
      `Unhandled Core Pipeline Exception [${payload.eventIdPrefix}]:`,
      err
    )
    const msg =
      err instanceof Error ? err.message : "Unexpected transmission crash."
    return {
      success: false,
      message: msg,
      eventId: sharedEventId,
    }
  }
}

// ==========================================
// EXPORTED ENTRY POINTS (Public API)
// ==========================================

/**
 * 1. Standard / Quick Quote Modal Form Action Handles
 */
export const sendEmail = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const clientEventId = formData.get("clientEventId") as string
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone Provided"
  const bedrooms = (formData.get("bedrooms") as string) || "1"
  const bathrooms = (formData.get("bathrooms") as string) || "1"
  const serviceType = (formData.get("serviceType") as string) || "Deep"
  const pageUrl = (formData.get("pageUrl") as string) || "Unknown Source"
  const customNotes =
    (formData.get("customNotes") as string) || "No extra notes provided."

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  const textBody = `
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

  return executeLeadPipeline({
    eventIdPrefix: "lead",
    clientEventId,
    subject: `NEW LEAD: ${bedrooms}BR/${bathrooms}BA - ${username}`,
    textMessage: textBody,
    userData: { phone },
    customData: {
      value: 129,
      contentCategory: "General Cleaning Request Quick Form",
      contentName: `Playa ${serviceType} Clean (${bedrooms}B/${bathrooms}B)`,
    },
  })
}

/**
 * 2. Carpet & Upholstery Deep Steam Cleaning Form Action Handles
 */
export const sendSteamEmail = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const clientEventId = formData.get("clientEventId") as string
  const username = (formData.get("username") as string) || "New Client"
  const phone = (formData.get("phone") as string) || "No Phone"
  const email = (formData.get("email") as string) || "No Email"
  const itemsToClean =
    (formData.get("itemsToClean") as string) || "Not specified"

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

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

  return executeLeadPipeline({
    eventIdPrefix: "steam_lead",
    clientEventId,
    subject: `🔥 STEAM LEAD: ${username}`,
    textMessage: leadTable,
    userData: { phone, email },
    customData: {
      value: 150,
      contentCategory: "Upholstery & Carpet Cleaning Request",
      contentName: itemsToClean.replace(/["\r\n]+/g, " ").trim(),
    },
  })
}

/**
 * 3. Interactive Quote Matrix Booking Calculator Execution Wrapper
 */
export async function sendBookingEmail(formData: {
  beds: string
  baths: string
  phone: string
  price: number
}) {
  const calculatorTextBody = `
NEW BOOKING INQUIRY (CALCULATOR)
--------------------------------------------------
Phone: ${formData.phone}
Service Layout: ${formData.beds} Bedrooms / ${formData.baths} Bathrooms
Quoted Price Target: $${formData.price}
--------------------------------------------------
  `.trim()

  return executeLeadPipeline({
    eventIdPrefix: "calc_lead",
    subject: `New Booking Request: ${formData.beds} Bed / ${formData.baths} Bath`,
    textMessage: calculatorTextBody,
    userData: { phone: formData.phone },
    customData: {
      value: formData.price,
      contentCategory: "Embedded Calculator Quick Lead",
      contentName: `${formData.beds} Bed / ${formData.baths} Bath Matrix Lead`,
    },
  })
}
