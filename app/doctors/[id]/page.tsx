import React from 'react'
import { createClient } from "@/utils/supabase/server";
import { getDataWithId, userDetails } from '../../backend.ts';
import UserBookingForm from '../../../components/UserBookingForm';

type DoctorPageProps = {
  params: Promise<{ id: string }>;
};
export default async function DoctorDetailsPage({ params }: DoctorPageProps) {
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
