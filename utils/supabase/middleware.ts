import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
     const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const role = user?.user_metadata?.role;

  // If the user tries to access /dashboard but is not a doctor or not authenticated
  if (request.nextUrl.pathname.startsWith("/dashboard") && (!user || role !== "doctor")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If the user visits "/" and is authenticated, redirect them to /dashboard
  if (request.nextUrl.pathname === "/" && role === "doctor") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(request.nextUrl.pathname === "/" && (role === "patient" || !user)){
    return NextResponse.redirect(new URL("/doctors", request.url));
  }

  if((request.nextUrl.pathname === "/sign-in/doctor" || request.nextUrl.pathname==="/sign-up/doctor") && (role==="patient")){
    return NextResponse.redirect(new URL("/sign-in/patient", request.url));
  }

  if((request.nextUrl.pathname === "/sign-in") && (role==="patient" || !user)){
    return NextResponse.redirect(new URL("/sign-in/patient", request.url));
  }

  if((request.nextUrl.pathname === "/sign-up") && (role==="patient" || !user)){
    return NextResponse.redirect(new URL("/sign-up/patient", request.url));
  }

  if((request.nextUrl.pathname === "/sign-in") && (role==="doctor")){
    return NextResponse.redirect(new URL("/sign-in/doctor", request.url));
  }

  if((request.nextUrl.pathname === "/sign-up") && (role==="doctor" || !user)){
    return NextResponse.redirect(new URL("/sign-up/doctor", request.url));
  }


   if((request.nextUrl.pathname.startsWith("/doctors")) && (role==="doctor")){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }



    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
