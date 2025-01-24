import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import guy1 from "../images/guy1.jpg";
import guy2 from "../images/guy2.jpg";

const mentors = [
  {
    id: 1,
    name: "John Doe",
    expertise: "Frontend Development",
    status: "online",
    photo: guy1,
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "Backend Development",
    status: "offline",
    photo: guy2,
  },
  {
    id: 3,
    name: "Alex Johnson",
    expertise: "DevOps",
    status: "online",
    photo: "https://via.placeholder.com/150",
  },
];

function MentorsPage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null); // For storing notification details

  const handleSchedule = (mentor) => {
    // Simulate session scheduling
    setNotification({
      mentorName: mentor.name,
      scheduledTime: "4:00 PM", // Hardcoded time; can be dynamic
    });
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-center">Meet Our Mentors</h1>
        <p className="text-lg text-center">
          "Unlock your potential with the guidance of experts who are here to help
          you grow, learn, and succeed."
        </p>
      </header>

      {/* Divider */}
      <Separator className="my-4" />

      {/* Mentors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="p-4 flex flex-col items-center">
            {/* Mentor Avatar */}
            <Avatar
              src={mentor.photo}
              alt={mentor.name}
              className="w-24 h-24 mb-4"
            />
            {/* Mentor Info */}
            <h2 className="text-lg font-semibold">{mentor.name}</h2>
            <p className="text-gray-500">{mentor.expertise}</p>
            <Badge
              variant={mentor.status === "online" ? "success" : "destructive"}
              className="mt-2"
            >
              {mentor.status === "online" ? "Online" : "Offline"}
            </Badge>
            {/* Action Buttons */}
            <div className="flex mt-4 space-x-2">
              <Button variant="default" onClick={() => handleSchedule(mentor)}>
                Schedule Session
              </Button>
              <Button variant="outline">Chat Now</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Notification Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        {notification ? (
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold mb-2">
              Session Scheduled with {notification.mentorName}
            </h2>
            <p className="text-gray-600 mb-4">
              Your session is scheduled for <strong>{notification.scheduledTime}</strong>.
            </p>
            <Button
              variant="default"
              className="mt-2"
              // onClick={() => alert("Starting session...")}
              onClick={() => navigate("/room")}
            >
              Start Session
            </Button>
          </div>
        ) : (
          <p className="text-gray-600">No sessions scheduled yet.</p>
        )}
      </div>
    </div>
  );
}

export default MentorsPage;
