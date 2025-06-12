import React from 'react'
import DoctorEditProfile from '../../components/Profile/Doctor/DoctorEditProfile.tsx';
import { userDetails } from '../backend.ts'
import { getLoggedInDoctorDetails } from '../backend.ts';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile/DoctorProfile.tsx';
export default async function Profile() {
  let isPresent = await getLoggedInDoctorDetails()
  let info = await userDetails();

  return (
    <div>
      {isPresent.present ? 
      <DoctorProfile doctor={isPresent.data}/> : <DoctorEditProfile doctor={info}/>
      }</div>
  )
}
