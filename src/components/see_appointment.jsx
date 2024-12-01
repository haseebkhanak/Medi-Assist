import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function SeeAppointment(){
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
            console.log(result)
                
            } catch (error) {
                console.log(error)
            }
        }
        checkAppointment()
    },[])
    return(
        <>
        
        </>
    )
}