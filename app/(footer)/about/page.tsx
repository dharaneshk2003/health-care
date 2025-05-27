import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Badge variant="default" className="mb-4">
            Your time is ticking…
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Hind Svaasth Seva
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Your go-to healthcare marketplace, where top healthcare institutions and diagnostic centers are just a click away.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-white">Convenience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Book appointments and schedule tests from home. No more waiting in line.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-white">Zero Extra Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Book your slots without paying an extra penny. Your health is valuable, and so is your money.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-white">Seamless Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receive a booking ID via email. Visit the reception, get verified, and proceed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Commitment */}
        <Card className="mb-12 border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-white">Our Commitment to You</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong className="text-white">Accuracy:</strong> Every detail is double-checked for accuracy.
              </li>
              <li>
                <strong className="text-white">Security:</strong> Your data is protected with state-of-the-art security.
              </li>
              <li>
                <strong className='text-white'>Cobranding:</strong> Certified healthcare centers are cobranded for transparency and reliability.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Join Us */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Join the Hind Svaasth Seva Family
          </h2>
          <p className="text-black mb-6">
            Ready to make healthcare simpler and more accessible? Join us on this journey to better health.
          </p>
          <Link href="/doctors">
            <Button className="bg-primary hover:bg-primary">
              Book Your Appointment Today
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
