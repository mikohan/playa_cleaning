import { createHash } from "crypto"

interface CapiUserParams {
  phone: string
  email?: string
  clientIpAddress?: string
  clientUserAgent?: string
}

interface CapiEventParams {
  eventName: "Lead" | "Purchase"
  eventId: string
  value: number
  user: CapiUserParams
  testEventCode?: string // Used temporarily for testing logs
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
        user_data: {
          ph: cleanPhone ? [sha256Hash(cleanPhone)] : [],
          ...(hasValidEmail ? { em: [sha256Hash(user.email!)] } : {}),
          ...(user.clientIpAddress && user.clientIpAddress !== "Unknown"
            ? { client_ip_address: user.clientIpAddress }
            : {}),
          ...(user.clientUserAgent
            ? { client_user_agent: user.clientUserAgent }
            : {}),
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

    const result = await response.json()
    return { success: true, log: result }
  } catch (error) {
    console.error("Meta CAPI delivery network error:", error)
    return { success: false }
  }
}
