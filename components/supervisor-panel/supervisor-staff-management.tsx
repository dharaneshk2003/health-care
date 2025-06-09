"use client"

import { useState } from "react"

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RefferdDoctorslist from "../RefferdDoctorslist.tsx"
import { Button } from "@/components/ui/button"
export function SupervisorStaffManagement({referralObject}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("user-management")
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { refferal, doctors, patients } = referralObject;

const formattedPatients = refferal.map((ref, index) => {
  const patient = patients[index];
  const doctor = doctors[index];

  return {
    id: patient.offline_id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    doctor: doctor.doctor_name,
    department: doctor.department,
  };
});



  const offlinePatients = [
    {
      id: "PAT-001",
      name: "Suresh Mehta",
      age: 52,
      gender: "Male",
      phone: "+91 98765 43210",
      doctor: "Dr. Rajesh Kumar",
      department: "Cardiology",
    },
    {
      id: "PAT-002",
      name: "Meena Patel",
      age: 45,
      gender: "Female",
      phone: "+91 87654 32109",
      doctor: "Dr. Priya Sharma",
      department: "Dermatology",
    },
    {
      id: "PAT-003",
      name: "Ravi Sharma",
      age: 35,
      gender: "Male",
      phone: "+91 76543 21098",
      doctor: "Dr. Vikram Singh",
      department: "Orthopedic",
    },
  ]
  return (
    <div className="space-y-4 ml-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patient Refferal System</h1>
        <Button variant="outline" className="text-black" onClick={() => router.push("/doctors")}>Refer Patients</Button>
      </div>
      <h1 className="text-md">List of Patients that was refered.</h1>
      <RefferdDoctorslist offlinePatients={formattedPatients} referralObject={referralObject}/>
      <div className="h-[90px]"></div>
    </div>
  )
}
