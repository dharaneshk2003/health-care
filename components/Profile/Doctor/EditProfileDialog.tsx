"use client";
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from
  '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { handleFileUpload } from '../../../app/actions.ts';

interface DoctorData {
  online_id: any;
  image_url: string;
  doctor_name: string;
  education: string;
  rating: number;
  department: string;
  experience: string;
  address: string;
  location: string;
  available_days: string[];
  timeSlot: { available_from_time: string; available_to_time: string; };
  languages: string[];
  consultationFee: number;
  gender: string;
  mobile: string;
}

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctorData: DoctorData;
  onUpdate: (data: Partial<DoctorData>, imageFile?: File | null) => void;
  onShowAdditionalForm: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  doctorData,
  onUpdate,
  onShowAdditionalForm
}) => {
  const [formData, setFormData] = useState({
    online_id: doctorData.online_id,
    image_url: doctorData.image_url,
    doctor_name: doctorData.doctor_name,
    education: doctorData.education,
    department: doctorData.department,
    experience: doctorData.experience,
    address: null,
    location: doctorData.location,
    gender: doctorData.gender,
    mobile: doctorData.mobile,
    role : doctorData.role,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
    'Surgery',
    'Gynecology',
    'Psychiatry',
    'Radiology'];


  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    try {
      const imageUrl = await handleFileUpload(file, formData.online_id, formData.doctor_name,formData.role);
      if (imageUrl) {
        console.log("Uploaded image URL:", imageUrl);
        setFormData((prev) => ({ ...prev, image_url: imageUrl }));
      } else {
        console.log("Image upload failed: No URL returned");
      }
    } catch (err) {
      console.log("Image upload failed with error:", err);
    }
  };


  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If a new file is selected, use the preview URL as the image
    const updatedData = {
      ...formData,
    };

    onUpdate(updatedData);
  };





  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#bd1818]">
            Edit Doctor Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Profile Picture</Label>
              <div className="flex flex-col space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden" />


                {previewUrl || formData.image_url ?
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={previewUrl || formData.image_url}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-200" />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">

                      <X className="w-4 h-4" />
                    </button>
                  </div> :

                  <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image</p>
                    </div>
                  </div>
                }
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-[#bd1818] text-[#bd1818] hover:bg-[#bd1818] hover:text-white w-full mx-auto">

                  <Upload className="w-4 h-4 mr-1" />
                  {previewUrl || formData.image_url ? 'Change Picture' : 'Upload Picture'}
                </Button>


                <p className="text-xs text-gray-500 text-center">
                  Supported formats: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </div>


            {/* Full Name Input */}
            <div className="flex flex-row gap-10">
              {/* Full Name Input takes more space */}
              <div className="space-y-1">
                <Label htmlFor="doctor_name">Full Name</Label>
                <Input
                  id="doctor_name"
                  value={formData.doctor_name}
                  onChange={(e) => handleInputChange('doctor_name', e.target.value)}
                  placeholder="Dr. John Smith"
                  required
                  className="w-max"
                />
              </div>

              {/* Gender Select takes less space */}
              <div className="space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  required
                >
                  <SelectTrigger id="gender" className="w-[150%] mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Input type="hidden" name="online_id" value={doctorData.online_id} />
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="MBBS, MD (Specialization)"
                required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleInputChange('department', value)}>

                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) =>
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="10 years"
                required />

            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Delhi"
                required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="Enter your mobile number"
                required
                className="mt-1"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Hospital address"
                required
                className="min-h-[80px]" />

            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 mt-0.5">
                ℹ️
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Rating Information</h4>
                <p className="text-sm text-yellow-700">
                  Your rating is based on patient reviews and feedback. It cannot be edited manually to maintain authenticity and trust.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onShowAdditionalForm}
              className="border-[#bd1818] text-[#bd1818] hover:bg-[#bd1818] hover:text-white">

              Add More Details
            </Button>
            <Button
              type="submit"
              className="bg-[#bd1818] hover:bg-[#a11616] text-white">

              Update Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>);

};

export default EditProfileDialog;