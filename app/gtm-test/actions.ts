"use server"

export async function sendServerTestEvent(formData: FormData) {
  const PIXEL_ID = "26194171486949446"
  const SYSTEM_ACCESS_TOKEN = process.env.META_CAPI_TOKEN
  const TEST_CODE = "TEST83239"

  const eventId = formData.get("event_id") as string
  const serviceType = formData.get("service_type") as string
  const estimatedValue = Number(formData.get("estimated_value"))
  const userAgent = formData.get("userAgent") as string
  const fbp = formData.get("fbp") as string
  const fbc = formData.get("fbc") as string

  const endpoint = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${SYSTEM_ACCESS_TOKEN}`

  const userData: Record<string, unknown> = {
    client_user_agent: userAgent,
    client_ip_address: "127.0.0.1",
  }
  if (fbp) userData.fbp = fbp
  if (fbc) userData.fbc = fbc

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        custom_data: {
          value: estimatedValue,
          currency: "USD",
        },
      },
    ],
    test_event_code: TEST_CODE,
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return { success: true, metaResponse: await response.json() }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
