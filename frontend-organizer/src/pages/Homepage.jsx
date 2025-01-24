import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// shadcn component imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// icon imports
import {
  Plus,
  Trophy,
  Clock,
  ArrowRight,
  Timer,
  CheckCircle2,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Homepage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    mode: 'online',
    maxTeamSize: '',
    minTeamSize: '',
    maxParticipants: '',
    registrationDeadline: '',
    prizePools: '',
    rules: '',
    eligibilityCriteria: '',
    technologies: '',
    submissionGuidelines: '',
    judgingCriteria: '',
    timeline: '',
    sponsorDetails: '',
    contactEmail: '',
    contactPhone: '',
    venueDetails: '',
    streamingPlatform: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(false);
  };

  // Example data
  const activeHackathons = [
    {
      id: 1,
      title: 'Tech Innovation Hackathon 2025',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      participants: 96,
      status: 'In Progress',
      timeRemaining: '32 hours',
    },
    {
      id: 2,
      title: 'AI Solutions Hackathon',
      startDate: '2025-02-01',
      endDate: '2025-02-03',
      participants: 72,
      status: 'Registration Open',
      timeRemaining: '9 days',
    },
  ];

  const completedHackathons = [
    {
      id: 3,
      title: 'Web3 Development Challenge',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      participants: 120,
      winners: 'Team BlockMasters',
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 pt-16">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome, CSI-TSEC!
              </h1>
              <p className="text-gray-500 mt-1">Manage your hackathon events</p>
            </div>
            <Button
              className="gap-2 bg-purple-600 hover:bg-purple-700 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create New Hackathon
            </Button>
          </div>

          {/* Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* Modal content remains unchanged */}
          </Dialog>

          {/* Active Hackathons Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 pl-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Active Hackathons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeHackathons.map((hackathon) => (
                <Card
                  key={hackathon.id}
                  className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200"
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {hackathon.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
                            {new Date(hackathon.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
  variant="outline"
  className="gap-2 hover:bg-purple-50 hover:text-purple-700"
  onClick={() => navigate(`/overview/${hackathon.id}`)}
>
  Manage
  <ArrowRight className="h-4 w-4" />
</Button>

                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">{hackathon.timeRemaining}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            {hackathon.participants} participants
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                          {hackathon.status}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Hackathons Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 pl-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Completed Hackathons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedHackathons.map((hackathon) => (
                <Card
                  key={hackathon.id}
                  className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-200"
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {hackathon.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
                            {new Date(hackathon.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="gap-2 hover:bg-green-50 hover:text-green-700"
                          onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                        >
                          View Results
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">
                            Winner: {hackathon.winners}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {hackathon.participants} participants
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
