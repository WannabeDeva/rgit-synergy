import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { participants } from "../lib/dummyParticipants";

const SmartPairingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState(null);

  // Static logged-in participant
  const currentParticipant = {
    id: 1,
    name: "John Doe",
    skills: ["React", "Node.js", "MongoDB"],
    interests: ["Web Development", "Hackathons", "AI"],
    experience: 2,
  };

  const handleFindTeam = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Smart pairing logic
      const scoredParticipants = participants
        .filter((p) => p.id !== currentParticipant.id) // Exclude self
        .map((p) => {
          const commonSkills = p.skills.filter((skill) =>
            currentParticipant.skills.includes(skill)
          );
          const commonInterests = p.interests.filter((interest) =>
            currentParticipant.interests.includes(interest)
          );

          // Calculate a score based on common skills, interests, and experience
          const score =
            commonSkills.length * 2 + // Skills have higher weight
            commonInterests.length +
            Math.min(p.experience, 5); // Cap experience contribution to 5

          return { ...p, score };
        });

      // Sort participants by score in descending order
      const sortedParticipants = scoredParticipants.sort(
        (a, b) => b.score - a.score
      );

      // Select the top 3 participants
      const matchedTeam = sortedParticipants.slice(0, 3);

      setTeam(matchedTeam);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Smart Pairing for Hackathon Teams</h1>
        <p className="text-gray-500 mt-2">
          Collaborate with like-minded participants to build something amazing!
        </p>
      </div>

      {/* Participant Details */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {currentParticipant.name}
          </p>
          <p>
            <strong>Skills:</strong> {currentParticipant.skills.join(", ")}
          </p>
          <p>
            <strong>Interests:</strong> {currentParticipant.interests.join(", ")}
          </p>
        </CardContent>
      </Card>

      {/* Smart Pairing Button */}
      <div className="text-center">
        <Button
          onClick={handleFindTeam}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finding Team...
            </>
          ) : (
            "Find My Team"
          )}
        </Button>
      </div>

      {/* Results Section */}
      {team && (
        <Card>
          <CardHeader>
            <CardTitle>Your Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {team.map((member, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-500">
                      Skills: {member.skills.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Interests: {member.interests.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Experience: {member.experience} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Match Score: {member.score}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Confirm Team
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Request Re-Pairing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartPairingPage;