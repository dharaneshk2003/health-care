"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, formatISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Clock, User, Share2, QrCode } from "lucide-react";
import WalletSection from "@/components/WalletSection";
import BankSection from "@/components/BankSection";
import CardSection from "@/components/CardSection";
import amazonPayImg from "@/components/Images/amazon_pay.png";
import gpayImg from "@/components/Images/gpay.png";
import paytmImg from "@/components/Images/paytm.png";
import phonepeIMg from "@/components/Images/phonepe.png";
import Image from "next/image";
import { updateAppointmentById,createNotification } from "../app/actions.ts";
import { useToast } from "../hooks/use-toast.ts"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation';
import MapboxExample from "../pages/MapboxExample";


export default function PaymentInterface({ doctor, patient, appointment,to_id }) {
  const router = useRouter();
  let details = patient?.user_metadata;
  const { toast } = useToast()
  const appointmentType = [
    {
      label: "New Consultation",
      description: "Doctor consultation for the 1st time",
      type: "new"
    },
    {
      label: "Follow-up",
      description: "Follow-up visit after previous consultation",
      type: "follow-up"
    },
    {
      label: "Emergency",
      description: "Immediate medical attention required for urgent health concerns",
      type: "emergency"
    }
  ];

  const changeStyle = (kind) => {
    if (kind == "new-consultation") {
      return "New Consultation";
    } else if (kind === "follow-up") {
      return "Follow-up";
    } else {
      return "Emergency";
    }
  };

  // Initialize state with values from appointment prop or defaults
  const [date, setDate] = useState<Date | undefined>(
    appointment?.appointment_date ? new Date(appointment.appointment_date) : new Date()
  );
  const [timeSlot, setTimeSlot] = useState<string>(
    appointment?.appointment_time || ""
  );
  const [selected, setSelected] = useState<string>(
    changeStyle(appointment?.appointment_type) || "Consultation"
  );
  const [selectedDraft, setSelectedDraft] = useState<string>(
    changeStyle(appointment?.appointment_type) || "Consultation"
  );
  const [reason, setReason] = useState<string>(appointment?.notes || "");

  // Sync the formData state with user edits
  const [formData, setFormData] = useState({
    appointment_date: date,
    appointment_time: timeSlot,
    appointment_type: selected,
    reason: reason,
    patient_id: patient?.id,
    doctor_id: doctor?.id,
    consultation_fee: doctor?.consultation_fees,
    total_fee: doctor?.consultation_fees, // or your logic for total_fee
  });

  const calculateFees = (type) => {
    const baseFee = doctor?.consultation_fees || 0;
    if (type.toLowerCase().includes("emergency")) {
      return {
        consultation_fee: baseFee + 500,
        total_fee: baseFee + 500 + 100 + getEighteenPercent(baseFee)
      };
    } else {
      return {
        consultation_fee: baseFee,
        total_fee: baseFee + 100 + getEighteenPercent(baseFee)
      };
    }
  };

  // Update formData whenever relevant state changes
  useEffect(() => {
    const { consultation_fee, total_fee } = calculateFees(selected);
    setFormData({
      id: appointment?.id,
      appointment_date: new Date(date).toISOString().split("T")[0],
      appointment_time: timeSlot,
      appointment_type: selected.toLowerCase().replace(/\s+/g, '-'),
      notes: reason, // use "notes" instead of "reason" if your DB expects "notes"
      patient_id: patient?.id,
      doctor_id: doctor?.id,
      consultation_fees: consultation_fee, // match exact DB field
      total_fees: total_fee,
    });
  }, [date, timeSlot, selected, reason, patient?.id, doctor?.id]);


  const { id, doctor_name, department, ratings, experience, consultation_fees, address, location, available_from_time, available_to_time, available_days, image_url } = doctor;
  const availableDays = available_days;

  function generateTimeSlots(fromTime, toTime) {
    const slots = [];
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [toHours, toMinutes] = toTime.split(':').map(Number);
    let current = new Date();
    current.setHours(fromHours, fromMinutes, 0, 0);

    const end = new Date();
    end.setHours(toHours, toMinutes, 0, 0);

    while (current <= end) {
      let hours = current.getHours();
      let minutes = current.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;

      slots.push(`${hours}:${minutesStr} ${ampm}`);
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  }

  const handleSave = () => {
    setSelected(selectedDraft);
    document.getElementById("close-dialog")?.click();
  };

  const timeSlots = generateTimeSlots(available_from_time, available_to_time);

  function getEighteenPercent(value) {
    return value * 0.18;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "reason") {
      setReason(value);
    }
    // Add other fields if needed
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { consultation_fee, total_fee } = calculateFees(selected);

    const payload = {
      id: appointment?.id,
      appointment_date: new Date(date).toISOString().split("T")[0],
      appointment_time: timeSlot,
      appointment_type: selected.toLowerCase().replace(/\s+/g, '-'),
      notes: reason,
      patient_id: patient?.id,
      doctor_id: doctor?.id,
      consultation_fees: consultation_fee,
      total_fees: total_fee,
    };

    if (!payload.id) {
      toast({
        title: "ID Missing",
        description: "Appointment ID is missing. Cannot update.",
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    const result = await updateAppointmentById(payload);

    if (!result || result.error) {
      console.error("Failed to update appointment:", result?.error || "Unknown error");
      toast({
        title: "Update failed",
        description: `Update failed: ${result?.error || "Unknown error"}`,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    toast({
      title: "Sucessfully Updated",
      description: "Details updated successfully!",
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });
  };

const handlePayment = async (e) => {
  e.preventDefault();

  // Doctor-side notification
  const payload = {
    from_id: patient?.id,
    to_id: to_id,
    body: `You have a consultation from patient ${details?.name} regarding ${reason}`,
    category: 'appointment',
  };

  // Patient-side notification
  const patientPayload = {
    from_id: to_id,
    to_id: patient?.id,
    body: `Your appointment with Dr. ${doctor_name} is fixed`,
    category: 'appointment',
  };

  try {
    const result = await createNotification(payload);
    const resultPat = await createNotification(patientPayload);

    // ❗ Corrected error logic
    if (!result || result.error || !resultPat || resultPat.error) {
      console.error("Failed to create notification:", result?.error || resultPat?.error || "Unknown error");
      toast({
        title: "Notification failed",
        description: `Error: ${result?.error || resultPat?.error || "Unknown error"}`,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }

    // ✅ Success toast
    toast({
      title: "Successfully Booked",
      description: "Appointment and notification created successfully!",
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });

    // Redirect after short delay
    setTimeout(() => {
      router.push('/doctors');
    }, 1500);

  } catch (err) {
    console.error("Unexpected error:", err);
    toast({
      title: "Unexpected Error",
      description: err.message || "Something went wrong",
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });
  }
};






  return (
    <div className="w-[1520px] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confirm and Pay Section */}
            <Card className="p-6 bg-white shadow-sm">
              <form onSubmit={handleSubmit}>
                {/* Hidden inputs for backend */}
                <input type="hidden" name="patient_id" value={patient?.id} />
                <input type="hidden" name="doctor_id" value={doctor?.id} />
                <input type="hidden" name="consultation_fee" value={calculateFees(selected).consultation_fee} />
                <input type="hidden" name="total_fee" value={calculateFees(selected).total_fee} />
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Confirm and pay</h2>
                {/* Doctor Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-[80px] h-[80px] bg-yellow-100 rounded-lg flex items-center justify-center">
                    {image_url ? <img src={image_url} className="w-[80px] h-[80px] object-fill border-4 border-primary rounded-lg" /> : <User className="w-8 h-8 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{doctor_name}</h3>
                    <div className="text-gray-600 text-sm">{department}</div>
                    <div className="flex items-center gap-1 text-white text-sm mt-1">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="text-primary">{address}</span>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 text-sm uppercase tracking-wide">Select Date</span>
                      <Dialog>
                        <DialogTrigger className="text-primary text-sm font-medium underline">Edit</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              <div className="font-semibold text-md m-0">Change Date</div>
                              <div className="text-base text-black mb-1 mt-5">Select a new date</div>
                              <Input
                                type="text"
                                value={date?.toLocaleDateString()}
                                className="my-2 bg-gray-50 border-gray-400"
                                onChange={(e) => setDate(new Date(e.target.value))}
                                readOnly />
                            </DialogTitle>
                            <DialogDescription className="border border-gray-500 w-[320px] p-2 rounded-md mx-auto">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md w-10"
                                disabled={(date) => {
                                  const today = new Date();
                                  const isPast = date < today.setHours(0, 0, 0, 0);
                                  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                                  const isUnavailableDay = !availableDays.includes(dayName);
                                  return isPast || isUnavailableDay;
                                }}
                              />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="font-medium text-gray-900">{date ? format(date, "PPP") : "Select a date"}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 text-sm uppercase tracking-wide">TIME</span>
                      <Dialog>
                        <DialogTrigger className="text-primary text-sm font-medium underline">Edit</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              <div className="font-semibold text-md m-0">Change Time</div>
                              <div className="text-base text-black mb-1 mt-5">Available time slots :</div>
                            </DialogTitle>
                            <DialogDescription>
                              <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                  <Button
                                    key={slot}
                                    type="button"
                                    variant={timeSlot === slot ? "default" : "outline"}
                                    className={`text-xs ${timeSlot === slot ? "bg-primary text-white hover:bg-primary" : ""}`}
                                    onClick={() => setTimeSlot(slot)}
                                  >
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="font-medium text-gray-900">{timeSlot ? timeSlot : "Choose time slot"}</p>
                  </div>
                </div>

                {/* Appointment Type */}
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 text-sm uppercase tracking-wide">APPOINTMENT TYPE</span>
                    <Dialog>
                      <DialogTrigger className="text-primary text-sm font-medium underline">Edit</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div className="font-semibold text-xl m-0">Change Appointment Type</div>
                            <div className="text-gray-900 text-lg mb-1 mt-5">Select appointment type:</div>
                          </DialogTitle>
                          <DialogDescription>
                            <div className="grid grid-cols-1 gap-2">
                              {appointmentType.map((type) => (
                                <Button
                                  key={type.type}
                                  variant={selectedDraft === type.label ? "default" : "outline"}
                                  className={`my-1 h-15 w-full justify-start text-left ${selectedDraft === type.label
                                    ? "bg-primary hover:bg-primary/60 border text-white !important"
                                    : "border hover:border-gray-400"}`}
                                  onClick={() =>
                                    setSelectedDraft(
                                      selectedDraft === type.label ? "" : type.label
                                    )
                                  }
                                >
                                  <div className="p-1">
                                    <div className="text-xl">{type.label}</div>
                                    <div className="text-md pb-1">{type.description}</div>
                                  </div>
                                </Button>
                              ))}
                            </div>

                            <div className="flex justify-end gap-2 pt-6">
                              <DialogTrigger asChild>
                                <button
                                  type="button"
                                  id="close-dialog"
                                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
                                  onClick={() => setSelectedDraft(selected)}
                                >
                                  Cancel
                                </button>
                              </DialogTrigger>
                              <button
                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                                onClick={handleSave}
                              >
                                Save
                              </button>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="font-medium text-gray-900">{selected ? selected : ""}</p>
                </div>

                {/* Map */}
                <div className="relative bg-green-100 rounded-lg h-[400px] w-full mb-4 overflow-hidden">
                  <div className="absolute inset-0">
                    <MapboxExample location={doctor.location}  height={"400px"} width={"790px"}/>
                  </div>
                </div>


                {/* Map Actions */}
                <div className="flex justify-center items-end gap-10 mb-6">
                  <button className="flex items-center gap-2 text-black text-sm bg-gray-200 px-11 py-2 rounded hover:bg-gray-300 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </button>
                  <button className="flex items-center gap-2 text-black text-sm bg-gray-200 px-11 py-2 rounded hover:bg-gray-300 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share Location
                  </button>
                </div>

                {/* Patient Information */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-xl">Patient Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        value={details?.name}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={details?.mobile}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason" className="text-gray-700 font-medium">Reason for Visit</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={handleChange}
                        placeholder="Briefly describe your reason for the appointment"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-red-500 mt-6">
                  Edit Appointment Details
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column - Payment Gateway */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-sm sticky top-5 max-w-[500px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900 text-xl">Payment Gateway</h2>
                <Card className="text-right px-2 py-1 rounded-xl bg-white">
                  <span className="text-black text-md font-bold">Amount: </span>
                  <span className="font-bold text-primary">₹{calculateFees(selected).total_fee}</span>
                </Card>
              </div>

              {/* Fee Breakdown */}
              <Card className="space-y-3 mb-6 text-sm p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-gray-900">₹{calculateFees(selected).consultation_fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Fee</span>
                  <span className="text-gray-900">₹100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-900">₹{getEighteenPercent(calculateFees(selected).consultation_fee)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{calculateFees(selected).total_fee}</span>
                </div>
              </Card>

              {/* Payment Methods Tabs */}
              <Tabs defaultValue="upi" className="w-full mb-6">
                <TabsList className="grid grid-cols-4 bg-gray-50 rounded-lg p-1">
                  <TabsTrigger value="upi" className="text-xs font-medium">UPI</TabsTrigger>
                  <TabsTrigger value="cards" className="text-xs font-medium">Cards</TabsTrigger>
                  <TabsTrigger value="netbanking" className="text-xs font-medium">Net Banking</TabsTrigger>
                  <TabsTrigger value="wallets" className="text-xs font-medium">Wallets</TabsTrigger>
                </TabsList>

                {/* ✅ UPI Tab Content */}
                <TabsContent value="upi" className="space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-9 h-9 bg-black rounded flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">
                          <QrCode />
                        </span>
                      </div>
                      <span className="text-xs text-gray-700">UPI QR</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-9 h-9 rounded flex items-center justify-center mb-2">
                        <Image src={paytmImg} alt="Amazon Pay" width={30} height={30} className="w-10 h-10" />
                      </div>
                      <span className="text-xs text-gray-700">Paytm</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-9 h-9 rounded flex items-center justify-center mb-2">
                        <Image src={gpayImg} alt="GPay" width={30} height={30} className="w-10 h-10" />
                      </div>
                      <span className="text-center text-xs text-gray-700">GPay</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <div className="w-9 h-9 rounded flex items-center justify-center mb-2">
                        <Image src={phonepeIMg} alt="Phonepe" width={30} height={30} className="w-10 h-10" />
                      </div>
                      <span className="text-xs text-gray-700">PhonePe</span>
                    </div>
                  </div>
                </TabsContent>


                {/* ✅ Placeholder Content for Other Tabs */}
                <TabsContent value="cards">
                  <CardSection />
                </TabsContent>

                <TabsContent value="netbanking">
                  <BankSection />
                </TabsContent>

                <TabsContent value="wallets">
                  <WalletSection />
                </TabsContent>
              </Tabs>
              {/* UPI ID Input */}
              <div className="mb-6">
                <Label htmlFor="upiId" className="text-gray-700 font-medium text-sm">Enter UPI ID</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    className="flex-1 bg-gray-50 border-gray-200"
                  />
                  <Button className="bg-primary hover:bg-primary text-white px-6">
                    Verify
                  </Button>
                </div>
              </div>

              {/* Pay Button */}
              <Button className="w-full bg-primary hover:bg-primary text-white py-3 text-lg font-semibold mb-4" onClick={handlePayment}>
                Pay ₹{calculateFees(selected).total_fee}
              </Button>

              {/* Security Icons */}
              <div className="flex justify-center items-center gap-4 mb-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🛡️</span>
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🔐</span>
                  <span>Data Protected</span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By confirming, you agree to Hind Svaasth Seva's terms and conditions and cancellation policy.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};