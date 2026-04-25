"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Playa Cleaning <info@angaracleaning.com>"
const COMPANY_EMAIL =
  process.env.COMPANY_EMAIL || "Playa Cleaning <angaralabllc@gmail.com"
export async function sendBookingEmail(formData: {
  beds: string
  baths: string
  phone: string
  price: number
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL, // Use your verified domain in production

      to: [COMPANY_EMAIL], // Your destination email
      subject: `New Booking Request: ${formData.beds} Bed / ${formData.baths} Bath`,
      html: `
        <h1>New Booking Inquiry</h1>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service:</strong> ${formData.beds} Bedrooms, ${formData.baths} Bathrooms</p>
        <p><strong>Quoted Price:</strong> $${formData.price}</p>
      `,
    })

    if (error) return { success: false, error }
    return { success: true }
  } catch (err) {
    return { success: false, error: err }
  }
}
