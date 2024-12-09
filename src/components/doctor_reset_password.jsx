import React, { useEffect,useRef,useState } from 'react';
import Logo from './images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function DoctorResetPassword() {
    
    useEffect(()=>{
        document.body.style.backgroundColor="white"
    },[])
    
    const navigateBack=useNavigate()
    const home_back=()=>{
        navigateBack('/back_home')
    }
    
    const navigateDoctorLogin = useNavigate()
    const doctor_login = () => {
        navigateDoctorLogin("/doctor-login")
    }
   
    const[doctoremail,setDoctorEmail]=useState('')
    const[doctoremailerror,setDoctorEmailError]=useState('')
    const[doctorpassword,setDoctorPassword]=useState('')
    const[doctorpasswordError,setDoctorPasswordError]=useState('')
    const[confirmdoctorpassword,setDoctorconfirmPassword]=useState('')
    const[confirmdoctorpasswordError,setDoctorconfirmPasswordError]=useState('')
    const[messageSuccess,setMessageSuccess]=useState('')
    const[messageFail,setMessageFail]=useState('')
    const[passwordfoundmessage,setpasswordfoundmessage]=useState('')
    const passwordRef= useRef(null)
    const confirmpasswordRef= useRef(null)

    let charpassword = /[@#!$%&]/

    const DoctorEmailHandler=(event)=>{
        setDoctorEmail(event.target.value)
        if(doctoremail!=="")
            {
                setDoctorEmailError("")
                return
            }
    }

    const DoctorPasswordHandler=(event)=>{
        setDoctorPassword(event.target.value)
        if(doctorpassword!=="")
            {
                setDoctorPasswordError("")
            }
    }

    const DoctorConfirmPasswordHandler=(event)=>{
        setDoctorconfirmPassword(event.target.value)
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

        if(doctoremail==="")
            {
                setDoctorEmailError("*Enter Email")
                return
            }

            if(doctorpassword==="")
                {
                    setDoctorPasswordError("*Enter Password")
                    return
                }

                if (doctorpassword.length < 8) {
                    setDoctorPasswordError("*Password length atleast 8 characters")
                    return
                }

                if (!charpassword.test(doctorpassword)) {
                    setDoctorPasswordError("*Password should contain (#,!) etc.")
                    return
                }

                if (charpassword.test(doctorpassword)) {
                    setDoctorPasswordError("")            
                }

                if(confirmdoctorpassword!==doctorpassword){
                    setDoctorconfirmPasswordError("*Passwords are not same")
                    return
                }

                if(confirmdoctorpassword===doctorpassword){
                    setDoctorconfirmPasswordError("")
                }

                const doctorData={doctoremail,doctorpassword}
                try {
                    const res= await fetch('http://localhost:2000/resetDoctorPassword',
                        {
                            method:"POST",
                            body: JSON.stringify(doctorData),
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
         
            useEffect(()=>{
                setTimeout(() => {
                    setMessageSuccess('')
                }, 5000);

            },[messageSuccess])

            useEffect(()=>{
                setTimeout(() => {
                    setMessageFail('')
                }, 5000);

            },[messageFail])

            useEffect(()=>{
                setTimeout(() => {
                    setpasswordfoundmessage('')
                }, 5000);

            },[passwordfoundmessage])

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
                    <button type="button" className="btn-logIn bg-transparent border border-pink-400 text-pink-200 px-2 py-1 mr-20 rounded" onClick={doctor_login}>Log In</button>
                </div>
           </nav> 

           <div className='signup' onSubmit={SignUpForm}>
            <p className='text-black text-center text-xl' style={{marginTop:"170px",paddingTop:"15px"}}>Reset Password</p> <br />
            <form>
            <input  type="email" className='shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Email Address' value={doctoremail} onChange={DoctorEmailHandler}/>
            <p className="text-red-600 ml-20">{doctoremailerror}</p>
            <br />
                <input ref={confirmpasswordRef} type="password" className='shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Password...' value={doctorpassword} onChange={DoctorPasswordHandler}/>
                <p className="text-red-600 ml-20">{doctorpasswordError}</p> 
                <br />
                <input ref={passwordRef} type="password" className='block shadow-xl border rounded py-2 px-6 border-4 border-grey-400 ml-20' placeholder='Confirm Password...' value={confirmdoctorpassword} onChange={DoctorConfirmPasswordHandler}/>
                <p className="text-red-600 ml-20">{confirmdoctorpasswordError}</p> 
                <input type="checkbox" onClick={checkpass} className="accent-pink-500 mt-5" style={{marginLeft:"85px"}}/> Show Password
                <br />
                <button type="submit" className='mt-5 mb-10 bg-pink-400 border border-pink-500 text-white text-xl px-10 py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded ml-20'>Update Password</button>
                
            </form>
        </div>
        </>
    );
}

