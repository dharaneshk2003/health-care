"use client";
import React, { useState, useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MapboxExample from "../../../pages/MapboxExample"
import StaticMapLink from './StaticMapLink.tsx';
import logo from "../../../components/Images/logo.png";
import Image from "next/image";
import {
  Download,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  User,
  FileText,
  Stethoscope,
  GraduationCap,
  Award,
  CreditCard
} from
  'lucide-react';

interface AppointmentTicketProps {
  doctorDetails: {
    name: string;
    specialty: string;
    experience: string;
    education: string;
    gender: string;
    mobile: string;
    image: string;
  };
  patientDetails: {
    name: string;
    age: number;
    gender: string;
    mobile: string;
    email: string;
    image: string;
    patientId: string;
  };
  appointmentDetails: {
    date: string;
    time: string;
    referralId: string;
    notes: string;
    appointmentType: string;
    consultationFee: number;
    totalFee: number;
  };
  hospitalDetails: {
    name: string;
    address: string;
    location: string;
  };
}

const AppointmentTicket: React.FC<AppointmentTicketProps> = ({
  doctorDetails,
  patientDetails,
  appointmentDetails,
  hospitalDetails
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef(null)
  const [printMode, setPrintMode] = useState(false);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setPrintMode(true); // Optional: set print mode if you use conditional rendering
    setIsGeneratingPDF(true);

    // Wait for UI to update (e.g. printMode changes)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const originalContents = document.body.innerHTML;
    const printContents = printRef.current.innerHTML;

    try {
      document.body.innerHTML = printContents;
      window.print();
    } catch (err) {
      console.error("Print error:", err);
    } finally {
      // Restore original document
      document.body.innerHTML = originalContents;
      setIsGeneratingPDF(false);
      setPrintMode(false);

      // Force React to rehydrate the app (important!)
      window.location.reload();
    }
  };


  return (
    <div className="min-h-screen bg-white p-4" data-id="k4umtk16h" data-path="src/components/AppointmentTicket.tsx">
      <div className="max-w-4xl mx-auto" data-id="nkb6s58o9" data-path="src/components/AppointmentTicket.tsx">
        <div className="mb-6 text-center" data-id="w0c65wji5" data-path="src/components/AppointmentTicket.tsx">
          <h1 className="text-5xl font-bold text-primary mb-2" data-id="pez0mo02w" data-path="src/components/AppointmentTicket.tsx">Appointment Ticket</h1>
          <p className="text-gray-600" data-id="i1x2z188s" data-path="src/components/AppointmentTicket.tsx">Present this ticket during your consultation</p>
        </div>

        <Card ref={printRef} className="shadow-2xl border-0 overflow-hidden w-[790px] bg-white" data-id="hmv4nny57" data-path="src/components/AppointmentTicket.tsx">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#bd1818] to-red-700 text-white p-6" data-id="06y2y8z47" data-path="src/components/AppointmentTicket.tsx">
            <div className="flex justify-between items-start flex-wrap gap-4" data-id="5390j4be8" data-path="src/components/AppointmentTicket.tsx">
              <div className="flex-1 min-w-[200px]" data-id="kshdmd2u9" data-path="src/components/AppointmentTicket.tsx">
                <Image
                  src={logo}
                  alt="Hind Svaasth Seva Logo"
                  className="h-[56px] w-[140px] mb-2 mt-0"
                />
                <div className="flex items-center gap-2 text-red-100 mb-1" data-id="qyrnwpry5" data-path="src/components/AppointmentTicket.tsx">
                  <MapPin className="w-4 h-4" data-id="hmlhorsjv" data-path="src/components/AppointmentTicket.tsx" />
                  <span className="text-sm" data-id="f5ui0geey" data-path="src/components/AppointmentTicket.tsx">{hospitalDetails.address}</span>
                </div>
                <div className="text-sm text-red-100" data-id="8dazv11we" data-path="src/components/AppointmentTicket.tsx">{hospitalDetails.location}</div>
              </div>
              <div className="text-right min-w-[150px]" data-id="xobgmnx90" data-path="src/components/AppointmentTicket.tsx">
                <div className="text-xs text-red-100 mb-1" data-id="dn2skb9ca" data-path="src/components/AppointmentTicket.tsx">Appointment ID</div>
                <div className="text-lg font-bold font-mono" data-id="8qfdqtm76" data-path="src/components/AppointmentTicket.tsx">{appointmentDetails.appointmentId}</div>
              </div>
            </div>
          </div>

          <CardContent className="p-6" data-id="a081d8bes" data-path="src/components/AppointmentTicket.tsx">
            {/* Patient & Doctor Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6" data-id="acot7i2jf" data-path="src/components/AppointmentTicket.tsx">
              {/* Patient Details */}
              <div data-id="pl8tr8gtu" data-path="src/components/AppointmentTicket.tsx">
                <div className="flex items-center gap-3 mb-4" data-id="9ie5mvwz6" data-path="src/components/AppointmentTicket.tsx">
                  <div className="p-2 bg-red-50 rounded-full" data-id="chta8owej" data-path="src/components/AppointmentTicket.tsx">
                    <User className="w-5 h-5 text-[#bd1818]" data-id="72slvf2yq" data-path="src/components/AppointmentTicket.tsx" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800" data-id="wuudp5wft" data-path="src/components/AppointmentTicket.tsx">Patient Details</h3>
                </div>

                <div className="flex items-center gap-4 mb-4" data-id="zuf7vjzl8" data-path="src/components/AppointmentTicket.tsx">
                  {printMode ? (
                    <img
                      src={patientDetails.image}
                      alt={patientDetails.name}
                      className="w-16 h-16 rounded-full border-2 border-[#bd1818]"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <Avatar className="w-16 h-16 border-2 border-[#bd1818]">
                      <AvatarImage src={patientDetails.image} alt={patientDetails.name} />
                      <AvatarFallback className="bg-red-50 text-[#bd1818] font-semibold">
                        {patientDetails.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div data-id="k7yembzcc" data-path="src/components/AppointmentTicket.tsx">
                    <h4 className="font-semibold text-gray-800" data-id="2tf9gepdo" data-path="src/components/AppointmentTicket.tsx">{patientDetails.name}</h4>
                    <Badge variant="outline" className="text-[#bd1818] border-[#bd1818]" data-id="eke1b9bnx" data-path="src/components/AppointmentTicket.tsx">
                      {patientDetails.patientId}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm" data-id="aufs5w6v0" data-path="src/components/AppointmentTicket.tsx">
                  <div className="flex justify-between" data-id="sfx12c3fi" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="mr1t24kke" data-path="src/components/AppointmentTicket.tsx">Age:</span>
                    <span className="font-medium" data-id="l2i34fp7y" data-path="src/components/AppointmentTicket.tsx">{patientDetails.age} years</span>
                  </div>
                  <div className="flex justify-between" data-id="rnpd8k7y6" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="quui972i3" data-path="src/components/AppointmentTicket.tsx">Gender:</span>
                    <span className="font-medium" data-id="0mhs6fhir" data-path="src/components/AppointmentTicket.tsx">{patientDetails.gender}</span>
                  </div>
                  <div className="flex justify-between" data-id="oem13ymo3" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="i47oe2hhg" data-path="src/components/AppointmentTicket.tsx">Mobile:</span>
                    <span className="font-medium flex items-center gap-1" data-id="qfnw6wabp" data-path="src/components/AppointmentTicket.tsx">
                      <Phone className="w-3 h-3" data-id="h0cwcrgpq" data-path="src/components/AppointmentTicket.tsx" />
                      {patientDetails.mobile}
                    </span>
                  </div>
                  <div className="flex justify-between" data-id="n26lktfo1" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="7w1aylr6p" data-path="src/components/AppointmentTicket.tsx">Email:</span>
                    <span className="font-medium flex items-center gap-1 text-xs" data-id="2ldqt0z7f" data-path="src/components/AppointmentTicket.tsx">
                      <Mail className="w-3 h-3" data-id="enzx8oj23" data-path="src/components/AppointmentTicket.tsx" />
                      {patientDetails.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div data-id="nqe9uz5cb" data-path="src/components/AppointmentTicket.tsx">
                <div className="flex items-center gap-3 mb-4" data-id="ajkwjveth" data-path="src/components/AppointmentTicket.tsx">
                  <div className="p-2 bg-green-50 rounded-full" data-id="kbn8k1do8" data-path="src/components/AppointmentTicket.tsx">
                    <Stethoscope className="w-5 h-5 text-green-600" data-id="0qax0tdv3" data-path="src/components/AppointmentTicket.tsx" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800" data-id="w867cew1n" data-path="src/components/AppointmentTicket.tsx">Doctor Details</h3>
                </div>

                <div className="flex items-center gap-4 mb-4" data-id="odf0elrvl" data-path="src/components/AppointmentTicket.tsx">
                  {printMode ? (
                    <img
                      src={doctorDetails.image}
                      alt={doctorDetails.name}
                      className="w-16 h-16 rounded-full border-2 border-green-500"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <Avatar className="w-16 h-16 border-2 border-green-500">
                      <AvatarImage src={doctorDetails.image} alt={doctorDetails.name} />
                      <AvatarFallback className="bg-green-50 text-green-600 font-semibold">
                        Dr
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div data-id="apfz6pihe" data-path="src/components/AppointmentTicket.tsx">
                    <h4 className="font-semibold text-gray-800" data-id="5jydwxdns" data-path="src/components/AppointmentTicket.tsx">Dr. {doctorDetails.name}</h4>
                    <Badge variant="outline" className="text-green-600 border-green-500" data-id="l71nyqbni" data-path="src/components/AppointmentTicket.tsx">
                      {doctorDetails.specialty}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm" data-id="7jvt4fylo" data-path="src/components/AppointmentTicket.tsx">
                  <div className="flex justify-between" data-id="6jx744woe" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="faz4zpni4" data-path="src/components/AppointmentTicket.tsx">Experience:</span>
                    <span className="font-medium flex items-center gap-1" data-id="rbq5n2y4u" data-path="src/components/AppointmentTicket.tsx">
                      <Award className="w-3 h-3" data-id="fs2sy6n9l" data-path="src/components/AppointmentTicket.tsx" />
                      {doctorDetails.experience}
                    </span>
                  </div>
                  <div className="flex justify-between" data-id="lzbjxkbgw" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="cpsppukjd" data-path="src/components/AppointmentTicket.tsx">Education:</span>
                    <span className="font-medium flex items-center gap-1" data-id="cb03goirx" data-path="src/components/AppointmentTicket.tsx">
                      <GraduationCap className="w-3 h-3" data-id="hxqcz2yaj" data-path="src/components/AppointmentTicket.tsx" />
                      {doctorDetails.education}
                    </span>
                  </div>
                  <div className="flex justify-between" data-id="ip36lvggu" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="4mueupvi9" data-path="src/components/AppointmentTicket.tsx">Gender:</span>
                    <span className="font-medium" data-id="db5olefyc" data-path="src/components/AppointmentTicket.tsx">{doctorDetails.gender}</span>
                  </div>
                  <div className="flex justify-between" data-id="22hikf7yy" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="hcl9eyt9w" data-path="src/components/AppointmentTicket.tsx">Mobile:</span>
                    <span className="font-medium flex items-center gap-1" data-id="oq5bivw2l" data-path="src/components/AppointmentTicket.tsx">
                      <Phone className="w-3 h-3" data-id="bcxhg4xsy" data-path="src/components/AppointmentTicket.tsx" />
                      {doctorDetails.mobile}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" data-id="6yu2m4hla" data-path="src/components/AppointmentTicket.tsx" />

            {/* Appointment Details */}
            <div data-id="jc7y9myeq" data-path="src/components/AppointmentTicket.tsx">
              <div className="flex items-center gap-3 mb-4" data-id="i47c6tcpv" data-path="src/components/AppointmentTicket.tsx">
                <div className="p-2 bg-blue-50 rounded-full" data-id="1rtfosfre" data-path="src/components/AppointmentTicket.tsx">
                  <FileText className="w-5 h-5 text-blue-600" data-id="vrj6mbqzo" data-path="src/components/AppointmentTicket.tsx" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800" data-id="hagv75091" data-path="src/components/AppointmentTicket.tsx">Appointment Details</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4" data-id="p7aj8vsci" data-path="src/components/AppointmentTicket.tsx">
                <div className="space-y-3" data-id="twan2ov83" data-path="src/components/AppointmentTicket.tsx">
                  <div className="bg-red-50 p-3 rounded-lg flex justify-between items-center" data-id="hel1x31au" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600 flex items-center gap-2" data-id="b7djeh0bm" data-path="src/components/AppointmentTicket.tsx">
                      <Calendar className="w-4 h-4" data-id="y9rm6secz" data-path="src/components/AppointmentTicket.tsx" />
                      Date:
                    </span>
                    <span className="font-semibold" data-id="gugb88qsa" data-path="src/components/AppointmentTicket.tsx">{appointmentDetails.date}</span>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg flex justify-between items-center" data-id="w97rnopt2" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600 flex items-center gap-2" data-id="rpu2tzlfr" data-path="src/components/AppointmentTicket.tsx">
                      <Clock className="w-4 h-4" data-id="650nvm2lg" data-path="src/components/AppointmentTicket.tsx" />
                      Time:
                    </span>
                    <span className="font-semibold" data-id="18m6sovyz" data-path="src/components/AppointmentTicket.tsx">{appointmentDetails.time}</span>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg flex justify-between items-center" data-id="x3esh47zn" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="8yyb8pfv0" data-path="src/components/AppointmentTicket.tsx">Type:</span>
                    <Badge className="bg-[#bd1818] text-white hover:bg-red-700" data-id="sujvau0qi" data-path="src/components/AppointmentTicket.tsx">
                      {appointmentDetails.appointmentType}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3" data-id="04awh8jih" data-path="src/components/AppointmentTicket.tsx">
                  {!printMode && (
                    <div className="bg-green-50 p-3 rounded-lg flex justify-between items-center" data-id="ks8wlw0i7" data-path="src/components/AppointmentTicket.tsx">
                      <span className="text-gray-600 flex items-center gap-2" data-id="nx3njh8m9" data-path="src/components/AppointmentTicket.tsx">
                        <CreditCard className="w-4 h-4" data-id="z65fx71li" data-path="src/components/AppointmentTicket.tsx" />
                        Consultation Fee:
                      </span>
                      <span className="font-semibold" data-id="r6vm619at" data-path="src/components/AppointmentTicket.tsx">{formatCurrency(appointmentDetails.consultationFee)}</span>
                    </div>
                  )}
                  <div className="bg-green-50 p-3 rounded-lg flex justify-between items-center" data-id="q0zrbxosm" data-path="src/components/AppointmentTicket.tsx">
                    <span className="text-gray-600" data-id="hajddtbxz" data-path="src/components/AppointmentTicket.tsx">Total Fee:</span>
                    <span className="font-bold text-lg text-green-600" data-id="nmkrzw8xu" data-path="src/components/AppointmentTicket.tsx">
                      {formatCurrency(appointmentDetails.totalFee)}
                    </span>
                  </div>
                  {!printMode && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg" data-id="vbv5n4oo5" data-path="src/components/AppointmentTicket.tsx">
                      <div className="flex items-center text-sm space-x-2">
                        <span className="text-gray-600">Referral ID:</span>
                        <span className="font-mono font-semibold text-yellow-700">{appointmentDetails.referralId}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {appointmentDetails.notes && !printMode && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">Reason :</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {appointmentDetails.notes}
                  </p>
                </div>
              )}
              {/* Location Map - Added below notes */}
              <div className="mt-3" id="mapContainer">
                {printMode ? (
                  <>
                  <br />
                    <div className="space-y-6 mt-6">
                      {/* Reason Block */}
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2">Reason :</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {appointmentDetails.notes}
                        </p>
                      </div>

                      {/* Referral ID Block */}
                      <div
                        className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg"
                        data-id="vbv5n4oo5"
                        data-path="src/components/AppointmentTicket.tsx"
                      >
                        <div className="flex items-center text-sm space-x-2">
                          <span className="text-gray-600">Referral ID:</span>
                          <span className="font-mono font-semibold text-yellow-700">
                            {appointmentDetails.referralId}
                          </span>
                        </div>
                      </div>

                      {/* Hospital Location Block */}
                      <div>
                        <h1 className="text-2xl font-bold mb-4 text-[#bd1818]">Hospital Location</h1>
                        <StaticMapLink location={hospitalDetails.location} />
                      </div>
                    </div>
                  </>
                ) : (
                  <MapboxExample location={hospitalDetails.location} height="400px" width="700px" />
                )}
              </div>
            </div>

            <Separator className="my-6" data-id="jtbxl19r0" data-path="src/components/AppointmentTicket.tsx" />

            {/* Footer */}
            <div className="text-center text-sm text-gray-500" data-id="ephrc6puy" data-path="src/components/AppointmentTicket.tsx">
              <p className="mb-1" data-id="x3hgft5up" data-path="src/components/AppointmentTicket.tsx">Please arrive 15 minutes before your scheduled appointment time.</p>
              <p data-id="8wttwthur" data-path="src/components/AppointmentTicket.tsx">Bring a valid ID and this appointment ticket for verification.</p>
            </div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="mt-6 text-center" data-id="41wi0z7bw" data-path="src/components/AppointmentTicket.tsx">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            size="lg"
            className="bg-gradient-to-r from-[#bd1818] to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGeneratingPDF ? 'Preparing Print View...' : 'Print Ticket'}
          </Button>
        </div>
      </div>
    </div>);

};

export default AppointmentTicket;