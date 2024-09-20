
import { useEffect,useState } from "react"
import { io } from "socket.io-client"
import Logo from './images/logo.png';
import { useNavigate } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function MessageNotifications(){
  const [messageNotifi,setMessageNotifi]=useState('')
  const [message,setMessage]=useState('')

  
  const navigate = useNavigate()
  const doc_login = () => {
      navigate("/doctor-login")
  }

  const fetchusername = async () => {

    try {
        const res = await fetch('http://localhost:2000/homepage',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const result = await res.json()
        setMessage(result)
    }
    catch (error) {
        console.log("Error ", error)
    }
}

useEffect(() => {
    fetchusername()
}, [])

const destroysession = async () => {
  try {
      const res = await fetch('http://localhost:2000/logedOut',
          {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      )
      const result = await res.json()
      console.log(result.message)

      if (res.ok) {
          doc_login()
      }
  } catch (error) {
      console.log("Error ", error)
  }
}

  const fetchPatientsData=()=>{
    socket.on('notification',(PatientData)=>{
      console.log(PatientData.patientdetails)
      setMessageNotifi(PatientData.patientdetails)
    })
  }
  
useEffect(()=>{
  fetchPatientsData()
},[])

return(
        <>
        <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <a href="#" className="text-white ml-20 text-lg">About Us</a>
                        <a href="#" className="text-white ml-10 text-lg">View Your Profile</a>
                    </div>

                    <div className="search ml-20">
                        <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                    </div>

                    <div className="flex relative">

                        <div>
                            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
                            {message.message_name && (
                                <p className='name text-white text-xl' style={{cursor:"pointer"}}><i>{message.message_name}</i></p>
                            )}

                            {message.message_profile && (
                                <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" style={{cursor:"pointer"}}/>
                            )}
                        </div>
                    </div>

                </nav>
        {messageNotifi && (
          <div className="notifi mt-40 ml-40 bg-pink-300 py-4 text-center">
            <p className="text-xl">Patient <i>{messageNotifi.patientname}</i></p>
            <button type="button" style={{padding:"10px"}} className='mt-5 bg-black text-white rounded hover:bg-green-300 hover:text-black'>Chat With Patient</button>
          </div>
        )}
        </>
    )}