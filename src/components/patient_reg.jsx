import React, { useEffect } from 'react';
import Logo from './images/logo.png';
import Image_slider_login_patient from './pat_login_Slider';
import { useNavigate } from 'react-router-dom';

export default function Patient_Reg() {

    useEffect(()=>{
        document.body.style.backgroundColor="lightgray"
    },[])

    const navigateBack=useNavigate()
    const home_back=()=>{
        navigateBack('/back_home')
    }

    const navigatePatientLogin = useNavigate()
    const patient_login = () => {
        navigatePatientLogin("/patient-login")
    }

    return (
        <>
           <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-xl">
                <img src={Logo} alt="Logo" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                <div className="flex ml-auto">
                    <a href="#" className="btn-home text-white text-lg home hover:text-pink-400" onClick={home_back}>Home</a>
                    <button type="button" className="btn-logIn bg-transparent border border-pink-400 text-pink-200 px-2 py-1 mr-20 rounded" onClick={patient_login}>Log In</button>
                </div>
           </nav> 

           <div className='signup'>
            <p className='text-pink-600 text-center text-4xl' style={{marginTop:"120px",paddingTop:"10px"}}>SignUp</p> <br />
            <form>    
                <label className='patientname text-lg ml-20'>Name</label>
                <input type="text" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Name...' id='patientname'/>         
                <br />
                <label className='patientemail text-lg ml-20'>Email</label>
                <input type="email" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email...' id='patientemail'/>
                <br />
                <label className='patientpassword text-lg ml-20'>Password</label>
                <input type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Password...' id='patientpassword'/>
                <br />
                <button type="submit" className='bg-pink-400 border border-pink-500 text-white text-xl px-2 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded ml-40'>Register</button>
                
            </form>
        </div>
        </>
    );
}

