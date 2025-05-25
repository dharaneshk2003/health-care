"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, User, Info, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import Image from "next/image"
import doctorIMg from "@/components/Images/doctor.png"

export default function UserBookingForm({ doctor }) {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [referralId, setReferralId] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("new")
  const [showMap, setShowMap] = useState(true)


  if (!doctor) {
    return <div>Doctor not found</div>
  }
  const { id, doctor_name, department, ratings, experience, consultation_fees, address, location, available_from_time, available_to_time, available_days, image_url } = doctor;

  const dummyDoctor = {
    id,
    name: doctor_name,
    specialization: department,
    consultationFee: consultation_fees,
    image_url: image_url || doctorIMg, // Fallback image
  }

  const dummyHospital = {
    mapUrl: location,
    address,
  }


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

  // Example usage:
  const timeSlots = generateTimeSlots(available_from_time, available_to_time);

  const calculateTotal = () => {
    let total = dummyDoctor.consultationFee
    if (appointmentType === "emergency") total += 500
    return total
  }

  const isValidReferral = () => {
    if (!referralId) return true
    const regex = /^\d{5}re$/
    return regex.test(referralId)
  }

  const availableDays = available_days;

  const handleSubmit = async () => {
  if (!date || !timeSlot || !isValidReferral()) {
    alert("Please fill all required fields correctly.");
    return;
  }

  const dataToSend = {
    date: format(date, "yyyy-MM-dd"),
    timeSlot,
    referralId,
    notes,
    appointmentType,
    doctorId: id,
  };

  router.push(`/doctors/${id}/payment`);
};

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 mt-4">
          <h1 className="text-2xl font-bold mb-6">Book Your Appointment</h1>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        const isPast = date < today.setHours(0, 0, 0, 0); // disables past dates

                        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                        const isUnavailableDay = !availableDays.includes(dayName); // disables unavailable weekdays

                        return isPast || isUnavailableDay;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time Slot</Label>
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
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="referral" className="mr-2">Referral ID (Optional)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Format: 12345re (5 digits followed by "re")</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="referral"
                placeholder="Enter referral ID (e.g., 12345re)"
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                className={!isValidReferral() ? "border-custom" : ""}
              />
              {!isValidReferral() && (
                <p className="text-xs text-custom">Invalid format. Use 5 digits followed by "re"</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New Consultation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="followup" id="followup" />
                  <Label htmlFor="followup">Follow-up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">Emergency (Additional ₹500)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific concerns or information for the doctor"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button
              type="button"
              className="w-full bg-custom hover:bg-secondary"
              disabled={!date || !timeSlot || !isValidReferral()}
              onClick={handleSubmit}
            >
              Proceed to Payment
            </Button>

          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between gap-4">
                {/* Doctor Details (Left Side) */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{dummyDoctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{dummyDoctor.specialization}</p>

                  <div className="space-y-1 text-sm mt-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>ID: {dummyDoctor.id}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{date ? format(date, "PPP") : "Select a date"}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{timeSlot || "Select a time slot"}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Image (Right Side) */}
                <div className="w-28 h-28 flex-shrink-0 mr-5">
                  <img
                    src={dummyDoctor.image_url}
                    alt={dummyDoctor.name || "Doctor"}
                    className="rounded-md object-contain w-[130px] h-[123px] border-2 border-custom"
                    priority
                  />
                </div>
              </div>

              {/* Fees and Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Consultation Fee</span>
                  <span>₹{dummyDoctor.consultationFee}</span>
                </div>
                {appointmentType === "emergency" && (
                  <div className="flex justify-between mb-2">
                    <span>Emergency Fee</span>
                    <span>₹500</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="pt-4 text-sm text-muted-foreground">
                <p>* Payment will be processed via Razorpay UPI</p>
                <p>* Cancellation policy applies</p>
              </div>
            </CardContent>

          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Hospital Location</span>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowMap(!showMap)}>
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showMap && (
                <div className="mb-4">
                  <iframe
                    title="hospital-map"
                    src={dummyHospital.mapUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
              )}
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{dummyHospital.address}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


