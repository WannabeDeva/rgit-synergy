// import { Card, Separator, Badge, Button, Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown } from "lucide-react";

const teams = [
  { id: 1, teamName: "Team Alpha", teamNo: "012", domain: "AI & ML", points: 95 },
  { id: 2, teamName: "Team Beta", teamNo: "200", domain: "Web Development", points: 90 },
  { id: 3, teamName: "Team Gamma", teamNo: "034", domain: "Cybersecurity", points: 85 },
  { id: 4, teamName: "Team Delta", teamNo: "004", domain: "Blockchain", points: 80 },
  { id: 5, teamName: "Team Epsilon", teamNo: "005", domain: "Cloud Computing", points: 75 },
];

function Leaderboard() {
  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Hackathon Leaderboard</h1>
      </header>

      {/* Leaderboard Section */}
      <Card className="p-8 shadow-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
          <Button variant="outline" className="text-lg font-semibold">
            Refresh
          </Button>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {teams.map((team, index) => (
            <Card
              key={team.id}
              className="p-4 flex justify-start items-center bg-gray-50 shadow-lg rounded-lg"
            >
              {/* Serial No and Rank */}
              <div className="flex flex-col items-center space-y-2 mr-4">
                {/* Crowns */}
                {index === 0 && <Crown size={32} color="gold" />}
                {index === 1 && <Crown size={32} color="silver" />}
                {index === 2 && <Crown size={32} color="brown" />}
                <span className="font-semibold text-lg">{index + 1}</span>
              </div>

              {/* Team Details (Side by side) */}
              <div className="flex flex-row items-center space-x-6">
                <span className="text-lg font-semibold">{team.teamName}</span>
                <span className="text-sm text-gray-500">Team No: {team.teamNo}</span>
                <span className="text-sm text-gray-500">Domain: {team.domain}</span>
              </div>

              {/* Points and Status */}
              <div className="flex items-center ml-auto space-x-4">
                <span className="text-xl font-bold">{team.points} pts</span>
                <span
                  className={`text-sm font-semibold ${
                    team.points >= 90
                      ? "text-green-500"
                      : team.points >= 80
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {team.points >= 90
                    ? "Top Scorer"
                    : team.points >= 80
                    ? "Good Progress"
                    : "Keep Going"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

      {/* Encouraging Message */}
      <div className="text-center">
        <span className="text-lg font-semibold text-gray-700">
          Keep up the great work, teams! Stay motivated and aim for the top!
        </span>
      </div>
    </div>
  );
}

export default Leaderboard;
