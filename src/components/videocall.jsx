import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function VideoCallRomm(){

    const location = useLocation();
    const { patientName, patientUniqueId } = location.state || {};
    console.log("Patient Name is ", patientName);
    console.log("Patient Id is ", patientUniqueId);
    
    const meeting=async(element)=>{
        let appID = 1789141898;
        let server = "d486d224edf9e1860e805252c0488302";
        const roomId=patientUniqueId
        const kittoken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,server,roomId,patientUniqueId,patientName)
        const zc=ZegoUIKitPrebuilt.create(kittoken)
        zc.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            }
        })
    }

    useEffect(()=>{
        meeting()
    },[])

    return(
        <>

        </>
    )
}
