"use client";

import { useState } from "react";
import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormMessage } from "@/components/form-message";
import type { Message } from "@/components/form-message";
import { Eye, EyeOff } from "lucide-react"

export default function LoginForm({ message }: { message: Message }) {
    const [activeTab, setActiveTab] = useState("doctor");
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center text-primary">
                    {activeTab === "doctor" ? "Doctor Login" : "Patient Login"}
                </CardTitle>
                <CardDescription className="text-center">
                    Login to access your dashboard
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                    </TabsList>

                    <TabsContent value="doctor">
                        <form className="space-y-4 mt-4" action={signInAction}>
                            <input type="hidden" name="role" value="doctor" />
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="doctor@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
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
                                    className="absolute right-[605px] top-[389.5px] -translate-y-1/2 p-1 h-auto"
                                >{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            <Button type="submit" className="w-full text-white">
                                Sign in
                            </Button>
                            <FormMessage message={message} />
                        </form>
                    </TabsContent>

                    <TabsContent value="patient">
                        <form className="space-y-4 mt-4" action={signInAction}>
                            <input type="hidden" name="role" value="patient" />
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="doctor@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
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
                                    className="absolute right-[605px] top-[389.5px] -translate-y-1/2 p-1 h-auto"
                                >{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                            <Button type="submit" className="w-full text-white">
                                Sign in
                            </Button>
                            <FormMessage message={message} />
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                    <p>Demo Credentials:</p>
                    <p>Doctor: doctor@example.com / Sup1234</p>
                    <p>Patient: patient@example.com / Rec1234</p>
                </div>
            </CardFooter>
        </Card>
    );
}
