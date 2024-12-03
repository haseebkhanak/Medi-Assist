import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function SeeAppointment(){
    const [appointmentFound,setAppointmentFound]=useState('')
    const location = useLocation();
    const { doctorUniqueId } = location.state || {};
    useEffect(()=>{
        const checkAppointment=async ()=>{
            const data={doctorUniqueId}
            try { 
                const res=await fetch("http://localhost:2000/see_appointement",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })

            const result= await res.json()
            setAppointmentFound(result.appointmentFound)
            console.log(result)
                
            } catch (error) {
                console.log(error)
            }
        }
        checkAppointment()
    },[])
    return(
        <>
          {appointmentFound && appointmentFound.map((profile)=>
        <div key={profile._id}>
          <table className="ml-10 border-separate border-spacing-4 border border-slate-400 ...">
  <thead>
    <tr>
      <th className="border border-slate-500 ... px-4">Doctor Name</th>
      <th className="border border-slate-500 ... px-4">Patient Name</th>
      <th className="border border-slate-500 ... px-4">Appointment Date</th>
      <th className="border border-slate-500 ... px-4">Appointment Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-slate-300 ... px-4">{profile.doctorName}</td>
      <td className="border border-slate-300 ... px-4">{profile.patientName}</td>
      <td className="border border-slate-300 ... px-4">{profile.appointmentDate}</td>
      <td className="border border-slate-300 ... px-4">{profile.appointmentTime}</td>
    </tr>

  </tbody>
</table> <br />
        </div>
       )}
       
      
        </>
    )
}