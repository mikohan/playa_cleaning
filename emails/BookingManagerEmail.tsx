import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import {
  PAYMENT_LABELS,
  TIME_WINDOW_LABELS,
  formatDateLabel,
  formatUSD,
} from "@/lib/booking"
import { BookingEmailData, colors, s } from "./booking-shared"

const STATUS_TEXT = {
  requested: { tag: "NEW REQUEST · PAY LATER", color: colors.blue },
  awaiting_payment: { tag: "NEW REQUEST · WAITING FOR PAYMENT", color: colors.amber },
  paid: { tag: "PAID", color: colors.green },
} as const

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr>
      <td style={s.label}>{label}</td>
      <td style={s.value}>{value}</td>
    </tr>
  )
}

export default function BookingManagerEmail(d: BookingEmailData) {
  const b = d.booking
  const st = STATUS_TEXT[d.status]
  const tel = b.phone.replace(/[^\d+]/g, "")
  const preview = `${st.tag}: ${b.name}, ${d.quote.serviceLabel}, ${formatUSD(d.quote.total)}`

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={{ ...s.brand, color: st.color }}>{st.tag}</Text>
          <Text style={s.h1}>
            {b.name} · {d.quote.serviceLabel}
          </Text>
          <Text style={s.p}>
            Booking <strong>{d.bookingId}</strong> · {d.createdAt}
          </Text>

          {d.status === "paid" && (
            <Section style={{ ...s.totalBox, backgroundColor: "#ecfdf3" }}>
              <Text style={{ ...s.p, color: colors.green, margin: 0, fontWeight: 700 }}>
                Received {formatUSD(d.paidAmount ?? d.dueToday)} by card.
                {d.balance > 0 ? ` Balance after cleaning: ${formatUSD(d.balance)}.` : " Paid in full."}
              </Text>
            </Section>
          )}
          {d.status === "awaiting_payment" && (
            <Section style={{ ...s.totalBox, backgroundColor: "#fffbeb" }}>
              <Text style={{ ...s.p, color: colors.amber, margin: 0, fontWeight: 700 }}>
                Customer went to Stripe to pay {formatUSD(d.dueToday)}. A second &quot;PAID&quot;
                email arrives when the payment goes through. Until then, treat this as a lead and call them.
              </Text>
            </Section>
          )}

          <Text style={s.sectionTitle}>Customer</Text>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <Row label="Name" value={b.name} />
              <Row label="Phone" value={<Link href={`tel:${tel}`}>{b.phone}</Link>} />
              <Row label="Email" value={<Link href={`mailto:${b.email}`}>{b.email}</Link>} />
              <Row label="Address" value={b.address} />
            </tbody>
          </table>

          <Text style={s.sectionTitle}>Preferred time (not confirmed)</Text>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <Row label="Dates" value={b.preferredDates.map(formatDateLabel).join(", ")} />
              <Row label="Time of day" value={b.timeWindows.map((t) => TIME_WINDOW_LABELS[t]).join(", ")} />
              {b.notes && <Row label="Notes" value={b.notes} />}
            </tbody>
          </table>

          <Text style={s.sectionTitle}>Calculator</Text>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              {d.quote.lines.map((l, i) => (
                <Row
                  key={i}
                  label={l.label}
                  value={l.included ? "Included" : formatUSD(l.amount)}
                />
              ))}
            </tbody>
          </table>

          <Section style={s.totalBox}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <Row label="Total" value={<span style={{ fontSize: "18px" }}>{formatUSD(d.quote.total)}</span>} />
                <Row label="Payment choice" value={PAYMENT_LABELS[d.payment]} />
                <Row label="Due today" value={formatUSD(d.dueToday)} />
                <Row label="Due after cleaning" value={formatUSD(d.balance)} />
              </tbody>
            </table>
          </Section>

          <Section style={{ marginTop: "24px" }}>
            <Button href={`tel:${tel}`} style={s.button}>
              Call {b.name.split(" ")[0]}
            </Button>
            {d.stripeDashboardUrl && (
              <>
                {"  "}
                <Link href={d.stripeDashboardUrl} style={{ color: colors.blue, fontSize: "14px", marginLeft: "12px" }}>
                  Open payment in Stripe
                </Link>
              </>
            )}
          </Section>

          <Hr style={{ borderColor: colors.line, margin: "24px 0 0" }} />
          {b.tracking?.pageUrl && <Text style={s.footer}>Sent from: {b.tracking.pageUrl}</Text>}
        </Container>
      </Body>
    </Html>
  )
}
