
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { SupervisorPanel } from "@/components/supervisor-panel/supervisor-panel";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
   <SupervisorPanel/>
  );
}
