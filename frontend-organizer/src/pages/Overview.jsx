import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, Trophy, Clock, Calendar, BarChart3, FileCode2, MessageSquare } from 'lucide-react';
import EditHackathonModal from '@/components/EditHackathonModal';
import Sidebar from '@/components/Sidebar';

const Overview = () => {
  const { id } = useParams(); // Get the hackathon ID from the URL
  const navigate = useNavigate();
  const [hackathonData, setHackathonData] = useState(null);

  // Simulate fetching hackathon data
  useEffect(() => {
    // Replace with your actual data-fetching logic
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          title: 'Tech Innovation Hackathon 2025',
          status: 'In Progress',
          timeRemaining: '32 hours',
          totalTeams: 24,
          totalParticipants: 96,
          submittedProjects: 18,
          mentorRequests: 15,
          startDate: '2025-01-20',
          endDate: '2025-01-22',
          progress: 65,
        },
        {
          id: 2,
          title: 'AI Solutions Hackathon',
          status: 'Registration Open',
          timeRemaining: '9 days',
          totalTeams: 18,
          totalParticipants: 72,
          submittedProjects: 10,
          mentorRequests: 8,
          startDate: '2025-02-01',
          endDate: '2025-02-03',
          progress: 30,
        },
        
      ];
      const selectedHackathon = data.find((hackathon) => hackathon.id === parseInt(id));
      setHackathonData(selectedHackathon);
    };

    fetchData();
  }, [id]);

  if (!hackathonData) {
    return <div>Loading...</div>; // Show a loading state while data is fetched
  }

  const stats = [
    {
      title: 'Total Teams',
      value: hackathonData.totalTeams,
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Participants',
      value: hackathonData.totalParticipants,
      icon: <Trophy className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Projects Submitted',
      value: hackathonData.submittedProjects,
      icon: <FileCode2 className="h-6 w-6 text-purple-500" />,
    },
    {
      title: 'Mentor Requests',
      value: hackathonData.mentorRequests,
      icon: <MessageSquare className="h-6 w-6 text-orange-500" />,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <Button
            variant="outline"
            className="hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/`)}
          >
            Back to home
          </Button>

          <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{hackathonData.title}</h1>
              <p className="text-gray-500 mt-1">Overview Dashboard</p>
            </div>
            <EditHackathonModal />
          </div>

          <Card className="hover:shadow-lg transition-shadow">
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
                  <span className="text-gray-600">
                    {hackathonData.startDate} - {hackathonData.endDate}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{hackathonData.progress}%</span>
                </div>
                <Progress value={hackathonData.progress} className="h-2 bg-gray-200" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow border-2 border-transparent hover:border-gray-200"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;
