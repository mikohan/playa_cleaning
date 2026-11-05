"use server"

import { Resend, CreateEmailOptions } from "resend"
import { headers } from "next/headers"
import { sendMetaCapiEvent } from "./meta-capi"

// ==========================================
// TESTING & ENVIRONMENT CONFIGURATION
// ==========================================
// Meta Test Events. Two ways to send server events into a Test Events session:
// 1. open the site with ?meta_test=TEST12345 (the code shown in Events Manager): that browser's
//    leads carry it for 3 hours (?meta_test=off ends it); everyone else stays production traffic
// 2. or set META_TEST_EVENT_CODE in .env to tag every event (leave empty in normal use)
const TEST_EVENT_CODE: string | undefined = process.env.META_TEST_EVENT_CODE?.trim() || undefined
const TEST_CODE_RE = /^TEST[A-Z0-9]{2,12}$/
const ENABLE_EMAIL_SENDING = true

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
  /** Page the form was sent from (Meta event_source_url) */
  pageUrl?: string
  /** Test Events code from the visitor's ?meta_test= link */
  testEventCode?: string
  userData: {
    phone: string
    username?: string
    email?: string
    fbc?: string
    fbp?: string
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
    // 1. Email dispatch
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

    // 3. Extract Client Network Meta Info from Next.js Headers
    const reqHeaders = await headers()
    const userAgent = reqHeaders.get("user-agent") || ""
    const ipAddress =
      reqHeaders.get("x-forwarded-for")?.split(",")[0] ||
      reqHeaders.get("x-real-ip") ||
      "127.0.0.1"

    // 4. Hand off the data packet to your helper module file
    const capiResult = await sendMetaCapiEvent({
      eventName: "Lead",
      eventId: sharedEventId,
      value: payload.customData.value,
      eventSourceUrl: payload.pageUrl || reqHeaders.get("referer") || undefined,
      testEventCode: payload.testEventCode || TEST_EVENT_CODE || undefined,
      user: {
        phone: payload.userData.phone,
        first_name: payload.userData.username,
        fn: payload.userData.username,
        email:
          payload.userData.email && payload.userData.email !== "No Email"
            ? payload.userData.email
            : undefined,
        clientIpAddress: ipAddress,
        clientUserAgent: userAgent,
        fbc: payload.userData.fbc || undefined,
        fbp: payload.userData.fbp || undefined,
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
  const metaTest = ((formData.get("metaTestCode") as string) || "").trim().toUpperCase()
  const zip = ((formData.get("zip") as string) || "").trim() || "Not given"
  const homeSize = (formData.get("homeSize") as string) || "Not given"

  const SERVICE_NAMES: Record<string, string> = {
    standard: "Standard Cleaning",
    deep: "Deep Cleaning",
    move: "Move In/Out Cleaning",
    post: "Post-Construction Cleaning",
  }
  const serviceName = SERVICE_NAMES[serviceType] || serviceType

  const fbc = (formData.get("fbc") as string) || undefined
  const fbp = (formData.get("fbp") as string) || undefined

  const orderTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  const textBody = `
NEW LEAD RECEIVED:
--------------------------
Name: ${username}
Phone: ${phone}
Service: ${serviceName}
Bedrooms: ${bedrooms} / Bathrooms: ${bathrooms}
Home size: ${homeSize}
ZIP: ${zip}
SOURCE: Sent From: ${pageUrl} / Time: ${orderTime}
  `.trim()

  const roomsPart = bedrooms === "Not given" ? "" : ` ${bedrooms}BR/${bathrooms}BA`
  return executeLeadPipeline({
    eventIdPrefix: "lead",
    clientEventId,
    subject: `NEW LEAD: ${serviceName}${roomsPart} - ${username}`,
    textMessage: textBody,
    pageUrl: pageUrl === "Unknown Source" ? undefined : pageUrl,
    testEventCode: TEST_CODE_RE.test(metaTest) ? metaTest : undefined,
    userData: { phone, fbc, fbp },
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

  const fbc = (formData.get("fbc") as string) || undefined
  const fbp = (formData.get("fbp") as string) || undefined

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
    userData: { phone, email, fbc, fbp },
    customData: { value: 150 },
  })
}

export async function sendBookingEmail(formData: {
  beds: string
  baths: string
  phone: string
  username?: string
  price: number
  fbc?: string
  fbp?: string
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
    userData: {
      phone: formData.phone,
      fbc: formData.fbc,
      fbp: formData.fbp,
    },
    customData: { value: formData.price },
  })
}
