import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom"; // To get the team id from URL

const TeamDetails = () => {
  const { id } = useParams(); // Get team id from URL

  const team = {
    id: id,
    name: "Team Alpha",
    project: "AI-Powered Assistant",
    problemStatement: "How can AI be used to improve human productivity?",
    pptLink: "/path/to/presentation.pptx",  // Replace with actual link to PPT
    videoLink: "/path/to/project_video.mp4", // Replace with actual link to video
  };

  return (
    <div className="p-6">
      <header className="mb-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">{team.name} - {team.project}</h1>
        <p className="text-lg font-light">Here are the details of the project and team.</p>
      </header>

      <section className="mb-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Problem Statement</h3>
            <p>{team.problemStatement}</p>
            <div className="mt-6 flex space-x-4">
              <Button variant="default" onClick={() => window.open(team.pptLink, "_blank")}>
                View PPT
              </Button>
              <Button variant="outline" onClick={() => window.open(team.videoLink, "_blank")}>
                View Video
              </Button>
              <Button variant="success">
                Schedule Live Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TeamDetails;
