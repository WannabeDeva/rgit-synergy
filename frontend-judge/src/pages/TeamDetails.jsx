// src/pages/TeamDetails.jsx
import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to fetch the team id from the URL
import { Button } from "@/components/ui/button";

const TeamDetails = () => {
  const { teamId } = useParams(); // Fetch the team ID from the URL
  const team = getTeamById(teamId); // Function to get the team details (you may need to implement this)

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <header className="mb-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Team Details</h1>
        <p className="text-lg font-light">
          View and evaluate the team's project and see all relevant details
        </p>
      </header>

      {/* Team Details Section */}
      <section className="bg-white rounded-lg shadow-lg p-8 mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Team: {team.name}</h2>
        <p className="text-xl text-gray-600 mb-4">Project Title: {team.project}</p>
        <p className="mt-4 text-gray-700 mb-4">Problem Statement No: {team.problemStatementNo}</p>

        {/* New Fields */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Project Description</h3>
          <p className="text-gray-600">{team.projectDescription}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Chosen Domain</h3>
          <p className="text-gray-600">{team.chosenDomain}</p>
        </div>

        {/* Buttons */}
        <div className="space-x-4">
          <Button variant="default" className="mr-4">
            View PPT
          </Button>
          <Button variant="outline" className="mr-4">
            View Video Implementation
          </Button>
          <Button variant="outline">Schedule Live Session</Button>
        </div>
      </section>
    </div>
  );
};

// Example function to fetch team details (you can replace this with your actual data fetching logic)
const getTeamById = (teamId) => {
  const teams = [
    {
      id: "1",
      name: "Team Alpha",
      project: "AI-Powered Assistant",
      problemStatementNo: "PS-101",
      projectDescription:
        "This project aims to create an AI-powered assistant that helps users with everyday tasks.",
      chosenDomain: "Artificial Intelligence",
    },
    {
      id: "2",
      name: "Team Beta",
      project: "Blockchain Voting System",
      problemStatementNo: "PS-102",
      projectDescription:
        "The Blockchain Voting System ensures secure and transparent voting through the use of blockchain technology.",
      chosenDomain: "Blockchain",
    },
  ];
  return teams.find((team) => team.id === teamId); // Find the team based on the ID
};

export default TeamDetails;
