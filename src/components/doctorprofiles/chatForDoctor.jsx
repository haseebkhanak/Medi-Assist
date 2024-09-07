import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function ChatRoomDoctor() {
    const [message, setMessage] = useState('')
    const [storeMessages, setstoreMessages] = useState([])
    const lastMessageRef = useRef(null);

    const location = useLocation();
    const {doctorName,doctorUniqueId}  = location.state || {}

    console.log("Doctor Name is ",doctorName,doctorUniqueId)

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [storeMessages]);

    const messagehandler = (event) => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        socket.on('privateMessageToClient', ({ from, message }) => {
            setstoreMessages(prevMessages => [...prevMessages, `${from}: ${message}`]);
            console.log("Doctor ID:", doctorUniqueId); 

        });

        socket.emit('register', doctorName, doctorUniqueId);
    
        return () => {
            socket.off('privateMessageToClient');
        };
    }, []);
    
    // const submitMessage = (event) => {
    //     event.preventDefault();

    //     if (message) {
    //         // Send reply to the patient
    //         socket.emit('privateMessage', { toUserId: patientUniqueId, message: message });
    
    //     } 
    //     setstoreMessages([...storeMessages, message]);  // Add message to chat UI
    //     setMessage('');  // Clear input field
    //     // setstoreMessages([...storeMessages, message])
    //     if (!message) {
    //         alert("Type Message")
    //         return
    //     }


    // }

    return (
        <>
            <div className="showchat" style={{position:"absolute",overflowY: "auto", maxHeight: "400px" }}>

                {storeMessages && storeMessages.map((msg,index) =>
                    <div key={index} className="chat-message">
                        {msg}
                    </div>)}

            <div ref={lastMessageRef}></div>
            </div>
            {/* <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">

            <img className="myimg" style={{marginTop:"1px",marginLeft:"50px"}} src={`data:image/jpeg;base64,${doctorPicture}`} alt="No Profile" />
            <h2 className="text-xl text-white" style={{position:"absolute",marginLeft:"120px"}}><i>Dr. {doctorName}</i></h2>
            <div style={{marginLeft:"1080px"}}><p className="text-white text-xl font-black">MEDI ASSIST</p></div>
        </nav> */}

            <form action="">
                <div className="flex">
                    <div>
                        <input type="textarea" className="chatinput" onChange={messagehandler} value={message} placeholder="Type..." />
                    </div>
                    <div style={{ marginTop: "550px", marginLeft: "20px", width: "60px", backgroundColor: "white", boxShadow: "5px 5px 20px rgb(107, 102, 102)", borderRadius: "20px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8"  style={{ marginLeft: "16px", marginTop: "7px", cursor: "pointer" }}>
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </div>
                </div>

            </form>
        </>
    )
}
