"use client";
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card';
import { Button } from "../components/ui/button"
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";

type DoctorCardProps = {
    doctors: any[]; // Replace with accurate type if you have one
    user: any;
    role: string;
    engagement: string,
    engagementList: any[];
};
export default function DoctorCard({ doctors, user, role, engagement, engagementList }: DoctorCardProps) {
    const handleSubmit = (id) => {
        router.push(`/doctors/${id}`);
        console.log(id)
        console.log("user : ", user)
        console.log("role : ", role)
        console.log("engagement :", engagement)
        console.log("engagement list", engagementList);
    }

    const router = useRouter();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {doctors?.map((doctor, index) => (
                <Card key={index} className="w-[400px] mr-3-0">
                    <CardHeader className="pl-3 pb-1 pt-3">
                        <div className="flex mt-2">
                            <CardTitle className="text-2xl">{doctor.doctor_name}</CardTitle>
                            <span className="text-sm ml-4 mt-1 bg-primary text-white rounded-full h-6 px-2 pt-0.5">
                                ID : {doctor.id}
                            </span>
                        </div>

                        <CardDescription>{doctor.department}</CardDescription>
                        <div className="flex flex-row">
                            <FaStar color="#ec6409" className="h-4 w-4" />&nbsp;
                            <CardDescription className="mt-0.4">{doctor.ratings}</CardDescription>&nbsp;&nbsp;
                            <CardDescription>{doctor.reviews_count} reviews</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-3 py-0">
                        <p><strong>Experience:</strong> {doctor.experience} years</p>
                        <p><strong>Education:</strong> {doctor.education}</p>
                        <div>
                            <div className="flex flex-wrap gap-1">
                                <strong>Languages:</strong>
                                {doctor.languages?.map((lang, index) => (
                                    <div
                                        key={index}
                                    >
                                        {lang}{index == doctor.languages.length - 1 ? "." : ","}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {doctor.available_days?.map((days, index) => (
                                    <div
                                        key={index}
                                        className="px-1 border border-black-500 text-sm rounded font-bold bg-gray-100"
                                    >
                                        {days}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="my-2"></p>
                        <hr className="mb-2" />
                        <p className="mx-0 font-bold text-lg mt-1">Consultation Fee : ₹{doctor.consultation_fees}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                        {/* <Button className="bg-primary text-white mt-0 hover:bg-red-500 hover:text-white" onClick={()=>handleSubmit(doctor.id)}>{role=="doctor" ? "Give Referral" : "Book Appointment"}</Button> */}
                        {engagement === 'appointment' &&
                            engagementList.some((item) => item.doctor_id === doctor.id) ? (
                            <Button
                                className="bg-green-500 text-white mt-0 cursor-not-allowed"
                                disabled
                            >
                                Appointment Booked
                            </Button>
                        ) : (
                            <Button
                                className="bg-primary text-white mt-0 hover:bg-red-500 hover:text-white"
                                onClick={() => handleSubmit(doctor.id)}
                            >
                                {role === 'doctor' ? 'Give Referral' : 'Book Appointment'}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
