import React from 'react'
import PaymentInterface from '../../../../components/PaymentInterface.tsx';
import { getDataWithId, userDetails as getPatientDetails, getAppointment,getDoctorOnlineId } from "../../../backend.ts";
import { createClient } from "@/utils/supabase/server";

type PaymentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConformationPage({ params }: DoctorPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const doctor = await getDataWithId(id);
  const to_id = await getDoctorOnlineId(id);
  let appointment = await getAppointment(id);
  if (!doctor) {
    return <div>Doctor not found</div>
  }
  console.log("converted :",to_id);
  const patient = await getPatientDetails();
  

  return (
    <div>
      <PaymentInterface doctor={doctor} patient={patient} appointment={appointment} to_id ={to_id}/>
    </div>
  );
}
