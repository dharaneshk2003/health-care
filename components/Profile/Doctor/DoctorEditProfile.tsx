"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, GraduationCap, Briefcase, Calendar, Clock, Languages, DollarSign,SquareUser } from 'lucide-react';
import EditProfileDialog from './EditProfileDialog';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import { handleFileUpload, addDoctor } from '../../../app/actions.ts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface DoctorData {
  image_url: string;
  doctor_name: string;
  education: string;
  rating: number;
  department: string;
  experience: string;
  address: string;
  location: string;
  available_days: string[];
  available_from_time: string;
  available_to_time: string;
  languages: string[];
  consultation_fees: number;
}

const DoctorEditProfile = ({ doctor, existingData }) => {
  let data = doctor?.user_metadata;
  const [doctorData, setDoctorData] = useState<DoctorData>({
    online_id: doctor.id,
    image_url: existingData?.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    doctor_name: existingData?.doctor_name || data.name,
    education: existingData?.education || data.education,
    rating: 3,
    role: doctor.user_metadata.role,
    department: existingData?.department || data.department,
    experience: existingData?.experience || data.experience,
    address: existingData?.address || "Address",
    location: existingData?.location || null,
    available_days: existingData?.available_days || ['Everyday'],
    available_from_time: existingData?.available_from_time || 'From', available_to_time: existingData?.available_to_time || 'To',
    languages: existingData?.languages || ['English'],
    consultation_fees: existingData?.consultation_fees || 0,
    gender: existingData?.gender || data.gender,
    mobile: existingData?.mobile || data.mobile
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`
        } />

    );
  };


  const handleUpdateBasicInfo = (updatedData: Partial<DoctorData>) => {
    setDoctorData((prev) => ({
      ...prev,
      ...updatedData,
      image_url: updatedData.image_url || prev.image_url, // ✅ ensure Supabase URL is used
    }));
    setIsEditDialogOpen(false);
  };


  const handleUpdateAdditionalInfo = (updatedData: Partial<DoctorData>) => {
    setDoctorData((prev) => ({ ...prev, ...updatedData }));
    setShowAdditionalForm(false);
  };


  const buildDoctorPayload = async (e) => {
    e.preventDefault();
    let output = {
      online_id: doctorData.online_id,
      doctor_name: doctorData.doctor_name,
      education: doctorData.education,
      department: doctorData.department,
      experience: doctorData.experience,
      address: doctorData.address,
      location: doctorData.location,
      available_days: doctorData.available_days,
      available_from_time: doctorData.available_from_time,
      available_to_time: doctorData.available_to_time,
      languages: doctorData.languages,
      consultation_fees: doctorData.consultation_fees,
      ratings: doctorData.rating,
      image_url: doctorData.image_url,
      mobile: doctorData.mobile,
      gender: doctorData.gender, // ✅ now a valid Supabase Storage URL
    };
    console.log(doctorData?.role);
    try {
      const result = await addDoctor(output);
      if (result.success) {
        console.log("✅ Doctor inserted successfully:", result.data);
        window.location.reload();
      } else {
        console.error("❌ Error inserting doctor:", result.error);
      }
    } catch (err) {
      console.error("❌ Unexpected error while inserting doctor:", err);
    }
  };

  return (
    <div className="bg-white px-0 w-full">
      <div className="">
        {/* Main Profile Card */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6 mt-2">
          Doctor Profile
        </h1>
        <Card className="mb-8 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#bd1818] to-[#d63447] p-6 text-white">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={doctorData.image_url}
                  alt={doctorData.doctor_name}
                  className="w-full h-full object-cover" />

              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{doctorData.doctor_name}</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                <SquareUser className="w-5 h-5 text-[#bd1818]" />
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold">{doctorData.gender=="male"? "Male":(doctorData.gender=="female" ? "Female" : "Others")}</p>
                </div>
              </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[#bd1818]" />
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="font-semibold">₹{doctorData.consultation_fees}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#bd1818]" />
                  <div>
                    <p className="text-sm text-gray-600">Available Days</p>
                    <p className="font-semibold">{doctorData.available_days.join(', ')}</p>
                  </div>
                </div>

              <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#bd1818]" />
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-semibold">+91 {doctorData.mobile}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#bd1818]" />
                  <div>
                    <p className="text-sm text-gray-600">Time Slot</p>
                    <p className="font-semibold">{doctorData.available_from_time} - {doctorData.available_to_time}</p>
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
              <Drawer>
                <DrawerTrigger className="ml-[30%] bg-primary text-white py-2 px-3 rounded-md font-bold">Click to Edit and Apply</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle><div className="text-2xl md:text-xl font-bold text-primary">
                      Doctor Registration for Consultatiom
                    </div></DrawerTitle>
                    <DrawerDescription>Edit your details for interacting with Patients</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <div className="flex justify-center space-x-6">
                      <Button
                        onClick={() => setIsEditDialogOpen(true)}
                        variant="secondary"
                      >
                        Edit Details
                      </Button>
                      <DrawerClose>
                        <Button
                          onClick={buildDoctorPayload}
                          className="bg-[#bd1818] hover:bg-[#a11616] text-white font-semibold py-3 text-md"
                        >
                          Add for Consultation
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

          </CardContent>
        </Card>
        {/* Edit Dialogs */}
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          doctorData={doctorData}
          onUpdate={(data, imageFile) => handleUpdateBasicInfo(data, imageFile)} // ✅ pass file too
          onShowAdditionalForm={() => {
            setIsEditDialogOpen(false);
            setShowAdditionalForm(true);
          }}
        />

        <AdditionalDetailsForm
          isOpen={showAdditionalForm}
          onClose={() => setShowAdditionalForm(false)}
          doctorData={doctorData}
          onUpdate={handleUpdateAdditionalInfo} />

      </div>
    </div>);

};

export default DoctorEditProfile;