import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function ChatRoomDoctor() {
//     const [storeMessages, setstoreMessages] = useState(() => {
//         const savedMessages = localStorage.getItem("storeMessages");
//         return savedMessages ? JSON.parse(savedMessages) : [];

//  });
    const [storeMessages, setStoreMessages] = useState([]);
    const [message, setMessage] = useState('')
    const lastMessageRef = useRef(null);

    const location = useLocation();
    const {doctorName,doctorUniqueId,patientName,patientUniqueId,messages}  = location.state || {}

    console.log("Doctor Name is ",doctorName,doctorUniqueId)
    console.log("Patient Name is ",patientName,patientUniqueId)
    console.log("messages",messages)

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [storeMessages]);

    const messagehandler = (event) => {
        setMessage(event.target.value)
    }

    // useEffect(() => {
    //     socket.emit('register', doctorName, doctorUniqueId, 'patient');
    //     socket.on('privateMessageToClient', ({ fromUserId, message }) => {
    //         console.log(`Message from user ${fromUserId}: ${message}`);
    //         // setstoreMessages((prevMessages) => {
    //         //     const updatedMessages = [...prevMessages, message];
    //         //     localStorage.setItem("storeMessages", JSON.stringify(updatedMessages)); 
    //         //     return updatedMessages;
    //         // });
    //         setStoreMessages((prevMessages) => [
    //             ...prevMessages, 
    //             { fromUserId, username: patientName, message }
    //         ]);
    //     });

    //     return () => {
    //         socket.off('privateMessageToClient');
    //     };
    // }, [doctorName, doctorUniqueId]);
    useEffect(() => {
        socket.emit('register', doctorName, doctorUniqueId, 'doctor');
        
        socket.on('privateMessageToClient', ({ from, message }) => {
            console.log(`Message from ${from.userId}: ${message}`);

            setStoreMessages((prevMessages) => [
                ...prevMessages, 
                { fromUserId: from.userId, username: from.username, message } 
            ]);
        });
    
        return () => {
            socket.off('privateMessageToClient');
        };
    }, [doctorName, doctorUniqueId]);
    

    const submitMessage = (event) => {
        event.preventDefault();
    
        if (message) {
            socket.emit('register', doctorName, doctorUniqueId, 'doctor');
            socket.emit('privateMessage', { toUserId: patientUniqueId, message: message });
            socket.on('privateMessageToClient', ({ from, message }) => {
                console.log("Doctor ID:", doctorUniqueId);                
                console.log(`Message from ${from}: ${message}`);
            });
            // setstoreMessages((prevMessages) => {
            //     const updatedMessages = [...prevMessages, message];
            //     localStorage.setItem("storeMessages", JSON.stringify(updatedMessages)); 
            //     return updatedMessages;
            // });
            setStoreMessages((prevMessages) => [
                ...prevMessages, 
                { fromUserId: doctorUniqueId, username: "You", message }
            ]);
            
            setMessage('');
        }
        if (!message) {
            alert("Type a message");
        }
    };

    const navigate=useNavigate()

    const doctor_home_dashboard = () => {
        navigate('/doctorlogoutHome')
      }
      
    return (
        <>
          <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">

<h2 className="text-xl text-white" style={{position:"absolute",marginLeft:"120px"}}><i>Patient  {patientName}</i></h2>
<button className="text-white text-lg" onClick={doctor_home_dashboard} style={{marginLeft:"1000px"}}>Home</button>
<div s><p className="text-white text-xl font-black ml-20">MEDI ASSIST</p></div>
</nav>

<div className="sendchat" style={{ position: "absolute", overflowY: "auto", maxHeight: "400px" }}>
        {messages && (
            <div className="message-received">
                {patientName} : {messages}
            </div>
        )}
        
{storeMessages && storeMessages.filter((msg) => msg.fromUserId === patientUniqueId || msg.fromUserId === doctorUniqueId)  
    .map((msg, index) => (
        <div 
            key={index} 
            className={msg.fromUserId === doctorUniqueId ? "message-sent" : "message-received"}>
            {msg.username} : {msg.message}
        </div>
    ))}

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
