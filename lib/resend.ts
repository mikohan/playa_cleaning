"use server"

import { Resend, CreateEmailOptions } from "resend"
import { headers } from "next/headers"
import { sendMetaCapiEvent } from "./meta-capi"

// ==========================================
// TESTING & ENVIRONMENT CONFIGURATION
// ==========================================
const TEST_EVENT_CODE = "TEST19157"
// process.env.NODE_ENV !== "production" ? "TEST19157" : undefined // Change this anytime to match your Meta dashboard
const ENABLE_EMAIL_SENDING = true // Set to true when you want Resend to start sending emails again

// Unified Configuration Properties
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Playa Cleaning <info@angaracleaning.com>"
const MANAGER_EMAIL = process.env.COMPANY_EMAIL || "angaralabllc@gmail.com"

export type FormState = {
  success?: boolean
  error?: string
  message?: string
  eventId?: string
}

interface PipelinePayload {
  eventIdPrefix: string
  clientEventId?: string
  subject: string
  textMessage: string
  userData: {
    phone: string
    email?: string
  }
  customData: {
    value: number
  }
}

/**
 * CORE PIPELINE ENGINE (Private)
 * Orchestrates Transactional Emails and standardizes Meta Conversion API delivery.
 */
async function executeLeadPipeline(
  payload: PipelinePayload
): Promise<FormState> {
  const sharedEventId =
    payload.clientEventId ||
    `${payload.eventIdPrefix}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

  try {
    // 1. Conditional Email Dispatch
    if (ENABLE_EMAIL_SENDING) {
      const emailOptions: CreateEmailOptions = {
        from: FROM_EMAIL,
        to: [MANAGER_EMAIL],
        subject: payload.subject,
        text: payload.textMessage,
      }

      const emailTransmission = await resend.emails.send(emailOptions)

      if (emailTransmission.error) {
        console.error(
          `🚨 Resend Error [${payload.eventIdPrefix}]:`,
          emailTransmission.error
        )
        return {
          success: false,
          message: emailTransmission.error.message,
          eventId: sharedEventId,
        }
      }
    } else {
      console.log(
        `[PIPELINE] Email sending is currently disabled via config toggle.`
      )
    }

    // 2. Extract Client Network Meta Info from Next.js Headers
    const reqHeaders = await headers()
    const userAgent = reqHeaders.get("user-agent") || ""
    const ipAddress =
      reqHeaders.get("x-forwarded-for")?.split(",")[0] ||
      reqHeaders.get("x-real-ip") ||
      "127.0.0.1"

    // 3. Hand off the data packet to your helper module file
    const capiResult = await sendMetaCapiEvent({
      eventName: "Lead",
      eventId: sharedEventId,
      value: payload.customData.value,
      testEventCode: TEST_EVENT_CODE || undefined,
      user: {
        phone: payload.userData.phone,
        email:
          payload.userData.email && payload.userData.email !== "No Email"
            ? payload.userData.email
            : undefined,
        clientIpAddress: ipAddress,
        clientUserAgent: userAgent,
      },
    })

    console.log(
      `Meta CAPI Result [${payload.eventIdPrefix}]:`,
      JSON.stringify(capiResult)
    )

    return {
      success: true,
      message: "Lead processed successfully.",
      eventId: sharedEventId,
    }
  } catch (err: unknown) {
    console.error(
      `💥 Unhandled Core Pipeline Exception [${payload.eventIdPrefix}]:`,
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
DETAILS: Bedrooms: ${bedrooms} / Bathrooms: ${bathrooms} / Service: ${serviceType}
SOURCE: Sent From: ${pageUrl} / Time: ${orderTime}
  `.trim()

  return executeLeadPipeline({
    eventIdPrefix: "lead",
    clientEventId,
    subject: `NEW LEAD: ${bedrooms}BR/${bathrooms}BA - ${username}`,
    textMessage: textBody,
    userData: { phone },
    customData: { value: 165 },
  })
}

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
LEAD DETAILS: PLAYA CLEANING (CARPET & UPHOLSTERY)
--------------------------------------------------
CUSTOMER:     ${username}
PHONE:        ${phone}
EMAIL:        ${email}
ITEMS:        ${itemsToClean}
--------------------------------------------------
  `.trim()

  return executeLeadPipeline({
    eventIdPrefix: "steam_lead",
    clientEventId,
    subject: `🔥 STEAM LEAD: ${username}`,
    textMessage: leadTable,
    userData: { phone, email },
    customData: { value: 150 },
  })
}

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
Layout: ${formData.beds} Beds / ${formData.baths} Baths
Quoted Target: $${formData.price}
--------------------------------------------------
  `.trim()

  return executeLeadPipeline({
    eventIdPrefix: "calc_lead",
    subject: `New Booking Request: ${formData.beds} Bed / ${formData.baths} Bath`,
    textMessage: calculatorTextBody,
    userData: { phone: formData.phone },
    customData: { value: formData.price },
  })
}
