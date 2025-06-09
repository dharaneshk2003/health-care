"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createReferral } from "../app/actions.ts";

// Initialize Supabase client inside the client component
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReferralDialogue({ doctor, byDoctor }) {
  const [formData, setFormData] = useState({
    patient_id: "",
    referral_id: "",
    by_doctorid: byDoctor?.id,
    to_doctorid: doctor?.id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateReferralId = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newId = `REF-${randomDigits}`;
    setFormData((prev) => ({ ...prev, referral_id: newId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { patient_id, referral_id, by_doctorid, to_doctorid } = formData;

  if (!patient_id.trim() || !referral_id.trim()) {
    toast({
      title: "Missing Information",
      description: "Please enter both Patient ID and Referral ID.",
      variant: "destructive",
    });
    return;
  }


  setIsSubmitting(true);

  try {
    // Prepare a FormData object to pass to createReferral
    const formDataObj = new FormData();
    formDataObj.append("patient_id", formData.patient_id);
    formDataObj.append("referral_id", formData.referral_id);
    formDataObj.append("by_doctorid", formData.by_doctorid ?? "");
    formDataObj.append("to_doctorid", formData.to_doctorid ?? "");


    const result = await createReferral(formDataObj);


    if (result.error) {
      toast({
        title: "Referral Failed",
        description: result.error,
        variant: "destructive",
      });
      console.error("Referral error:", result.error);
    } else {
      toast({
        title: "Referral Successful",
        description: `Patient ${patient_id} referred to ${doctor?.doctor_name} with referral ID ${referral_id}.`,
      });
      // Reset form with default doctor ids
      setFormData({
        patient_id: "",
        referral_id: "",
        by_doctorid: byDoctor?.id,
        to_doctorid: doctor?.id,
      });
    }
     window.location.reload();
  } catch (err) {
    toast({
      title: "Referral Failed",
      description: "An error occurred while processing the referral.",
      variant: "destructive",
    });
    console.error("Referral error:", err);
  } finally {
    setIsSubmitting(false);
  }
};


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Refer to</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[460px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Refer Patient to {doctor?.doctor_name}</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to complete the referral to{" "}
                            <span className="font-semibold">{doctor?.department}</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-4">
                        <div>
                            <Label htmlFor="patient_id">Patient ID</Label>
                            <Input
                                id="patient_id"
                                name="patient_id"
                                placeholder="e.g. POF-123456"
                                className="mt-2 w-full"
                                value={formData.patient_id}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="referral_id">Referral ID</Label>
                            <div className="flex items-center gap-2 mt-2">
                                <Input
                                    id="referral_id"
                                    name="referral_id"
                                    placeholder="e.g. REF-123456"
                                    className="w-[240px]"
                                    value={formData.referral_id}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={generateReferralId}
                                    disabled={isSubmitting}
                                >
                                    Generate
                                </Button>
                            </div>
                        </div>
                        <Input
                            type="hidden"
                            name="by_doctorid"
                            value={byDoctor?.id ?? ""}
                        />
                        <Input
                            type="hidden"
                            name="to_doctorid"
                            value={doctor?.id ?? ""}
                        />

                        <div className="bg-gray-50 p-3 rounded-lg w-full">
                            <h4 className="font-medium text-sm mb-2">Doctor Details:</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div><strong>Name:</strong> {doctor?.doctor_name}</div>
                                <div><strong>Specialty:</strong> {doctor?.department}</div>
                                <div><strong>Location:</strong> {doctor?.address}</div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
