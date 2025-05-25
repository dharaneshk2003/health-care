// app/privacy-security/page.tsx or pages/privacy-security.tsx

import { Metadata } from "next";
import { Card, CardContent } from "../../../components/ui/card.tsx"; // shadcn/ui component
import { Separator } from "../../../components/ui/separator.tsx"; // shadcn/ui component

export const metadata: Metadata = {
  title: "Data Privacy and Security | Hind Svaasth Seva",
  description:
    "Learn how Hind Svaasth Seva protects your data privacy and ensures security for all users.",
};

export default function PrivacySecurityPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardContent className="py-8">
          <h1 className="text-3xl font-bold mb-4 text-custom">
            Data Privacy and Security at Hind Svaasth Seva
          </h1>
          <p className="text-muted-foreground mb-6">
            At Hind Svaasth Seva, we understand that data privacy and security are of paramount importance, especially in the healthcare sector. Our platform allows patients to book online doctor appointments, schedule tests, and securely upload their medical reports. We are committed to protecting the privacy and security of our patients' data. Here’s how we ensure that:
          </p>
          <Separator className="mb-6" />
          <ol className="space-y-6 list-decimal ml-5">
            <li className="">
              <h2 className="font-semibold text-lg mb-1">Transparency</h2>
              <p>
                We are transparent about our data practices. Our privacy policy is written in plain language and is easily accessible on our website. We clearly communicate what data we collect, why we collect it, and how we use and store it. This ensures that our users are fully informed about our data handling practices.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Data Minimization</h2>
              <p>
                We only collect the data that is essential for providing our services. For instance, we ask for information that is necessary for booking appointments and tests, but we avoid collecting unnecessary personal details. This minimizes the risk of data breaches and ensures that we handle only the data that is crucial for our operations.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Enhanced Security</h2>
              <p>
                We employ robust security measures to protect patient data. This includes encryption of data both in transit and at rest, implementation of firewalls, and strict access controls. We also conduct regular security audits to identify and address any vulnerabilities. Our staff is trained in cybersecurity best practices to ensure that personal data is protected at all times.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Accountability</h2>
              <p>
                We have appointed a Data Protection Officer who oversees all data protection practices. This officer is responsible for creating and implementing an action plan for detecting, reporting, and mitigating data breaches. This ensures that there is clear accountability and responsibility for data privacy within our organization.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Consent and Control</h2>
              <p>
                We always obtain clear and explicit consent from our users before collecting and processing their data. Users have control over their data and can request access, modification, or deletion of their information. We facilitate these processes to ensure that our users have full control over their personal data.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Third-Party Management</h2>
              <p>
                We work with third-party vendors who adhere to the same strict privacy practices as we do. We include data privacy clauses in our agreements with these vendors and conduct regular audits to ensure compliance. This ensures that our entire ecosystem maintains high standards of data privacy and security.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Legal Compliance</h2>
              <p>
                We are fully compliant with all applicable data privacy regulations, including GDPR, CCPA, and HIPAA. We regularly review these regulations and adapt our practices to ensure ongoing compliance. This helps us avoid legal issues and protects our users' data in accordance with the law.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-lg mb-1">Ethical Use of Data</h2>
              <p>
                We are committed to using the data we collect ethically. We ensure that personal data is not used to exploit or influence our users in any unfair way. Our goal is to provide the best possible healthcare services while respecting the privacy and rights of our patients.
              </p>
            </li>
          </ol>
          <Separator className="my-8" />
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-custom">Our Commitment to You</h2>
            <p>
              At Hind Svaasth Seva, we prioritize the privacy and security of your data. By implementing these best practices, we aim to build trust and ensure that your personal information is protected. We are dedicated to providing a secure and user-friendly experience for all our patients.
            </p>
            <p>
              If you have any questions or concerns about our data privacy practices, please do not hesitate to <a href="/contact" className="text-custom underline hover:text-custom/80">contact us</a>. Your trust is our top priority.
            </p>
            <p>
              By following these best practices, we ensure that your data is handled with the utmost care and security. Thank you for choosing Hind Svaasth Seva for your healthcare needs.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
