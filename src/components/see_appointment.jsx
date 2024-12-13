import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from './images/logo.png';

export default function SeeAppointment() {
  const [appointmentFound, setAppointmentFound] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const { doctorUniqueId } = location.state || {};

  const fetchusername = async () => {
    try {
        const res = await fetch('http://localhost:2000/homepage', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        setMessage(result);
    } catch (error) {
        console.log("Error ", error);
    }
};

useEffect(() => {
    fetchusername();
}, []);

const doc_login = () => {
  navigate("/doctor-login")
}

const destroysession = async () => {
    try {
        const res = await fetch('http://localhost:2000/logedOut', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        console.log(result.message);

        if (res.ok) {
            doc_login();
        }
    } catch (error) {
        console.log("Error ", error);
    }
};

  useEffect(() => {
    const checkAppointment = async () => {
      const data = { doctorUniqueId };
      try {
        const res = await fetch("http://localhost:2000/see_appointement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        setAppointmentFound(result.appointmentFound);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    checkAppointment();
  }, []);

  const navigate=useNavigate()
  const doctor_home_dashboard = () => {
    navigate('/doctorlogoutHome')
  }

  const notifications = (doctorName, doctorUniqueId) => {
    navigate("/notifi", { state: { doctorName, doctorUniqueId } });
};

  return (
    <>
     <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                <img src={Logo} alt="" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>
                <div>
                    <button className="text-white ml-20 text-lg" onClick={doctor_home_dashboard}>Home</button>
                    <button className="text-white ml-20 text-lg" onClick={() => notifications(message.message_name, message.message_id)}>Notifications</button>
                </div>
                <div className="search ml-20">
                    <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                </div>
                <div className="flex relative">
                    <div>
                        <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
                        {message.message_name && (
                            <p className='name text-white text-xl' style={{ cursor: "pointer" }}><i>{message.message_name}</i></p>
                        )}
                        {message.message_profile && (
                            <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" style={{ cursor: "pointer" }} />
                        )}
                    </div>
                </div>
            </nav>
           
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Doctor Appointments
      </h1>
      {appointmentFound.length > 0 ? (
        appointmentFound.map((profile) => (
          <div
            key={profile._id}
            className="max-w-4xl mx-auto mb-6 shadow-lg rounded-lg overflow-hidden border border-gray-300"
          >
            <table className="table-auto w-full text-left border-collapse bg-white">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-6 py-3 border-b">Doctor Name</th>
                  <th className="px-6 py-3 border-b">Patient Name</th>
                  <th className="px-6 py-3 border-b">Appointment Date</th>
                  <th className="px-6 py-3 border-b">Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{profile.doctorName}</td>
                  <td className="px-6 py-4 border-b">{profile.patientName}</td>
                  <td className="px-6 py-4 border-b">{profile.appointmentDate}</td>
                  <td className="px-6 py-4 border-b">{profile.appointmentTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No appointments found for this doctor.
        </p>
      )}
    </div>
    </>
  );
}
