"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from
  '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addPatient } from '../../../app/actions.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from
  '@/components/ui/select';
import { Patient } from '@/types/patient';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

interface EditPatientDialogProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
}

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({
  patient,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Patient>(patient);
  const [errors, setErrors] = useState<Partial<Record<keyof Patient, string>>>({});
  const { toast } = useToast();

  const generatePatientId = (): string => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return `PON-${randomNumber}`;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Patient, string>> = {};

    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.age || formData.age < 1 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age (1-150)';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Patient image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleGenerateId = () => {
    const newId = generatePatientId();
    setFormData({ ...formData, online_id: newId });
    toast({
      title: "ID Generated",
      description: `New Patient ID: ${newId}`
    });
  };

  const handleInputChange = (field: keyof Patient, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleImageChange = (file: File | null, base64: string) => {
    setFormData({ ...formData, image_url: base64 });
    // Clear error when image is uploaded
    if (errors.image_url) {
      setErrors({ ...errors, image_url: undefined });
    }
  };



  const handleSave = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      let output = {
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        patient_name: formData.patient_name,
        mobile: formData.mobile,
        image_url: formData.image_url,
        online_id: formData.online_id,
        user_id: formData.user_id
      };

      try {
        const result = await addPatient(output);
        if (result.success) {
          console.log("✅ patient inserted successfully:", result.data);
          window.location.reload();
        } else {
          console.error("❌ Error inserting patient:", result.error);
        }
      } catch (err) {
        console.error("❌ Unexpected error while inserting patient:", err);
      }
      toast({
        title: "Success",
        description: "Patient details updated successfully!"
      });
      onClose();
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="zcqualxpw" data-path="src/components/EditPatientDialog.tsx">
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto" data-id="a84nm66a8" data-path="src/components/EditPatientDialog.tsx">
        <DialogHeader data-id="3pjgj698j" data-path="src/components/EditPatientDialog.tsx">
          <DialogTitle style={{ color: '#bd1818' }} data-id="lrjwwc2wv" data-path="src/components/EditPatientDialog.tsx">Edit Patient Details</DialogTitle>
          <DialogDescription data-id="tmhd66ip4" data-path="src/components/EditPatientDialog.tsx">
            Update the patient information below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4" data-id="1t7skyqz2" data-path="src/components/EditPatientDialog.tsx">
          {/* Patient ID */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="0t1x1fmij" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="online_id" className="text-right font-medium" data-id="wig0npxfn" data-path="src/components/EditPatientDialog.tsx">
              Patient ID
            </Label>
            <div className="col-span-3 flex gap-2" data-id="nopiabp38" data-path="src/components/EditPatientDialog.tsx">
              <Input
                id="online_id"
                value={formData.online_id}
                placeholder="PON-923473"
                className="flex-1"
                readOnly
                style={{ borderColor: '#bd1818' }} data-id="kffvzlrk3" data-path="src/components/EditPatientDialog.tsx" />

              <Button
                type="button"
                onClick={handleGenerateId}
                disabled={!!formData.online_id} // disables if ID already exists
                style={{ backgroundColor: '#bd1818' }}
                className="hover:opacity-90"
              >
                Generate ID
              </Button>
            </div>
          </div>

          {/* Patient Image Upload */}
          <div className="grid grid-cols-4 items-start gap-4" data-id="wnf2u8et3" data-path="src/components/EditPatientDialog.tsx">
            <Label className="text-right font-medium mt-2" data-id="lv0bhcz3x" data-path="src/components/EditPatientDialog.tsx">
              Patient Image *
            </Label>
            <div className="col-span-3" data-id="mhuudinyt" data-path="src/components/EditPatientDialog.tsx">
              <ImageUpload
                value={formData.image_url}
                onChange={(uploadedUrl) => setFormData(prev => ({ ...prev, image_url: uploadedUrl }))}
                error={errors.image_url}
                user_id={formData.user_id}
                patient_name={formData.patient_name}
                role="patient"
              />

              {errors.image_url && <span className="text-red-500 text-sm" data-id="oji8ptsju" data-path="src/components/EditPatientDialog.tsx">{errors.image_url}</span>}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="a0u4cidpw" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="patient_name" className="text-right font-medium" data-id="dd754gxr8" data-path="src/components/EditPatientDialog.tsx">
              Name *
            </Label>
            <div className="col-span-3" data-id="p4i49s254" data-path="src/components/EditPatientDialog.tsx">
              <Input
                id="patient_name"
                value={formData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                className={errors.patient_name ? 'border-red-500' : ''}
                style={{ borderColor: errors.patient_name ? '#ef4444' : '#bd1818' }} data-id="odmqwrmak" data-path="src/components/EditPatientDialog.tsx" />

              {errors.patient_name && <span className="text-red-500 text-sm" data-id="6un2yjc4f" data-path="src/components/EditPatientDialog.tsx">{errors.patient_name}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="nqyqrnkgd" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="email" className="text-right font-medium" data-id="dkouxdo41" data-path="src/components/EditPatientDialog.tsx">
              Email *
            </Label>
            <div className="col-span-3" data-id="w21ixi1r2" data-path="src/components/EditPatientDialog.tsx">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                style={{ borderColor: errors.email ? '#ef4444' : '#bd1818' }} data-id="lbjicqzp6" data-path="src/components/EditPatientDialog.tsx" />

              {errors.email && <span className="text-red-500 text-sm" data-id="icn52m36d" data-path="src/components/EditPatientDialog.tsx">{errors.email}</span>}
            </div>
          </div>

          {/* Age */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="tasdro58k" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="age" className="text-right font-medium" data-id="qfshg2gbh" data-path="src/components/EditPatientDialog.tsx">
              Age *
            </Label>
            <div className="col-span-3" data-id="lmuluxl8t" data-path="src/components/EditPatientDialog.tsx">
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                min="1"
                max="150"
                className={errors.age ? 'border-red-500' : ''}
                style={{ borderColor: errors.age ? '#ef4444' : '#bd1818' }} data-id="d99giwihj" data-path="src/components/EditPatientDialog.tsx" />

              {errors.age && <span className="text-red-500 text-sm" data-id="68ot0oacc" data-path="src/components/EditPatientDialog.tsx">{errors.age}</span>}
            </div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="0pd0yqxt6" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="gender" className="text-right font-medium" data-id="z2tl2cb3n" data-path="src/components/EditPatientDialog.tsx">
              Gender *
            </Label>
            <div className="col-span-3" data-id="ugzj4iy19" data-path="src/components/EditPatientDialog.tsx">
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)} data-id="pw0d9krtj" data-path="src/components/EditPatientDialog.tsx">

                <SelectTrigger style={{ borderColor: '#bd1818' }} data-id="ns5gthisi" data-path="src/components/EditPatientDialog.tsx">
                  <SelectValue placeholder="Select gender" data-id="kc6pk4cxl" data-path="src/components/EditPatientDialog.tsx" />
                </SelectTrigger>
                <SelectContent data-id="mbodhl13i" data-path="src/components/EditPatientDialog.tsx">
                  <SelectItem value="male" data-id="u4tx3i322" data-path="src/components/EditPatientDialog.tsx">Male</SelectItem>
                  <SelectItem value="female" data-id="16o8ml8vn" data-path="src/components/EditPatientDialog.tsx">Female</SelectItem>
                  <SelectItem value="other" data-id="gymhs5hva" data-path="src/components/EditPatientDialog.tsx">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="grid grid-cols-4 items-center gap-4" data-id="m8w1s47qu" data-path="src/components/EditPatientDialog.tsx">
            <Label htmlFor="mobile" className="text-right font-medium" data-id="adi1p030o" data-path="src/components/EditPatientDialog.tsx">
              Mobile *
            </Label>
            <div className="col-span-3" data-id="g6gj4jclr" data-path="src/components/EditPatientDialog.tsx">
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={errors.mobile ? 'border-red-500' : ''}
                style={{ borderColor: errors.mobile ? '#ef4444' : '#bd1818' }} data-id="gsxmpkenj" data-path="src/components/EditPatientDialog.tsx" />

              {errors.mobile && <span className="text-red-500 text-sm" data-id="cgp3cg107" data-path="src/components/EditPatientDialog.tsx">{errors.mobile}</span>}
            </div>
          </div>
        </div>

        <DialogFooter data-id="ccms85ama" data-path="src/components/EditPatientDialog.tsx">
          <Button variant="outline" onClick={onClose} data-id="fxci6d0t5" data-path="src/components/EditPatientDialog.tsx">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: '#bd1818' }}
            className="hover:opacity-90" data-id="c3bo0kejv" data-path="src/components/EditPatientDialog.tsx">

            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

};

export default EditPatientDialog;