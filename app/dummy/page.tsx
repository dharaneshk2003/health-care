import React from 'react'
import { createClient } from "../../utils/supabase/server";


export default async function DataRetrival() {
  const supabase = await createClient();

  const { data: doctors, error } = await supabase
    .from('doctors')
    .select('*');

    console.log("doctors data : ",doctors);

  let { data: patients } = await supabase
  .from('patients')
  .select('*')

  console.log("patients data : ",patients[1])
  return (
    <div className="p-10">
      <div className="border border-primary p-5">
        hii
      </div>
      
    </div>
  )
}
