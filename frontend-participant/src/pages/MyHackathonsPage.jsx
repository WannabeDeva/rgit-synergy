import React from 'react'; 
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MyHackathonsPage() {
    const navigate = useNavigate();

    const ongoingHackathon = {
        id: 1,
        title: "AI Innovation Challenge",
        startDate: "Feb 1, 2025",
        endDate: "Feb 3, 2025",
        participants: 120,
        status: "Ongoing",
        prize: "$5000",
        category: "Artificial Intelligence",
        theme: "Build the Future"
    };

    const pastHackathons = [
        {
          id: 2,
          title: "Web3 Hackathon",
          startDate: "Jan 10, 2025",
          endDate: "Jan 12, 2025",
          participants: 85,
          status: "Completed",
          prize: "$3000",
          category: "Blockchain",
          theme: "Decentralized Solutions"
        },
        {
          id: 3,
          title: "Green Tech Solutions",
          startDate: "Dec 15, 2024",
          endDate: "Dec 17, 2024",
          participants: 150,
          status: "Completed",
          prize: "$4000",
          category: "Sustainability",
          theme: "Eco-friendly Innovation"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Ongoing Hackathons Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Ongoing Hackathon</h2>
                    <div className="rounded-lg border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    {ongoingHackathon.category}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                                    {ongoingHackathon.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{ongoingHackathon.title}</h3>
                            <p className="text-gray-600 mb-4">{ongoingHackathon.theme}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="h-5 w-5" />
                                    <span>{ongoingHackathon.startDate} - {ongoingHackathon.endDate}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Users className="h-5 w-5" />
                                    <span>{ongoingHackathon.participants} participants</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Trophy className="h-5 w-5" />
                                    <span>Prize pool: {ongoingHackathon.prize}</span>
                                </div>
                            </div>

                            <button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
                            onClick={() => navigate('/lounge')}>
                                Go to Lounge
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Past Hackathons Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Past Hackathons</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {pastHackathons.map(hackathon => (
                            <div key={hackathon.id} className="rounded-lg border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                            {hackathon.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700">
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
                </div>
            </main>
        </div>
    );
}

export default MyHackathonsPage;
