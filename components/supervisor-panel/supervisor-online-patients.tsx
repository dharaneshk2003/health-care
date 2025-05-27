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

export function SupervisorOnlinePatients() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  const onlinePatients = [
    {
      id: "HSS-123456",
      name: "Rahul Sharma",
      age: 45,
      gender: "Male",
      phone: "+91 98765 43210",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      hospital: "Arogya Multi-Specialty Hospital",
      date: "May 15, 2023",
      time: "10:30 AM",
      status: "confirmed",
      amount: 1200,
    },
    {
      id: "HSS-789012",
      name: "Priya Patel",
      age: 32,
      gender: "Female",
      phone: "+91 87654 32109",
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatology",
      hospital: "Skin & Care Clinic",
      date: "June 22, 2023",
      time: "2:15 PM",
      status: "pending",
      amount: 1000,
    },
    {
      id: "HSS-345678",
      name: "Amit Singh",
      age: 28,
      gender: "Male",
      phone: "+91 76543 21098",
      doctor: "Dr. Vikram Singh",
      specialty: "Orthopedic",
      hospital: "Joint Care Center",
      date: "July 8, 2023",
      time: "11:00 AM",
      status: "confirmed",
      amount: 1500,
    },
    {
      id: "HSS-901234",
      name: "Sneha Gupta",
      age: 35,
      gender: "Female",
      phone: "+91 65432 10987",
      doctor: "Dr. Ananya Patel",
      specialty: "Pediatrics",
      hospital: "Children's Wellness Center",
      date: "July 12, 2023",
      time: "9:45 AM",
      status: "pending",
      amount: 900,
    },
  ]

  const filteredPatients = onlinePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Online Patient List</h1>

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
              <Button className="bg-primary hover:bg-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Patient Name</Label>
                    <Input id="name" placeholder="Enter patient name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Age" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
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
                  <div className="grid gap-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select>
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-rajesh">Dr. Rajesh Kumar</SelectItem>
                        <SelectItem value="dr-priya">Dr. Priya Sharma</SelectItem>
                        <SelectItem value="dr-vikram">Dr. Vikram Singh</SelectItem>
                        <SelectItem value="dr-ananya">Dr. Ananya Patel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="orthopedic">Orthopedic</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Appointment Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Appointment Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-secondary" onClick={() => setIsAddPatientOpen(false)}>
                  Add Patient
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <div
              className={`h-2 ${
                patient.status === "confirmed"
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
                  <span>{patient.time}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-xs text-muted-foreground">Booking ID: {patient.id}</p>
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

      {filteredPatients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No patients found matching your search.</p>
        </div>
      )}
    </div>
  )
}
