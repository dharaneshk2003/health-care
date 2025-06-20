"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Calendar, Clock, User, Phone, FileText, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createOfflineAppointment } from "../../app/actions.ts"
import { useToast } from "../../hooks/use-toast.ts"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation';
import { getUniqueDepartments } from "../../app/backend.ts"
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from 'next/link';
export function SupervisorOnlinePatients({ list, departmentList }) {
  const router = useRouter();
  const randomSixDigit = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState(list);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [formData, setFormData] = useState({
    offline_id: `POF-${randomSixDigit}`,
    name: "",
    phone: "",
    age: 0,
    gender: "",
    status: "",
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    notes: "",
    amount: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
  });

  const { toast } = useToast();

  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (field === "specialty") {
        return {
          ...prev,
          specialty: value,
          doctor: "", // Reset doctor on specialty change
        };
      }
      return {
        ...prev,
        [field]: field === "age" ? Number(value) : value,
      };
    });
  };

  const timeFormatForFrontEnd = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast({
        title: "Missing information",
        description: "Please select a valid date and time.",
        variant: "destructive",
      });
      return;
    }

    const payload = { ...formData, notes: formData.notes || "" };
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      form.append(key, String(value));
    });

    try {
      const result = await createOfflineAppointment(null, form);
      if (result.error) {
        toast({
          title: "Submission failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Added Successfully",
        description: "New patient data has been updated.",
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      //reload page
      setIsAddPatientOpen(false);
      window.location.reload();
      setTimeout(() => router.refresh(), 2000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create offline appointment.",
        variant: "destructive",
      });
    }
  };

  const selectedDoctors =
    departmentList.find((dept) => dept.department === formData.specialty)?.doctors || [];

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.offline_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <Alert className="bg-yellow-100 text-yellow-800 border-yellow-400">
        <AlertCircleIcon className="h-4 w-4 mr-2 text-yellow-700" />
        <AlertTitle className="text-sm">
              Add or edit the details in{' '}
              <Link href="/profile">
                <span className="font-bold underline text-yellow-900 hover:text-yellow-700 cursor-pointer">
                  profile
                </span>
              </Link>{' '}
              to register for consultation.
        </AlertTitle>
      </Alert>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offline Appointment System</h1>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/60">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Patient Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter patient name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => handleChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={(value) => handleChange("status", value)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Specialty */}
                    <div className="grid gap-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select
                        value={formData.specialty}
                        onValueChange={(value) => handleChange("specialty", value)}
                      >
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentList.map((dept) => (
                            <SelectItem key={dept.department} value={dept.department}>
                              {dept.department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Doctor */}
                    <div className="grid gap-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Select
                        value={formData.doctor}
                        onValueChange={(value) => handleChange("doctor", value)}
                        disabled={selectedDoctors.length === 0}
                      >
                        <SelectTrigger id="doctor">
                          <SelectValue placeholder={selectedDoctors.length ? "Select doctor" : "Select specialty first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedDoctors.map((doctor) => (
                            <SelectItem key={doctor} value={doctor}>
                              Dr. {doctor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Appointment Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Appointment Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleChange("time", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsAddPatientOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/60"
                    type="submit"
                  >
                    Add Patient
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <div
              className={`h-2 ${patient.status === "confirmed"
                ? "bg-green-500"
                : patient.status === "pending"
                  ? "bg-amber-500"
                  : "bg-red-500"
                }`}
            ></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} years, {patient.gender}
                  </p>
                </div>
                <Badge
                  variant={patient.status === "confirmed" ? "outline" : "default"}
                  className={
                    patient.status === "confirmed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : patient.status === "pending"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : ""
                  }
                >
                  {patient.status === "confirmed"
                    ? "Confirmed"
                    : patient.status === "pending"
                      ? "Pending"
                      : "Cancelled"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.doctor}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.specialty}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{timeFormatForFrontEnd(patient.time)}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-xs text-muted-foreground">Booking ID : {patient.offline_id}</p>
                  <p className="font-medium mt-1">Amount: ₹{patient.amount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                  <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showSuccessAlert && <AlertSuccess />}

      {filteredPatients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No patients found matching your search.</p>
        </div>
      )}
    </div>
  )
}
