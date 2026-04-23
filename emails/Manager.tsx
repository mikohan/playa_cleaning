import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from "@react-email/components"

interface Props {
  username: string
  email: string
  phone: string
  bedrooms: string
  bathrooms: string
  serviceType: string
  orderTime: string
  price: string
}

/**
 * STRATEGY FOR PRIMARY TAB:
 * 1. Minimalist layout (no heavy tables or buttons).
 * 2. High text-to-HTML ratio.
 * 3. Use standard system fonts.
 * 4. No external images or tracking pixels (Disable tracking in Resend).
 */
export default function ManagerTable({
  username,
  email,
  phone,
  bedrooms,
  bathrooms,
  serviceType,
  orderTime,
  price,
}: Props) {
  const previewText = `Quote Request: ${username} (${bedrooms}BR/${bathrooms}BA)`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Subtle Branding */}
          <Text style={brand}>PLAYA CLEANING / INTERNAL</Text>

          <Text style={greeting}>
            New request received for a{" "}
            <span style={highlight}>{serviceType}</span> cleaning.
          </Text>

          {/* Clean Data List - Avoids "Promotional" Table look */}
          <Section style={dataSection}>
            <Text style={item}>
              <span style={label}>Client:</span> {username}
            </Text>
            <Text style={item}>
              <span style={label}>Price:</span>
              <b>${price}</b>
            </Text>
            <Text style={item}>
              <span style={label}>Phone:</span>{" "}
              <Link href={`tel:${phone}`} style={link}>
                {phone}
              </Link>
            </Text>
            <Text style={item}>
              <span style={label}>Email:</span> {email}
            </Text>
            <Text style={item}>
              <span style={label}>Property:</span> {bedrooms} Bed / {bathrooms}{" "}
              Bath
            </Text>
          </Section>

          <Text style={paragraph}>
            Contact this lead immediately to finalize the booking.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>Logged at {orderTime} • LA Operations</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,sans-serif',
}

const container = {
  margin: "40px auto",
  padding: "0 20px",
  maxWidth: "580px",
}

const brand = {
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  color: "#3b82f6", // Subtle blue accent
  marginBottom: "16px",
}

const greeting = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#111827",
  fontWeight: "500",
}

const highlight = {
  color: "#3b82f6",
  fontWeight: "700",
}

const dataSection = {
  margin: "24px 0",
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  border: "1px solid #f3f4f6",
}

const item = {
  fontSize: "15px",
  margin: "8px 0",
  color: "#374151",
}

const label = {
  fontWeight: "700",
  color: "#6b7280",
  width: "100px",
  display: "inline-block",
}

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
}

const paragraph = {
  fontSize: "14px",
  color: "#6b7280",
}

const hr = {
  borderColor: "#f3f4f6",
  margin: "30px 0",
}

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
}
