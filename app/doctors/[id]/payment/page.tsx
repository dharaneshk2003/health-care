"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Clock, User, Share2 } from "lucide-react";


export default function AppointmentBooking() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string>("")
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

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;

      slots.push(`${hours}:${minutesStr} ${ampm}`);

      // Add 30 minutes
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  }

  const timeSlots = generateTimeSlots("09:00", "17:00");

  return (
    <div className="w-[1520px] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confirm and Pay Section */}
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Confirm and pay</h2>

              {/* Doctor Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <User className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Dr. Rahul Sharma</h3>
                  <p className="text-gray-600 text-sm">Cardiologist • Apollo Hospitals</p>
                  <div className="flex items-center gap-1 text-custom text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Sheshadripuram, Bangalore</span>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 text-sm uppercase tracking-wide">Select Date</span>
                    {/* <button className="text-custom text-sm font-medium underline">Edit</button> */}
                    <Dialog>
                      <DialogTrigger className="text-custom text-sm font-medium underline">Edit</DialogTrigger>
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
                    {/* <button className="text-custom text-sm font-medium underline">Edit</button> */}
                    <Dialog>
                      <DialogTrigger className="text-custom text-sm font-medium underline">Edit</DialogTrigger>
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
                                  className={`text-xs ${timeSlot === slot ? "bg-custom hover:bg-custom" : ""}`}
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
                  <p className="font-medium text-gray-900">{timeSlot}</p>
                </div>
              </div>

              {/* Appointment Type */}
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-sm uppercase tracking-wide">APPOINTMENT TYPE</span>
                  <button className="text-custom text-sm font-medium underline">Edit</button>
                </div>
                <p className="font-medium text-gray-900">Consultation</p>
              </div>

              {/* Map */}
              <div className="relative bg-green-100 rounded-lg h-64 mb-4 overflow-hidden">
                <div className="mb-4">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89797128353!2d77.04417311948666!3d28.52755440858552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1748094810172!5m2!1sen!2sin"
                    title="hospital-map"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
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
                      defaultValue="Ajay Kumar"
                      className="bg-gray-50 border-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="ajay.kumar@gmail.com"
                      className="bg-gray-50 border-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue="+91 9876543210"
                      className="bg-gray-50 border-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-gray-700 font-medium">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      placeholder="Brief description of your symptoms"
                      className="mt-1 bg-gray-50 border-gray-400 h-20"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Payment Gateway */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-sm sticky top-5 max-w-[500px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900 text-xl">Payment Gateway</h2>
                <Card className="text-right px-2 py-1 rounded-xl bg-white">
                  <span className="text-black text-md font-bold">Amount: </span>
                  <span className="font-bold text-custom">₹1,534</span>
                </Card>
              </div>

              {/* Fee Breakdown */}
              <Card className="space-y-3 mb-6 text-sm p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-gray-900">₹1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Fee</span>
                  <span className="text-gray-900">₹100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-900">₹234</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹1,534</span>
                </div>
              </Card>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-4 mb-6 bg-gray-50 rounded-lg p-1">
                <button className="py-2 px-3 text-xs font-medium text-gray-600 ">UPI</button>
                <button className="py-2 px-3 text-xs font-medium text-gray-600">Cards</button>
                <button className="py-2 px-3 text-xs font-medium text-gray-600">Net Banking</button>
                <button className="py-2 px-3 text-xs font-medium text-gray-600">Wallets</button>
              </div>

              {/* UPI Payment Options */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center mb-2">
                      <span className="text-white text-xs font-bold">UPI</span>
                    </div>
                    <span className="text-xs text-gray-700">UPI QR</span>
                  </div>
                  {/* Phonepe */}
                  <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mb-2">
                      <span className="text-white text-xs">P</span>
                    </div>
                    <span className="text-xs text-gray-700">Paytm</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mb-2">
                      <span className="text-white text-xs">G</span>
                    </div>
                    <span className="text-xs text-gray-700">Google Pay</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center mb-2">
                      <span className="text-white text-xs">₱</span>
                    </div>
                    <span className="text-xs text-gray-700">PhonePe</span>
                  </div>
                </div>
              </div>

              {/* UPI ID Input */}
              <div className="mb-6">
                <Label htmlFor="upiId" className="text-gray-700 font-medium text-sm">Enter UPI ID</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    className="flex-1 bg-gray-50 border-gray-200"
                  />
                  <Button className="bg-custom hover:bg-custom text-white px-6">
                    Verify
                  </Button>
                </div>
              </div>

              {/* Pay Button */}
              <Button className="w-full bg-custom hover:bg-custom text-white py-3 text-lg font-semibold mb-4">
                Pay ₹1,534
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