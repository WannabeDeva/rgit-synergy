import React, { useState, useRef } from 'react';
import { User, Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingPage from './landingpage';


function Homepage(){
    const hackathonsRef = useRef(null);
    const navigate = useNavigate();

    const [hackathons] = useState([
        {
          id: 1,
          title: "AI Innovation Challenge",
          startDate: "Feb 1, 2025",
          endDate: "Feb 3, 2025",
          participants: 120,
          status: "Registration Open",
          prize: "$5000",
          category: "Artificial Intelligence",
          theme: "Build the Future"
        },
        {
          id: 2,
          title: "Web3 Hackathon",
          startDate: "Feb 10, 2025",
          endDate: "Feb 12, 2025",
          participants: 85,
          status: "Registration Open",
          prize: "$3000",
          category: "Blockchain",
          theme: "Decentralized Solutions"
        },
        {
          id: 3,
          title: "Green Tech Solutions",
          startDate: "Feb 15, 2025",
          endDate: "Feb 17, 2025",
          participants: 150,
          status: "Coming Soon",
          prize: "$4000",
          category: "Sustainability",
          theme: "Eco-friendly Innovation"
        },
        {
          id: 4,
          title: "HealthTech Summit",
          startDate: "Feb 20, 2025",
          endDate: "Feb 22, 2025",
          participants: 95,
          status: "Coming Soon",
          prize: "$6000",
          category: "Healthcare",
          theme: "Digital Health Solutions"
        }
      ]);
      const scrollToHackathons = () => {
        hackathonsRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      return (
        <div className="min-h-screen bg-gray-50">
          <LandingPage onExploreClick={scrollToHackathons} />
          
    
          <main ref={hackathonsRef} className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Ongoing Hackathons</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {hackathons.map(hackathon => (
                <div key={hackathon.id} className="rounded-lg border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        {hackathon.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${hackathon.status === "Registration Open" 
                          ? "bg-green-50 text-green-700" 
                          : "bg-yellow-50 text-yellow-700"}`}>
                        {hackathon.status}
                      </span>
                    </div>
    
                    <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                    <p className="text-gray-600 mb-4">{hackathon.theme}</p>
    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span>{hackathon.startDate} - {hackathon.endDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Users className="h-5 w-5" />
                        <span>{hackathon.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Trophy className="h-5 w-5" />
                        <span>Prize pool: {hackathon.prize}</span>
                      </div>
                    </div>
    
                    <button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
                    onClick={() => navigate('/details')}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      );
    };
export default Homepage;