
import Logo from './images/logo.png';
import Doctor from './images/doctor.png';
import Blog from './images/blog.jpeg';
import Image_slider from './slider';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function LogoutHome(){
    const[message,setMessage]=useState('')
    const[messageTwo,setMessageTwo]=useState('')
    
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

    const viewProfile= async()=>{
        try {
            const res= await fetch('http://localhost:2000/viewprofile',
                {
                    method:'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            document.querySelector(".profile").style.display = "block"
            // document.querySelector(".body").style.opacity=0.5
            const result= await res.json()
            setMessageTwo(result)
            console.log(result)

        } catch (error) {
            console.log("Error ",error)
        }
    }

    const closeBtn=()=>{
        document.querySelector(".profile").style.display = "none"
    }

    return(
        <>

<div className="profile">
{messageTwo && (
    <div>
        <p className='text-center text-pink-800 mt-5'>MY PROFILE</p>
        <fieldset>
        <legend><img className="profileimg" src={`data:image/jpeg;base64,${messageTwo.showPicture_message}`} alt="No Profile" /></legend>
        <p className='text-3xl italic'> Dr. {messageTwo.showProfile_message.fullName}</p>
        <p className='text-xl'>{messageTwo.showProfile_message.specialization}</p>
        {/* <p>{messageTwo.showProfile_message.email}</p> */}
        <p className='text-xl'>{messageTwo.showProfile_message.edu}</p>
        <p className='text-xl'>{messageTwo.showProfile_message.experience} years Experience </p>
        </fieldset>
        <button type="button" className="closebtn bg-pink-500 px-6 py-2 text-white text-xl hover:bg-transparent border hover:border-pink-800 hover:text-black" onClick={closeBtn}>Close</button>
    </div>
)}
            </div>

            <div className="body">
        <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
        <img src={Logo} alt="" className='logo'/>
            <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

            <div>
            <a href="#" className="text-white ml-20 text-lg">About Us</a>
            <a href="#" className="text-white ml-10 text-lg" onClick={viewProfile}>View Your Profile</a>
            </div>

            <div className="search ml-20">
                <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search'/>
            </div>

<div className="flex relative">

            <div>
            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
            {message.message_name &&(
                <p className='name text-white text-2xl'><i>{message.message_name}</i></p> 
            )}

            {message.message_profile && (
                <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" />
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
