"use client";
import React, { useState } from "react";
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
import { useToast} from "@/hooks/use-toast";
import { createReferral,createNotification,getDoctorWithId } from "../app/actions.ts";



export default function ReferralDialogue({ doctor, byDoctor,}) {
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

  // Input validation
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
    // Step 1: Get referred doctor's details
    const to_doctor_details = await getDoctorWithId(to_doctorid);
    if (!to_doctor_details) {
      throw new Error("Referred doctor not found.");
    }

    console.log("By Doctor:", byDoctor);
    console.log("To Doctor:", to_doctor_details);

    // Step 2: Prepare and send referral
    const formDataObj = new FormData();
    formDataObj.append("patient_id", patient_id);
    formDataObj.append("referral_id", referral_id);
    formDataObj.append("by_doctorid", by_doctorid ?? "");
    formDataObj.append("to_doctorid", to_doctorid ?? "");

    console.log("Referral Payload:");
    for (const [key, value] of formDataObj.entries()) {
      console.log(key, value);
    }

    const referralResult = await createReferral(formDataObj);
    if (referralResult?.error) {
      throw new Error(referralResult.error);
    }

    toast({
      title: "Referral Successful",
      description: `Patient ${patient_id} referred to ${to_doctor_details.doctor_name} with referral ID ${referral_id}.`,
    });

    // Step 3: Prepare notifications
    const toDoctorNotification = {
      from_id: byDoctor?.id,
      to_id: to_doctor_details.online_id,
      body: `You got a referral from Dr. ${byDoctor?.user_metadata?.name ?? "Unknown"}`,
      category: "appointment",
    };

    const fromDoctorNotification = {
      from_id: to_doctor_details.online_id,
      to_id: byDoctor?.id,
      body: `You gave a referral to Dr. ${to_doctor_details.doctor_name}`,
      category: "appointment",
    };

    console.log("Notification → To Doctor:", toDoctorNotification);
    console.log("Notification → From Doctor:", fromDoctorNotification);

    // Step 4: Send notifications
    const notifToDoctor = await createNotification(toDoctorNotification);
    const notifToSender = await createNotification(fromDoctorNotification);

    if (notifToDoctor?.error || notifToSender?.error) {
      throw new Error(notifToDoctor?.error || notifToSender?.error);
    }

    toast({
      title: "Notifications Sent",
      description: "Notifications sent to both doctors successfully.",
    });

    // Step 5: Reset form
    setFormData({
      patient_id: "",
      referral_id: "",
      by_doctorid: byDoctor?.id,
      to_doctorid: to_doctor_details.id,
    });

    // Optionally reload or navigate
    window.location.reload();

  } catch (err: any) {
    console.error("Submission error:", err);
    toast({
      title: "Action Failed",
      description: err.message || "An unexpected error occurred.",
      variant: "destructive",
    });
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
                  disabled={isSubmitting || formData.referral_id}
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
