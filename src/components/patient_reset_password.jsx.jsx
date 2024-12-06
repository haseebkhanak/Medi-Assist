import React, { useEffect,useRef,useState } from 'react';
import Logo from './images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function PatientResetPassword() {
    
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
   
    const[patientemail,setPatientEmail]=useState('')
    const[patientpassword,setPatientPassword]=useState('')
    const[patientpasswordError,setPatientPasswordError]=useState('')
    const[confirmpatientpassword,setPatientconfirmPassword]=useState('')
    const[confirmpatientpasswordError,setPatientconfirmPasswordError]=useState('')
    const[messageSuccess,setMessageSuccess]=useState('')
    const[messageFail,setMessageFail]=useState('')
    const[passwordfoundmessage,setpasswordfoundmessage]=useState('')
    const passwordRef= useRef(null)
    const confirmpasswordRef= useRef(null)

    let charpassword = /[@#!$%&]/

    const PatientEmailHandler=(event)=>{
        setPatientEmail(event.target.value)
    }

    const PatientPasswordHandler=(event)=>{
        setPatientPassword(event.target.value)
        if(patientpassword!=="")
            {
                setPatientPasswordError("")
            }
    }

    const PatientConfirmPasswordHandler=(event)=>{
        setPatientconfirmPassword(event.target.value)
    }
    

    const checkpass = () => {
        if (passwordRef.current.type === "password"||confirmpasswordRef.current.type === "password") {
            passwordRef.current.type = "text"
            confirmpasswordRef.current.type = "text"
        }

        else {
            passwordRef.current.type = "password"
            confirmpasswordRef.current.type = "password"
        }
    }

    const SignUpForm= async(event)=>{
        event.preventDefault()
            if(patientpassword==="")
                {
                    setPatientPasswordError("*Enter Password")
                    return
                }

                if (patientpassword.length < 8) {
                    setPatientPasswordError("*Password length atleast 8 characters")
                    return
                }

                if (!charpassword.test(patientpassword)) {
                    setPatientPasswordError("*Password should contain (#,!) etc.")
                    return
                }

                if (charpassword.test(patientpassword)) {
                    setPatientPasswordError("")            
                }

                if(confirmpatientpassword!==patientpassword){
                    setPatientconfirmPasswordError("*Passwords are not same")
                    return
                }

                if(confirmpatientpassword===patientpassword){
                    setPatientconfirmPasswordError("")
                }

                const patientData={patientemail,patientpassword}
                try {
                    const res= await fetch('http://localhost:2000/resetPatientPassword',
                        {
                            method:"POST",
                            body: JSON.stringify(patientData),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        }
                        
                    )
                    const result=await res.json()
                    if(res.ok)
                        {
                            setMessageSuccess(result.messageSuccess)
                            console.log(result.messageSuccess)
                        }
    
                        else{
                            setMessageFail(result.messageFail)
                            setpasswordfoundmessage(result.passwordfoundmessage)
                            console.log(result.messageFail)
                            console.log(result.passwordfoundmessage)
                        }
                } catch (error) {
                    console.log(error)
                }

            }
            
            setTimeout(() => {
                setMessageSuccess('')
                setMessageFail('')
                setpasswordfoundmessage('')
            }, 5000);

    return (
        <>

{messageSuccess && (
<div className="alert bg-green-100 border border-green-700 text-green-800 px-4 py-3 rounded relative" role="alert" style={{position:"absolute",marginTop:"-70px"}}>
    <p>{messageSuccess}</p>
</div>
)}

{messageFail && (
<div className="alert bg-red-100 border border-red-700 text-red-800 px-4 py-3 rounded relative" role="alert" style={{position:"absolute",marginTop:"-70px"}}>
    <p>{messageFail}</p>
</div>
)}

{passwordfoundmessage && (
<div className="alert bg-red-100 border border-red-700 text-red-800 px-4 py-3 rounded relative" role="alert" style={{position:"absolute",marginTop:"-70px"}}>
    <p>{passwordfoundmessage}</p>
</div>
)}
           <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-xl">
                <img src={Logo} alt="Logo" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                <div className="flex ml-auto">
                    <a href="#" className="btn-home text-white text-lg home hover:text-pink-400" onClick={home_back}>Home</a>
                    <button type="button" className="btn-logIn bg-transparent border border-pink-400 text-pink-200 px-2 py-1 mr-20 rounded" onClick={patient_login}>Log In</button>
                </div>
           </nav> 

           <div className='signup' onSubmit={SignUpForm}>
            <p className='text-black text-center text-xl' style={{marginTop:"170px",paddingTop:"15px"}}>Reset Password</p> <br />
            <form>
            <input  type="email" className='shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email Address' value={patientemail} onChange={PatientEmailHandler}/> <br /> <br />
            {/* <p className="text-red-600 ml-20">{patientpasswordError}</p>   */}
                <input ref={confirmpasswordRef} type="password" className='shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Password...' value={patientpassword} onChange={PatientPasswordHandler}/>
                <p className="text-red-600 ml-20">{patientpasswordError}</p> 
                <br />
                <input ref={passwordRef} type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Confirm Password...' value={confirmpatientpassword} onChange={PatientConfirmPasswordHandler}/>
                <p className="text-red-600 ml-20">{confirmpatientpasswordError}</p> 
                <input type="checkbox" onClick={checkpass} className="accent-pink-500 mt-5" style={{marginLeft:"85px"}}/> Show Password
                <br />
                <button type="submit" className='mt-5 mb-10 bg-pink-400 border border-pink-500 text-white text-xl px-10 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded ml-20'>Update Password</button>
                
            </form>
        </div>
        </>
    );
}

