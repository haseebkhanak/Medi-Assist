import React, { useEffect,useState } from 'react';
import Logo from './images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Patient_Reg() {
    
    useEffect(()=>{
        document.body.style.backgroundColor="white"
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
    const[patientemailError,setPatientEmailError]=useState('')
    const[patientpassword,setPatientPassword]=useState('')
    const[patientpasswordError,setPatientPasswordError]=useState('')
    const[message,setMessage]=useState('')

    let charname = /^[a-zA-Z\s]+$/
    let charpassword = /[@#!$%&]/
    let validateEmail=/^[a-zA-Z0-9._%+-]+@gmail\.com$/
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
            setPatientNameError("*Enter Your Name")
            return
        }

        if(patientname.length<=6)
            {
                setPatientNameError("*Enter Your Full Name")
                return
            }

        if (!charname.test(patientname)) {
            setPatientNameError("*Name format is Invalid")
            return
        }


        if(patientemail==="")
            {
                setPatientEmailError("*Enter Your Email")
                return
            }

            if(!validateEmail.test(patientemail)){
                setPatientEmailError("*Invalid Format")
                return
            }

            if(validateEmail.test(patientemail)){
                setPatientEmailError("")
            }

            if(patientpassword==="")
                {
                    setPatientPasswordError("*Enter Password")
                    return
                }

                if(patientpassword.length<=7)
                    {
                        setPatientPasswordError("*Password should contain atleast 8 letters")
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
                    const result=await data.json()
                    setMessage(result)
                    document.querySelector('.alertPatientReg').style.display="block"
                    document.querySelector('.blurThree').style.display="block"
                } catch (error) {
                    console.log(error)
                }

            }
            const cancelbtn = () => {
                document.querySelector(".alertPatientReg").style.display = "none"
                document.querySelector('.blurThree').style.display="none"
            }
            
    return (
        <>

{message && (
                <div className={`alertPatientReg ${message.type==="success" ? 'bg-green-100 border border-green-700' : 'bg-pink-100 border border-red-500'}`}>
                    <p className={`${message.type==="success" ? 'text-3xl mt-10 text-center text-green-800' : 'text-2xl mt-10 text-center text-red-600'}`}>{message.message}</p>
                    <div className="flex justify-end">
                        {message.type==="success" ? <button type="button" className="OkBtn px-4 py-1 mr-5 mt-4 mb-2 bg-green-400 border border-green-600 text-white rounded-lg  hover:bg-transparent hover:text-black hover:border-red-green" onClick={patient_login}>Ok</button>
                        :<button type="button" className="CancelBtn px-2 py-1 mr-5 mt-4 mb-2 text-white bg-red-400 border border-red-600 rounded-lg hover:bg-transparent hover:text-black hover:border-red-500" onClick={cancelbtn}>Cancel</button>}
                    </div>
                </div>

            )}

            <div className="blurThree">

            </div>

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
                <input type="text" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Full Name...' id='patientname' value={patientname} onChange={PatientNameHandler}/>  
                <p className="text-red-600 ml-20">{patientnameError}</p>       
                <br />

                <label className='patientemail text-lg ml-20'>Email</label>
                <input type="email" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email...' id='patientemail' value={patientemail} onChange={PatientEmailHandler}/>
                <p className="text-red-600 ml-20">{patientemailError}</p> 
                <br />
                <label className='patientpassword text-lg ml-20'>Password</label><span className="ml-10"><input type="checkbox" onClick={checkpass} className="accent-pink-500" /> Show Password</span>
                <input type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Password...' id='patientpassword' value={patientpassword} onChange={PatientPasswordHandler}/>
                <p className="text-red-600 ml-20">{patientpasswordError}</p> 
                <br />
                <button type="submit" className='mb-10 bg-pink-400 border border-pink-500 text-white text-xl px-2 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded ml-40'>Register</button>
                
            </form>
        </div>
        </>
    );
}

