import React from 'react'
import { getDataWithId, userDetails } from '../../backend.ts';
import UserBookingForm from '../../../components/UserBookingForm.tsx';

interface DoctorPageProps {
  params: {
    id: string;
  };
}

export default async function DoctorDetailsPage({ params }: DoctorPageProps) {
  const { id } = params; // ✅ NO await here

  const doctor = await getDataWithId(id);
  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  const info = await userDetails();

  return (
    <div>
      <UserBookingForm doctor={doctor} patient={info} />
    </div>
  );
}
