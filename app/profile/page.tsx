import React from 'react';
import DoctorEditProfile from '../../components/Profile/Doctor/DoctorEditProfile';
import { userDetails, getLoggedInDoctorDetails, getLoggedInPatientDetails,transformToSampleAppointments } from '../backend';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile/DoctorProfile';
import PatientProfile from '../../components/Profile/Patient/PatientProfile';
export default async function Profile() {
  let isPresent = await getLoggedInDoctorDetails();
  let info = await userDetails();
  let isPatientPresent = await getLoggedInPatientDetails();
  let userAppointments = await transformToSampleAppointments();
  console.log(userAppointments);
  return (
    <div>
      {info.user_metadata.role === "doctor" ? (
        <DoctorEditProfile doctor={info} existingData={isPresent.data} />
      ) : (info.user_metadata.role === "patient" ? (
        <PatientProfile patientDetails={info.user_metadata} existingData={isPatientPresent.data} userAppointments={userAppointments}/>
      ) : (<></>))}

    </div>
  );
}

