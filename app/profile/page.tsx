import React from 'react';
import DoctorEditProfile from '../../components/Profile/Doctor/DoctorEditProfile.tsx';
import { userDetails, getLoggedInDoctorDetails, getLoggedInPatientDetails } from '../backend.ts';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile/DoctorProfile.tsx';
import PatientProfile from '../../components/Profile/Patient/PatientProfile.tsx';
export default async function Profile() {
  let isPresent = await getLoggedInDoctorDetails();
  let info = await userDetails();
  let isPatientPresent = await getLoggedInPatientDetails();
  console.log("patient details :", isPatientPresent);
  return (
    <div>
      {info.user_metadata.role === "doctor" ? (
        <DoctorEditProfile doctor={info} existingData={isPresent.data} />
      ) : (info.user_metadata.role === "patient" ? (
        <PatientProfile patientDetails={info.user_metadata} existingData={isPatientPresent.data} />
      ) : (<h1>no one logged in </h1>))}

    </div>
  );
}

