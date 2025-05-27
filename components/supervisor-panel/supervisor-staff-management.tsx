"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  UserPlus,
  Stethoscope,
  User,
  Phone,
  Mail,
  Briefcase,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  FlaskRoundIcon as Flask,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SupervisorStaffManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("user-management")
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const staffCategories = [
    { id: "doctors", name: "Doctors", count: 12 },
    { id: "nurses", name: "Nurses", count: 24 },
    { id: "receptionists", name: "Receptionists", count: 8 },
    { id: "security", name: "Security", count: 6 },
    { id: "admin", name: "Administrative", count: 10 },
    { id: "lab", name: "Laboratory", count: 5 },
  ]

  const staffMembers = {
    doctors: [
      {
        id: "DOC-001",
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiology",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@hindsvaasth.com",
        status: "active",
        paymentStatus: "paid",
      },
      {
        id: "DOC-002",
        name: "Dr. Priya Sharma",
        specialty: "Dermatology",
        phone: "+91 87654 32109",
        email: "priya.sharma@hindsvaasth.com",
        status: "active",
        paymentStatus: "pending",
      },
      {
        id: "DOC-003",
        name: "Dr. Vikram Singh",
        specialty: "Orthopedic",
        phone: "+91 76543 21098",
        email: "vikram.singh@hindsvaasth.com",
        status: "inactive",
        paymentStatus: "paid",
      },
    ],
    nurses: [
      {
        id: "NUR-001",
        name: "Anjali Desai",
        specialty: "ICU",
        phone: "+91 65432 10987",
        email: "anjali.desai@hindsvaasth.com",
        status: "active",
        paymentStatus: "paid",
      },
      {
        id: "NUR-002",
        name: "Rahul Verma",
        specialty: "Emergency",
        phone: "+91 54321 09876",
        email: "rahul.verma@hindsvaasth.com",
        status: "active",
        paymentStatus: "paid",
      },
    ],
    receptionists: [
      {
        id: "REC-001",
        name: "Neha Gupta",
        specialty: "Front Desk",
        phone: "+91 43210 98765",
        email: "neha.gupta@hindsvaasth.com",
        status: "active",
        paymentStatus: "paid",
      },
    ],
    security: [],
    admin: [],
    lab: [],
  }

  const offlinePatients = [
    {
      id: "PAT-001",
      name: "Suresh Mehta",
      age: 52,
      gender: "Male",
      phone: "+91 98765 43210",
      doctor: "Dr. Rajesh Kumar",
      department: "Cardiology",
      status: "admitted",
    },
    {
      id: "PAT-002",
      name: "Meena Patel",
      age: 45,
      gender: "Female",
      phone: "+91 87654 32109",
      doctor: "Dr. Priya Sharma",
      department: "Dermatology",
      status: "discharged",
    },
    {
      id: "PAT-003",
      name: "Ravi Sharma",
      age: 35,
      gender: "Male",
      phone: "+91 76543 21098",
      doctor: "Dr. Vikram Singh",
      department: "Orthopedic",
      status: "admitted",
    },
  ]

  const filteredPatients = offlinePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderStaffMembers = () => {
    if (!selectedCategory) return null

    const members = staffMembers[selectedCategory as keyof typeof staffMembers] || []

    if (members.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No staff members found in this category.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className={`h-2 ${member.status === "active" ? "bg-green-500" : "bg-red-500"}`}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
                <Badge
                  variant={member.status === "active" ? "outline" : "default"}
                  className={
                    member.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {member.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>ID: {member.id}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    <Badge
                      variant="outline"
                      className={
                        member.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {member.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
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
                  <DropdownMenuItem>
                    {member.status === "active" ? (
                      <>
                        <UserX className="h-4 w-4 mr-2" />
                        Mark as Inactive
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Mark as Active
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Update Payment Status</DropdownMenuItem>
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
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Management</h1>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctors">Doctor</SelectItem>
                        <SelectItem value="nurses">Nurse</SelectItem>
                        <SelectItem value="receptionists">Receptionist</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="admin">Administrative</SelectItem>
                        <SelectItem value="lab">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="specialty">Specialty/Department</Label>
                    <Input id="specialty" placeholder="Enter specialty" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="id">Staff ID</Label>
                    <Input id="id" placeholder="Enter staff ID" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment">Payment Status</Label>
                    <Select>
                      <SelectTrigger id="payment">
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-secondary" onClick={() => setIsAddStaffOpen(false)}>
                  Add Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="user-management" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="patient-management">Patient Management (Offline)</TabsTrigger>
        </TabsList>

        <TabsContent value="user-management" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {staffCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedCategory === category.id ? "border-primary border-2" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  {category.id === "doctors" && <Stethoscope className="h-8 w-8 mb-2 text-primary" />}
                  {category.id === "nurses" && <UserPlus className="h-8 w-8 mb-2 text-primary" />}
                  {category.id === "receptionists" && <User className="h-8 w-8 mb-2 text-primary" />}
                  {category.id === "security" && <UserCheck className="h-8 w-8 mb-2 text-primary" />}
                  {category.id === "admin" && <Briefcase className="h-8 w-8 mb-2 text-primary" />}
                  {category.id === "lab" && <Flask className="h-8 w-8 mb-2 text-primary" />}
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} members</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {renderStaffMembers()}
        </TabsContent>

        <TabsContent value="patient-management" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="overflow-hidden">
                <div className={`h-2 ${patient.status === "admitted" ? "bg-blue-500" : "bg-green-500"}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years, {patient.gender}
                      </p>
                    </div>
                    <Badge
                      variant={patient.status === "admitted" ? "default" : "outline"}
                      className={
                        patient.status === "admitted"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-green-100 text-green-800 hover:bg-green-100"
                      }
                    >
                      {patient.status === "admitted" ? "Admitted" : "Discharged"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>ID: {patient.id}</span>
                    </div>
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{patient.doctor}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{patient.department}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{patient.phone}</span>
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
                      <DropdownMenuItem>
                        {patient.status === "admitted" ? "Discharge Patient" : "Re-admit Patient"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Transfer Department</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Record
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
        </TabsContent>
      </Tabs>
      <div className="h-[90px]"></div>
    </div>
  )
}
