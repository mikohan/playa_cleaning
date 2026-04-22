import {
  Html,
  Head,
  Body,
  Preview,
  Container,
  Heading,
  Section,
  Row,
  Column,
  Text,
  Tailwind,
} from "@react-email/components";
interface Props {
  username?: string;
  email?: string;
  phone?: string;
  couch?: string;
}
export default function Manager({ username, email, phone, couch }: Props) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <Preview>Customer information</Preview>
          <Container className="mx-auto max-w-[600px] rounded-2 bg-white p-12">
            <Heading className="mb-[42px] text-center text-[24px] leading-16">
              Top 5 Features of Our Service
            </Heading>
            {[
              {
                number: 1,
                name: "Customer Name",
                title: username,
              },
              {
                number: 2,
                name: "Customer phone",
                title: phone,
              },
              {
                number: 3,
                name: "Customer email",
                title: email,
              },
              {
                number: 4,
                name: "Customer couch",
                title: couch,
              },
            ].map((feature, i) => (
              <Section key={i} className="mb-17">
                <Row className="pr-16 pl-3">
                  <Column
                    width="24"
                    height="24"
                    align="center"
                    valign="top"
                    className="pr-[18px] h-12 w-12"
                  >
                    <Row>
                      <Column
                        align="center"
                        valign="middle"
                        width="24"
                        height="24"
                        className="h-12 w-12 rounded-full bg-indigo-600 font-semibold text-white text-[12px] leading-none"
                      >
                        {feature.number}
                      </Column>
                    </Row>
                  </Column>
                  <Column valign="top">
                    <Text>{feature.name}</Text>
                    <Heading
                      as="h2"
                      className="mt-0 mb-2 text-gray-900 text-[18px] leading-13"
                    >
                      {feature.title}
                    </Heading>
                  </Column>
                </Row>
              </Section>
            ))}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
