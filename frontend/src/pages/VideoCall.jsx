import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {
    const { roomID, userID, userName } = useParams(); 

    const appID = 1384187997; 
    const appSign = "7aa0ed38a23e5a217225109be3383d355deb4bf5868da52a73667d3f00f72ad0"; 

    const myMeeting = async (element) => {
        if (!userID) {
            console.error("Error: userID is missing!");
            return;
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            appSign,
            roomID,
            userID,
            userName
        );
        
        console.log(kitToken);
        
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference, // or ZegoUIKitPrebuilt.OneONoneCall
            },
        });
    };

    return <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoCall;
