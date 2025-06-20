"use client"

import { useState } from "react"
import { SupervisorSidebar } from "./supervisor-sidebar"
import { SupervisorOnlinePatients } from "./supervisor-online-patients"
import { SupervisorStaffManagement } from "./supervisor-staff-management"
import { SupervisorAnalytics } from "./supervisor-analytics"
import { SupervisorHeader } from "./supervisor-header"


type SupervisorView = "onlinePatients" | "refferalManagement" | "analytics"

interface Appointment {
  id: number;
  offline_id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other'; // you can expand this if needed
  phone: string;
  doctor: string;
  specialty: string;
  hospital: string;
  date: string;  // ISO format date, e.g., '2023-05-15'
  time: string;  // e.g., '10:30:00'
  status: 'confirmed' | 'pending' | 'cancelled'; // Add other statuses if needed
  amount: number;
}

interface ReferralEntry {
  refferal: any[];
  doctors: { doctor_name: string; department: string }[];
  patients: { name: string; age: number; gender: string; offline_id: string; phone: string }[];
}

export interface SupervisorPanelProps {
  appointmentList: Appointment[];
  referralObject: ReferralEntry | null;
  referredBy: ReferralEntry | null; // <- update to match the new shape
}


export function SupervisorPanel({ appointmentList,referralObject,departmentList,referredBy }: SupervisorPanelProps) {
  const [currentView, setCurrentView] = useState<SupervisorView>("onlinePatients")
  const navigateTo = (view: SupervisorView) => {
    setCurrentView(view)
  }

  return (
    <div className="m-0 bg-muted/30 flex flex-col w-[1200px]">
      <div className="flex flex-1">
        <SupervisorSidebar currentView={currentView} onNavigate={navigateTo} />

        <main className="flex-1 py-0 pl-2">
          {currentView === "onlinePatients" && <SupervisorOnlinePatients list= {appointmentList} departmentList={departmentList}/>}
          {currentView === "refferalManagement" && <SupervisorStaffManagement referralObject={referralObject} referredBy={referredBy}/>}
          {/* {currentView === "analytics" && <SupervisorAnalytics />} */}
        </main>
      </div>
    </div>
  )
}
