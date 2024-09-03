import { set } from "mongoose";
import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:3000');

export default function ChatRoom() {
    const [message, setMessage] = useState('')

    const messagehandler = (event) => {
        setMessage(event.target.value)
    }

    const submitMessage = (event) => {
        event.preventDefault();
        
        if(message){
            socket.emit('message', message);
            document.querySelector('.showchat').style.display="block"
            document.querySelector('.showchat').innerHTML += `<div class="chat-message">${message}</div>`
            document.querySelector('.chatinput').value = ''
        }
        if (!message) {
            alert("Type Message")
            return
        }


    }

    return (
        <>
            <div className="showchat" style={{ position: "absolute" }}>
            </div>

            <form action="" onSubmit={submitMessage}>
                <div className="flex">
                    <div>
                    <input type="textarea" className="chatinput" onChange={messagehandler} value={message} placeholder="Type..."/>
                    </div>
<div style={{ marginTop: "550px",marginLeft:"20px",width:"60px",backgroundColor:"white",boxShadow: "5px 5px 20px rgb(107, 102, 102)",borderRadius:"20px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8" onClick={submitMessage} style={{marginLeft:"16px",marginTop:"7px",cursor:"pointer"}}>
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                    </div>
                </div>

            </form>
        </>
    )
}