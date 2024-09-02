
import Logo from './images/logo.png';
import Doctor from './images/doctor.png';
import Blog from './images/blog.jpeg';
import Image_slider from './slider';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function PatientDashboard(){
    const[message,setMessage]=useState('')
    
    const navigate=useNavigate()
    const patient_login = () => {
        navigate("/patient-login")
    }

    const navigateDermProfile=useNavigate()
    const DermProfile=()=>{
        navigateDermProfile('/derm_profiles')
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
                setMessage(result)
                // console.log(result)
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

    const cancelSvg=()=>{
        document.querySelector(".doctorprofiles").style.display = "none"
    }

    const showProfiles=()=>{
        document.querySelector(".doctorprofiles").style.display = "block"
    }

    return(
        <>

            <div className="body">
        <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
        <img src={Logo} alt="" className='logo'/>
            <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

            <div>
            <a href="#" className="text-white ml-20 text-lg">About Us</a>
            <a href="#" className="text-white ml-10 text-lg"  onClick={showProfiles}>Doctors Profiles</a>
            </div>

            <div className="search ml-20">
                <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search'/>
            </div>

<div className="flex relative">

            <div>
            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession} style={{marginLeft:"100px"}}>LogOut</button>
            {message.message_name &&(
                <p className='name text-white text-3xl' style={{marginLeft:"220px"}}><i>Mr. {message.message_name}</i></p> 
            )}

            </div>
            </div>

        </nav>

        <div className="doctorprofiles">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6" onClick={cancelSvg} style={{ marginLeft: 195,marginTop:5,cursor:'pointer'}}>
  <path  d="M6 18 18 6M6 6l12 12" />
</svg>
    <p className='text-center'><i>Find Doctors by speciality</i></p> <br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2' onClick={DermProfile}>Dermatologist</a> <br /> <br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Dentist</a> <br /> <br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Gynecologist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Gastrointrologist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>ENT Specialist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Urologist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Psychiatrist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Neurologist</a> <br /><br />
    <a href="#" className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>General Physician</a> <br /><br />
</div>

<br /> <br /> <br />
        <div className="doctor_img shadow-2xl mt-10 flex bg-pink-100">
            <img src={Doctor} alt="no"/>
            <h2 className='font-black text-blue-100 ml-12 mt-10'>Welcome To <span className='text-red-600'>Medi Assist</span> <br />
            <span className='text_two'>A Platform where Patients can Connect with Doctors for <span className='text-black'><i>Real Time Consultation</i></span></span></h2>
        </div>

        <br /><br />

<div className="image_slider">
        <Image_slider/>
        </div>
        </div>
        </>
    )
}
