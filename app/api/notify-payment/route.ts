import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (!sessionId)
      return NextResponse.json({ error: "No session ID" }, { status: 400 })

    // Verify session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Send email to manager
    await resend.emails.send({
      from: "Playa Cleaning <info@angaracleaning.com>",
      to: "angaralabllc@gmail.com",
      subject: `💰 PAYMENT RECEIVED: $${(session.amount_total! / 100).toFixed(2)}`,
      text: `
        A new payment has been completed!
        Customer: ${session.customer_details?.email}
        Amount: $${(session.amount_total! / 100).toFixed(2)}
        Service: ${session.metadata?.service_type || "N/A"}
        Details: ${session.metadata?.room_configuration || "N/A"}
        Add-ons: ${session.metadata?.selected_addons || "None"}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Notification failed" }, { status: 500 })
  }
}
