
import Logo from './images/logo.png';
import Doctor from './images/doctor.png';
import Blog from './images/blog.jpeg';
import Image_slider from './slider';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function LogoutHome(){
    const[message,setMessage]=useState('')

    const navigate=useNavigate()
    const doc_login=()=>{
        navigate("/doctor-login")
    }

    const fetchusername= async()=>{
    
            try {
                const res= await fetch('http://localhost:2000/homepage',
                    {
                        method:'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const result= await res.json()
                setMessage(result.message)
                console.log(result.message)
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
            const res= await fetch('http://localhost:2000/logedOut',
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
                doc_login()
            }
        } catch (error) {
            console.log("Error ",error)
        }
    }

    return(
        <>

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
            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
            {message &&(
                <p className='ml-60 text-white text-2xl'><i>{message}</i></p> 
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

        <Image_slider/>
        </>
    )
}
