import React, { useEffect,useState } from 'react';
import Logo from './images/logo.png';
import Image_slider_login_patient from './pat_login_Slider';
import { json, useNavigate } from 'react-router-dom';

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
    
    const[patientname,setPatientName]=useState('')
    const[patientnameError,setPatientNameError]=useState('')
    const[patientemail,setPatientEmail]=useState('')
    const[patientpassword,setPatientPassword]=useState('')
    const[patientpasswordError,setPatientPasswordError]=useState('')

    let charname = /^[a-zA-Z\s]+$/
    let charpassword = /[@#!$%&]/
    const PatientNameHandler=(event)=>{
        setPatientName(event.target.value)
        if (charname.test(patientname)) {
            setPatientNameError("")
        }
    }

    const PatientEmailHandler=(event)=>{
        setPatientEmail(event.target.value)
    }

    const PatientPasswordHandler=(event)=>{
        setPatientPassword(event.target.value)
    }

    const checkpass = () => {
        let x = document.querySelector('#patientpassword')
        if (x.type === "password") {
            document.querySelector('#patientpassword').type = "text"
        }

        else {
            document.querySelector('#patientpassword').type = "password"
        }
    }

    const SignUpForm= async(event)=>{
        event.preventDefault()

        if(patientname==="")
        {
            alert("Enter Your Name")
            return
        }

        if (!charname.test(patientname)) {
            setPatientNameError("*Name format is Invalid")
            return
        }


        if(patientemail==="")
            {
                alert("Enter Your Email")
                return
            }

            if(patientpassword==="")
                {
                    alert("Enter Password")
                    return
                }

                if (!charpassword.test(patientpassword)) {
                    setPatientPasswordError("*Password should contain (#,!) etc.")
                    return
                }

                if (charpassword.test(patientpassword)) {
                    setPatientPasswordError("")
                    
                }

                const patientData={patientname,patientemail,patientpassword}
                try {
                    const data= await fetch('http://localhost:2000/patient_signup',
                        {
                            method:"POST",
                            body: JSON.stringify(patientData),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        }
                        
                    )
                    console.log(patientData)
                } catch (error) {
                    
                }


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

           <div className='signup' onSubmit={SignUpForm}>
            <p className='text-pink-600 text-center text-4xl' style={{marginTop:"120px",paddingTop:"10px"}}>SignUp</p> <br />
            <form>    
                <label className='patientname text-lg ml-20'>Name</label>
                <input type="text" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Name...' id='patientname' value={patientname} onChange={PatientNameHandler}/>  
                <p className="text-red-600 ml-20">{patientnameError}</p>       
                <br />

                <label className='patientemail text-lg ml-20'>Email</label>
                <input type="email" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email...' id='patientemail' value={patientemail} onChange={PatientEmailHandler}/>
                <br />
                <label className='patientpassword text-lg ml-20'>Password</label><span className="ml-10"><input type="checkbox" onClick={checkpass} className="accent-pink-500" /> Show Password</span>
                <input type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Password...' id='patientpassword' value={patientpassword} onChange={PatientPasswordHandler}/>
                <p className="text-red-600 ml-20">{patientpasswordError}</p> 
                <br />
                <button type="submit" className='bg-pink-400 border border-pink-500 text-white text-xl px-2 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded ml-40'>Register</button>
                
            </form>
        </div>
        </>
    );
}

