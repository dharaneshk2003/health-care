import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms and Conditions | Hind Svaasth Seva",
  description: "Read the terms and conditions for using Hind Svaasth Seva's healthcare platform.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardContent className="py-8 space-y-8">
          <h1 className="text-3xl font-bold text-white pb-0">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground mb-4">
            At Hind Svaasth Seva, we are committed to providing a seamless and secure platform for booking doctor appointments and managing your healthcare needs. By using our website, you agree to the following terms and conditions:
          </p>
          <Separator />

          <ol className="space-y-6 list-decimal">
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Acceptance of Terms</h2>
              <p>
                By accessing or using the Hind Svaasth Seva website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our website.
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">User Conduct</h2>
              <ul className="list-disc list-inside ml-4">
                <li>You agree to use the website for lawful purposes only.</li>
                <li>You must not upload or transmit any content that is defamatory, offensive, or in violation of any laws.</li>
                <li>You must not engage in any activities that could harm the website or its users.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Payment Processing</h2>
              <ul className="list-disc list-inside ml-4">
                <li>Payments for appointments and tests are processed through secure payment gateways.</li>
                <li>
                  Refunds and cancellations are subject to our{" "}
                  <Link
                    href="/refund-cancellation"
                    className="text-white underline hover:text-white/80"
                  >
                    refund and cancellation policy
                  </Link>.
                </li>
                <li>You agree to the terms and conditions of our payment processors.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Data Privacy and Security</h2>
              <ul className="list-disc list-inside ml-4">
                <li>
                  We respect your privacy and handle your data in accordance with our{" "}
                  <Link
                    href="/privacy-security"
                    className="text-white underline hover:text-white/80"
                  >
                    privacy policy
                  </Link>.
                </li>
                <li>We use state-of-the-art encryption and security measures to protect your personal information.</li>
                <li>Our platform is HIPAA compliant, ensuring the highest standards of data privacy and security.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Merchant and Partner Obligations</h2>
              <ul className="list-disc list-inside ml-4">
                <li>Healthcare providers and diagnostic centers must comply with all applicable laws and regulations.</li>
                <li>Providers must provide necessary documentation and adhere to our KYC (Know Your primaryer) requirements.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">primaryer Obligations</h2>
              <ul className="list-disc list-inside ml-4">
                <li>primaryers must provide accurate information when booking appointments and tests.</li>
                <li>primaryers must comply with the refund and cancellation policies.</li>
                <li>primaryers have the right to request access, modification, or deletion of their personal data.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Dispute Resolution</h2>
              <ul className="list-disc list-inside ml-4">
                <li>Disputes will be resolved in accordance with applicable laws and regulations.</li>
                <li>We encourage users to <Link href="/contact" className="text-white underline hover:text-white/80">contact us</Link> directly to resolve any issues or concerns.</li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Applicable Law</h2>
              <p>These Terms and Conditions are governed by the laws of India.</p>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of these changes.
              </p>
            </li>
          </ol>

          <Separator />

          <section>
            <h2 className="text-xl font-bold text-white mb-2">Our Commitment to You</h2>
            <p className="text-muted-foreground">
              At Hind Svaasth Seva, we prioritize the privacy and security of your data. By implementing these best practices, we aim to build trust and ensure that your personal information is protected. We are dedicated to providing a secure and user-friendly experience for all our patients.
            </p>
            <p className="text-muted-foreground mt-2">
              If you have any questions or concerns about our Terms and Conditions, please do not hesitate to <Link href="/contact" className="text-white underline hover:text-white/80">contact us</Link>. Your trust is our top priority.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
