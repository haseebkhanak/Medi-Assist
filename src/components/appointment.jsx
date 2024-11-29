import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";


export default function Appointmentroom(){
    const [time,setTime]=useState('')
    const [date,setDate]=useState('')

    const location = useLocation();
    const { doctorName, doctorPicture } = location.state || {};

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert(date)
    }
    return(
        <>
         <div className='doctorProfile flex space-x-6 mt-20' style={{height:"auto"}}>
            <div><img className="profiledoctor" style={{width:"100px",height:"100px"}} src={`data:image/jpeg;base64,${doctorPicture}`} alt="No Profile" /></div>
           <div>
            <p className='text-2xl italic mt-2'> Dr. {doctorName}</p>
            <p className="mt-2">Book Appointment For Consultation</p>
            <p className="text-xl mt-10">Select Date For Appointment</p>

            <form onSubmit={handleSubmit}>
            <input type="date" name="Date" id="Date" className="mt-5" value={date} onChange={(e)=>{setDate(e.target.value),console.log(e.target.value)}}/>
            <p className="text-2xl text-pink-700 mt-5">Morning Slots</p>

            <button className="text-xl border border-black px-4 py-2 mt-10" value={"10:00 AM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>10:00 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"10:30 AM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>10:30 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"11:00 AM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>11:00 AM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"11:30 AM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>11:30 AM</button>

            <p className="text-2xl text-pink-700 mt-10">Afternoon Slots</p>
            <button className="text-xl  border border-black px-4 py-2" value={"13:00 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>13:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"13:30 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>13:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"14:00 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>14:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"14:30 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>14:30 PM</button>

            <p className="text-2xl text-pink-700 mt-10">Evening Slots</p>
            <button className="text-xl  border border-black px-4 py-2" value={"20:00 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>20:00 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"20:30 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>20:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"21:30 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>21:30 PM</button>
            <button className="text-xl  border border-black px-4 py-2 ml-20" value={"22:00 PM"} onClick={(e)=>{console.log(e.target.value) ,setTime(e.target.value)}}>22:00 PM</button>

            <button type="submit">Click</button>
            </form>
            </div>

    </div>
        </>
    )
}