import React, { useEffect,useRef,useState } from 'react';
import Logo from './images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPatient() {

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
    const[messageSuccess,setMessageSuccess]=useState('')
    const[messageFail,setMessageFail]=useState('')

    const PatientEmailHandler=(event)=>{
        setPatientEmail(event.target.value)
    }


    const forgotPassPatient= async(event)=>{
        event.preventDefault()
        if(patientemail==="")
            {
                alert("Enter Your Email")
                return
            }

                const patientData={patientemail}
                try {
                    const res= await fetch('http://localhost:2000/forgotPasswordPatient',
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
                    }

                    else{
                        setMessageFail(result.messageFail)
                    }
                } catch (error) {
                    console.log(error)
                }

            }

            setTimeout(() => {
                setMessageSuccess('')
                setMessageFail('')
            }, 3000);
            
    return (
        <>

{messageSuccess && (
<div className="alert bg-green-100 border border-green-700 text-green-800 px-4 py-3 rounded relative mb-10" role="alert" style={{position:"absolute",marginTop:"-100px"}}>
    <p>{messageSuccess}</p>
</div>
)}

{messageFail && (
<div className="alert bg-red-100 border border-red-700 text-red-800 px-4 py-3 rounded relative mt-20" role="alert" style={{position:"absolute",marginTop:"-100px"}}>
    <p>{messageFail}</p>
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

           <div className='signup' onSubmit={forgotPassPatient}>
            <p className='text-black text-2xl text-center mt-10' style={{paddingTop:"40px",marginTop:"200px"}}>Forgot Password</p> <br />
            <form>    

                <input type="email" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email Address *' id='patientemail' value={patientemail} onChange={PatientEmailHandler}/>
                <br />
                <button type="submit" className='mb-10 bg-pink-400 border border-pink-500 text-white px-2 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded' style={{marginLeft:"140px"}}>Reset Password</button>
                
            </form>
        </div>
        </>
    );
}

