import Logo from './images/online_consult.png';
import Doctor from './images/Ai.png';
import Blog from './images/ReadBlog.jpg';
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Image_slider_login()
{
    const[loginemail,getloginemail]=useState("")
    const[loginpassword,getloginpassword]=useState("")
    const[message, setMessage] = useState('')

    const navigateReg=useNavigate()
    const regDoctor=()=>{
        navigateReg("/doctor-reg")
    }

    const navigateLogoutHome=useNavigate()
    const home_Logout=()=>{
        navigateLogoutHome('/logoutHome')
    }

    const navigateFogotPassword = useNavigate()
    const forgotPassDoctor = () => {
        navigateFogotPassword("/forgot-password-doctor")
    }
    
    const handleloginemail=(event)=>{
        getloginemail(event.target.value)
    }
    
    const handleloginpassword=(event)=>{
        getloginpassword(event.target.value)
    }
    
    const loginFormSubmit=async(event)=>{
        event.preventDefault()

        if(loginemail==="")
        {
            alert("Enter Your Email")
            return
        }

        if(loginpassword==="")
            {
                alert("Enter Your Password")
                return
            }

        const data={loginemail,loginpassword}
        try {
            const res=await fetch("http://localhost:2000/login",{
                method:"POST",
                credentials: 'include',
                body:JSON.stringify(data),
                headers:{
                    'Authorization': ` ${localStorage.getItem('token')}`,
                    "Content-Type":"application/json"
                }
            })

           const result= await res.json();
           setMessage(result);
           const token=result.token
           console.log(localStorage.getItem(token))

        if(result.type==="success"){
            home_Logout()
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
            <h2 className='login_text text-pink-600'>Doctor's LogIn</h2>
            <br />
            <form onSubmit={loginFormSubmit}>
                <label className='email ml-10 text-lg'>Email</label>
                <input type="email" className='block ml-10 shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Email...' id='loginemail' value={loginemail} onChange={handleloginemail}/>
                <br />
                <label className='password ml-10 text-lg'>Password</label>
                <input type="password" className='block ml-10 shadow-xl border rounded py-2 px-6 border-4 border-grey-400' placeholder='Password...' id='loginpassword' value={loginpassword} onChange={handleloginpassword}/>
                <br />
                <button type="submit" className='login_btn bg-pink-400 border border-pink-500 text-white text-xl py-2 hover:bg-red-300 hover:text-black hover:border-pink-500 rounded'>Login</button>
                <button type="button" className='mt-3 block reg_btn bg-black border border-black text-white text-xl py-2 hover:bg-transparent hover:text-black hover:border-black rounded' onClick={regDoctor}>Create Your Profile</button>
            </form>
            <div className='flex justify-center mt-3 ml-10'>
            <button type='submit' className='text-blue-900' onClick={forgotPassDoctor}>Forgot Password ?</button>
            </div>
        </div>

        </div>
        </>
    )
}

export default Image_slider_login;
