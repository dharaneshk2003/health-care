import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RefferdDoctorslist from "../RefferdDoctorslist.tsx"
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

export default function RefferdDoctorslist({ offlinePatients }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offlinePatients.map((patient) => (
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

            {offlinePatients.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No patients found matching your search.</p>
                </div>
            )}
        </div>
    )
}
