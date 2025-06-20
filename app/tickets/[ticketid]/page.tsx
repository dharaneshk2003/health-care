import React from 'react';
import AppointmentTicket from './AppointmentTicket';
import { userAppointmentList } from '../../backend.ts';

type AppointmentPageProps = {
  params: Promise<{ ticketid: any }>;
};
const AppointmentTicketPage = async ({ params }: AppointmentPageProps) => {
  const { ticketid } = await params;
  type Doctor = {
    id: number;
    doctor_name: string;
    department: string;
    experience: number;
    education: string;
    gender: string;
    mobile: string;
    image_url: string;
    address: string;
    location: string;
  };

  type Patient = {
    patient_name: string;
    age: number;
    gender: string;
    mobile: string;
    email: string;
    image_url: string;
    online_id: string;
  };

  type Appointment = {
    id: number;
    appointment_date: string;
    appointment_time: string;
    referral_id: string;
    notes: string;
    appointment_type: string;
    consultation_fees: number;
    total_fees: number;
    doctor_id: number;
  };

  type UserAppointmentListResult = {
    appointment: Appointment[];
    doctor: Doctor[];
    patient: Patient;
  };

  type FormattedAppointmentDetails = {
    doctorDetails: {
      name: string;
      specialty: string;
      experience: string;
      education: string;
      gender: string;
      mobile: string;
      image: string;
    };
    patientDetails: {
      name: string;
      age: number;
      gender: string;
      mobile: string;
      email: string;
      image: string;
      patientId: string;
    };
    appointmentDetails: {
      appointmentId : string;
      date: string;
      time: string;
      referralId: string;
      notes: string;
      appointmentType: string;
      consultationFee: number;
      totalFee: number;
    };
    hospitalDetails: {
      address: string;
      location: string;
    };
  };

  const getAppointmentDetailsById = (
    appointmentId: number,
    data: UserAppointmentListResult
  ): FormattedAppointmentDetails | null => {
    const appointment = data.appointment.find(app => app.id === appointmentId);
    if (!appointment) return null;

    const doctor = data.doctor.find(doc => doc.id === appointment.doctor_id);
    const patient = data.patient;

    if (!doctor || !patient) return null;

    return {
      doctorDetails: {
        name: doctor.doctor_name,
        specialty: doctor.department,
        experience: `${doctor.experience} years`,
        education: doctor.education,
        gender: doctor.gender,
        mobile: doctor.mobile,
        image: doctor.image_url
      },
      patientDetails: {
        name: patient.patient_name,
        age: patient.age,
        gender: patient.gender,
        mobile: patient.mobile,
        email: patient.email,
        image: patient.image_url,
        patientId: patient.online_id
      },
      appointmentDetails: {
        appointmentId:  appointment.id,
        date: appointment.appointment_date,
        time: appointment.appointment_time,
        referralId: appointment.referral_id,
        notes: appointment.notes,
        appointmentType: appointment.appointment_type,
        consultationFee: appointment.consultation_fees,
        totalFee: appointment.total_fees
      },
      hospitalDetails: {
        address: doctor.address,
        location: doctor.location
      }
    };
  };


const userData = await userAppointmentList();
const appointmentId = parseInt(ticketid, 10);
if (isNaN(appointmentId)) {
  return <div className="text-red-500">Invalid ticket ID</div>;
}
const mockData = getAppointmentDetailsById(appointmentId, userData);


  // Mock data for demonstration
  if (!mockData) {
  return <div className="text-red-600 p-4">Invalid appointment ID or data not found.</div>;
}

  return (
    <AppointmentTicket
      doctorDetails={mockData.doctorDetails}
      patientDetails={mockData.patientDetails}
      appointmentDetails={mockData.appointmentDetails}
      hospitalDetails={mockData.hospitalDetails} data-id="ugnb6vqvo" data-path="src/pages/AppointmentTicketPage.tsx" />);


};

export default AppointmentTicketPage;