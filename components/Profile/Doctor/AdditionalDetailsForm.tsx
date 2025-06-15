import React, { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface DoctorData {
  image: string;
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
  gender: string;
  mobile : string;
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
    available_days: doctorData.available_days,
    available_from_time: doctorData.available_from_time,
    available_to_time: doctorData.available_to_time,
    languages: doctorData.languages,
    consultation_fees: doctorData.consultation_fees
  });

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Everyday'
  ];

  const indianLanguages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
    'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi',
    'Assamese', 'Maithili', 'Sanskrit'
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => {
      let updatedDays = [...prev.available_days];

      if (day === "Everyday") {
        if (checked) {
          // ✅ Only "Everyday" is selected
          updatedDays = ["Everyday"];
        } else {
          // ✅ Unchecking "Everyday"
          updatedDays = [];
        }
      } else {
        if (prev.available_days.includes("Everyday")) {
          // ✅ Remove "Everyday" if other days are being selected
          updatedDays = [];
        }

        if (checked) {
          updatedDays.push(day);
        } else {
          updatedDays = updatedDays.filter((d) => d !== day);
        }
      }

      return { ...prev, available_days: updatedDays };
    });
  };

  const getFilteredToTimeOptions = () => {
    if (!formData.available_from_time) return timeOptions;

    const fromIndex = timeOptions.indexOf(formData.available_from_time);

    // Show times strictly after 'from' time with wrap-around
    return [
      ...timeOptions.slice(fromIndex + 1),
      ...timeOptions.slice(0, fromIndex + 1), // wrap around from midnight
    ];
  };

  const handleTimeChange = (type: 'available_from_time' | 'available_to_time', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleLanguageAdd = (language: string) => {
    if (!formData.languages.includes(language)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleLanguageRemove = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
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
              {daysOfWeek.map((day) => {
                const isEverydayChecked = formData.available_days.includes("Everyday");
                const isDisabled = isEverydayChecked && day !== "Everyday";

                return (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.available_days.includes(day)}
                      disabled={isDisabled}
                      onCheckedChange={(checked) =>
                        handleDayChange(day, checked as boolean)
                      }
                      className="data-[state=checked]:bg-[#bd1818] data-[state=checked]:border-[#bd1818] data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={day}
                      className={`text-sm font-medium ${isDisabled ? "text-gray-400" : ""}`}
                    >
                      {day}
                    </Label>
                  </div>
                );
              })}
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
                  value={formData.available_from_time}
                  onValueChange={(time) => handleTimeChange('available_from_time', time)}>

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
                  value={formData.available_to_time}
                  onValueChange={(time) => handleTimeChange('available_to_time', time)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredToTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
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
                value={formData.consultation_fees}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    consultation_fees: parseInt(e.target.value) || 0
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