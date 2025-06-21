"use client";

import { useState } from "react";
import { signUpActionPatient } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PatientRegisterForm({ message }: { message: Message }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-md mb-3">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-primary">
          Patient Registration
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to manage your patient dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="" action={signUpActionPatient}>
          <div className="">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="patient@example.com" required className="mt-1" />
          </div>

          <div className="my-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter Here.." required className="mt-1" />
          </div>

          <div className="flex gap-4 my-2">
            <div className="w-1/2">
              <Label htmlFor="gender" className="">Gender</Label>
              <Select name="gender" required>
                <SelectTrigger id="gender" className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-1/2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" placeholder="Enter your age" required className="mt-1" />
            </div>
          </div>

          <div className="my-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" name="mobile" type="tel" placeholder="Enter your mobile number" required className="mt-1" />
          </div>
        
         <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="mt-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-[590px] top-[545px] h-auto"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <input type="hidden" name="role" value="patient" className="" />
          <SubmitButton pendingText="Signing up..." type="submit" className="w-full text-white mt-2">
            Sign up
          </SubmitButton>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in/patient" className="text-primary font-medium underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
