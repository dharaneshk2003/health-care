import React from 'react'
import PaymentInterface from '../../../../components/PaymentInterface.tsx';
import {getDataWithId} from "../../../backend.ts";

export default async function ConformationPage({ params }: { params: { id: string }}) {
  const { id } = await params;
    const doctor = await getDataWithId(id);
    if (!doctor) {
        return <div>Doctor not found</div>
    }
  return (
    <div>
      <PaymentInterface doctor={doctor}/>
    </div>
  )
}
