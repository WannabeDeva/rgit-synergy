
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
            onClick={() => navigate(-1)}>
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
                  <span>{hackathon.startDate} - {hackathon.endDate}</span>
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

          {/* Right Column - Application Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Apply Now</h2>
                <form className="space-y-4">
                {/* Applicant Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                    </label>
                    <input 
                    type="text" 
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter your full name"
                    />
                </div>

                {/* Email Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                    </label>
                    <input 
                    type="email" 
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter your email"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                    </label>
                    <input 
                    type="tel" 
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter your contact number"
                    />
                </div>

                {/* Project Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Category
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm">
                    <option>AI/ML</option>
                    <option>Web Dev</option>
                    <option>App Dev</option>
                    <option>Block Chain</option>
                    <option>Social Cause</option>
                    </select>
                </div>

                {/* Brief Project Idea */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Project Idea
                    </label>
                    <textarea 
                    rows="4"
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Describe your project idea..."
                    ></textarea>
                </div>

                {/* Tech Stack */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tech Stack
                    </label>
                    <input 
                    type="text" 
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="e.g., Python, TensorFlow, React"
                    />
                </div>

                {/* Motivation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why do you want to participate?
                    </label>
                    <textarea 
                    rows="3"
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Share your motivation for joining this hackathon..."
                    ></textarea>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start">
                    <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600" 
                    />
                    <label className="ml-2 text-sm text-gray-600">
                    I agree to the hackathon rules and guidelines
                    </label>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Apply for Hackathon
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};