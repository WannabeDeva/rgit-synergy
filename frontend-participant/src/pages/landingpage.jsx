import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Rocket, 
  Globe, 
  Users, 
  TrophyIcon
} from 'lucide-react';

const LandingPage = ({ onExploreClick }) => {
  return (
    <div className="h-screen flex items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Innovate. Collaborate. 
              <br />
              <span className="text-blue-600">Transform Ideas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your platform for groundbreaking hackathons that push the boundaries of technology and innovation.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={onExploreClick}
              >
                Explore Hackathons
              </Button>
            </div>
          </div>

          {/* Features Card */}
          <Card className="bg-white shadow-xl border-none">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Rocket className="w-10 h-10 text-blue-600" />, 
                    title: "Cutting-Edge Challenges",
                    description: "Tackle real-world problems across diverse tech domains."
                  },
                  { 
                    icon: <Globe className="w-10 h-10 text-green-600" />, 
                    title: "Global Community",
                    description: "Connect with innovators worldwide."
                  },
                  { 
                    icon: <Users className="w-10 h-10 text-purple-600" />, 
                    title: "Collaborative Environment",
                    description: "Build, learn, and grow together."
                  },
                  { 
                    icon: <TrophyIcon className="w-10 h-10 text-yellow-600" />, 
                    title: "Exciting Prizes",
                    description: "Win rewards and recognition."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {feature.icon}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;