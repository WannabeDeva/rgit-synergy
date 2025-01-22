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
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// icon imports
import { 
  Plus, 
  Trophy,
  Clock,
  ArrowRight,
  Timer,
  CheckCircle2,
  Users 
} from 'lucide-react';

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
    setFormData(prev => ({
      ...prev,
      [field]: value
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
      title: "Tech Innovation Hackathon 2025",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      participants: 96,
      status: "In Progress",
      timeRemaining: "32 hours"
    },
    {
      id: 2,
      title: "AI Solutions Hackathon",
      startDate: "2025-02-01",
      endDate: "2025-02-03",
      participants: 72,
      status: "Registration Open",
      timeRemaining: "9 days"
    }
  ];

  const completedHackathons = [
    {
      id: 3,
      title: "Web3 Development Challenge",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      participants: 120,
      winners: "Team BlockMasters"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Hackathons</h1>
            <p className="text-gray-500 mt-1">Manage your hackathon events</p>
          </div>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Create New Hackathon
          </Button>
        </div>

        {/* Registration Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Hackathon</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Basic Information</h3>
                <Input
                  placeholder="Hackathon Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">End Date</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Event Mode & Team Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Event Settings</h3>
                <Select
                  value={formData.mode}
                  onValueChange={(value) => handleInputChange('mode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min Team Size"
                    value={formData.minTeamSize}
                    onChange={(e) => handleInputChange('minTeamSize', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Team Size"
                    value={formData.maxTeamSize}
                    onChange={(e) => handleInputChange('maxTeamSize', e.target.value)}
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Maximum Participants"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                />
              </div>

              {/* Rules and Guidelines */}
              <div className="space-y-4">
                <h3 className="font-semibold">Rules and Guidelines</h3>
                <Textarea
                  placeholder="Rules and Regulations"
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                />
                <Textarea
                  placeholder="Eligibility Criteria"
                  value={formData.eligibilityCriteria}
                  onChange={(e) => handleInputChange('eligibilityCriteria', e.target.value)}
                />
                <Textarea
                  placeholder="Submission Guidelines"
                  value={formData.submissionGuidelines}
                  onChange={(e) => handleInputChange('submissionGuidelines', e.target.value)}
                />
                <Textarea
                  placeholder="Judging Criteria"
                  value={formData.judgingCriteria}
                  onChange={(e) => handleInputChange('judgingCriteria', e.target.value)}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <Input
                  type="email"
                  placeholder="Contact Email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Contact Phone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
                {formData.mode !== 'online' && (
                  <Textarea
                    placeholder="Venue Details"
                    value={formData.venueDetails}
                    onChange={(e) => handleInputChange('venueDetails', e.target.value)}
                  />
                )}
                {formData.mode !== 'offline' && (
                  <Input
                    placeholder="Streaming Platform/Link"
                    value={formData.streamingPlatform}
                    onChange={(e) => handleInputChange('streamingPlatform', e.target.value)}
                  />
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Hackathon</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Active Hackathons Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Active Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeHackathons.map((hackathon) => (
              <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{hackathon.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => navigate(`/hackathon/${hackathon.id}`)}
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
                        <span className="text-sm">{hackathon.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
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
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Completed Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedHackathons.map((hackathon) => (
              <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{hackathon.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                      >
                        View Results
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Winner: {hackathon.winners}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{hackathon.participants} participants</span>
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
  );
};

export default Homepage;