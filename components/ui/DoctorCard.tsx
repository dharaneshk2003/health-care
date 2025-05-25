   // components/DoctorCard.jsx
   const DoctorCard = () => {
     return (
       <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
         <h2 className="text-xl font-bold">Dr. Rajesh Kumar</h2>
         <h3 className="text-gray-600">Cardiology</h3>
         <div className="flex items-center my-2">
           <span className="text-yellow-500">★ ★ ★ ★ ★</span>
           <span className="ml-1 text-gray-500">4.8 • 245 reviews</span>
         </div>
         <p className="text-gray-600">Experience: 15 years</p>
         <p className="text-gray-600">Education: MBBS, MD (Cardiology)</p>
         <p className="text-gray-600">Languages: English, Hindi, Tamil</p>
         <div className="my-2">
           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-gray-700">Mon</span>
           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-gray-700">Wed</span>
           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-gray-700">Fri</span>
         </div>
         <p className="font-bold">Consultation Fee: ₹1200</p>
         <button className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded">
           Book Appointment
         </button>
       </div>
     );
   };

   export default DoctorCard;
   