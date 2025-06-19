import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Hind Svaasth Seva",
  description: "Learn about Hind Svaasth Seva and how it revolutionizes healthcare.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Card className="pt-6">
        <CardContent className="space-y-8">
          {/* Header */}
          <section>
            <h1 className="text-4xl font-bold text-white mb-4">
              What is Hind Svaasth Seva?
            </h1>
            <h2 className="text-2xl font-semibold mb-6">
              Your Time is Ticking: Revolutionize Your Healthcare Experience with Hind Svaasth Seva
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Tired of braving the cold and standing in long queues just to book a doctor's appointment, only to miss it? The hassle is real, but it's time to say goodbye to those frustrating waits. Introducing <strong>Hind Svaasth Seva</strong>, your go-to healthcare marketplace, where top healthcare institutions and diagnostic centers are just a click away.
            </p>
          </section>

          <Separator />

          {/* Why Choose Hind Svaasth Seva */}
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Why Choose Hind Svaasth Seva?
            </h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>
                <strong>Convenience at Your Fingertips:</strong> Book appointments and schedule tests from the comfort of your home. No more waiting in line; just a few clicks and you're done! Whether you're booking a routine check-up or a specialized diagnostic test, our user-friendly platform ensures a hassle-free experience.
              </li>
              <li>
                <strong>Zero Extra Charges:</strong> We believe in transparency. Book your slots without paying an extra penny. Your health is valuable, and so is your money. With Hind Svaasth Seva, you can trust that the prices you see are the prices you pay.
              </li>
              <li>
                <strong>Seamless Experience:</strong> Once your booking is confirmed, you'll receive a booking ID via email. On the day of your appointment, simply visit the reception, get verified, and proceed with your checkups. Our streamlined process ensures that your experience is smooth and efficient.
              </li>
            </ul>
          </section>

          <Separator />

          {/* Why Hind Svaasth Seva Stands Out */}
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Why Hind Svaasth Seva Stands Out
            </h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li><strong>First Come, First Served:</strong> We operate on a first-come, first-served basis, ensuring fairness and transparency. The earlier you book, the better your chances of securing your preferred time slot.</li>
              <li><strong>No hidden charges involved</strong></li>
              <li><strong>primaryer-Centric Approach:</strong> We prioritize your convenience and satisfaction. Our platform is designed to make healthcare accessible and hassle-free.</li>
            </ul>
          </section>

          <Separator />

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6 text-muted-foreground">
              <div>
                <dt className="font-semibold">What mode of payments are accepted by Hind Svaasth Seva?</dt>
                <dd className="mt-1">
                  We accept online payments through netbanking, credit cards, debit cards, and UPI.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">What if I arrive late at the Hind Svaasth Seva centre on the day of appointment?</dt>
                <dd className="mt-1">
                  No need to worry. You will be entertained once the health specialist finishes his ongoing appointment.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">What if I have a problem accessing the site?</dt>
                <dd className="mt-1">
                  Proceed to the <Link href="/contact" className="text-white underline hover:text-white/80">contact page</Link> and your query will be resolved.
                </dd>
              </div>
            </dl>
          </section>

          <Separator />

          {/* For Healthcare Centres */}
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Why Hind Svaasth Seva is good for my healthcare centre?
            </h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>
                <strong>Enhanced Visibility and Reach:</strong> By partnering with Hind Svaasth Seva, your healthcare centre gains access to a broader patient base. Our platform is designed to optimize your online presence, ensuring that your services are easily discoverable by patients searching for healthcare solutions. With targeted SEO strategies, your centre will rank higher on search engines, making it easier for potential patients to find you.
              </li>
              <li>
                <strong>Comprehensive Support:</strong> Our dedicated team is always available to assist you with any technical or operational issues. From onboarding to ongoing support, we ensure that your transition to our platform is smooth and hassle-free.
              </li>
              <li>
                <strong>Patient Reviews and Feedback:</strong> Positive patient reviews can significantly boost your centre's reputation. Hind Svaasth Seva encourages patients to leave reviews, which can enhance your credibility and attract more patients.
              </li>
              <li>
                <strong>Cost-Effective Solutions:</strong> Our platform offers cost-effective solutions for healthcare centres, allowing you to manage your resources efficiently without compromising on quality.
              </li>
            </ul>
          </section>

          <Separator />

          {/* Partnering Up */}
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">
              How do I partner up with Hind Svaasth Seva?
            </h2>
            <p className="text-muted-foreground mb-4">
              Don’t hesitate to contact us from the <Link href="/contact" className="text-white underline hover:text-white/80">contact page</Link>. We will help you out with the entire process of onboarding. You are just a call away.
            </p>

            <h2 className="text-3xl font-semibold text-white mb-4">
              How will I as a partner get my payouts?
            </h2>
            <p className="text-muted-foreground">
              Newly registered healthcare centres on Hind Svaasth Seva receive payouts as per negotiated contracts made.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
