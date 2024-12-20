// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Logo from './images/logo.png';
// import { useNavigate, useLocation } from "react-router-dom";

// const socket = io('http://localhost:3000');

// export default function MessageNotifications() {
//     const [message, setMessage] = useState('');
//     const [messageNotifi, setMessageNotifi] = useState([])
// //     const [messageNotifi, setMessageNotifi] = useState(() => {
// //         const savedMessages = localStorage.getItem("messageNotifi");
// //         return savedMessages ? JSON.parse(savedMessages) : [];

// //  });

// //  const [senderDetails, setSenderDetails] = useState(() => {
// //     const savedMessages = localStorage.getItem("senderDetails");
// //     return savedMessages ? JSON.parse(savedMessages) : [];

// // });
// const [senderDetails, setSenderDetails] = useState("");


//     const navigate = useNavigate();
//     const doc_login = () => {
//         navigate("/doctor-login")
//     }
//     const fetchusername = async () => {
//         try {
//             const res = await fetch('http://localhost:2000/homepage', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const result = await res.json();
//             setMessage(result);
//         } catch (error) {
//             console.log("Error ", error);
//         }
//     };

//     useEffect(() => {
//         fetchusername();
//     }, []);

//     const destroysession = async () => {
//         try {
//             const res = await fetch('http://localhost:2000/logedOut', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const result = await res.json();
//             console.log(result.message);

//             if (res.ok) {
//                 doc_login();
//             }
//         } catch (error) {
//             console.log("Error ", error);
//         }
//     };

//     const location = useLocation();
//     const { doctorName, doctorUniqueId } = location.state || {};
//     console.log("Doctor Name is ", doctorName);
//     console.log("Doctor Id is ", doctorUniqueId);

//     const fetchPatientsData = () => {
//         socket.emit('register', doctorName, doctorUniqueId, 'doctor');
//         socket.on('notification', (PatientData) => {
//             console.log("Received patient details:", PatientData.senderDetails);
//             console.log("Received message:", PatientData.message);

//             if (!senderDetails) {
//                 setSenderDetails(PatientData.senderDetails);
//                 // setSenderDetails(() => {
//                 //     const updatedMessages = [PatientData.senderDetails];
//                 //     localStorage.setItem("storeMessages", JSON.stringify(updatedMessages));
//                 //     return updatedMessages;
//                 // });
//             }

//             setMessageNotifi((prevMessages) => {
//                 const isDuplicate = prevMessages.some(
//                     (msg) => msg.message === PatientData.message
//                 );
//                 if (!isDuplicate) {
//                     // setMessageNotifi((prevMessages) => {
//                     //     const updatedMessages = [...prevMessages, message];
//                     //     localStorage.setItem("storeMessages", JSON.stringify(updatedMessages));
//                     //     return updatedMessages;
//                     // });
//                     setMessageNotifi((prevMessages) => {
//                         [...prevMessages, message];

//                     });
//                 }
//                 // return prevMessages;
//             });
//         });
//     };

//     useEffect(() => {
//         fetchPatientsData();
//     }, [senderDetails]); 

//     const chat_room = (patientName,patientUniqueId,doctorName,doctorUniqueId) => {
//         navigate('/chatdoctor', { state: { patientName,patientUniqueId,doctorName,doctorUniqueId } });
//     };

//     return (
//         <>
//             <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
//                 <img src={Logo} alt="" className='logo' />
//                 <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

//                 <div>
//                     <a href="#" className="text-white ml-20 text-lg">About Us</a>
//                     <a href="#" className="text-white ml-10 text-lg">View Your Profile</a>
//                 </div>

//                 <div className="search ml-20">
//                     <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
//                 </div>

//                 <div className="flex relative">
//                     <div>
//                         <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
//                         {message.message_name && (
//                             <p className='name text-white text-xl' style={{ cursor: "pointer" }}><i>{message.message_name}</i></p>
//                         )}
//                         {message.message_profile && (
//                             <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" style={{ cursor: "pointer" }} />
//                         )}
//                     </div>
//                 </div>
//             </nav>

