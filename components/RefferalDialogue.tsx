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
import { createReferral,createNotification } from "../app/actions.ts";
import { getDataWithId } from "../app/backend.ts";



export default function ReferralDialogue({ doctor, byDoctor,to_doctorid }) {
  console.log("by doctor :",byDoctor);
  console.log("to_doctorid :",to_doctorid);
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
    // Step 1: Referral API call
    const formDataObj = new FormData();
    formDataObj.append("patient_id", patient_id);
    formDataObj.append("referral_id", referral_id);
    formDataObj.append("by_doctorid", by_doctorid ?? "");
    formDataObj.append("to_doctorid", to_doctorid ?? "");

    const referralResult = await createReferral(formDataObj);

    if (referralResult?.error) {
      throw new Error(referralResult.error);
    }

    // Referral successful
    toast({
      title: "Referral Successful",
      description: `Patient ${patient_id} referred to ${doctor?.doctor_name ?? "doctor"} with referral ID ${referral_id}.`,
    });


    // Step 2: Notification payload
    const notificationPayload = {
      from_id: byDoctor?.id,
      to_id: doctor?.online_id,
      body: `You got a  referral from ${to_doctorid} ?? "unknown"}`,
      category: 'appointment',
    };

    console.log("Notification Payload:", notificationPayload);

    // Step 3: Notification API call
    const notifResult = await createNotification(notificationPayload);

    if (notifResult?.error) {
      throw new Error(notifResult.error);
    }

    // Notification success
    toast({
      title: "Notification Sent",
      description: "Notification successfully sent to the referred doctor.",
    });

    // Reset form
    setFormData({
      patient_id: "",
      referral_id: "",
      by_doctorid: byDoctor?.id,
      to_doctorid: doctor?.id,
    });
    window.location.reload();

  } catch (err: any) {
    console.error("Submission error:", err);
    toast({
      title: "Action Failed",
      description: err?.message || "An unexpected error occurred.",
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
