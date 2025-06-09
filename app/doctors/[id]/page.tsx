import React from 'react'
import { createClient } from "@/utils/supabase/server";
import { getDataWithId, userDetails } from '../../backend.ts';
import UserBookingForm from '../../../components/UserBookingForm.tsx';


export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params; // ✅ Fix here

  const doctor = await getDataWithId(id);
  if (!doctor) {
    return <div>Doctor not found</div>
  }

  let info = await userDetails();


  return (
    <div>
      <UserBookingForm doctor={doctor} patient={info} />
    </div>
  )
}
