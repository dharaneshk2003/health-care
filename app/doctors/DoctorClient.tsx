'use client';

import { useState } from 'react';
import DoctorCard from '../../components/DoctorCard';
import AirbnbSearchBar from '../../components/ui/AirbnbSearchBar.tsx';
import { UserCategoryFilters } from '../../components/ui/UserCategoryFilters'; // update path as needed

export default function DoctorClient({ doctorList }) {
  const [filteredDoctors, setFilteredDoctors] = useState(doctorList);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [departmentValue, setDepartmentValue] = useState("All"); // 🆕 selected department

  const handleFilterData = async (filters) => {
    setSearched(true);

    const formData = {
      ...filters,
      department: departmentValue !== 'All' ? departmentValue : null,
    };

    console.log("Final FormData sent to backend:", formData);

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
      {/* Search bar */}
      <AirbnbSearchBar onSubmit={handleFilterData} />
      {/* Category filter */}
      <UserCategoryFilters onFilterChange={(departmentId) => setDepartmentValue(departmentId)} />
      
      {/* No match message */}
      {noMatchFound && searched && departmentValue !== "All" && (
        <p className="text-center text-red-500 font-semibold">
          No doctors matched your requirements. Showing All available doctors.
        </p>
      )}

      {/* Doctor cards */}
      <DoctorCard doctors={filteredDoctors} />
    </div>
  );
}
