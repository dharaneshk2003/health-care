import React from 'react'

export default function RefferedByDoctorList({offlinePatients,referralObject}) {
  return (
    <div className="p-4 space-y-4">
  <div className="bg-gray-100 rounded-lg p-4 overflow-auto shadow-md">
    <h2 className="text-lg font-semibold mb-2 text-gray-700">Offline Patients</h2>
    <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
      {JSON.stringify(offlinePatients, null, 2)}
    </pre>
  </div>

  <div className="bg-gray-100 rounded-lg p-4 overflow-auto shadow-md">
    <h2 className="text-lg font-semibold mb-2 text-gray-700">Referral Object</h2>
    <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
      {JSON.stringify(referralObject, null, 2)}
    </pre>
  </div>
</div>

  )
}
