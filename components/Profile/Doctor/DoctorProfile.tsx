"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, GraduationCap, Briefcase, Calendar, Clock, Languages, DollarSign } from 'lucide-react';
import EditProfileDialog from './EditProfileDialog';
import AdditionalDetailsForm from './AdditionalDetailsForm';

interface DoctorData {
  image: string;
  name: string;
  education: string;
  rating: number;
  department: string;
  experience: string;
  address: string;
  mapLocation: string;
  daysAvailable: string[];
  timeSlot: { from: string; to: string; };
  languages: string[];
  consultationFee: number;
}

const DoctorProfile = ({ doctor }) => {
  let data = doctor?.user_metadata;
  const [doctorData, setDoctorData] = useState<DoctorData>({
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    name: data.name,
    education: data.education,
    rating: 3,
    department: data.department,
    experience: data.experience,
    address: "Enter Hospital Address",
    mapLocation: null,
    daysAvailable: ['Everyday'],
    timeSlot: { from: 'From', to: 'To' },
    languages: ['English'],
    consultationFee: 0
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`
        } />

    );
  };

  const getMapUrl = (location: string) => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`;
  };

  const handleUpdateBasicInfo = (updatedData: Partial<DoctorData>) => {
    setDoctorData((prev) => ({ ...prev, ...updatedData }));
    setIsEditDialogOpen(false);
  };

  const handleUpdateAdditionalInfo = (updatedData: Partial<DoctorData>) => {
    setDoctorData((prev) => ({ ...prev, ...updatedData }));
    setShowAdditionalForm(false);
  };

  return (
    <div className="bg-gray-50 py-8 px-0 w-full">
      <div className="">
        {/* Main Profile Card */}
        <Card className="mb-8 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#bd1818] to-[#d63447] p-6 text-white">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-full h-full object-cover" />

              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{doctorData.name}</h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-lg">{doctorData.education}</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-1 mb-3">
                  {renderStars(doctorData.rating)}
                  <span className="ml-2 text-lg">({doctorData.rating}/5)</span>
                </div>

                <Badge variant="secondary" className="bg-white text-[#bd1818] font-semibold">
                  {doctorData.department}
                </Badge>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold">{doctorData.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">{doctorData.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Consultation Fee</p>
                  <p className="font-semibold">₹{doctorData.consultationFee}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Available Days</p>
                  <p className="font-semibold">{doctorData.daysAvailable.join(', ')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Time Slot</p>
                  <p className="font-semibold">{doctorData.timeSlot.from} - {doctorData.timeSlot.to}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Languages</p>
                  <p className="font-semibold">{doctorData.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-left space-x-6">
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                variant="secondary"
                className="w-full"
              >
                Edit & Register
              </Button>
              <Button
              onClick={()=>console.log("doctor data after editing :",doctorData)}
              className="bg-[#bd1818] hover:bg-[#a11616] text-white font-semibold py-3 text-md w-full"
              >Submit</Button>
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#bd1818]">
              <MapPin className="w-6 h-6" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {doctorData.mapLocation &&
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.563474871569!2d77.20902731508236!3d28.65383698242871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfce26ec085ef%3A0x441e32f4fa5002fb!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1608000000000!5m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Doctor Location" />
              </div>
            }
          </CardContent>
        </Card>

        {/* Edit Dialogs */}
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          doctorData={doctorData}
          onUpdate={handleUpdateBasicInfo}
          onShowAdditionalForm={() => {
            setIsEditDialogOpen(false);
            setShowAdditionalForm(true);
          }} />


        <AdditionalDetailsForm
          isOpen={showAdditionalForm}
          onClose={() => setShowAdditionalForm(false)}
          doctorData={doctorData}
          onUpdate={handleUpdateAdditionalInfo} />

      </div>
    </div>);

};

export default DoctorProfile;