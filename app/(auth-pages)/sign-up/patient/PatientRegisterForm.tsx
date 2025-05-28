"use client";

import { useState } from "react";
import { signUpAction } from "@/app/actions";
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
        <form className="space-y-2 relative" action={signUpAction}>
          <input type="hidden" name="role" value="patient" />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              className=""
              type={showPassword ? "text" : "password"}
              minLength={6}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-8 p-1 h-auto mt-5"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <SubmitButton pendingText="Signing up..." className="w-full">
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
