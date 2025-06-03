import { getAllData } from '../backend';
import DoctorClient from './DoctorClient';


export default async function DoctorPage() {
  const doctorList = await getAllData();
  // fetch all doctors only
  return <DoctorClient doctorList={doctorList} />;
}