// <div className="bg-white ml-40 px-4" style={{width:"fit-content",boxShadow:"inset 2px 2px 20px grey"}}>
//             {senderDetails && (
//                 <div className="mt-40">
//                     <p className="text-xl">Patient <i>{senderDetails.patientname}</i></p>
//                 </div>
//             )}

//             {messageNotifi && (
//                 <div className="mt-2">
//                     {messageNotifi.map((msg, index) => (
//                         <p key={index} className="text-lg">
//                             {senderDetails.patientname} : {msg.message}
//                         </p>
//                     ))}
//                 </div>
//             )}
//             </div>
//                  {senderDetails && (
//                     <div className="py-4 ml-40">
//                     <button 
//                         type="button" 
//                         style={{ padding: "10px" }} 
//                         onClick={() => chat_room(senderDetails.patientname,senderDetails._id,message.message_name,message.message_id)} 
//                         className='bg-black text-white rounded hover:bg-green-300 hover:text-black'
//                     >
//                         Chat With Patient
//                     </button>
//                     </div>
//             )}
                    
//         </>
//     );
// }
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Logo from './images/logo.png';
import { useNavigate, useLocation } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function MessageNotifications() {
    const [message, setMessage] = useState('');
    // const [messageNotifi, setMessageNotifi] = useState([]);
    const [messageNotifi, setMessageNotifi] = useState(() => {
        const savedDetails = localStorage.getItem("messageNotifi");
        return savedDetails ? JSON.parse(savedDetails) : [];
    });
    const [senderDetails, setSenderDetails] = useState([]);
    // const [senderDetails, setSenderDetails] = useState(() => {
    //     const savedDetails = localStorage.getItem("senderDetails");
    //     return savedDetails ? JSON.parse(savedDetails) : [];
    // });

    const navigate = useNavigate();

    const doc_login = () => {
        navigate("/doctor-login");
    };

    const doctor_home_dashboard = () => {
        navigate('/doctorlogoutHome')
      }

      const appointment=(doctorUniqueId)=>{
        navigate("/see-appointment",{ state: { doctorUniqueId } })
    }
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

    const location = useLocation();
    const { doctorName, doctorUniqueId } = location.state || {};
    console.log("Doctor Name is ", doctorName);
    console.log("Doctor Id is ", doctorUniqueId);

    useEffect(() => {
        const fetchPatientsData = () => {
            socket.emit('register', doctorName, doctorUniqueId, 'doctor');
    
            socket.on('notification', (PatientData) => {
                console.log("Received patient details:", PatientData.senderDetails);
                console.log("Received message:", PatientData.message);
                setSenderDetails((prevDetails) => {
                    const updatedDetails = [...prevDetails, PatientData.senderDetails];

                    // Return the updated state and persist to local storage
                    localStorage.setItem("senderDetails", JSON.stringify(updatedDetails));
                    return updatedDetails;
                });
                //  setSenderDetails(() => {
                //     const updatedMessages = [PatientData.senderDetails];
                //     localStorage.setItem("senderDetails", JSON.stringify(updatedMessages));
                // });

                setMessageNotifi((prevMessages) => {
       
                    const senderExists = prevMessages.find(
                        (msgGroup) => msgGroup.senderId === PatientData.senderDetails._id
                    );
    
                    if (senderExists) {
                        return prevMessages.map((msgGroup) =>
                            msgGroup.senderId === PatientData.senderDetails._id && !msgGroup.messages.includes(PatientData.message)
                                ? {
                                      ...msgGroup,
                                      messages: [...msgGroup.messages, PatientData.message]
                                  }
                                : msgGroup
                        );
                    } else {
                        return [
                            ...prevMessages,
                            { senderId: PatientData.senderDetails._id, messages: [PatientData.message] }
                        ];
                    }
                });
            });
        };

        fetchPatientsData();

        return () => {
            socket.off('notification'); 
        };
    }, []);  
    
    const chat_room = (patientName, patientUniqueId, doctorName, doctorUniqueId, messages) => {
        navigate('/chatdoctor', { state: { patientName, patientUniqueId, doctorName, doctorUniqueId, messages } });
    };

    useEffect(() => {
        localStorage.setItem("senderDetails", JSON.stringify(senderDetails));
    }, [senderDetails]);
 
    return (
        <>
            <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                <img src={Logo} alt="" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>
                <div>
                    <button className="text-white ml-20 text-lg" onClick={doctor_home_dashboard}>Home</button>
                    <button className="text-white ml-20 text-lg" onClick={() => appointment(message.message_id)}>Appointments</button>
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
            <br /><br /><br /><br />
    
            {messageNotifi && (
                <div className="mt-2">
                    {messageNotifi.map((msgGroup, index) => {
                        const sender = senderDetails.find((patient) => patient._id === msgGroup.senderId);
                        return sender ? (
                            <div className="bg-white ml-40 px-4 mt-10 py-2" style={{ width: "fit-content", boxShadow: "inset 2px 2px 20px grey" }} key={index}>
                                <p className="text-xl">Patient <i>{sender.patientname}</i></p>
                                {msgGroup.messages.map((messageObj, msgIndex) => (
                                    <p key={msgIndex} className="text-lg">
                                        {sender.patientname}: {messageObj}
                                    </p>
                                ))}
                                <button
                                    type="button"
                                    style={{ padding: "10px" }}
                                    onClick={() => chat_room(sender.patientname, sender._id, message.message_name, message.message_id, msgGroup.messages)}
                                    className='bg-black text-white rounded hover:bg-green-300 hover:text-black mt-5'
                                >
                                    Chat With {sender.patientname}
                                </button>
                            </div>
                        ) : null;
                    })}
                </div>
            )}
        </>
    );
    
}
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Logo from './images/logo.png';
// import { useNavigate, useLocation } from "react-router-dom";

