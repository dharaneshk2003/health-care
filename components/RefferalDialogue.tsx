"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';

export default function RefferalDialogue({ doctor }) {
    const [patientId, setPatientId] = useState('');
    const [referralId, setReferralId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const generateReferralId = () => {
        const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 digit number
        const referralId = `REF-${randomDigits}`;
        setReferralId(referralId);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!patientId.trim() || !referralId.trim()) {
            toast({
                title: "Error",
                description: "Please fill in both Patient ID and Referral ID fields.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast({
                title: "Referral Successful",
                description: `Patient ${patientId} has been referred to Dr. ${doctor?.name} with referral ID ${referralId}.`
            });

            setPatientId('');
            setReferralId('');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to process referral. Please try again.",
                variant: "destructive"
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
            <DialogContent className="">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Refer Patient to {doctor.doctor_name}</DialogTitle>
                        <DialogDescription>
                            Please enter the patient info and referral details to refer to {doctor.department}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mt-2">
                        <div>
                            <Label htmlFor="id">Patient ID</Label>
                            <Input
                                id="id"
                                name="id"
                                placeholder="Enter Patient ID (e.g: POF-123456)"
                                className="mt-2 w-[350px]"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="referral-id">Referral ID</Label>
                            <div className="flex items-center gap-2 mt-2">
                                <Input
                                    id="referral-id"
                                    name="referral-id"
                                    placeholder="Enter referral ID"
                                    value={referralId}
                                    onChange={(e) => setReferralId(e.target.value)}
                                    className="w-[250px]"
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
                        <div className="bg-gray-50 p-3 rounded-lg w-[400px]">
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
