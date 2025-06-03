import { createClient } from "../utils/supabase/server";

export const getFilteredDoctors = async (searchQuery) => {
  const supabase = await createClient();

  const { data: doctors, error } = await supabase
    .from('doctors')
    .select('*');

  if (error) {
    console.error("Error fetching doctors:", error.message);
    return [];
  }

  const { name, day, fromTime, toTime, department } = searchQuery;

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatches = name ? doctor.doctor_name.toLowerCase().includes(name.toLowerCase()) : true;
    const dayMatches = day ? doctor.available_days?.includes(day) : true;
    const fromTimeMatches = fromTime ? doctor.available_from_time <= fromTime : true;
    const toTimeMatches = toTime ? doctor.available_to_time >= toTime : true;
    const departmentMatches = department ? doctor.department === department : true;

    // Only include doctors who match all non-empty filters
    return nameMatches && dayMatches && fromTimeMatches && toTimeMatches && departmentMatches;
  });

  console.log("Filtered doctors:", filteredDoctors);
  return filteredDoctors;
};

export const getAllData = async () => {
  const supabase = await createClient();
  const { data: doctors, error } = await supabase.from('doctors').select('*');
  if (error) {
    console.error("Error fetching all doctors:", error.message);
    return [];
  }
  return doctors;
};


export const getDataWithId = async(id) =>{
  const supabase = await createClient();
  const { data: doctor, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching doctor by ID:", error.message);
    return null;
  }
  return doctor;
}

export const patientDetails = async() =>{
    const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userDetails = user;
  return userDetails;
}

export const getPatientId = async() =>{
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userDetails = user;
  return user.id;
}

export const getOnlineAppointments = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('online_appointments')
    .select('*')
    .order('id', { ascending: false }); // Optional: sort latest first

  if (error) {
    console.error("Error fetching appointment list:", error.message);
    return null;
  }

  return data;
};



export const getAppointment = async (doctorId) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('online_appointments')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('id', { ascending: false }) // latest first
    .limit(1)
    .single(); // get a single row instead of an array

  if (error) {
    console.error("Error fetching latest appointment by doctor ID:", error.message);
    return null;
  }

  return data;
};





export const getOfflineAppointments = async () => {
  const supabase = await createClient();
  const { data: offline_appointments, error } = await supabase.from('offline_appointments').select('*');
  if (error) {
    console.error("Error fetching offline appointments :", error.message);
    return [];
  }
  return offline_appointments;
};










