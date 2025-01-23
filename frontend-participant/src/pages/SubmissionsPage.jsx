import { Button} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";

function SubmissionsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Project Submission Portal</h1>
      </header>

      {/* Form Section */}
      <Card className="p-8 shadow-md bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div>
            <Label htmlFor="teamName" className="block text-lg font-semibold mb-1">
              Team Name
            </Label>
            <Input id="teamName" placeholder="Enter your team name" className="w-full" required />
          </div>

          {/* Group Number */}
          <div>
            <Label htmlFor="groupNo" className="block text-lg font-semibold mb-1">
              Group Number
            </Label>
            <Input id="groupNo" placeholder="Enter your group number" className="w-full" required />
          </div>

          {/* Domain */}
          <div>
            <Label htmlFor="domain" className="block text-lg font-semibold mb-1">
              Domain
            </Label>
            <Input id="domain" placeholder="Enter the domain of your project" className="w-full" required />
          </div>

          {/* Problem Statement */}
          <div>
            <Label htmlFor="problemStatement" className="block text-lg font-semibold mb-1">
              Problem Statement Number
            </Label>
            <Input
              id="problemStatement"
              placeholder="Enter the problem statement number"
              className="w-full"
              required
            />
          </div>

          {/* Separator */}
          <Separator className="my-6" />

          {/* GitHub Link */}
          <div>
            <Label htmlFor="githubLink" className="block text-lg font-semibold mb-1">
              GitHub Repository Link
            </Label>
            <Input id="githubLink" placeholder="Enter your GitHub repository link" className="w-full" required />
          </div>

          {/* Instructions */}
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Important Guidelines:</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Your GitHub repository must include a proper README file with detailed documentation.</li>
              <li>Include a PowerPoint presentation (PPT) file within the repository.</li>
              <li>Add a video explanation of your project in the README.</li>
            </ul>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-center mt-4">
            <Checkbox id="confirm" required />
            <Label htmlFor="confirm" className="ml-2 text-sm">
              I confirm that all necessary files and documentation are included.
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <Button type="submit" variant="default" className="px-8 py-2 text-lg">
              Submit Project
            </Button>
          </div>
        </form>
      </Card>

      {/* Submission Success Message */}
      {submitted && (
        <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg">
          <h2 className="font-semibold text-lg">Submission Successful!</h2>
          <p>Your project has been submitted successfully for final judging. Thank you!</p>
        </div>
      )}
    </div>
  );
}

export default SubmissionsPage;