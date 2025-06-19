

import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Hind Svaasth Seva",
  description:
    "Understand Hind Svaasth Seva's refund and cancellation policies for a smooth primaryer experience.",
};

export default function RefundCancellationPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardContent className="py-8 space-y-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Refund and Cancellation Policy
          </h1>
          <p className="text-muted-foreground mb-6">
            At Hind Svaasth Seva, we are committed to ensuring a smooth and satisfying experience for our primaryers. Please review our refund and cancellation policy to understand how we handle requests in these areas.
          </p>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Service Cancellation
            </h2>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>
                <strong>primaryer-Initiated Cancellations:</strong> If you wish to cancel a service booking, please do so at least 24 hours before the scheduled service time to avoid any charges.
              </li>
              <li>
                <strong>Provider-Initiated Cancellations:</strong> In rare cases where a service provider cancels a booking, we will notify you immediately and offer the option to reschedule or receive a full refund.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Refund Policy
            </h2>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>
                <strong>Service Not Provided:</strong> If, for any reason, a service is not provided as scheduled and was not canceled by the primaryer, you are eligible for a full refund.
              </li>
              <li>
                <strong>Unsatisfactory Service:</strong> If you are dissatisfied with the service quality, please contact us within 24 hours of service completion. Our team will review the case and determine if a partial or full refund is warranted.
              </li>
              <li>
                <strong>Processing Time:</strong> Refunds will be processed within 7-10 business days. Once approved, the refund will be credited back to your original payment method.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Rescheduling
            </h2>
            <p className="text-muted-foreground">
              Flexible Rescheduling: We understand that plans change. You may reschedule a service up to 24 hours before the appointment without any fees.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Contact Us
            </h2>
            <p className="text-muted-foreground">
              For any questions or concerns regarding cancellations, refunds, or rescheduling, please reach out to our primaryer support team. Refer to the{" "}
              <Link
                href="/contact"
                className="text-white underline hover:text-white/80"
              >
                contact page
              </Link>.
            </p>
            <p className="mt-4 text-muted-foreground">
              We strive to ensure that our services meet your expectations. To help avoid any confusion, we encourage clients to thoroughly review their requirements and discuss any concerns with us before making a booking.
            </p>
            <p className="mt-4 text-muted-foreground font-semibold">
              Thank you for choosing Hind Svaasth Seva. Your cooperation is highly valued.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
