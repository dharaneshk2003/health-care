"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col">
      <Card className="w-full max-w-md mb-3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to manage your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-0">
          <form className="space-y-4 mt-0" action={signUpAction}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                minLength={6}
                required
              />
            </div>

            {/* Role Dropdown using primary Select */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select name="role" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
    <div className="">
      <SmtpMessage />
    </div>
    </div>
  );
}
