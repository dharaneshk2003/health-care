
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { SupervisorPanel } from "@/components/supervisor-panel/supervisor-panel";
import { redirect } from "next/navigation";
import { getOfflineAppointments } from "../backend.ts";

export default async function Dashboard() {
  let offlineAppointments = await getOfflineAppointments();
  return (
   <SupervisorPanel appointmentList={offlineAppointments} />
  );
}
