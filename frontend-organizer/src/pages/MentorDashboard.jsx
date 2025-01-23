import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MentorDashboard = () => {
  const mentorName = "John Doe"; // Replace with dynamic mentor name if needed
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      teamName: "Team Alpha",
      requestTime: "10:00 AM",
      status: "Pending", // Options: Pending, Scheduled
      meetingTime: "",
    },
  ]);

  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      project: "AI-Powered Assistant",
      members: "John, Jane, Alice",
      githubLink: "https://github.com/team-alpha/ai-assistant",
    },
    {
      id: 2,
      name: "Team Beta",
      project: "Blockchain Voting System",
      members: "Mark, Sarah, Bob",
      githubLink: "https://github.com/team-beta/blockchain-voting",
    },
  ];

  const handleScheduleMeeting = (id, time) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, status: "Scheduled", meetingTime: time } : notification
      )
    );
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Welcome, {mentorName}</h1>
        <p className="text-lg font-light">Manage your assigned teams and notifications efficiently.</p>
      </header>

      {/* Teams List Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Assigned Teams</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="font-bold text-gray-700">Team Name</TableCell>
                <TableCell className="font-bold text-gray-700">Project Title</TableCell>
                <TableCell className="font-bold text-gray-700">Members</TableCell>
                <TableCell className="font-bold text-gray-700">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.project}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      as="a"
                      href={team.githubLink}
                      target="_blank"
                      className="text-blue-600"
                    >
                      View GitHub
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {notification.teamName} has requested a meeting
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Request received at {notification.requestTime}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notification.status === "Pending" ? (
                  <div className="flex items-center space-x-4">
                    <Input
                      type="time"
                      onChange={(e) =>
                        handleScheduleMeeting(notification.id, e.target.value)
                      }
                      placeholder="Schedule a time"
                    />
                    <Button onClick={() => handleScheduleMeeting(notification.id, "TBA")}>
                      Schedule Meeting
                    </Button>
                  </div>
                ) : (
                  <p className="text-green-600 font-semibold">
                    Meeting scheduled for {notification.meetingTime}.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MentorDashboard;
