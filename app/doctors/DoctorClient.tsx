'use client';
import { useState } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from 'next/link';
import DoctorCard from '../../components/DoctorCard';
import AirbnbSearchBar from '../../components/ui/AirbnbSearchBar';
import { UserCategoryFilters } from '../../components/ui/UserCategoryFilters';


type DoctorClientProps = {
  doctorList: any[]; // Replace with correct type if available
  role: any;
  user: any;
  engagement: any;
  engagementList: any[];
};

export default function DoctorClient({ doctorList, role, user, engagement, engagementList }: DoctorClientProps) {
  const [filteredDoctors, setFilteredDoctors] = useState(doctorList);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [departmentValue, setDepartmentValue] = useState("All");

  const handleFilterData = async (filters) => {
    setSearched(true);

    const formData = {
      ...filters,
      department: departmentValue !== 'All' ? departmentValue : null,
    };



    const res = await fetch('/api/filterDoctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.length === 0) {
      setNoMatchFound(true);
      setFilteredDoctors(doctorList);
    } else {
      setNoMatchFound(false);
      setFilteredDoctors(data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Alert className="bg-yellow-100 text-yellow-800 border-yellow-400">
        <AlertCircleIcon className="h-4 w-4 mr-2 text-yellow-700" />
        <AlertTitle className="text-sm">
          {role === "patient" ? (
            <>
              Add or edit your details in{' '}
              <Link href="/profile">
                <span className="font-bold underline text-yellow-900 hover:text-yellow-700 cursor-pointer">
                  profile
                </span>
              </Link>{' '}
              for consulting doctors.
            </>
          ) : (
            <>
              Add or edit the details in{' '}
              <Link href="/profile">
                <span className="font-bold underline text-yellow-900 hover:text-yellow-700 cursor-pointer">
                  profile
                </span>
              </Link>{' '}
              to register for consultation.
            </>
          )}
        </AlertTitle>
      </Alert>
      <AirbnbSearchBar onSubmit={handleFilterData} />
      <UserCategoryFilters onFilterChange={(departmentId) => setDepartmentValue(departmentId)} />

      {noMatchFound && searched && departmentValue !== "All" && (
        <p className="text-center text-red-500 font-semibold">
          No doctors matched your requirements. Showing All available doctors.
        </p>
      )}

      {/* ✅ Pass user and role to DoctorCard */}
      <DoctorCard doctors={filteredDoctors} user={user} role={role} engagement={engagement} engagementList={engagementList} />
    </div>
  );
}
