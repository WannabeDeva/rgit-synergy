import React, { useState } from 'react';
import { Video, PhoneOff, Mic, MicOff, VideoOff, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminNavbar from '@/components/AdminNavbar';

const VideoCallPage = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(false);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const startCall = () => setCallActive(true);
  const endCall = () => setCallActive(false);

  return (
    <div>
      <AdminNavbar />
    <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Video Call Assistance</CardTitle>
        </CardHeader>
        <CardContent>
          {!callActive ? (
            <div className="flex flex-col items-center gap-4">
              <Button onClick={startCall}>
                <Video className="h-5 w-5 mr-2" /> Start Video Call
              </Button>
            </div>
          ) : (
            <div className="relative bg-black w-full h-64 flex items-center justify-center rounded-md overflow-hidden">
              <p className="text-white">Live Video Feed</p>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <Button variant="outline" onClick={toggleMic}>
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-500" />}
                </Button>
                <Button variant="outline" onClick={toggleVideo}>
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
                </Button>
                <Button variant="destructive" onClick={endCall}>
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {callActive && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Patient: John Doe</span>
                <span className="text-gray-500">Age: 58</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Condition: Cardiac Emergency</span>
                <span className="text-gray-500">Time: 5 min ago</span>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Medical Notes</h3>
                <div className="p-3 border rounded bg-gray-50">
                  "Patient reported chest pain and shortness of breath before collapsing. Previous MI in 2022."
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Vital Signs</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 rounded text-center">
                    <p className="text-sm text-gray-500">Heart Rate</p>
                    <p className="font-bold text-lg text-red-600">118 bpm</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded text-center">
                    <p className="text-sm text-gray-500">Blood Pressure</p>
                    <p className="font-bold text-lg text-blue-600">160/95 mmHg</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded text-center">
                    <p className="text-sm text-gray-500">SpO2</p>
                    <p className="font-bold text-lg text-green-600">92%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default VideoCallPage;
