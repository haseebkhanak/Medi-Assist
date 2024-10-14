import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ZIM from "zego-zim-web";

export default function VideoCallRoom() {
    const location = useLocation();
    const { doctorName, doctorUniqueId, patientName, patientUniqueId } = location.state || {};
    const meetingContainerRef = useRef(null);
    const callButtonRef = useRef(null);

    let zc;

    const meeting = async () => {
        let appID = 1789141898;
        let server = "d486d224edf9e1860e805252c0488302";
        const roomId = patientUniqueId;
        const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, server, roomId, patientUniqueId, patientName);

        zc = ZegoUIKitPrebuilt.create(kittoken);
        zc.addPlugins({ ZIM });

        if (meetingContainerRef.current) {
            zc.joinRoom({
                container: meetingContainerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                    config: {
                        audio: true,
                        video: true
                    }
                },
                onJoinRoom: () => {
                    if (callButtonRef.current) {
                        callButtonRef.current.style.display = "none"; 
                    }
                }
            });

            // zc.on("roomLeave", () => {
            //     if (callButtonRef.current) {
            //         callButtonRef.current.style.display = "block"; // Show the button when the room ends
            //     }
            // });

        } else {
            console.error("Meeting container not found.");
        }
    };

    const invite = async () => {
        const targetUser = {
            userID: doctorUniqueId,
            userName: doctorName
        };

        try {
            const res = await zc.sendCallInvitation({
                callees: [targetUser],
                callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
                timeout: 60
            });
            console.log("Invitation sent: ", res);
        } catch (err) {
            console.error("Error sending invitation: ", err);
        }
    };

    useEffect(() => {
        meeting(); 
    }, []);

    return (
        <>
            <div ref={meetingContainerRef} style={{ width: '100%', height: '100vh', position: "absolute" }} />
            <button ref={callButtonRef} onClick={invite} style={{ marginTop: "420px", marginLeft: "755px", position: "relative", width: "350px", borderRadius: "10px" }} className="bg-black text-white px-2 py-3">Call Doctor</button>
        </>
    );
}
