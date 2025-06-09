import React, { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

interface AdditionalDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
  doctorData: DoctorData;
  onUpdate: (data: Partial<DoctorData>) => void;
}

const AdditionalDetailsForm: React.FC<AdditionalDetailsFormProps> = ({
  isOpen,
  onClose,
  doctorData,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    daysAvailable: doctorData.daysAvailable,
    timeSlot: doctorData.timeSlot,
    languages: doctorData.languages,
    consultationFee: doctorData.consultationFee
  });

  const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Everyday'];


  const indianLanguages = [
  'English',
  'Hindi',
  'Bengali',
  'Telugu',
  'Marathi',
  'Tamil',
  'Gujarati',
  'Urdu',
  'Kannada',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
  'Maithili',
  'Sanskrit'];


  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      daysAvailable: checked ?
      [...prev.daysAvailable, day] :
      prev.daysAvailable.filter((d) => d !== day)
    }));
  };

  const handleTimeSlotChange = (type: 'from' | 'to', time: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot: { ...prev.timeSlot, [type]: time }
    }));
  };

  const handleLanguageAdd = (language: string) => {
    if (!formData.languages.includes(language)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleLanguageRemove = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#bd1818]">
            Additional Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Days Available */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-[#bd1818]">
              Days Available in Every Week
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {daysOfWeek.map((day) =>
              <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                  id={day}
                  checked={formData.daysAvailable.includes(day)}
                  onCheckedChange={(checked) =>
                  handleDayChange(day, checked as boolean)
                  }
                  className="data-[state=checked]:bg-[#bd1818] data-[state=checked]:border-[#bd1818] data-[state=checked]:text-white"/>

                  <Label htmlFor={day} className="text-sm font-medium">
                    {day}
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Time Slot */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-[#bd1818]">
              Time Slot Available on Selected Days
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeFrom">From</Label>
                <Select
                  value={formData.timeSlot.from}
                  onValueChange={(time) => handleTimeSlotChange('from', time)}>

                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) =>
                    <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeTo">To</Label>
                <Select
                  value={formData.timeSlot.to}
                  onValueChange={(time) => handleTimeSlotChange('to', time)}>

                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) =>
                    <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-[#bd1818]">
              Languages Known to Interact with Patients
            </Label>
            <div className="space-y-3">
              <Select onValueChange={handleLanguageAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  {indianLanguages.
                  filter((lang) => !formData.languages.includes(lang)).
                  map((language) =>
                  <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                  )}
                </SelectContent>
              </Select>
              
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language) =>
                <Badge
                  key={language}
                  variant="secondary"
                  className="bg-[#bd1818] text-white hover:bg-[#a11616] flex items-center gap-1">

                    {language}
                    <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleLanguageRemove(language)} />

                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-[#bd1818]">
              Consultation Fee (in Rupees)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <Input
                type="number"
                value={formData.consultationFee}
                onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  consultationFee: parseInt(e.target.value) || 0
                }))
                }
                placeholder="500"
                className="pl-8"
                min="0"
                required />

            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50">

              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#bd1818] hover:bg-[#a11616] text-white">

              Save Additional Details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>);

};

export default AdditionalDetailsForm;