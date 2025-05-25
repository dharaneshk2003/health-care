import React from 'react'
import { getDataWithId } from '../../backend.ts';
import BookingForm from '../../../components/BookingForm.tsx';

export default async function DoctorDetailsPage({ params }: { params: { id: string } }){
    const { id } = await params;
    const doctor = await getDataWithId(id);
    if (!doctor) {
        return <div>Doctor not found</div>
    }

  return (

    <div>
      {/* {JSON.stringify(doctor)} */}
      <BookingForm doctor={doctor}/>
    </div>
  )
}
