"use client";
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Star,
    Clock,
    MapPin,
    GraduationCap,
    DollarSign,
    Languages,
    Calendar,
    Phone,
    Video,
    User
} from 'lucide-react';
import MapboxExample from '../../../../pages/MapboxExample.tsx';
interface Doctor {
    id: number;
    doctor_name: string;
    department: string;
    ratings: number;
    experience: number;
    education: string;
    consultation_fees: number;
    reviews_count: number;
    languages: string[];
    available_days: string[];
    available_from_time: string;
    available_to_time: string;
    image_url: string;
    address: string;
    location: string;
    online_id: string;
}

interface DoctorProfileProps {
    doctor: Doctor;
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
    if (!doctor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="p-8 text-center">
                    <div className="text-primary text-xl font-semibold">
                        No doctor data available.
                    </div>
                </Card>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-white">
            {/* Header */}
            <div className="mx-auto px-4 py-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Main Profile Card */}
                    <div className="lg:col-span-2">
                        <Card className="mb-6 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <Avatar className="w-[150px] h-[150px] border-4 border-white shadow-lg">
                                            <AvatarImage
                                                src={doctor.image_url}
                                                alt={doctor.doctor_name}
                                                className="w-full h-full object-cover"
                                            />
                                            <AvatarFallback className="text-2xl bg-white text-primary">
                                                {doctor.doctor_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold mb-2">Dr. {doctor.doctor_name}</h2>
                                            <p className="text-xl opacity-90 mb-3">{doctor.department}</p>
                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(doctor.ratings)}
                                                    <span className="ml-2">({doctor.reviews_count} reviews)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{doctor.experience} years experience</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Education */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                        Education
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 font-medium">{doctor.education}</p>
                                </CardContent>
                            </Card>

                            {/* Consultation Fees */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        Consultation Fee
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-primary">₹{doctor.consultation_fees}</p>
                                    <p className="text-sm text-gray-500">Per consultation</p>
                                </CardContent>
                            </Card>

                            {/* Languages */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Languages className="w-5 h-5 text-primary" />
                                        Languages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.languages.map((language, index) => (
                                            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                {language}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>



                            {/* Location */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium text-gray-800">{doctor.address}</p>
                                    <p className="text-sm text-gray-600">{doctor.location}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Availability */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Availability
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Available Days</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {doctor.available_days.map((day, index) => (
                                                <Badge key={index} className="bg-primary text-white hover:bg-primary/90">
                                                    {day}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Timing</h4>
                                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span className="font-medium">
                                                {formatTime(doctor.available_from_time)} - {formatTime(doctor.available_to_time)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/*map pointer */}
                        <Card className="shadow-lg mt-3">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#bd1818]">
                                    <MapPin className="w-6 h-6" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full h-[380px] rounded-lg overflow-hidden">
                                    <MapboxExample location={doctor.location} height={"380px"} width={"890px"} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}