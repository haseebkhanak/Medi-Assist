import { useEffect,useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:3000');

export default function MessageNotifications(){
    // const [message,setMessage]=useState('')

    const fetchPatientsData=()=>{
      socket.on('notification',(PatientData)=>{
        console.log(PatientData.PatientDetails)
      })
    }

useEffect(()=>{
fetchPatientsData()
})
    return(
        <>
        12
        {/* {message && message.map((profile)=>
        <p>{profile.patientname}</p>
        
        )} */}
        {/* {message && (
        <p>{message.patientname}</p>
        
        )} */}
        </>
    )
}