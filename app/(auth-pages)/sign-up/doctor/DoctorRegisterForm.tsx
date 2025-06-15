"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpActionDoctor } from "@/app/actions";
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

export default function DoctorRegisterForm({ message }: { message: Message }) {
  const [showPassword, setShowPassword] = useState(false);
  const categories = [
    { id: "All", name: "All Types" },
    { id: "Cardiology", name: "Cardiology" },
    { id: "Orthopedic", name: "Orthopedic" },
    { id: "Pediatric", name: "Pediatric" },
    { id: "Neurology", name: "Neurology" },
    { id: "Dermatology", name: "Dermatology" },
    { id: "Diagnostic", name: "Diagnostic" },
    { id: "Gynecology", name: "Gynecology" },
    { id: "Ophthalmology", name: "Ophthalmology" },
    { id: "Dental", name: "Dental" },
  ];


  return (
    <Card className="w-full max-w-md mb-3">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-primary">
          Doctor Registration
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to manage your doctor dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="mt-0" action={signUpActionDoctor}>
          <input type="hidden" name="role" value="doctor" />

          <div className="my-2">
            <Label htmlFor="name">Doctor Name</Label>
            <Input id="name" name="name" required className="mt-1" placeholder="doctor name" />
          </div>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-1" placeholder="email" />
          </div>

          <div className="flex gap-4 my-2">
            <div className="w-1/2">
              <Label htmlFor="department">Department</Label>
              <Select name="department" required>
                <SelectTrigger id="department" className="mt-1">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-1/2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="in years"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="my-2">
            <Label htmlFor="education">Education</Label>
            <Input id="education" name="education" required className="mt-1" placeholder="education" />
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-0 mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={6}
                required
                placeholder="Enter password"
                className="flex-1 rounded-r-none"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword((prev) => !prev)}
                className="h-full border border-gray-200 py-[11px] border-l-0 m-0"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-4 my-2">
            {/* Gender Select */}
            <div className="w-1/2">
              <Label htmlFor="gender">Gender</Label>
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

            {/* Mobile Input */}
            <div className="w-1/2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                required
                className="mt-1"
              />
            </div>
          </div>



          <SubmitButton pendingText="Signing up..." className="w-full mt-2">
            Sign up
          </SubmitButton>

          <FormMessage message={message} />
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
