"use client"
import { useState } from "react"
import MapboxExample from "../pages/MapboxExample.tsx";
import { formatISO } from 'date-fns';
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
import doctorIMg from "@/components/Images/doctor.png"
import { getPatientId } from "../app/backend.ts"
import { createAppointment } from "../app/actions.ts"
import { useToast } from "../hooks/use-toast.ts"
import { ToastAction } from "@/components/ui/toast"

// adjust path as needed

export default function UserBookingForm({ doctor, patient }) {
  let patient_id = patient?.id ? patient?.id : null;
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    date: null as Date | null,
    timeSlot: "",
    referralId: "",
    notes: "",
    appointmentType: "new-consultation",
  });
  const [showMap, setShowMap] = useState(true);
  const { date, timeSlot, referralId, notes, appointmentType } = formData;


  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const setDate = (value: Date | null) => handleChange("date", value);
  const setTimeSlot = (value: string) => handleChange("timeSlot", value);
  const setReferralId = (value: string) => handleChange("referralId", value);
  const setAppointmentType = (value: string) => handleChange("appointmentType", value);
  const setNotes = (value: string) => handleChange("notes", value);



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
    const regex = /^\d{5}re$/;
    return regex.test(referralId)
  }

  const availableDays = available_days;// adjust import if needed

  function getEighteenPercent(value: number) {
    return value * 0.18;
  }

  function getTotalFee(value: number) {
    let gst = getEighteenPercent(value);
    return value + gst + 100;
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.timeSlot) {
      toast({
        title: "Date & Time not valid",
        description: "Please select a valid date and time.",
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });

      return;
    }

    const appointmentDate = format(formData.date, "yyyy-MM-dd"); // ISO-friendly format

    const payload = {
      appointment_date: formatISO(new Date(formData.date)),
      appointment_time: formData.timeSlot,
      referral_id: formData.referralId || null,
      appointment_type: formData.appointmentType,
      notes: formData.notes || "",
      patient_id: patient_id,
      doctor_id: id,
      consultation_fees: calculateTotal(),
      total_fees: getTotalFee(calculateTotal()),
    };
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const result = await createAppointment(null, form);
      if (result.error) {
        toast({
          title: "Unknown Error Occured",
          description: `${result.error}`,
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
        return;
      }
      router.push(`/doctors/${id}/payment`);
    } catch (error) {
      toast({
          title: "Appointment creation Failed",
          description: "Failed to create appointment. Please try again.",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
    }
  };





  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 mt-4">
          <h1 className="text-2xl font-bold mb-6">Book Your Appointment</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="patient_id" value={patient_id ? patient_id : ""} />
            <input type="hidden" name="doctor_id" value={id} />
            <input type="hidden" name="consultation_fees" value={calculateTotal()} />
            <input type="hidden" name="total_fees" value={getTotalFee(calculateTotal())} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      name="date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        const isPast = date < today.setHours(0, 0, 0, 0);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                        const isUnavailableDay = !availableDays.includes(dayName);
                        return isPast || isUnavailableDay;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">Select Time Slot</Label>
                <div className="grid grid-cols-3 gap-2" id="timeSlot">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      name="timeSlot"
                      variant={formData.timeSlot === slot ? "default" : "outline"}
                      className={`text-xs ${formData.timeSlot === slot ? "bg-primary text-white hover:bg-primary hover:text-white" : ""}`}
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
                <Label htmlFor="referralId" className="mr-2">Referral ID (Optional)</Label>
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
                id="referralId"
                name="referralId"
                placeholder="Enter referral ID (e.g., 12345re)"
                value={formData.referralId}
                onChange={(e) => setReferralId(e.target.value)}
                className={!isValidReferral() ? "border-primary" : ""}
              />
              {!isValidReferral() && (
                <p className="text-xs text-white">Invalid format. Use 5 digits followed by "re"</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type</Label>
              <RadioGroup
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onValueChange={setAppointmentType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new-consultation" id="new-consultation" />
                  <Label htmlFor="new-consultation">New Consultation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="follow-up" id="follow-up" />
                  <Label htmlFor="follow-up">Follow-up</Label>
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
                name="notes"
                placeholder="Any specific concerns or information for the doctor"
                value={formData.notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button
              type="button"
              className="w-full bg-primary text-white hover:bg-red-500"
              disabled={
                !formData.date ||
                !formData.timeSlot ||
                !patient || // Assuming `patient` is a separate state/prop
                !isValidReferral()
              }
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
                    className="rounded-md object-contain w-[130px] h-[123px]"
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
                  <MapboxExample location={dummyHospital.mapUrl} height={"200px"} width={"390px"}/>
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


