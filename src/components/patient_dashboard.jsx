
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

    return(
        <>

            <div className="body">
        <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
        <img src={Logo} alt="" className='logo'/>
            <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

            <div>
            <a href="#" className="text-white ml-20 text-lg">About Us</a>
            <a href="#" className="text-white ml-10 text-lg">Doctors Profiles</a>
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
