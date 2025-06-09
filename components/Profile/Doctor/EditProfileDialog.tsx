import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter } from
'@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

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
  timeSlot: {from: string;to: string;};
  languages: string[];
  consultationFee: number;
}

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctorData: DoctorData;
  onUpdate: (data: Partial<DoctorData>) => void;
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
    image: doctorData.image,
    name: doctorData.name,
    education: doctorData.education,
    department: doctorData.department,
    experience: doctorData.experience,
    address: doctorData.address,
    mapLocation: doctorData.mapLocation
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
      image: previewUrl || formData.image
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

                
                {previewUrl || formData.image ?
                <div className="relative w-32 h-32 mx-auto">
                    <img
                    src={previewUrl || formData.image}
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
                  className="border-[#bd1818] text-[#bd1818] hover:bg-[#bd1818] hover:text-white mx-auto">

                  <Upload className="w-4 h-4 mr-2" />
                  {previewUrl || formData.image ? 'Change Picture' : 'Upload Picture'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Supported formats: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Dr. John Smith"
                required />

            </div>

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
              <Label htmlFor="mapLocation">Map Location</Label>
              <Input
                id="mapLocation"
                value={formData.mapLocation}
                onChange={(e) => handleInputChange('mapLocation', e.target.value)}
                placeholder="Delhi"
                required />

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