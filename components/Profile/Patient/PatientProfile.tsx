import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  User,
  Calendar,
  Shield,
  Edit,
  CheckCircle,
  XCircle } from
'lucide-react';

interface PatientData {
  age?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  mobile?: string;
  name?: string;
  phone_verified?: boolean;
  role?: string;
  sub?: string;
}

interface PatientProfileProps {
  patient: PatientData;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  // Provide default values if patient data is not available
  const patientData: PatientData = {
    age: patient?.age || 'N/A',
    email: patient?.email || 'No email provided',
    email_verified: patient?.email_verified || false,
    gender: patient?.gender || 'N/A',
    mobile: patient?.mobile || 'No mobile provided',
    name: patient?.name || 'Unknown Patient',
    phone_verified: patient?.phone_verified || false,
    role: patient?.role || 'patient',
    sub: patient?.sub || 'N/A'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4" data-id="5fjjndx0z" data-path="src/components/PatientProfile.tsx">
      <div className="max-w-4xl mx-auto" data-id="hz2kuv2sl" data-path="src/components/PatientProfile.tsx">
        {/* Header */}
        <div className="mb-8" data-id="jp7n8qeb9" data-path="src/components/PatientProfile.tsx">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-id="3vz0dstg4" data-path="src/components/PatientProfile.tsx">Patient Profile</h1>
          <p className="text-gray-600" data-id="bxa5uhhpj" data-path="src/components/PatientProfile.tsx">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 gap-6" data-id="ol3c53cug" data-path="src/components/PatientProfile.tsx">
          {/* Profile Overview Card */}
          <div className="" data-id="3acwzs5vx" data-path="src/components/PatientProfile.tsx">
            <Card className="border-0 shadow-lg" data-id="5q9tmm5wv" data-path="src/components/PatientProfile.tsx">
              <CardHeader className="text-center pb-2" data-id="62uhie7x0" data-path="src/components/PatientProfile.tsx">
                <div className="flex justify-center mb-4" data-id="f8ybb301z" data-path="src/components/PatientProfile.tsx">
                  <Avatar className="w-24 h-24" data-id="0fcthzt1t" data-path="src/components/PatientProfile.tsx">
                    <AvatarImage src="https://media.gettyimages.com/id/1777940832/vector/healthcare-concept-vector-illustration-stethoscope-doctors-illness-patients.jpg?s=612x612&w=0&k=20&c=xMq7jzLoyR9anba0KBLphv9i4uX3HK4zPkIwYkgG57Y=" alt="Patient" />
                    <AvatarFallback
                      className="text-2xl font-bold text-white"
                      style={{ backgroundColor: '#bd1818' }} data-id="kuv3r74p6" data-path="src/components/PatientProfile.tsx">
                      {getInitials(patientData.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl text-gray-900" data-id="6t7vz2qt0" data-path="src/components/PatientProfile.tsx">
                  {patientData.name}
                </CardTitle>
                <div className="flex justify-center mt-2" data-id="st9a9rhbm" data-path="src/components/PatientProfile.tsx">
                  <Badge
                    variant="secondary"
                    className="capitalize"
                    style={{ backgroundColor: '#bd1818', color: 'white' }} data-id="0gbwvcyd6" data-path="src/components/PatientProfile.tsx">
                    <Shield className="w-3 h-3 mr-1" data-id="vra6ekmal" data-path="src/components/PatientProfile.tsx" />
                    {patientData.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center" data-id="yx7aicdqh" data-path="src/components/PatientProfile.tsx">
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Cards */}
          <div className="lg:col-span-2 space-y-6" data-id="glm8yy4op" data-path="src/components/PatientProfile.tsx">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg" data-id="ynl7lk3kh" data-path="src/components/PatientProfile.tsx">
              <CardHeader data-id="arbfpoggz" data-path="src/components/PatientProfile.tsx">
                <CardTitle className="flex items-center text-lg" data-id="1kbxha7pn" data-path="src/components/PatientProfile.tsx">
                  <User className="w-5 h-5 mr-2" style={{ color: '#bd1818' }} data-id="7lxlayu3h" data-path="src/components/PatientProfile.tsx" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="q1tcqfxa2" data-path="src/components/PatientProfile.tsx">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="evpvgekag" data-path="src/components/PatientProfile.tsx">
                  <div className="space-y-2" data-id="uoajzgrq6" data-path="src/components/PatientProfile.tsx">
                    <label className="text-sm font-medium text-gray-600" data-id="fhmzaeodx" data-path="src/components/PatientProfile.tsx">Full Name</label>
                    <p className="text-gray-900 font-medium" data-id="qcx7h8px1" data-path="src/components/PatientProfile.tsx">{patientData.name}</p>
                  </div>
                  <div className="space-y-2" data-id="1hjh1c39e" data-path="src/components/PatientProfile.tsx">
                    <label className="text-sm font-medium text-gray-600" data-id="vsrjefkcs" data-path="src/components/PatientProfile.tsx">Age</label>
                    <p className="text-gray-900 font-medium" data-id="1z34w1tpd" data-path="src/components/PatientProfile.tsx">{patientData.age} {patientData.age !== 'N/A' ? 'years' : ''}</p>
                  </div>
                  <div className="space-y-2" data-id="ww0mx0609" data-path="src/components/PatientProfile.tsx">
                    <label className="text-sm font-medium text-gray-600" data-id="jc3yer5wh" data-path="src/components/PatientProfile.tsx">Gender</label>
                    <p className="text-gray-900 font-medium capitalize" data-id="dm37ksu4s" data-path="src/components/PatientProfile.tsx">{patientData.gender}</p>
                  </div>
                  <div className="space-y-2" data-id="061ktdnlu" data-path="src/components/PatientProfile.tsx">
                    <label className="text-sm font-medium text-gray-600" data-id="hcs2og9c5" data-path="src/components/PatientProfile.tsx">Patient ID</label>
                    <p className="text-gray-500 text-sm font-mono" data-id="98vgf188q" data-path="src/components/PatientProfile.tsx">
                      {patientData.sub !== 'N/A' ? `${patientData.sub}` : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg" data-id="gs58oyea7" data-path="src/components/PatientProfile.tsx">
              <CardHeader data-id="5fpedq75n" data-path="src/components/PatientProfile.tsx">
                <CardTitle className="flex items-center text-lg" data-id="o3sd2dfjx" data-path="src/components/PatientProfile.tsx">
                  <Mail className="w-5 h-5 mr-2" style={{ color: '#bd1818' }} data-id="r7g4ch733" data-path="src/components/PatientProfile.tsx" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="nvh6obfas" data-path="src/components/PatientProfile.tsx">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" data-id="b64nmuylg" data-path="src/components/PatientProfile.tsx">
                  <div className="flex items-center space-x-3" data-id="fzfnnb6zz" data-path="src/components/PatientProfile.tsx">
                    <Mail className="w-5 h-5 text-gray-600" data-id="42sjzy43v" data-path="src/components/PatientProfile.tsx" />
                    <div data-id="wbyip5ceb" data-path="src/components/PatientProfile.tsx">
                      <p className="font-medium text-gray-900" data-id="sl6lfbndh" data-path="src/components/PatientProfile.tsx">{patientData.email}</p>
                      <p className="text-sm text-gray-600" data-id="debt4dje2" data-path="src/components/PatientProfile.tsx">Email Address</p>
                    </div>
                  </div>
                </div>

                <Separator data-id="xs02rknqa" data-path="src/components/PatientProfile.tsx" />

                {/* Phone */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" data-id="oipqhpxj4" data-path="src/components/PatientProfile.tsx">
                  <div className="flex items-center space-x-3" data-id="dapwrbizg" data-path="src/components/PatientProfile.tsx">
                    <Phone className="w-5 h-5 text-gray-600" data-id="jz51hijl9" data-path="src/components/PatientProfile.tsx" />
                    <div data-id="f7xwhmbsy" data-path="src/components/PatientProfile.tsx">
                      <p className="font-medium text-gray-900" data-id="snk1363w9" data-path="src/components/PatientProfile.tsx">
                        {patientData.mobile !== 'No mobile provided' ? `+91 ${patientData.mobile}` : patientData.mobile}
                      </p>
                      <p className="text-sm text-gray-600" data-id="zufuxydkg" data-path="src/components/PatientProfile.tsx">Mobile Number</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
          </div>
        </div>
      </div>
    </div>);

};

export default PatientProfile;