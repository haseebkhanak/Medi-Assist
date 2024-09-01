import Logo from '../images/logo.png';
import { useEffect,useState } from 'react';

export default function DermProfiles(){

    const [message,setMessage]=useState('')
    
    const fetchDermProfiles= async()=>{
        try {
            const res= await fetch('http://localhost:2000/dermprofiles',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }       
            })
            const result=await res.json()
            console.log(result);
            setMessage(result.doctorProfileMessage)
        } catch (error) {
            console.log('Error fetching profiles:',error)
        }
    }

    useEffect(()=>{
        fetchDermProfiles()
    },[])

    return(
        <>
<br /><br /><br /><br />

{message && message.map((profile) =>
                <div key={profile._id}>
                    <fieldset style={{ marginLeft: "50px" }}>
                        <legend>
                            <img className="profileimg" src={`data:image/jpeg;base64,${profile.profile}`} alt="No Profile" />
                        </legend>
                        <p className='text-3xl italic'> Dr. {profile.fullName}</p>
                        <p className='text-xl'>{profile.specialization}</p>
                        <p className='text-xl'>{profile.edu}</p>
                        <p className='text-xl'>{profile.experience} years Experience</p>
                    </fieldset>
                </div>
            )}

         <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <a href="#" className="text-white ml-20 text-lg">About Us</a>
                        <a href="#" className="text-white ml-10 text-lg">Doctors Profiles</a>
                    </div>

                    <div className="search ml-20">
                        <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                    </div>

                    <div className="flex ml-auto space-x-10">
                        <div className="login"><button className="btn-reg bg-transparent border border-black-400 text-white px-2 py-2 rounded">LogIn</button></div>
                        <div className="join"><button className="btn-join bg-transparent border border-pink-500 text-pink-200 mr-20 px-2 py-2 rounded">Register as Doctor</button></div>
                    </div>
                </nav>
        </>
    )
}