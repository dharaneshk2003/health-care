import React from 'react'
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile.tsx'
import { userDetails } from '../backend.ts'
export default async function Profile() {
  let info = await userDetails();
  return (
    <div>
      <DoctorProfile doctor={info}/>
    </div>
  )
}
