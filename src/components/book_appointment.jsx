import { useLocation } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import { json } from "body-parser";


export default function Appointmentroom(){
    const [appointmentTime,setTime]=useState('')
    const [appointmentDate,setDate]=useState('')
    const showElementRef=useRef(null)
    const blurBody=useRef(null)

    const location = useLocation();
    const { doctorName, doctorPicture,doctorUniqueId,patientName,patientUniqueId } = location.state || {};

    const bookappoint=()=>{
        showElementRef.current.style.display="block"
        blurBody.current.style.display="block"
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        showElementRef.current.style.display="none"
        blurBody.current.style.display="none"

        const data={doctorName,doctorUniqueId,patientName,patientUniqueId,appointmentDate,appointmentTime}
        try { 
            const res=await fetch("http://localhost:2000/appointement",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const result=await res.json()
            console.log(result)
            
        } catch (error) {
            console.log("Error ",error)
        }
    }

    return(
        <>
        <div className="blurThree" ref={blurBody}></div>

         <div className='doctorProfile flex space-x-6 mt-20' style={{height:"auto"}}>
            <div><img className="profiledoctor" style={{width:"100px",height:"100px"}} src={`data:image/jpeg;base64,${doctorPicture}`} alt="No Profile" /></div>
           <div>
            <p className='text-2xl italic mt-2'> Dr. {doctorName}</p>
            <p className="mt-2">Book Appointment For Consultation</p>
            <p className="text-xl mt-10">Select Date For Appointment</p>

            <input type="date" name="Date" id="Date" className="mt-5" value={appointmentDate} onChange={(e)=>{setDate(e.target.value),console.log(e.target.value)}}/>
            <p className="text-2xl text-pink-700 mt-5">Morning Slots</p>

            <button className="text-xl border border-black px-4 py-2 mt-10" value={"10:00 AM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>10:00 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"10:30 AM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>10:30 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"11:00 AM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>11:00 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"11:30 AM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>11:30 AM</button>

            <p className="text-2xl text-pink-700 mt-10">Afternoon Slots</p>
            <button className="text-xl  border border-black px-4 py-2 mt-10" value={"13:00 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>13:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"13:30 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>13:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"14:00 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>14:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"14:30 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>14:30 PM</button>

            <p className="text-2xl text-pink-700 mt-10">Evening Slots</p>
            <button className="text-xl  border border-black px-4 py-2 mt-10" value={"20:00 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>20:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"20:30 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>20:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"21:30 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>21:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"22:00 PM"} onClick={(e)=>{e.preventDefault(),console.log(e.target.value) ,setTime(e.target.value)}}>22:00 PM</button>
<br />

            <button className="mt-10 text-white bg-pink-500 border border-pink-400 hover:bg-transparent hover:text-black hover:border-pink-500 rounded py-2 px-2" onClick={bookappoint}>Book Appointment</button>

            </div>


    </div>
            <div ref={showElementRef} className="border border-black-600 bg-white" style={{display:"none",width:"400px",height:"auto",margin:"auto",marginTop:"-500px",position:"relative",zIndex:"2",borderRadius:"20px"}}>
                <p className="text-2xl text-center mt-5"><i>Doctor Name:</i> {doctorName}</p>
                <p className="text-2xl text-center mt-3"><i>Patient Name:</i> {patientName}</p>
                <p className="text-xl text-center mt-3"><i>Appointment Date:</i> {appointmentDate}</p>
                <p className="text-xl text-center mt-3"><i>Appointment Time:</i> {appointmentTime}</p>
                <form onSubmit={handleSubmit}>
                <button type="submit" className="mt-10 text-white bg-pink-500 border border-pink-400 hover:bg-transparent hover:text-black hover:border-pink-500 rounded py-2 px-2 mb-10" style={{marginLeft:"120px"}}>Confirm Appointment</button>
                </form>
            </div>
        </>
    )
}