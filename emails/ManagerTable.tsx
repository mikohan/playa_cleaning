import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  // Note: There isn't a dedicated <Table> component in the core library,
  // instead you use Section, Row, and Column for layout.
  Row,
  Column,
} from "@react-email/components";

interface Props {
  username?: string;
  email?: string;
  phone?: string;
  couch?: string;
  orderTime?: string;
}

export default function ManagerTable({
  username,
  email,
  phone,
  couch,
  orderTime,
}: Props) {
  const previewText = "Your recent order summary";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Lead Summary</Text>
          </Section>

          {/* Table Header Row */}
          <Section style={sectionBorder}>
            <Row>
              <Column style={headerCell}>Name</Column>
              <Column style={headerCell}>Email</Column>
              <Column style={headerCell} align="right">
                Phone
              </Column>
              <Column style={headerCell} align="right">
                Aditional info
              </Column>
              <Column style={headerCell} align="right">
                Sending Time
              </Column>
            </Row>
          </Section>

          {/* Table Data Rows */}
          <Section>
            <Row>
              <Column style={dataCell}>{username || "Nobody"}</Column>
              <Column style={dataCell}>{email || "Empty Email"}</Column>
              <Column style={dataCell} align="right">
                {phone || "Empty"}
              </Column>
              <Column style={dataCell} align="right">
                {couch || "Couch empty"}
              </Column>
              <Column style={dataCell} align="right">
                {orderTime || "2025-04-22"}
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Basic inline styles (React Email handles inlining these into the final HTML)
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  paddingBottom: "10px",
};

const sectionBorderTop = {
  borderTop: "1px solid rgb(238,238,238)",
  paddingTop: "10px",
  marginTop: "20px",
};

const headerCell = {
  padding: "0 10px",
  fontWeight: "bold" as const,
};

const dataCell = {
  padding: "10px",
};

const totalCell = {
  padding: "10px 10px 0",
  fontWeight: "bold" as const,
};

const totalAmount = {
  color: "#000000",
  fontSize: "18px",
};
