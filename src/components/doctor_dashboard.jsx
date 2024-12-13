import Logo from './images/logo.png';
import Doctor from './images/doctor.png';
import Blog from './images/blog.jpeg';
import Image_slider from './slider';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { BorderBeam } from './magicui/border-beam';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import ZIM from '@zegocloud/zego-uikit-prebuilt';

export default function DoctorLogoutHome() {
    const [message, setMessage] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    const [callerName, setCallerName] = useState("");

    const navigate = useNavigate();
    const confirmDialogRef = useRef(null);
    const acceptButtonRef = useRef(null);
    const refuseButtonRef = useRef(null);
    const blurBody = useRef(null);

    const doc_login = () => {
        navigate("/doctor-login");
    };

    const notifications = (doctorName, doctorUniqueId) => {
        navigate("/notifi", { state: { doctorName, doctorUniqueId } });
    };

    const prediction=()=>{
        navigate("/medicine-recommendation")
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
            console.log(result.message_name);
            console.log(result.message_id);
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

    const viewProfile = async () => {
        try {
            const res = await fetch('http://localhost:2000/viewprofile', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            document.querySelector("#doctorprofile").style.display = "block";
            document.querySelector(".blurTwo").style.display = "block";
            const result = await res.json();
            setMessageTwo(result);
            console.log(result);
        } catch (error) {
            console.log("Error ", error);
        }
    };

    const crossSvg = () => {
        document.querySelector("#doctorprofile").style.display = "none";
        document.querySelector(".blurTwo").style.display = "none";
    };

    useEffect(() => {
        if (message.message_id && message.message_name) {
            DoctorIncomingCall(); 
        } else {
            console.log("Waiting for doctor details...");
        }
    }, [message]);

    let zc;
    const DoctorIncomingCall = async () => {
        try {
            const appID = 111289668;
            const server = "7af5ad50c11242df8f97d1ed03e2772f";
            const doctorUniqueId = message.message_id;
            const doctorName = message.message_name;

            console.log("Doctor Name: ", doctorName);
            console.log("Doctor Unique ID: ", doctorUniqueId);

            if (!doctorUniqueId || !doctorName) {
                console.error("Doctor details are missing!");
                return; // Avoid proceeding if doctor details are not available
            }

            const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, server, null, doctorUniqueId, doctorName);
            // console.log("Kit Token generated:", kittoken);

            zc = ZegoUIKitPrebuilt.create(kittoken);
            zc.addPlugins({ ZIM });

            zc.setCallInvitationConfig({
                enableCustomCallInvitationDialog: true,
                onConfirmDialogWhenReceiving: (callType, caller, refuse, accept, data) => {
                    console.log("Incoming call from:", caller.userName);  // Debugging log
                    confirmDialogRef.current.style.display="block"
                    blurBody.current.style.display="block"
                    setCallerName(caller.userName); 

                    // Accept or Refuse the call
                    if (acceptButtonRef.current && refuseButtonRef.current) {
                        acceptButtonRef.current.onclick = () => {
                            console.log("Accepting call...");
                            accept(); 
                            confirmDialogRef.current.style.display="none"
                            blurBody.current.style.display="none"
                        };

                        refuseButtonRef.current.onclick = () => {
                            console.log("Refusing call..."); 
                            refuse(); 
                            confirmDialogRef.current.style.display="none"
                            blurBody.current.style.display="none"
                        };
                    }
                },
                onCallInvitationEnded: (reason) => {
                    console.log("Call invitation ended:", reason);  
                    confirmDialogRef.current.style.display="none"
                    blurBody.current.style.display="none"
                }
            });
        } catch (err) {
            console.error("Error in DoctorIncomingCall:", err); 
        }
    };

    return (
        <>
            <div className="blurTwo" ref={blurBody}></div>

            <div id="confirmDialog" ref={confirmDialogRef}>
                        <div className='text-center text-3xl mt-10'>{callerName}</div>
                        <div id="caller" className='text-xl text-center mt-5'>Incoming call...</div>
                        <button id="acceptButton" ref={acceptButtonRef} className='bg-green-400 px-4 py-2 border mt-7 text-white' style={{marginLeft:"45px", borderRadius:"10px"}}>Accept</button>
                        <button id="refuseButton" ref={refuseButtonRef} className='bg-red-500 px-4 py-2 border text-white' style={{marginLeft:"100px", borderRadius:"10px"}}>Refuse</button>
                    </div>

            <div className="profile">
                <div id='doctorprofile' className='relative rounded-lg'>
                    <BorderBeam size={250} duration={5} />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-8" onClick={crossSvg} style={{ marginLeft: 510, marginTop: 5, cursor: 'pointer' }}>
                        <path d="M6 18 18 6M6 6l12 12" />
                    </svg>

                    {messageTwo && (
                        <div>
                            <p className='text-center text-pink-800 mt-2 text-3xl'>MY PROFILE</p>
                            <fieldset style={{ marginLeft: "50px" }}>
                                <legend><img className="profileimg" src={`data:image/jpeg;base64,${messageTwo.showPicture_message}`} alt="No Profile" /></legend>
                                <p className='text-3xl italic'> Dr. {messageTwo.showProfile_message.fullName}</p>
                                <p className='text-xl'>{messageTwo.showProfile_message.specialization}</p>
                                <p className='text-xl'>{messageTwo.showProfile_message.edu}</p>
                                <p className='text-xl'>{messageTwo.showProfile_message.experience} years Experience </p>
                            </fieldset>
                        </div>
                    )}
                </div>
            </div>

            <div className="body">
                <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <button className="text-white ml-10 text-lg" onClick={() => notifications(message.message_name, message.message_id)}>Notifications</button>
                        <button className="text-white ml-10 text-lg" onClick={() => appointment(message.message_id)}>Appointments</button>
                    </div>

                    {/* <div className="predict ml-20">
                    <button className="bg-pink-500 border border-black-400 text-white px-2 py-1 rounded" onClick={prediction}>Medicine Recommendation</button>
                    </div> */}

                    <div className="flex relative" style={{marginLeft:"300px"}}>
                        <div>
                            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession}>LogOut</button>
                            {message.message_name && (
                                <p className='name text-white text-xl' style={{ cursor: "pointer" }} onClick={viewProfile}><i>DR. {message.message_name}</i></p>
                            )}

                            {message.message_profile && (
                                <img className='absolute myimg' src={`data:image/jpeg;base64,${message.message_profile}`} alt="No Profile" style={{ cursor: "pointer" }} onClick={viewProfile} />
                            )}
                        </div>
                    </div>
                </nav>

                <br /> <br /> <br />
                <div className="doctor_img shadow-2xl mt-10 flex bg-pink-100">
                    <img src={Doctor} alt="no" />
                    <h2 className='font-black text-blue-100 ml-12 mt-10'>Welcome To <span className='text-red-600'>Medi Assist</span> <br />
                        <span className='text_two'>A Platform where Patients can Connect with Doctors for <span className='text-black'><i>Real Time Consultation</i></span></span></h2>
                </div> <br /> <br />

                <Image_slider />

            </div>
        </>
    );
}
