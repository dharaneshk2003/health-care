import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { Heart, Bell, Settings, LogOut } from "lucide-react"
import { getLoggedInDoctorDetails, getLoggedInPatientDetails,getUserNotifications } from '../app/backend.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Notification from "../pages/Notification";



export default async function AuthButton() {
  const isPresent = await getLoggedInDoctorDetails();
  const supabase = await createClient();
  let isPatientPresent = await getLoggedInPatientDetails();
  let notifications = await getUserNotifications();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = user?.user_metadata?.role;
  let name = user?.user_metadata?.name;

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up" className="text-white">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    role == "doctor" ? (
      <div className="flex items-center space-x-4">
        <Notification messages={notifications}/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {isPresent.present ? <AvatarImage src={isPresent.data.image_url} alt="User" /> : <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face" alt="User" />}
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <Link href="/dashboard">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{isPresent?.data?.doctor_name || name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <><Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem></Link></>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutAction}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
      <div className="flex items-center space-x-4 mt-2">
        <Notification messages={notifications}/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {isPatientPresent?.present ? (<AvatarImage src={isPatientPresent?.data.image_url} alt="User" />
                ) :
                  (<AvatarImage src="https://media.gettyimages.com/id/1777940832/vector/healthcare-concept-vector-illustration-stethoscope-doctors-illness-patients.jpg?s=612x612&w=0&k=20&c=xMq7jzLoyR9anba0KBLphv9i4uX3HK4zPkIwYkgG57Y=" alt="User" />)}
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{isPatientPresent?.present ? isPatientPresent?.data.patient_name : name}</p>
                <p className="text-xs leading-none text-muted-foreground">{isPatientPresent?.present ? isPatientPresent?.data.email : user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <><Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem></Link></>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" onClick={signOutAction} className="flex mb-1">
          <LogOut className="h-5 w-5" />
          <span className="">Log out</span>
        </Button>
      </div>
    )
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
