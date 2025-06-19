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


export const getDataWithId = async (id) => {
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

export const userDetails = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let details = user;
  return details;
}

export const getPatientId = async () => {
  let user = await userDetails();
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


export const LoggedInUserAppointments = async () => {
  const supabase = await createClient();

  // Get the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  // Fetch all appointments booked by the logged-in user
  const { data, error } = await supabase
    .from('online_appointments')
    .select('*')
    .eq('patient_id', user.id)  // or .eq('patient_id', user.id) if your table uses `patient_id`
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching appointments for user:", error.message);
    return null;
  }

  return data; // an array of appointments
};

export const getAppointmentsByReferral = async (patient_id: string) => {
  const supabase = await createClient();

  if (!patient_id) {
    return {
      error: "Missing patient_id",
      data: null,
    };
  }

  const { data, error } = await supabase
    .from("offline_appointments")
    .select("*")
    .eq("offline_id", patient_id);

  if (error) {
    console.error("Supabase query error:", error.message);
    return {
      error: error.message,
      data: null,
    };
  }

  return data;
};

export const LoggedInUserRefferals = async () => {
  const supabase = await createClient();

  // Get the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  // Fetch all referrals made by the logged-in doctor
  const { data, error } = await supabase
    .from('refferals')
    .select('*')
    .eq('by_doctorid', user.id);

  if (error) {
    console.error("Error fetching referrals:", error.message);
    return null;
  }

  // Fetch doctor data for each to_doctorid
  const doctors = await Promise.all(
    data.map((referral) => getDataWithId(referral.to_doctorid))
  );

  // Extract only required fields from doctor data
  const formattedDoctors = doctors.map((doc) => ({
    doctor_name: doc?.doctor_name,
    department: doc?.department,
  }));

  // Fetch patient data for each patient_id (used as offline_id)
  const patients = await Promise.all(
    data.map((referral) => getAppointmentsByReferral(referral.patient_id))
  );

  const formattedPatients = patients.map((patArr) => {
    const pat = Array.isArray(patArr) ? patArr[0] : undefined;

    return {
      name: pat?.name,
      age: pat?.age,
      gender: pat?.gender,
      offline_id: pat?.offline_id,
      phone: pat?.phone,
    };
  });


  // Extract only required fields from patient data
  const dataObject = {
    refferal: data,
    doctors: formattedDoctors,
    patients: formattedPatients,
  };

  return dataObject;
};

export const getDoctorDetailsByOnlineId = async (onlineId) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('doctors')
    .select('id, doctor_name, department') // Add any other fields needed
    .eq('online_id', onlineId)
    .single();

  if (error) {
    console.error("Error fetching doctor details:", error.message);
    return null;
  }

  return data;
};

export const getDoctorDetailsById = async (id) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('doctors')
    .select('id, doctor_name, department')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching doctor by ID:", error.message);
    return null;
  }

  return data;
};

export const LoggedInUserByRefferals = async () => {
  const supabase = await createClient();

  // Step 1: Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { refferal: [], doctors: [], patients: [] };

  // Step 2: Get doctor details of logged-in user to get their numeric ID
  const doctorData = await getDoctorDetailsByOnlineId(user.id);
  if (!doctorData) return { refferal: [], doctors: [], patients: [] };

  const doctorId = doctorData.id;

  // Step 3: Fetch all referrals where current doctor is the receiver
  const { data: referrals, error: referralError } = await supabase
    .from('refferals')
    .select('*')
    .eq('to_doctorid', doctorId);

  if (referralError) {
    console.error('Error fetching referrals:', referralError.message);
    return { refferal: [], doctors: [], patients: [] };
  }

  // Step 4: Fetch doctor details for each by_doctorid
  const doctorDetailsList = await Promise.all(
    referrals.map(async (ref) => {
      const details = await getDoctorDetailsByOnlineId(ref.by_doctorid);
      return (
        details || {
          doctor_name: undefined,
          department: undefined,
        }
      );
    })
  );

  // Step 5: Fetch patient info for each referral
  const patientDetailsList = await Promise.all(
    referrals.map(async (ref) => {
      const patArr = await getAppointmentsByReferral(ref.patient_id);
      const pat = Array.isArray(patArr) ? patArr[0] : null;

      return pat
        ? {
            name: pat.name,
            age: pat.age,
            gender: pat.gender,
            offline_id: pat.offline_id,
            phone: pat.phone,
          }
        : {
            name: undefined,
            age: undefined,
            gender: undefined,
            offline_id: ref.patient_id,
            phone: undefined,
          };
    })
  );

  return {
    refferal: referrals,
    doctors: doctorDetailsList,
    patients: patientDetailsList,
  };
};



export const getLoggedInDoctorDetails = async () => {
  const supabase = await createClient();

  // Step 1: Get the current logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { present: false, data: null };
  }

  const userId = user.id;

  // Step 2: Query the doctors table by online_id
  const { data: doctor, error: doctorError } = await supabase
    .from("doctors")
    .select("*")
    .eq("online_id", userId)
    .single();

  if (doctorError || !doctor) {
    return { present: false, data: null };
  }

  return { present: true, data: doctor };
};

export const getUniqueDepartments = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("doctors")
    .select("department, doctor_name")
    .neq("department", null);

  if (error) {
    return { error: error.message };
  }

  // Group doctor names by department
  const grouped: Record<string, string[]> = {};

  data.forEach(({ department, doctor_name }) => {
    if (!grouped[department]) {
      grouped[department] = [];
    }
    grouped[department].push(doctor_name);
  });

  // Convert to an array if needed
  const departmentsWithDoctors = Object.entries(grouped).map(([department, doctors]) => ({
    department,
    doctors,
  }));

  return { success: true, data: departmentsWithDoctors };
};

export const getLoggedInPatientDetails = async () => {
  const supabase = await createClient();

  // Step 1: Get the current logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { present: false, data: null };
  }

  const userId = user.id;

  // Step 2: Query the doctors table by online_id
  const { data: patient, error: doctorError } = await supabase
    .from("patients")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (doctorError || !patient) {
    return { present: false, data: null };
  }

  return { present: true, data: patient };
};

export const getUserNotifications = async () => {
  try {
    const supabase = await createClient();

    // Step 1: Get the logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      const reason = userError?.message || "No user session found";
      console.error("User Fetch Error:", reason);
      return {
        error: `Auth Error: ${reason}`,
        notifications: [],
      };
    }

    const userId = user.id;

    // Step 2: Fetch notifications where to_id == user.id
    const { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("to_id", userId)
      .order("id", { ascending: false });

    if (error) {
      console.error("Notification Fetch Error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return {
        error: `DB Error: ${error.message} (Code: ${error.code}, Hint: ${error.hint})`,
        notifications: [],
      };
    }

    return { notifications };
  } catch (e: any) {
    console.error("Unexpected Exception:", e);
    return {
      error: `Unexpected Error: ${e.message ?? e.toString()}`,
      notifications: [],
    };
  }
};

export const getDoctorOnlineId = async (doctorId) => {
  let supabase = await createClient()
  const { data, error } = await supabase
    .from('doctors')
    .select('online_id')
    .eq('id', doctorId)
    .single();

  if (error) {
    console.error('Error fetching online_id:', error.message);
    return null;
  }

  return data?.online_id || null;
}
