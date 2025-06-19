
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { SupervisorPanel } from "@/components/supervisor-panel/supervisor-panel";
import { redirect } from "next/navigation";
import { getOfflineAppointments,LoggedInUserRefferals,getUniqueDepartments,LoggedInUserByRefferals } from "../backend.ts";


export default async function Dashboard() {
  let offlineAppointments = await getOfflineAppointments();
  let userRefferals = await LoggedInUserRefferals();
  let userByRefferals = await LoggedInUserByRefferals();
  let departments = await getUniqueDepartments();
  console.log(userByRefferals);
  return (
   <SupervisorPanel
    appointmentList={offlineAppointments}
    referralObject={userRefferals}
    referredBy = {userByRefferals}
    departmentList = {departments.data} // ✅ plain JSON object
  />
  );
}
