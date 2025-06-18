// DoctorClient.tsx
'use client';

import { useState } from 'react';
import DoctorCard from '../../components/DoctorCard';
import AirbnbSearchBar from '../../components/ui/AirbnbSearchBar.tsx';
import { UserCategoryFilters } from '../../components/ui/UserCategoryFilters';


type DoctorClientProps = {
  doctorList: any[]; // Replace with correct type if available
  role: any;
  user: any;
  engagement : any;
  engagementList : any[];
  to_doctorid : any;
};

export default function DoctorClient({ doctorList, role, user,engagement,engagementList,to_doctorid }: DoctorClientProps) {
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
      <AirbnbSearchBar onSubmit={handleFilterData} />
      <UserCategoryFilters onFilterChange={(departmentId) => setDepartmentValue(departmentId)} />

      {noMatchFound && searched && departmentValue !== "All" && (
        <p className="text-center text-red-500 font-semibold">
          No doctors matched your requirements. Showing All available doctors.
        </p>
      )}

      {/* ✅ Pass user and role to DoctorCard */}
      <DoctorCard doctors={filteredDoctors} user={user} role={role} engagement={engagement} engagementList={engagementList} to_doctorid={to_doctorid}/>
    </div>
  );
}
