"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FormMessage } from "@/components/form-message";
import type { Message } from "@/components/form-message";


export default function PatientLoginForm({ message }: { message: Message }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Card className="w-full max-w-md mt-5">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center text-primary">
                        Patient Login
                    </CardTitle>
                    <CardDescription className="text-center">
                        Login to book appointment
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form className="" action={signInAction}>
                        <input type="hidden" name="role" value="patient" />

                        <div className="">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required className="mt-2" placeholder="email"/>
                        </div>

                        <div className="my-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="enter password"
                                type={showPassword ? "text" : "password"}
                                minLength={6}
                                required
                                className="mt-2"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-[598px] top-[345.5px] h-auto"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </Button>
                        </div>

                        <SubmitButton pendingText="Signing in..." className="w-full mt-3">
                            Sign in
                        </SubmitButton>

                        <FormMessage message={message} />
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
