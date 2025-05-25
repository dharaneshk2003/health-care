import React from 'react'
import { getDataWithId } from '../../backend.ts';
import UserBookingForm from '../../../components/UserBookingForm.tsx';
export default async function DoctorDetailsPage({ params }: { params: { id: string } }){
    const { id } = await params;
    const doctor = await getDataWithId(id);
    if (!doctor) {
        return <div>Doctor not found</div>
    }

  return (

    <div>
      {/* {JSON.stringify(doctor)} */}
      <UserBookingForm doctor={doctor}/>
    </div>
  )
}
