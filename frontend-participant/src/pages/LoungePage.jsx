import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoungePage() {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Workspace",
      description: [
        "Collaborate, Code, and Create Together.",
        "Real-time collaborative code editor like Google Docs.",
        "Run code directly in the editor.",
        "Chat section for team discussions.",
        "Option to create live video sessions."
      ],
      buttonText: "Go to Workspace",
      link: "/workspace"
    },
    {
      id: 2,
      title: "Mentoring",
      description: [
        "Get feedback and improve your project.",
        "View the list of available mentors.",
        "Schedule live sessions with mentors.",
        "Live chat with mentors for guidance."
      ],
      buttonText: "Go to Mentoring",
      link: "/mentor"
    },
    {
      id: 3,
      title: "Submission",
      description: [
        "Submit your project for final judging.",
        "Upload a video demo of your project.",
        "Submit a presentation explaining your project.",
        "Provide the GitHub link for your project."
      ],
      buttonText: "Go to Submission",
      link: "/submit"
    },
    {
      id: 4,
      title: "Leaderboard",
      description: [
        "View the ranking of teams based on performance.",
        "Check detailed scores for each team.",
        "Celebrate the achievements of top participants."
      ],
      buttonText: "Go to Leaderboard",
      link: "/leaderboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-center">User Lounge</h1>
        <p className="text-lg text-center">
          "Explore our platform's features to collaborate, learn, and achieve your goals seamlessly."
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-lg border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Card Content */}
              <div className="p-6 flex-grow">
                {/* Feature Title */}
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>

                {/* Feature Description */}
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  {feature.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Navigation Button */}
              <div className="p-6 border-t mt-auto">
                <button
                  onClick={() => navigate(feature.link)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
                >
                  {feature.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default LoungePage;
