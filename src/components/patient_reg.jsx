import React from 'react';
import Logo from './images/logo.png';
import Image_slider_login_patient from './pat_login_Slider';
import { useNavigate } from 'react-router-dom';


export default function Patient_Reg() {

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
            <p className='text-pink-600 mt-20'>Sign Up</p>
            <br />
            <form>
                <label className='patientname text-lg'>Name</label>
                <input type="text" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Name...' id='patientname'/>
                <br />
                <label className='patientemail text-lg'>Email</label>
                <input type="email" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Email...' id='patientemail'/>
                <br />
                <label className='patientpassword text-lg'>Password</label>
                <input type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Password...' id='patientpassword'/>
                <br />
                <button type="submit" className='bg-pink-400 border border-pink-500 text-white text-xl py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded'>Register</button>
                
            </form>
        </div>
        </>
    );
}

