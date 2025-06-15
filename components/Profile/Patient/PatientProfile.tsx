"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  Calendar,
  UserCircle,
  Edit3,
  IdCard } from
'lucide-react';
import EditPatientDialog from './EditPatientDialog';

export interface Patient {
  role : string;
  online_id: string;
  patient_name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  image_url: string;
  user_id:any // Can be URL or base64
}

interface PatientProfileProps {
  patientDetails?: Patient;
}

const PatientProfile = ({ patientDetails,existingData }) => {
  const defaultPatient: Patient = {
    role: patientDetails.role,
    user_id : patientDetails.sub,
    online_id: existingData?.online_id || null,
    patient_name: existingData?.patient_name || patientDetails.name,
    email: existingData?.email || patientDetails.email,
    age: existingData?.age || patientDetails.age,
    gender: existingData?.gender || patientDetails.gender,
    mobile: existingData?.mobile || patientDetails.mobile ,
    image_url: existingData?.image_url ||
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  };

  const [patient, setPatient] = useState<Patient>(defaultPatient);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSavePatient = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
    setIsEditDialogOpen(false);
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'bg-blue-100 text-blue-800';
      case 'female':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" data-id="p06mqp2m1" data-path="src/components/PatientProfile.tsx">
      <div className="max-w-4xl mx-auto" data-id="gq411e7bl" data-path="src/components/PatientProfile.tsx">
        <div className="text-center mb-8" data-id="vzmi6w79o" data-path="src/components/PatientProfile.tsx">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-id="ek9c43mw5" data-path="src/components/PatientProfile.tsx">
            Patient Profile
          </h1>
          <p className="text-gray-600" data-id="bn119ujv9" data-path="src/components/PatientProfile.tsx">Manage and view patient information</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm" data-id="4f6cpenwd" data-path="src/components/PatientProfile.tsx">
          <CardHeader className="text-center pb-6" data-id="ijckn7f70" data-path="src/components/PatientProfile.tsx">
            <div className="flex flex-col items-center space-y-4" data-id="agdeisl2m" data-path="src/components/PatientProfile.tsx">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-white shadow-lg" data-id="j3eyoc8mp" data-path="src/components/PatientProfile.tsx">
                <AvatarImage
                  src={patient.image_url}
                  alt={patient.patient_name}
                  className="object-cover" data-id="qsd6xkea5" data-path="src/components/PatientProfile.tsx" />

                <AvatarFallback
                  className="text-2xl font-bold text-white"
                  style={{ backgroundColor: '#bd1818' }} data-id="ryiq23vmu" data-path="src/components/PatientProfile.tsx">

                  {getInitials(patient.patient_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2" data-id="k1pvjror3" data-path="src/components/PatientProfile.tsx">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900" data-id="nxjtbv5xt" data-path="src/components/PatientProfile.tsx">
                  {patient.patient_name}
                </CardTitle>
                <div className="flex items-center justify-center space-x-2" data-id="96u49tray" data-path="src/components/PatientProfile.tsx">
                  <IdCard className="w-4 h-4 text-gray-500" data-id="x7v2tzmpu" data-path="src/components/PatientProfile.tsx" />
                  <span className="text-gray-600 font-mono text-sm" data-id="isnyqedgc" data-path="src/components/PatientProfile.tsx">
                    {patient.online_id || "Generate ID By clicking below Button"}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setIsEditDialogOpen(true)}
                className="mt-4 px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#bd1818' }} data-id="qwxiojvw7" data-path="src/components/PatientProfile.tsx">

                <Edit3 className="w-4 h-4 mr-2" data-id="q0ebnstbq" data-path="src/components/PatientProfile.tsx" />
                Edit and Update Details
              </Button>
            </div>
          </CardHeader>

          <Separator className="mx-6" data-id="wjz3hfcgx" data-path="src/components/PatientProfile.tsx" />

          <CardContent className="pt-6" data-id="c02hkq1oc" data-path="src/components/PatientProfile.tsx">
            <div className="grid gap-6 md:grid-cols-2" data-id="vw0ky7qg3" data-path="src/components/PatientProfile.tsx">
              {/* Personal Information */}
              <div className="space-y-6" data-id="oc2renekm" data-path="src/components/PatientProfile.tsx">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center" data-id="sqc07ttvg" data-path="src/components/PatientProfile.tsx">
                  <User className="w-5 h-5 mr-2" style={{ color: '#bd1818' }} data-id="w5777srbs" data-path="src/components/PatientProfile.tsx" />
                  Personal Information
                </h3>
                
                <div className="space-y-4" data-id="av9oeow9r" data-path="src/components/PatientProfile.tsx">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" data-id="teck42edr" data-path="src/components/PatientProfile.tsx">
                    <Calendar className="w-5 h-5 text-gray-500" data-id="62n3c5r13" data-path="src/components/PatientProfile.tsx" />
                    <div data-id="hl6nned9f" data-path="src/components/PatientProfile.tsx">
                      <p className="text-sm text-gray-500" data-id="02a1srg66" data-path="src/components/PatientProfile.tsx">Age</p>
                      <p className="font-medium text-gray-900" data-id="lwe6ebsx8" data-path="src/components/PatientProfile.tsx">{patient.age} years old</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" data-id="i6kmff9xl" data-path="src/components/PatientProfile.tsx">
                    <UserCircle className="w-5 h-5 text-gray-500" data-id="05acy8osx" data-path="src/components/PatientProfile.tsx" />
                    <div className="flex-1" data-id="xu2w6vdcn" data-path="src/components/PatientProfile.tsx">
                      <p className="text-sm text-gray-500" data-id="ru55whl4b" data-path="src/components/PatientProfile.tsx">Gender</p>
                      <Badge className={`mt-1 ${getGenderColor(patient.gender)} capitalize`} data-id="5vqhx89sx" data-path="src/components/PatientProfile.tsx">
                        {patient.gender}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6" data-id="8r40rscdp" data-path="src/components/PatientProfile.tsx">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center" data-id="tm8k3r2nm" data-path="src/components/PatientProfile.tsx">
                  <Mail className="w-5 h-5 mr-2" style={{ color: '#bd1818' }} data-id="s2upfc8af" data-path="src/components/PatientProfile.tsx" />
                  Contact Information
                </h3>
                
                <div className="space-y-4" data-id="jpnmueq6k" data-path="src/components/PatientProfile.tsx">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" data-id="nl33bfhq0" data-path="src/components/PatientProfile.tsx">
                    <Mail className="w-5 h-5 text-gray-500" data-id="ti5tdxya0" data-path="src/components/PatientProfile.tsx" />
                    <div className="flex-1 min-w-0" data-id="6mq50t5gl" data-path="src/components/PatientProfile.tsx">
                      <p className="text-sm text-gray-500" data-id="erttpgv4f" data-path="src/components/PatientProfile.tsx">Email</p>
                      <p className="font-medium text-gray-900 truncate" data-id="6rtbol0dl" data-path="src/components/PatientProfile.tsx">{patient.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" data-id="y72ef1ocw" data-path="src/components/PatientProfile.tsx">
                    <Phone className="w-5 h-5 text-gray-500" data-id="ejm0pfl3o" data-path="src/components/PatientProfile.tsx" />
                    <div data-id="jzvyi1ase" data-path="src/components/PatientProfile.tsx">
                      <p className="text-sm text-gray-500" data-id="r7vj56zyv" data-path="src/components/PatientProfile.tsx">Mobile Number</p>
                      <p className="font-medium text-gray-900" data-id="egwhg7a9x" data-path="src/components/PatientProfile.tsx">{patient.mobile}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg" data-id="p470wkp2m" data-path="src/components/PatientProfile.tsx">
              <div className="flex items-center justify-between" data-id="jzvkj9jbw" data-path="src/components/PatientProfile.tsx">
                <div data-id="b5m4cb2ol" data-path="src/components/PatientProfile.tsx">
                  <h4 className="font-medium text-gray-900" data-id="epqinw5ir" data-path="src/components/PatientProfile.tsx">Profile Status</h4>
                  <p className="text-sm text-gray-600" data-id="trhn7v327" data-path="src/components/PatientProfile.tsx">All information is up to date</p>
                </div>
                <Badge
                  className="bg-green-100 text-green-800 border-green-200" data-id="lrt3qoz7s" data-path="src/components/PatientProfile.tsx">

                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <EditPatientDialog
          patient={patient}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSavePatient} data-id="i40jqg0zi" data-path="src/components/PatientProfile.tsx" />

      </div>
    </div>);

};

export default PatientProfile;
