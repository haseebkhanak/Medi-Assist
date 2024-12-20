import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const socket = io('http://localhost:3000');

export default function ChatRoomPatient() {
    const [message, setMessage] = useState('');
    // const [storeMessages, setStoreMessages] = useState([]);
    const [storeMessages, setStoreMessages] = useState(() => {
        const savedDetails = localStorage.getItem("storeMessages");
        return savedDetails ? JSON.parse(savedDetails) : [];
    });
    const lastMessageRef = useRef(null);

    const navigate=useNavigate()
    const patient_home_dashboard = () => {
        navigate('/patientlogoutHome')
      }

    const location = useLocation();
    const { doctorName, doctorPicture, doctorUniqueId, patientName, patientUniqueId } = location.state || {};

    if (!doctorName || !doctorPicture) {
        return <h2>No Doctor Selected</h2>;
    }

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [storeMessages]);

    useEffect(() => {
        socket.emit('register', patientName, patientUniqueId, 'patient');
        socket.on('privateMessageToClient', ({ fromUserId, message }) => {
            console.log(`Message from user ${fromUserId}: ${message}`);
            setStoreMessages((prevMessages) => [
                ...prevMessages, 
                { fromUserId, username: doctorName, message }
            ]);

            setSenderDetails((prevDetails) => {
                const updatedDetails = [...prevDetails, PatientData.senderDetails];

                // Return the updated state and persist to local storage
                localStorage.setItem("senderDetails", JSON.stringify(updatedDetails));
                return updatedDetails;
            });
        });

        return () => {
            socket.off('privateMessageToClient');
        };
    }, [patientName, patientUniqueId]);

    useEffect(() => {
        localStorage.setItem("storeMessages", JSON.stringify(storeMessages));
    }, [storeMessages]);

    const messageHandler = (event) => {
        setMessage(event.target.value);
    };

    const submitMessage = (event) => {
        event.preventDefault();
        if (!message) {
            alert("Type a message");
            return;
        }

        socket.emit('privateMessage', { toUserId: doctorUniqueId, message });
        setStoreMessages((prevMessages) => [
            ...prevMessages, 
            { fromUserId: patientUniqueId, username: "You", message }
        ]);
        setMessage('');
    };

    return (
        <>
            <div className="sendchat" style={{ position: "absolute", overflowY: "auto", maxHeight: "400px" }}>
                {storeMessages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={msg.fromUserId === patientUniqueId ? "message-sent" : "message-received"}>
                        {msg.username} : {msg.message}
                    </div>
                ))}
                <div ref={lastMessageRef}></div>
            </div>

            <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                <img className="myimg" style={{ marginTop: "1px", marginLeft: "50px" }} src={`data:image/jpeg;base64,${doctorPicture}`} alt="No Profile" />
                <h2 className="text-xl text-white" style={{ position: "absolute", marginLeft: "120px" }}>
                    <i>Dr. {doctorName}</i>
                </h2>

                    <button className="text-white text-xl" style={{marginLeft:'950px'}} onClick={patient_home_dashboard}>Home</button>
                <div className="ml-20">
                    <p className="text-white text-xl font-black" style={{ position:"relative" }}>MEDI ASSIST</p>
                </div>
            </nav>

            <form onSubmit={submitMessage}>
                <div className="flex">
                    <div>
                        <input 
                            type="textarea" 
                            className="chatinput" 
                            onChange={messageHandler} 
                            value={message} 
                            placeholder="Type..." 
                        />
                    </div>
                    <div style={{ marginTop: "550px", marginLeft: "20px", width: "60px", backgroundColor: "white", boxShadow: "5px 5px 20px rgb(107, 102, 102)", borderRadius: "20px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8" onClick={submitMessage} style={{ marginLeft: "16px", marginTop: "7px", cursor: "pointer" }}>
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </div>
                </div>
            </form>
        </>
    );
}
