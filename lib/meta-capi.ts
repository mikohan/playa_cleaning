import { createHash } from "crypto"

interface CapiUserParams {
  phone: string
  email?: string
  first_name?: string
  fn?: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbc?: string // Added to clear the interface type constraint error
  fbp?: string // Added for complete parameter footprint parity
}

interface CapiEventParams {
  eventName: "Lead" | "Purchase"
  eventId: string
  value: number
  user: CapiUserParams
  /** Full URL of the page where the event happened (Meta requires it for website events) */
  eventSourceUrl?: string
  testEventCode?: string // Used temporarily for testing logs
}

/**
 * Test Events code for this event.
 * 1. META_TEST_EVENT_CODE from .env.local / .env.production, when set (marks EVERY server event
 *    as a test event, so real leads stop counting for ads: leave it empty when done testing).
 * 2. Otherwise the visitor's ?meta_test= cookie code.
 * A value that is not a Meta test code (TEST + 2-12 letters/digits) is ignored and logged.
 */
const TEST_CODE_RE = /^TEST[A-Z0-9]{2,12}$/

function cleanTestCode(raw: string | null | undefined, source: string): string | undefined {
  const code = (raw || "").trim().toUpperCase()
  if (!code) return undefined
  if (TEST_CODE_RE.test(code)) return code
  console.warn(`[Meta CAPI] ignored invalid test code from ${source}: "${raw}"`)
  return undefined
}

export function resolveTestEventCode(visitorCode?: string | null): string | undefined {
  return (
    cleanTestCode(process.env.META_TEST_EVENT_CODE, "META_TEST_EVENT_CODE") ||
    cleanTestCode(visitorCode, "visitor cookie")
  )
}

const WEBSITE = (process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://playacleaning.com").replace(/\/$/, "")

/** Keep only http(s) URLs on our own site; anything else falls back to the homepage */
function sourceUrl(url?: string): string {
  try {
    const u = new URL(url || "")
    if (u.protocol === "https:" || u.protocol === "http:") return u.toString()
  } catch {}
  return WEBSITE + "/"
}

/**
 * Securely hash user parameters into SHA-256 for Meta CAPI compliance
 */
function sha256Hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function sendMetaCapiEvent({
  eventName,
  eventId,
  value,
  user,
  eventSourceUrl,
  testEventCode,
}: CapiEventParams) {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_TOKEN

  if (!pixelId || !accessToken) {
    console.error("Meta CAPI configuration variables are missing.")
    return { success: false }
  }

  // 1. Sanitize and Normalize Phone Format (Meta demands country code prefix)
  let cleanPhone = user.phone.replace(/[^\d]/g, "")
  if (cleanPhone.length === 10) {
    cleanPhone = `1${cleanPhone}` // Prepends US/Canada country code '1' if omitted
  }

  // 2. Safely capture email strings if they contain actual data
  const hasValidEmail = user.email && user.email.trim().length > 0

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // Matches browser event_id down to the character
        action_source: "website",
        event_source_url: sourceUrl(eventSourceUrl),
        user_data: {
          ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
          ...(hasValidEmail ? { em: [sha256Hash(user.email!)] } : {}),
          ...(user.clientIpAddress && user.clientIpAddress !== "Unknown"
            ? { client_ip_address: user.clientIpAddress }
            : {}),
          ...(user.clientUserAgent
            ? { client_user_agent: user.clientUserAgent }
            : {}),
          ...(user.fbc ? { fbc: user.fbc } : {}),
          ...(user.fbp ? { fbp: user.fbp } : {}),
        },
        custom_data: {
          value: value,
          currency: "USD",
        },
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json().catch(() => ({}))
    // Meta answers 200 with events_received when it accepted the event; anything else is a rejection
    const ok = response.ok && Number(result?.events_received) >= 1
    if (!ok) {
      console.error(
        `[Meta CAPI] ${eventName} ${eventId} REJECTED (HTTP ${response.status}):`,
        JSON.stringify(result?.error || result)
      )
    } else {
      console.log(
        `[Meta CAPI] ${eventName} ${eventId} accepted` +
          (testEventCode ? ` (test code ${testEventCode})` : "") +
          (result?.fbtrace_id ? ` fbtrace ${result.fbtrace_id}` : "")
      )
      // Meta accepts but warns here, e.g. a test code that matches no open Test Events session
      if (Array.isArray(result?.messages) && result.messages.length) {
        console.warn(`[Meta CAPI] ${eventName} ${eventId} warnings:`, result.messages.join(" | "))
      }
    }
    return { success: ok, log: result }
  } catch (error) {
    console.error(`[Meta CAPI] ${eventName} ${eventId} network error:`, error)
    return { success: false }
  }
}
