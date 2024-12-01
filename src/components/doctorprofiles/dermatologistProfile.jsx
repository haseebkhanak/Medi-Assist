import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';
import { useEffect,useState } from 'react';

export default function DermProfiles(){
    const [message,setMessage]=useState('')
    const [message_name,setMessage_name]=useState('')

    const navigate=useNavigate()
    const chat_room=(doctorName,doctorPicture,doctorUniqueId,patientName,patientUniqueId)=>{
        navigate('/chatpatient', { state: {doctorName,doctorPicture,doctorUniqueId,patientName,patientUniqueId} });
        
    }

    const appointment_room=(doctorName,doctorPicture,doctorUniqueId,patientName,patientUniqueId)=>{
        navigate("/appointment",{ state: {doctorName,doctorPicture,doctorUniqueId,patientName,patientUniqueId }})
    }

    // const navigatevideoroom=useNavigate()
    const video_room=(doctorName,doctorUniqueId,patientName,patientUniqueId)=>{
        navigate('/videoroom', { state: {doctorName,doctorUniqueId,patientName,patientUniqueId} });
        
    }

    // const navigatelogin=useNavigate()
    const patient_login = () => {
        navigate("/patient-login")
    }

    const fetchusername= async()=>{
    
        try {
            const res= await fetch('http://localhost:2000/patienthome',
                {
                    method:'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const result= await res.json()
            setMessage_name(result)
            console.log(result)
        } 
        catch (error) {
            console.log("Error ",error)
        }
}

useEffect(()=>{
    fetchusername()
},[])
    
const destroysession= async()=>{
    try {
        const res= await fetch('http://localhost:2000/patientlogedOut',
            {
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const result= await res.json()
        console.log(result.message)

        if(res.ok)
        {
            patient_login()
        }
    } catch (error) {
        console.log("Error ",error)
    }
}

    const fetchDermProfiles= async()=>{
        try {
            const res= await fetch('http://localhost:2000/dermprofiles',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }       
            })
            const result=await res.json()
            console.log(result.doctorProfileMessage.fullName);
            setMessage(result.doctorProfileMessage)
        } catch (error) {
            console.log('Error fetching profiles:',error)
        }
    }

    useEffect(()=>{
        fetchDermProfiles()
    },[])

    return(
        <>
<br /><br /><br /><br />

{message && message.map((doctorProfile) =>
    <div key={doctorProfile._id} className='doctorProfile flex space-x-6'>
            <div><img className="profiledoctor animate-pulse" src={`data:image/jpeg;base64,${doctorProfile.profile}`} alt="No Profile" /></div>
           <div style={{width:"300px"}}>
            <p className='text-2xl italic'> Dr. {doctorProfile.fullName}</p>
            <p className='text mt-2'>{doctorProfile.specialization}</p>
            <p className='text'>{doctorProfile.edu}</p>
            <p className='text'>{doctorProfile.experience} years Experience</p> 
            <button type="button" style={{padding:"10px"}} className='mt-20 bg-black text-white rounded' onClick={() => chat_room(doctorProfile.fullName,doctorProfile.profile,doctorProfile._id,message_name.message_name,message_name.message_id)}>Chat With Doctor</button>
            </div>
            <div>
            <button type="button" style={{marginLeft:"250px",paddingTop:"10px",paddingBottom:"10px",paddingLeft:"10px",paddingRight:"10px"}} className='bg-transparent border border-pink-400 hover:bg-green-400 hover:text-white hover:border-green-500 rounded' onClick={()=>video_room(doctorProfile.fullName,doctorProfile._id,message_name.message_name,message_name.message_id)}>Online Consultation</button> <br /> <br />
            <button type="button" style={{marginLeft:"250px",paddingTop:"10px",paddingBottom:"10px",paddingRight:"13px",paddingLeft:"13px"}} className='text-white bg-pink-500 border border-pink-400 hover:bg-transparent hover:text-black hover:border-pink-500 rounded' onClick={()=>appointment_room(doctorProfile.fullName,doctorProfile.profile,doctorProfile._id,message_name.message_name,message_name.message_id)}>Book Appointment</button>
            </div>
    </div>
)}


         <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <a href="#" className="text-white ml-20 text-lg">About Us</a>
                        <a href="#" className="text-white ml-10 text-lg">Doctors Profiles</a>
                    </div>

                    <div className="search ml-20">
                        <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                    </div>

                    <div className="flex relative">

<div>
<button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession} style={{marginLeft:"100px"}}>LogOut</button>
{message_name.message_name &&(
    <p className='name text-white text-3xl' style={{marginLeft:"220px"}}><i>Mr. {message_name.message_name}</i></p> 
)}

</div>
</div>

                </nav>
        </>
    )
}

