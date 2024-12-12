import Logo from './images/online_consult.png';
import Doctor from './images/Ai.png';
import Blog from './images/ReadBlog.jpg';
import { useState,useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function Image_slider_login_patient()
{
    const[patientloginemail,getPatientloginemail]=useState("")
    const[patientloginpassword,getPatientloginpassword]=useState("")
    const[message, setMessage] = useState("")
    const passwordRef=useRef('')

    const navigatePatientReg=useNavigate()
    const regPatient=()=>{
        navigatePatientReg("/patient-reg")
    }

    const navigatePatientLogoutHome=useNavigate()
    const patient_home_dashboard=()=>{
        navigatePatientLogoutHome('/patientlogoutHome')
    }

    const navigateFogotPassword = useNavigate()
    const forgotPassPatient = () => {
        navigateFogotPassword("/forgot-password-patient")
    }
    
    const handleloginemail=(event)=>{
        getPatientloginemail(event.target.value)
    }
    
    const handleloginpassword=(event)=>{
        getPatientloginpassword(event.target.value)
    }
    
    const loginFormSubmit=async(event)=>{
        event.preventDefault()

        if(patientloginemail==="")
        {
            alert("Enter Your Email")
            return
        }

        if(patientloginpassword==="")
            {
                alert("Enter Your Password")
                return
            }

        const data={patientloginemail,patientloginpassword}
        try {
            const res=await fetch("http://localhost:2000/Patient_Login",{
                method:"POST",
                credentials: 'include',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })

           const result= await res.json();
           console.log(result)
           setMessage(result);

        if(result.type==="success"){
            patient_home_dashboard()
        }

        } catch (error) {
            console.log("Error ",error)
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            setMessage('')
        }, 4000);
    },[message])

    const images=[Logo,Doctor,Blog]
    let[count,setCount]=useState(0)

        setTimeout(() => {
            setCount(count+1)
        }, 2000);
    
        if(count>=images.length)
        {
          count=0
        }

        const checkpass = () => {
            if (passwordRef.current.type === "password") {
                passwordRef.current.type = "text"
            }
    
            else {
                passwordRef.current.type = "password"
            }
        }

        return(
          <>
                    
             {message && (

            <div className="alert bg-red-100 border border-red-700 text-red-800 px-4 py-3 rounded relative mt-4" role="alert">
                <p>{message.message}</p>
            </div>

            )}

        <div className="slider_images_login flex">
            <img src={images[count]} alt=""/>

        <div>
            <h2 className='login_text text-pink-600'>Patient's LogIn</h2>
            <br />
            <form onSubmit={loginFormSubmit}>
                <label className='email ml-10 text-lg'>Email</label>
                <input type="email" className='block ml-10 shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Email...' id='loginemail' value={patientloginemail} onChange={handleloginemail}/>
                <br />
                <label className='password ml-10 text-lg'>Password</label> <span><input type="checkbox" onClick={checkpass} className="accent-pink-500 mt-5 ml-8"/> Show Password</span>
                <input type="password" ref={passwordRef} className='block ml-10 shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Password...' id='loginpassword' value={patientloginpassword} onChange={handleloginpassword}/>
<br />
                <button type="submit" className='login_btn bg-pink-400 border border-pink-500 text-white text-xl py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded'>Login</button>
                <button type="button" className='mt-3 block reg_btn bg-black border border-black text-white text-xl py-2 hover:bg-transparent hover:text-black hover:border-black rounded' style={{paddingLeft:57}} onClick={regPatient}>Register Account</button>
            </form>
            <div className='flex justify-center mt-3 ml-10'>
            <button type='submit' className='text-blue-900' onClick={forgotPassPatient}>Forgot Password ?</button>
            </div>
        </div>

        </div>
        </>
    )
}

