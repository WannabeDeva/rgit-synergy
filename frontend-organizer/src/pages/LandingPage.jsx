import React from "react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Hackathon Platform
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Join the ultimate hackathon experience! Whether you're an organizer or a participant, 
        get started by choosing your portal below.
      </p>
      <div className="flex space-x-6">
        <a href="/organizerhome">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
            Organizer Portal
          </Button>
        </a>
        <a href="/participant-home">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3">
            Participant Portal
          </Button>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
