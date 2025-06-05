import { getAllData, patientDetails, LoggedInUserAppointments, LoggedInUserRefferals } from '../backend';
import DoctorClient from './DoctorClient';

export default async function DoctorPage() {
  const doctorList = await getAllData();
  const user = await patientDetails();
  const metadata = user?.user_metadata;
  
  // Determine role
  const role = metadata?.role === 'doctor' ? 'doctor' : 'patient';

  // Determine engagement type and fetch relevant list
  let engagement = '';
  let engagementList = [];

  if (role === 'doctor') {
    engagement = 'referral';
    engagementList = await LoggedInUserRefferals() //👈 make sure this function exists in your backend
  } else if (role === 'patient') {
    engagement = 'appointment';
    engagementList = await LoggedInUserAppointments();
  }

  console.log(`${engagement} - ${JSON.stringify(engagementList, null, 2)}`)

  return (
    <DoctorClient
      doctorList={doctorList}
      role={role}
      user={user}
      engagement={engagement}
      engagementList={engagementList}
    />
  );
}
