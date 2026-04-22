import {
  Row,
  Column,
  Img,
  Container,
  Heading,
  Html,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";
type WelcomeType = {
  username?: string;
  companyWebsite?: string;
};

export default function Welcome({
  username,
  companyWebsite = "https:/upholstery.angaracleaning.com",
}: WelcomeType) {
  return (
    <Tailwind>
      <Html>
        <Container>
          <Heading>Hello {username}</Heading>
          <Text className="text-xl">
            Thank you for contacting Angara Steamers! We will contact you as
            soon as possible.
          </Text>
          <Row className="mt-12">
            <Column align="center">
              <Link href={companyWebsite}>
                <Row className="w-auto table-fixed border-collapse border-spacing-0">
                  <Column className="h-12 w-12 overflow-hidden rounded-full p-0 text-center align-middle leading-0">
                    <Img
                      src={`${companyWebsite}/images/couch/logo512x512.png`}
                      width="128"
                      height="128"
                      alt="Zeh Fernandes"
                      className="h-full w-full object-cover object-center"
                    />
                  </Column>
                  <Column className="pl-3 text-[14px] leading-5 font-medium text-gray-500">
                    <p className="m-0 text-gray-700">Angara Steamers</p>
                    <p className="m-0 text-[12px] leading-3.5">
                      Upholstery and Carpet Cleaning Professionals
                    </p>
                  </Column>
                </Row>
              </Link>
            </Column>
          </Row>
        </Container>
      </Html>
    </Tailwind>
  );
}
