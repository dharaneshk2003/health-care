import React from 'react';
import DoctorEditProfile from '../../components/Profile/Doctor/DoctorEditProfile.tsx';
import { userDetails, getLoggedInDoctorDetails } from '../backend.ts';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile/DoctorProfile.tsx';
import PatientProfile from '../../components/Profile/Patient/PatientProfile.tsx';
export default async function Profile() {
  let isPresent = await getLoggedInDoctorDetails();
  let info = await userDetails();

  return (
    <div>
      {info.user_metadata.role === "doctor" ? (
        isPresent.present ? (
          <DoctorProfile doctor={isPresent.data} />
        ) : (
          <DoctorEditProfile doctor={info} />
        )
      ) : (
        <PatientProfile patient={info.user_metadata}/>
      )}
    </div>
  );
}

