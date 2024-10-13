import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ZIM from "zego-zim-web";

export default function VideoCallRoom() {
    const location = useLocation();
    const { doctorName, doctorUniqueId, patientName, patientUniqueId } = location.state || {};
    const meetingContainerRef = useRef(null); // Reference to the meeting container
    let zc; // Declare the zc variable here to be accessible in invite function

    console.log("Patient Name is ", patientName);
    console.log("Patient Id is ", patientUniqueId);
    console.log("Doctor Name is ", doctorName);
    console.log("Doctor Id is ", doctorUniqueId);

    const meeting = async () => {
        let appID = 1789141898;
        let server = "d486d224edf9e1860e805252c0488302";
        const roomId = patientUniqueId; // Room ID can be unique to this session
        const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, server, roomId, patientUniqueId, patientName);
        
        zc = ZegoUIKitPrebuilt.create(kittoken);
        zc.addPlugins({ ZIM });
        
        // Ensure we have a valid element reference
        if (meetingContainerRef.current) {
            zc.joinRoom({
                container: meetingContainerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                    config: {
                        audio: true,
                        video: true
                    }
                }
            });
        } else {
            console.error("Meeting container not found.");
        }
    };

    const invite = async () => {
        if (!doctorName || !doctorUniqueId) {
            console.warn("Doctor details are missing!");
            return; // Prevents inviting if details are missing
        }

        const targetUser = {
            userID: doctorUniqueId, // Correctly assigns the doctor's unique ID
            userName: doctorName // Correctly assigns the doctor's name
        };

        try {
            const res = await zc.sendCallInvitation({
                callees: [targetUser], // Inviting the doctor
                callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
                timeout: 60
            });
            console.log("Invitation sent: ", res);
        } catch (err) {
            console.error("Error sending invitation: ", err);
        }
    };

    useEffect(() => {
        meeting(); // Start the meeting when the component mounts
    }, []);

    return (
        <>
            <div ref={meetingContainerRef} style={{ width: '100%', height: '100vh' }} /> {/* Video call UI container */}
            <button onClick={invite}>Invite Doctor</button> {/* Button to invite the doctor */}
        </>
    );
}
