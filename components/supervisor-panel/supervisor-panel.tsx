"use client"

import { useState } from "react"
import { SupervisorSidebar } from "./supervisor-sidebar"
import { SupervisorOnlinePatients } from "./supervisor-online-patients"
import { SupervisorStaffManagement } from "./supervisor-staff-management"
import { SupervisorAnalytics } from "./supervisor-analytics"
import { SupervisorHeader } from "./supervisor-header"


type SupervisorView = "onlinePatients" | "staffManagement" | "analytics"

export function SupervisorPanel() {
  const [currentView, setCurrentView] = useState<SupervisorView>("onlinePatients")

  const navigateTo = (view: SupervisorView) => {
    setCurrentView(view)
  }

  return (
    <div className="m-0 bg-muted/30 flex flex-col w-[1200px]">
      <div className="flex flex-1">
        <SupervisorSidebar currentView={currentView} onNavigate={navigateTo} />

        <main className="flex-1 py-0 pl-2">
          {currentView === "onlinePatients" && <SupervisorOnlinePatients />}
          {currentView === "staffManagement" && <SupervisorStaffManagement />}
          {currentView === "analytics" && <SupervisorAnalytics />}
        </main>
      </div>
    </div>
  )
}
