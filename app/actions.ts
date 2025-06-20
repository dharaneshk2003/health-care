"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const signUpActionPatient = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString();
  const gender = formData.get("gender")?.toString();
  const age = formData.get("age");
  const mobile = formData.get("mobile")?.toString();
  const name = formData.get("name")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !role || !gender || !age || !mobile) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "All fields are required"
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        gender,
        age,
        mobile,
        name
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("[Sign Up Error]", error.code, error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link. After verifying your email, you can close this tab and sign in with your account."
  );
};

export const signUpActionDoctor = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString();
  const name = formData.get("name")?.toString();
  const department = formData.get("department")?.toString();
  const experience = formData.get("experience")?.toString(); // Renamed as experience in UI
  const education = formData.get("education")?.toString();
  const gender = formData.get("gender")?.toString();
  const mobile = formData.get("mobile")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !role || !name || !department || !experience || !education) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "All fields are required"
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        name,
        department,
        experience,
        education,
        gender,
        mobile
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("[Sign Up Error]", error.code, error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link. After verifying your email, you can close this tab and sign in with your account."
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString(); // 'doctor' or 'patient'
  const supabase = await createClient();

  if (!email || !password || !role) {
    return encodedRedirect("error", "/sign-in", "All fields are required");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // 🔍 Fetch the signed-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = user?.user_metadata?.role;

  // 🔐 Check if the user role matches the selected role
  if (userRole !== role) {
    // Sign them out if role doesn't match
    await supabase.auth.signOut();

    return encodedRedirect(
      "error",
      "/sign-in",
      `Role mismatch. You selected "${role}", but your account is "${userRole}".`
    );
  }

  // If everything is fine, redirect to the dashboard route



  if (userRole === "doctor") {
    return redirect("/dashboard");
  } else if (userRole === "patient") {
    return redirect("/doctors");
  }
  return redirect("/doctors"); // Default redirect if no specific role match
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/dashboard/reset-password`,
  });

  if (error) {
    console.error("[Reset Password Error]", error.message);
    return encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed"
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard/reset-password",
    "Password updated successfully"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createAppointment = async (prev, formData) => {
  const supabase = await createClient();

  const formFields = {
    appointment_date: formData.get('appointment_date')?.toString(),
    appointment_time: formData.get('appointment_time'),
    referral_id: formData.get('referral_id') || null,
    appointment_type: formData.get('appointment_type'),
    notes: formData.get('notes')?.toString() || null,
    patient_id: formData.get('patient_id'),
    doctor_id: formData.get('doctor_id'),
    consultation_fees: formData.get('consultation_fees'),
    total_fees: formData.get('total_fees'),
  };

  // ✅ Insert new appointment
  const { data: inserted, error } = await supabase
    .from('online_appointments')
    .insert(formFields)
    .select()
    .single();

 

  if (error) {
    return {
      error: error.message,
      formFields,
    };
  }

  // ✅ Clean up duplicates (keep only the latest)
  const { data: duplicates, error: fetchError } = await supabase
    .from('online_appointments')
    .select('id')
    .eq('patient_id', formFields.patient_id)
    .eq('doctor_id', formFields.doctor_id)
    .neq('id', inserted.id); // Exclude the newly inserted row

  if (!fetchError && duplicates.length > 0) {
    const duplicateIdsToDelete = duplicates.map(d => d.id);

    const { error: deleteError } = await supabase
      .from('online_appointments')
      .delete()
      .in('id', duplicateIdsToDelete);

    if (deleteError) {
      console.warn("Cleanup failed for duplicates:", deleteError.message);
    }
  }

  return { success: true, data: inserted };
};

export const updateAppointmentById = async (payload) => {
  const supabase = await createClient();

  if (!payload?.id) {
    console.error("Missing appointment ID in payload");
    return { data: null, error: "Missing appointment ID" };
  }

  const { id, ...updateFields } = payload;

  try {
    // ✅ Update the specific appointment
    const { data: updated, error } = await supabase
      .from('online_appointments')
      .update(updateFields)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating appointment:", error.message);
      return { data: null, error: error.message };
    }

    // ✅ Clean up duplicates (same patient_id and doctor_id, excluding this id)
    const { data: duplicates, error: fetchError } = await supabase
      .from('online_appointments')
      .select('id')
      .eq('patient_id', updateFields.patient_id)
      .eq('doctor_id', updateFields.doctor_id)
      .neq('id', id); // exclude updated one

    if (!fetchError && duplicates.length > 0) {
      const duplicateIdsToDelete = duplicates.map(d => d.id);

      const { error: deleteError } = await supabase
        .from('online_appointments')
        .delete()
        .in('id', duplicateIdsToDelete);

      if (deleteError) {
        console.warn("Duplicate cleanup failed after update:", deleteError.message);
      }
    }

    return { data: updated, error: null };

  } catch (err) {
    console.error("Unexpected error during update:", err);
    return { data: null, error: "Unexpected error during update" };
  }
};

export const createOfflineAppointment = async (prev: any, formData: FormData) => {
  const supabase = await createClient();
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

  const formFields = {
    offline_id: formData.get("offline_id")?.toString(),
    name: formData.get("name")?.toString(),
    phone: formData.get("phone")?.toString(),
    age: Number(formData.get("age")),
    gender: formData.get("gender")?.toString(),
    status: formData.get("status")?.toString(),
    doctor: formData.get("doctor")?.toString(),
    specialty: formData.get("specialty")?.toString(),
    date: formData.get("date")?.toString(),
    time: formData.get("time")?.toString(),
    notes: formData.get("notes")?.toString() || null,
    amount: Number(formData.get("amount")),
    user_id : user.id,
  };

  const { data, error } = await supabase
    .from("offline_appointments")
    .insert(formFields)
    .select()
    .single();

  if (error) {
    return {
      error: error.message,
      formFields,
    };
  }

  return { success: true, data };
};

export const createReferral = async (formData: FormData) => {
  const supabase = await createClient();

  const patient_id = formData.get("patient_id")?.toString() ?? "";
  const referral_id = formData.get("referral_id")?.toString() ?? "";
  const by_doctorid = formData.get("by_doctorid");
  const to_doctorid = formData.get("to_doctorid");
  

  const referralFields = {
    patient_id,
    referral_id,
    by_doctorid,
    to_doctorid,
  };

  // Insert row and select inserted data
  const { data, error } = await supabase
    .from("refferals")  // Ensure this is the correct table name
    .insert(referralFields)
    .select('*');  // Select all columns of inserted row(s)

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      error: error.message,
      referralFields,
    };
  }

  if (!data || data.length === 0) {
    return {
      error: "No data returned after insert.",
      referralFields,
    };
  }

  // Return the first inserted row as single object for convenience
  return { success: true, data };
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

  return {
    success: true,
    data,
  };
};

export const handleFileUpload = async (
  file: File,
  id: string,
  name: string,
  role : string
): Promise<string | null> => {
  const supabase = await createClient();

  if (!file) return null;
  let filePath = '';
if(role=="doctor"){
   filePath = `doctors/${name}_${id}.jpg`;
}else{
   filePath = `patients/${name}_${id}.jpg`
}

// ✅ Upload file to Supabase Storage with upsert
const { data: uploadData, error: uploadError } = await supabase.storage
  .from("profiles")
  .upload(filePath, file, {
    upsert: true,
  });


  if (uploadError) {
    console.warn("Upload error:", uploadError.message);
    return null;
  }

  // ✅ Get Public URL with cache-busting query
  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from("profiles")
    .getPublicUrl(filePath);

  if (publicUrlError) {
    console.warn("URL generation error:", publicUrlError.message);
    return null;
  }

  // Add a cache-busting query param to avoid stale image URLs
  const imageUrl = `${publicUrlData?.publicUrl}?t=${Date.now()}`;

  return imageUrl;
};

export const addDoctor = async (doctorData: Record<string, any>) => {
  const supabase = await createClient();

  const payload = {
    online_id: doctorData.online_id,
    doctor_name: doctorData.doctor_name,
    education: doctorData.education,
    department: doctorData.department,
    experience: doctorData.experience,
    address: doctorData.address,
    location: doctorData.location,
    available_days: doctorData.available_days,
    available_from_time: doctorData.available_from_time,
    available_to_time: doctorData.available_to_time,
    languages: doctorData.languages,
    consultation_fees: Number(doctorData.consultation_fees ?? 0),
    ratings: Number(doctorData.rating ?? 3),
    image_url: doctorData.image_url,
    mobile : doctorData.mobile,
    gender : doctorData.gender,
  };

  // 🛡 Use upsert to avoid duplicate primary key error
  const { data: inserted, error } = await supabase
    .from("doctors")
    .upsert([payload], { onConflict: "online_id" })
    .select()
    .single();

  if (error) {
    return { error: error.message, formFields: payload };
  }

  return { success: true, data: inserted };
};

export const addPatient = async (patientData: Record<string, any>) => {
  const supabase = await createClient();

  const payload = {
    online_id: patientData.online_id,
    patient_name: patientData.patient_name,
    email: patientData.email,
    age: Number(patientData.age ?? 0),
    gender: patientData.gender,
    mobile: patientData.mobile,
    image_url: patientData.image_url,
    user_id : patientData.user_id,
  };

  // 🛡 Use upsert to avoid duplicate primary key or conflict on unique online_id
  const { data: inserted, error } = await supabase
    .from("patients")
    .upsert([payload], { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    return { error: error.message, formFields: payload };
  }

  return { success: true, data: inserted };
};

export const createNotification = async (payload: {
  from_id: string;
  to_id: string;
  body: string;
  category: 'referal' | 'appointment';
}) => {
  const supabase = await createClient();

  // Basic validation (optional)
  if (!payload.from_id || !payload.to_id || !payload.body || !payload.category) {
    return {
      error: "Missing required fields in payload",
    };
  }

  const { data, error } = await supabase
    .from("notifications")
    .upsert([
      {
        from_id: payload.from_id,
        to_id: payload.to_id,
        body: payload.body,
        category: payload.category,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error inserting notification:", error.message);
    return { error: error.message };
  }

  return { success: true, data };
};




export const getDoctorWithId = async (id) => {
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

