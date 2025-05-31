import React from 'react'
import PaymentInterface from '../../../../components/PaymentInterface.tsx';
import { getDataWithId, patientDetails as getPatientDetails } from "../../../backend.ts";
import { createClient } from "@/utils/supabase/server";

export default async function ConformationPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();

  const doctor = await getDataWithId(id);
  if (!doctor) {
    return <div>Doctor not found</div>
  }

  const patient = await getPatientDetails();

  return (
    <div>
      <PaymentInterface doctor={doctor} patient={patient} />
    </div>
  );
}
