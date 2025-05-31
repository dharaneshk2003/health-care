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

  const { data, error } = await supabase
    .from('online_appointments')
    .insert(formFields)
    .select()
    .single();

  console.log(data, error);

  if (error) {
    return {
      error: error.message,
      formFields,
    };
  }

  return { success: true, data };
};


