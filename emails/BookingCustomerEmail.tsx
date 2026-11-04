import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { TIME_WINDOW_LABELS, formatDateLabel, formatUSD } from "@/lib/booking"
import { BookingEmailData, colors, s } from "./booking-shared"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr>
      <td style={s.label}>{label}</td>
      <td style={s.value}>{value}</td>
    </tr>
  )
}

/** Sent to the customer, written and signed by the owner (Alicia). */
export default function BookingCustomerEmail(d: BookingEmailData) {
  const b = d.booking
  const first = b.name.trim().split(" ")[0]
  const paid = d.status === "paid"
  const tel = d.companyPhone.replace(/[^\d+]/g, "")

  return (
    <Html>
      <Head />
      <Preview>
        {paid
          ? `Thanks, ${first}! Your payment of ${formatUSD(d.paidAmount ?? d.dueToday)} went through.`
          : `Thanks, ${first}! I got your cleaning request.`}
      </Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={s.brand}>Playa Cleaning</Text>
          <Text style={s.h1}>
            {paid ? `Thank you, ${first}! Your payment went through.` : `Thank you, ${first}! I got your request.`}
          </Text>
          <Text style={s.p}>
            {paid
              ? `I received ${formatUSD(d.paidAmount ?? d.dueToday)}. I will call or text you soon to pick the exact date and time that works for you.`
              : "I will call or text you soon to pick the exact date and time that works for you. You pay after the cleaning is done."}
          </Text>

          <Text style={s.sectionTitle}>Your cleaning</Text>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <Row label="Service" value={d.quote.serviceLabel} />
              <Row label="Home" value={d.quote.roomsLabel} />
              <Row label="Address" value={b.address} />
              <Row label="Dates you picked" value={b.preferredDates.map(formatDateLabel).join(", ")} />
              <Row label="Time of day" value={b.timeWindows.map((t) => TIME_WINDOW_LABELS[t]).join(", ")} />
            </tbody>
          </table>

          <Text style={s.sectionTitle}>Price</Text>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              {d.quote.lines.map((l, i) => (
                <Row key={i} label={l.label} value={l.included ? "Included" : formatUSD(l.amount)} />
              ))}
            </tbody>
          </table>
          <Section style={s.totalBox}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <Row label="Total" value={<span style={{ fontSize: "18px" }}>{formatUSD(d.quote.total)}</span>} />
                {paid && <Row label="Paid today" value={formatUSD(d.paidAmount ?? d.dueToday)} />}
                <Row label="Due after the cleaning" value={formatUSD(d.balance)} />
              </tbody>
            </table>
          </Section>

          {paid && d.balance < d.quote.total && (
            <Text style={{ ...s.p, marginTop: "16px" }}>
              You get a full refund if you cancel at least one day before your cleaning.
            </Text>
          )}

          <Text style={{ ...s.p, marginTop: "20px" }}>
            Questions? Call or text me at{" "}
            <Link href={`tel:${tel}`} style={{ color: colors.blue }}>{d.companyPhone}</Link>, or just reply to this email.
          </Text>
          <Text style={{ ...s.p, color: colors.ink, fontWeight: 700, margin: 0 }}>
            {d.ownerName}
          </Text>
          <Text style={{ ...s.p, marginTop: 0 }}>Playa Cleaning</Text>

          <Text style={s.footer}>
            Booking {d.bookingId} ·{" "}
            <Link href={d.website} style={{ color: "#94a3b8" }}>
              {d.website.replace(/^https?:\/\//, "")}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
