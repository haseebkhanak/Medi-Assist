import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function ChatRoomDoctor() {
    const [message, setMessage] = useState('')
    const [storeMessages, setstoreMessages] = useState([])
    const lastMessageRef = useRef(null);

    const location = useLocation();
    const {doctorName,doctorUniqueId,patientName,patientUniqueId}  = location.state || {}

    console.log("Doctor Name is ",doctorName,doctorUniqueId)
    console.log("Patient Name is ",patientName,patientUniqueId)

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [storeMessages]);

    const messagehandler = (event) => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        socket.emit('register', doctorName, doctorUniqueId);
        socket.on('privateMessageToClient', ({ from, message }) => {
            console.log(`Message from Name: ${from.username} and ID: ${from.userId}): ${message}`);
            setstoreMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
            socket.off('privateMessageToClient');
        };
    }, [doctorName, doctorUniqueId]);
    
    
    const submitMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('register',doctorName,doctorUniqueId);
            // socket.emit('message', message);
            socket.emit('privateMessage', { toUserId:patientUniqueId, message: message });

                socket.on('privateMessageToClient', ({ from, message }) => {
                    console.log("Doctor ID:", doctorUniqueId);                
                    console.log(`Message from ${from}: ${message}`);
                });
                setstoreMessages((prevMessages)=>[...prevMessages,message])
            
            setMessage('')
        }
        if (!message) {
            alert("Type Message")
            return
        }
    }
    return (
        <>
          <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">

<h2 className="text-xl text-white" style={{position:"absolute",marginLeft:"120px"}}><i>Patient  {patientName}</i></h2>
<div style={{marginLeft:"1080px"}}><p className="text-white text-xl font-black">MEDI ASSIST</p></div>
</nav>

<div className="sendchat" style={{position:"absolute",overflowY: "auto", maxHeight: "400px" }}>

{storeMessages && storeMessages.map((msg,index) =>
    <div key={index} className="chat-message-send">
        {msg}
    </div>)}

<div ref={lastMessageRef}></div>
</div>


            <form action="" onSubmit={submitMessage}>
                <div className="flex">
                    <div>
                        <input type="textarea" className="chatinput" onChange={messagehandler} value={message} placeholder="Type..." />
                    </div>
                    <div style={{ marginTop: "550px", marginLeft: "20px", width: "60px", backgroundColor: "white", boxShadow: "5px 5px 20px rgb(107, 102, 102)", borderRadius: "20px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8" onClick={submitMessage}  style={{ marginLeft: "16px", marginTop: "7px", cursor: "pointer" }}>
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </div>
                </div>

            </form>
        </>
    )
}
