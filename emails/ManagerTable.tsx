import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components"

interface Props {
  username: string
  email: string
  phone: string
  bedrooms: string
  bathrooms: string
  serviceType: string
  orderTime: string
}

export default function ManagerTable({
  username,
  email,
  phone,
  bedrooms,
  bathrooms,
  serviceType,
  orderTime,
}: Props) {
  const previewText = `New Lead: ${username} - ${bedrooms}BR/${bathrooms}BA`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={headerSection}>
            <Text style={brandLabel}>PLAYA CLEANING</Text>
            <Text style={heading}>New Cleaning Request</Text>
            <Text style={dateTime}>{orderTime}</Text>
          </Section>

          {/* Service Badge */}
          <Section style={badgeContainer}>
            <Text style={serviceBadge}>
              {serviceType?.toUpperCase()} CLEANING
            </Text>
          </Section>

          {/* Main Info Card */}
          <Section style={card}>
            <Row style={infoRow}>
              <Column>
                <Text style={label}>Customer Name</Text>
                <Text style={value}>{username}</Text>
              </Column>
              <Column>
                <Text style={label}>Phone Number</Text>
                <Text style={value}>{phone}</Text>
              </Column>
            </Row>

            <Hr style={divider} />

            <Row style={infoRow}>
              <Column>
                <Text style={label}>Property Details</Text>
                <Text style={value}>
                  {bedrooms} Bed / {bathrooms} Bath
                </Text>
              </Column>
              <Column>
                <Text style={label}>Email Address</Text>
                <Text style={value}>{email}</Text>
              </Column>
            </Row>
          </Section>

          {/* Action Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Note: This lead was generated from the Playa Cleaning instant
              quote modal.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles - Minimalist & Mobile Friendly
const main = {
  backgroundColor: "#f4f7f9",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "580px",
}

const headerSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
}

const brandLabel = {
  color: "#3b82f6",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  margin: "0",
}

const heading = {
  fontSize: "28px",
  lineHeight: "1.2",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "8px 0",
}

const dateTime = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
}

const badgeContainer = {
  textAlign: "center" as const,
  marginBottom: "24px",
}

const serviceBadge = {
  display: "inline-block",
  padding: "6px 12px",
  backgroundColor: "#dbeafe",
  color: "#1e40af",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  margin: "0 auto",
}

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
}

const infoRow = {
  padding: "12px 0",
}

const label = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  color: "#94a3b8",
  fontWeight: "bold",
  margin: "0 0 4px 0",
}

const value = {
  fontSize: "16px",
  color: "#334155",
  fontWeight: "500",
  margin: "0",
}

const divider = {
  borderColor: "#f1f5f9",
  margin: "12px 0",
}

const footer = {
  textAlign: "center" as const,
  marginTop: "24px",
}

const footerText = {
  fontSize: "12px",
  color: "#94a3b8",
  lineHeight: "1.5",
}
