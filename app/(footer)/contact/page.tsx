import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-white py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contact Hind Svaasth Seva
          </h1>
          <p className="text-lg text-white">
            We are committed to providing you with the best possible healthcare experience.
            <br />
            Whether you have questions, need assistance, or have any other inquiries, our dedicated team is here to help.
          </p>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+918617219004" className="hover:text-black">
                  +91 8617219004
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:hindsvaasthseva@gmail.com" className="hover:text-black">
                  hindsvaasthseva@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Address</h3>
              <p className="text-gray-600">304 K.K.Mazumdar Road,</p>
              <p className="text-gray-600">Kolkata-75</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/doctors">
              <Button variant="outline" className="bg-primary text-white hover:bg-primary hover:text-white">
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
