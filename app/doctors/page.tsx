import { getAllData, patientDetails, LoggedInuserAppointments, LoggedInUserReferrals } from '../backend';
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
    engagementList = []// await LoggedInUserReferrals() 👈 make sure this function exists in your backend
  } else if (role === 'patient') {
    engagement = 'appointment';
    engagementList = await LoggedInuserAppointments();
  }

  console.log(`Engagement (${engagement}) list:`, engagementList);

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
