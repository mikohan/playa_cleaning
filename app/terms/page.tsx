import React from "react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"

export const metadata = {
  title: "Terms of Service | Playa Cleaning",
  description:
    "Terms and conditions for professional cleaning services provided by Playa Cleaning LLC in Los Angeles.",
}
const tosIntro = `Playa Cleaning LLC ("the Company," "we," "us") provides professional residential and commercial cleaning services. By booking a service through our website, phone, or email, you ("the Client") agree to be bound by the following terms and conditions.`

export default function TermsOfService() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 py-20 font-jakarta">
        <h1 className="mb-8 border-b pb-4 text-4xl font-black">
          Terms of Service
        </h1>
        <p className="mb-12 text-sm text-muted-foreground italic">
          Last Updated: April 24, 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              1. Overview
            </h2>
            <p>{tosIntro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              2. Service Area & Access
            </h2>
            <p>
              We serve a 50-mile radius around Los Angeles, CA. The Client is
              responsible for providing our cleaning teams with access to the
              property at the scheduled time. This includes gate codes, keys, or
              presence at the property.
            </p>
            <p className="font-semibold text-red-500">
              If our team cannot access the property within 20 minutes of the
              scheduled arrival, a lock-out fee of $50 will be charged.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              3. Cancellations & Rescheduling
            </h2>
            <p>
              We understand that plans change. We require at least **24
              hours&apos; notice** for any cancellations or rescheduling
              requests.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Cancellations made with more than 24 hours&apos; notice: No
                charge.
              </li>
              <li>
                Cancellations made with less than 24 hours&apos; notice: A $50
                cancellation fee applies.
              </li>
              <li>
                Same-day cancellations: 50% of the total service cost will be
                charged.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              4. Payment & Pricing
            </h2>
            <p>
              All pricing provided via our online calculator is an estimate
              based on standard home conditions. We reserve the right to adjust
              the final price if the property condition is significantly
              different than described (e.g., extreme hoarding, excessive pet
              waste, or post-construction debris).
            </p>
            <p>
              Payment is due upon completion of the service. We accept all major
              credit cards and digital payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              5. Satisfaction Guarantee
            </h2>
            <p>
              Your satisfaction is our priority. If you are not satisfied with
              any area we have cleaned, please contact us within **24 hours** of
              the service. We will return to re-clean the area at no additional
              cost to you. We do not offer cash refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              6. Safety & Hazardous Conditions
            </h2>
            <p>
              For the safety of our staff, we do not clean biohazards (e.g.,
              mold, human or animal waste, needles). We also do not move heavy
              furniture (over 25 lbs) to avoid injury or floor damage.
            </p>
            <p>
              Please ensure all pets are secured in a safe area during the
              cleaning process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-blue">
              7. Liability & Insurance
            </h2>
            <p>
              Playa Cleaning LLC is licensed, bonded, and insured. While we take
              the utmost care with your property, we are not liable for damage
              caused by &quot;wear and tear,&quot; poorly installed fixtures, or
              fragile items that were not secured. Claims for damage must be
              submitted within 24 hours of the service.
            </p>
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-muted p-8">
            <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
            <p>Questions about these terms? Reach out to us:</p>
            <ul className="mt-4 space-y-1">
              <li>
                <strong>Phone:</strong> (213) 598-77-63
              </li>
              <li>
                <strong>Email:</strong>{" "}
                {process.env.NEXT_PUBLIC_COMPANY_EMAIL ||
                  "angaralabllc@gmail.com"}
              </li>
              <li>
                <strong>Location:</strong> Los Angeles, CA
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
