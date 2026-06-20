import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe" // Assumes you created this per previous steps

export async function POST(req: Request) {
  try {
    // Receive data from the booking confirm page
    const { price, email, serviceType, rooms, addons } = await req.json()

    // 1. Validate required data
    if (!price || !email || !serviceType) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      )
    }

    // 2. Prepare Display Name
    const serviceName =
      serviceType === "standard"
        ? "Standard Cleaning"
        : serviceType === "deep"
          ? "Deep Cleaning"
          : "Move In/Out Cleaning"

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Playa Cleaning - ${serviceName}`,
              description: `Details: ${rooms} | Add-ons: ${addons || "None"}`,
            },
            unit_amount: Math.round(parseFloat(price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/thank-you?status=paid&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/booking/confirm`,
      // Metadata allows you to see these specific details in your Stripe Dashboard
      // without affecting the customer receipt layout
      metadata: {
        service_type: serviceName,
        room_configuration: rooms,
        selected_addons: addons || "None",
      },
    })

    // 4. Return the checkout URL
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe Checkout Error:", error)
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 }
    )
  }
}
