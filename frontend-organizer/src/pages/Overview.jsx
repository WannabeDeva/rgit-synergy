import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Trophy, 
  Clock, 
  Calendar,
  BarChart3,
  FileCode2,
  MessageSquare
} from 'lucide-react';
import EditHackathonModal from '@/components/EditHackathonModal';
import Sidebar from '@/components/Sidebar';

const Overview = () => {
  // Example data - replace with your actual data
  const hackathonData = {
    title: "Tech Innovation Hackathon 2025",
    status: "In Progress",
    timeRemaining: "32 hours",
    totalTeams: 24,
    totalParticipants: 96,
    submittedProjects: 18,
    mentorRequests: 15,
    startDate: "Jan 20, 2025",
    endDate: "Jan 22, 2025",
    progress: 65
  };

  const stats = [
    {
      title: "Total Teams",
      value: hackathonData.totalTeams,
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Participants",
      value: hackathonData.totalParticipants,
      icon: <Trophy className="h-6 w-6 text-green-500" />
    },
    {
      title: "Projects Submitted",
      value: hackathonData.submittedProjects,
      icon: <FileCode2 className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Mentor Requests",
      value: hackathonData.mentorRequests,
      icon: <MessageSquare className="h-6 w-6 text-orange-500" />
    }
  ];
  const navigate = useNavigate();

  return (

    <div className="flex">
    <Sidebar />

    

    <main className="flex-1 bg-gray-100 min-h-screen">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

      <Button variant="destructive" onClick={() => navigate(`/`)}>Back to home</Button>

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{hackathonData.title}</h1>
          <p className="text-gray-500 mt-1">Overview Dashboard</p>
        </div>
       <EditHackathonModal />
      </div>

      {/* Status Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Time Remaining:</span>
              <span className="text-gray-600">{hackathonData.timeRemaining}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="font-medium">Duration:</span>
              <span className="text-gray-600">{hackathonData.startDate} - {hackathonData.endDate}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{hackathonData.progress}%</span>
            </div>
            <Progress value={hackathonData.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example timeline items */}
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">Team CodeNinjas submitted their project</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">New mentor request from Team Innovators</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="font-medium">Team TechStars registered</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </main>
  </div>

    
  );
};

export default Overview;