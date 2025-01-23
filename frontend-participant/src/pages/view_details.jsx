import React from 'react';
import { Calendar, Users, Trophy, Clock, Building, Code, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function ViewDetails(){

    const navigate = useNavigate();
    
    const hackathon = {
    title: "AI Innovation Challenge",
    organizer: "Tech Innovators Inc.",
    startDate: "Feb 1, 2025",
    endDate: "Feb 3, 2025",
    participants: 120,
    status: "Registration Open",
    prize: "$5000",
    category: "Artificial Intelligence",
    theme: "Build the Future",
    description: `Join us for an exciting 48-hour hackathon focused on artificial intelligence innovation! 
    We're looking for creative minds to develop AI-powered solutions that can address real-world challenges.

    What to expect:
    - Expert mentorship from industry leaders
    - Workshops on cutting-edge AI technologies
    - Networking opportunities with tech professionals
    - Chance to win exciting prizes

    Teams will be evaluated based on:
    - Innovation and creativity
    - Technical complexity
    - Real-world applicability
    - Presentation quality`,
    requirements: [
      "Basic understanding of AI/ML concepts",
      "Familiarity with Python",
      "Team size: 2-4 members",
      "Open to all skill levels"
    ]
  };
    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Hackathons
            </button>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hackathon.title}</h1>
                <p className="text-gray-600 text-lg mb-4">Organized by {hackathon.organizer}</p>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                  {hackathon.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-2">{hackathon.prize}</div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                  {hackathon.status}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Key Details */}
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {hackathon.startDate} - {hackathon.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>{hackathon.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>48 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Trophy className="h-5 w-5" />
                    <span>Prize pool: {hackathon.prize}</span>
                  </div>
                </div>
              </div>
  
              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{hackathon.description}</p>
              </div>
  
              {/* Requirements */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {hackathon.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
  
            {/* Right Column - Team Buttons */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow p-8 sticky top-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Team Options</h2>
                    <div className="space-y-6">
                    {/* Create/Join Team Button */}
                    <button
                        className="w-full py-4 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
                        onClick={() => navigate('/jointeam')}
                    >
                        Create or Join Team
                    </button>

                    {/* Find Team Button */}
                    <button
                        className="w-full py-4 px-6 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
                        onClick={() => navigate('/findmate')}
                    >
                        Find a Team
                    </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
};
