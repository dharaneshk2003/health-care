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


