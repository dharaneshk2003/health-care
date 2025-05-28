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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FormMessage } from "@/components/form-message";
import type { Message } from "@/components/form-message";

export default function DoctorLoginForm({ message }: { message: Message }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center text-primary">
                    Doctor Login
                </CardTitle>
                <CardDescription className="text-center">
                    Login to access your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="m-0">
                <form className="space-y-2 mt-0" action={signInAction}>
                    <input type="hidden" name="role" value="doctor" />
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="doctor@example.com" required />
                    </div>
                    <div className="space-y-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-8 p-1 h-auto"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </Button>
                    </div>
                    <Button type="submit" className="w-full text-white">
                        Sign in
                    </Button>
                    <FormMessage message={message} />
                </form>
            </CardContent>
        </Card>
    );
}
