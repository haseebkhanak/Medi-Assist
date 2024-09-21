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

    socket.emit('register', doctorName, doctorUniqueId);
    useEffect(() => {
        socket.on('privateMessageToClient', ({ from, message }) => {
            console.log(`Message from Name: ${from.username} and ID: ${from.userId}): ${message}`);
            console.log("Doctor ID:", doctorUniqueId); 
            setstoreMessages((prevMessages)=>[...prevMessages,message]);
        });
    
        return () => {
            socket.off('privateMessageToClient');
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`http://localhost:2000/api/messages/${doctorUniqueId}`);
            const data = await res.json();
            setstoreMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        if (doctorUniqueId) {
            fetchMessages();
        }
    }, [doctorUniqueId]);
    
    // const submitMessage = (event) => {
    //     event.preventDefault();

    //     if (message) {
    //         socket.emit('register',doctorName,doctorUniqueId);
    //         socket.emit('message', message);
    //         socket.on('privateMessageToClient', ({ doctorUniqueId, message }) => {
    //             console.log("Doctor ID:", doctorUniqueId);                
    //             console.log(`Message from ${doctorUniqueId}: to ${from} ${message}`);
    //             setstoreMessages([...storeMessages, `${message}`]);
    //         });
    //         // socket.emit('privateMessage', { toUserId:from, message: message });

    //             // setstoreMessages([...storeMessages,message])
            
    //         setMessage('')
    //     }
    //     if (!message) {
    //         alert("Type Message")
    //         return
    //     }
    // }

    return (
        <>
            <div className="showchat" style={{position:"absolute",overflowY: "auto", maxHeight: "400px" }}>

                {storeMessages && storeMessages.map((msg,index) =>
                    <div key={index} className="chat-message" style={{backgroundColor:"pink",marginLeft:"900px",color:"black"}}>
                        {msg}
                    </div>)}

            <div ref={lastMessageRef}></div>
            </div>


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
