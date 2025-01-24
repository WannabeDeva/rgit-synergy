import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {
    // const {roomID} = useParams();
    const roomID = "abcde"

    const myMeeting = async(element) => {
        const appID =1424253770
        const serverSecret = "10dfe675ec4f9b0a9914ab9f98e6c8bf"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            "Anesh"
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container:element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            },
        });

    }

    return(
        <div className="room-page">
            <div ref={myMeeting} />
        </div>
    )
}

export default RoomPage;