// const socket = io('http://localhost:3000');

// export default function MessageNotifications() {
//     const [message, setMessage] = useState('');
//     const [messageNotifi, setMessageNotifi] = useState(() => {
//         // Fetch messageNotifi from localStorage on initial load
//         const savedNotifications = localStorage.getItem("messageNotifi");
//         return savedNotifications ? JSON.parse(savedNotifications) : [];
//     });
    
//     const [senderDetails, setSenderDetails] = useState(() => {
//         const savedDetails = localStorage.getItem("senderDetails");
//         return savedDetails ? JSON.parse(savedDetails) : [];
//     });

//     const navigate = useNavigate();

//     const doc_login = () => {
//         navigate("/doctor-login");
//     };

//     const fetchusername = async () => {
//         try {
//             const res = await fetch('http://localhost:2000/homepage', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const result = await res.json();
//             setMessage(result);
//         } catch (error) {
//             console.log("Error ", error);
//         }
//     };

//     useEffect(() => {
//         fetchusername();
//     }, []);

//     const destroysession = async () => {
//         try {
//             const res = await fetch('http://localhost:2000/logedOut', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const result = await res.json();
//             console.log(result.message);

//             if (res.ok) {
//                 doc_login();
//             }
//         } catch (error) {
//             console.log("Error ", error);
//         }
//     };

//     const location = useLocation();
//     const { doctorName, doctorUniqueId } = location.state || {};
//     console.log("Doctor Name is ", doctorName);
//     console.log("Doctor Id is ", doctorUniqueId);

//     useEffect(() => {
//         const fetchPatientsData = () => {
//             socket.emit('register', doctorName, doctorUniqueId, 'doctor');
    
//             socket.on('notification', (PatientData) => {
//                 console.log("Received patient details:", PatientData.senderDetails);
//                 console.log("Received message:", PatientData.message);
                
//                 // Update senderDetails and persist it
//                 setSenderDetails((prevDetails) => {
//                     const updatedDetails = [...prevDetails, PatientData.senderDetails];
//                     localStorage.setItem("senderDetails", JSON.stringify(updatedDetails));
//                     return updatedDetails;
//                 });

//                 // Update messageNotifi and persist it
//                 setMessageNotifi((prevMessages) => {
//                     const senderExists = prevMessages.find(
//                         (msgGroup) => msgGroup.senderId === PatientData.senderDetails._id
//                     );
    
//                     if (senderExists) {
//                         const updatedMessages = prevMessages.map((msgGroup) =>
//                             msgGroup.senderId === PatientData.senderDetails._id && !msgGroup.messages.includes(PatientData.message)
//                                 ? {
//                                       ...msgGroup,
//                                       messages: [...msgGroup.messages, PatientData.message]
//                                   }
//                                 : msgGroup
//                         );
//                         localStorage.setItem("messageNotifi", JSON.stringify(updatedMessages));
//                         return updatedMessages;
//                     } else {
//                         const newMessageGroup = [
//                             ...prevMessages,
//                             { senderId: PatientData.senderDetails._id, 
//                                messages: [PatientData.message] 
//                             }
//                         ];
//                         localStorage.setItem("messageNotifi", JSON.stringify(newMessageGroup));
//                         return newMessageGroup;
//                     }
//                 });
//             });
//         };

//         fetchPatientsData();

//         return () => {
//             socket.off('notification'); 
//         };
//     }, [doctorName, doctorUniqueId]);

//     // Persist senderDetails when it changes
//     useEffect(() => {
//         localStorage.setItem("senderDetails", JSON.stringify(senderDetails));
//     }, [senderDetails]);

//     // Persist messageNotifi when it changes
//     useEffect(() => {
//         localStorage.setItem("messageNotifi", JSON.stringify(messageNotifi));
//     }, [messageNotifi]);

//     const chat_room = (patientName, patientUniqueId, doctorName, doctorUniqueId, messages) => {
//         navigate('/chatdoctor', { state: { patientName, patientUniqueId, doctorName, doctorUniqueId, messages } });
//     };
 
//     return (
//         <>
//             <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
//                 <img src={Logo} alt="" className='logo' />
//                 <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>
//                 <div>
//                     <a href="#" className="text-white ml-20 text-lg">About Us</a>
//                     <a href="#" className="text-white ml-10 text-lg">View Your Profile</a>
//                 </div>
//                 <div className="search ml-20">
//                     <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
//                 </div>
//                 <div className="flex relative">
//                     <div>
//                         <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
//                         {message.message_name && (
//                             <p className='name text-white text-xl' style={{ cursor: "pointer" }}><i>{message.message_name}</i></p>
//                         )}
//                         {message.message_profile && (
//                             <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" style={{ cursor: "pointer" }} />
//                         )}
//                     </div>
//                 </div>
//             </nav>
//             <br /><br /><br /><br />
    
//             {messageNotifi && (
//                 <div className="mt-2">
//                     {messageNotifi.map((msgGroup, index) => {
//                         const sender = senderDetails.find((patient) => patient._id === msgGroup.senderId);
//                         return sender ? (
//                             <div className="bg-white ml-40 px-4 mt-10 py-2" style={{ width: "fit-content", boxShadow: "inset 2px 2px 20px grey" }} key={index}>
//                                 <p className="text-xl">Patient <i>{sender.patientname}</i></p>
//                                 {msgGroup.messages.map((messageObj, msgIndex) => (
//                                     <p key={msgIndex} className="text-lg">
//                                         {sender.patientname}: {messageObj}
//                                     </p>
//                                 ))}
//                                 <button
//                                     type="button"
//                                     style={{ padding: "10px" }}
//                                     onClick={() => chat_room(sender.patientname, sender._id, message.message_name, message.message_id, msgGroup.messages)}
//                                     className='bg-black text-white rounded hover:bg-green-300 hover:text-black mt-5'
//                                 >
//                                     Chat With {sender.patientname}
//                                 </button>
//                             </div>
//                         ) : null;
//                     })}
//                 </div>
//             )}
//         </>
//     );
// }


