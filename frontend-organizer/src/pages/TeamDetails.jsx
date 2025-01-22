import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Search, Filter, Mail, Github } from 'lucide-react';

const TeamDetails = () => {
    const teamData = {
      id: 1,
      name: "TechNinjas",
      projectTitle: "AI-Powered Health Assistant",
      description: "Building an AI assistant that helps users track and improve their health habits through personalized recommendations.",
      members: [
        {
          id: 1,
          name: "John Doe",
          role: "Team Lead",
          email: "john@example.com",
          github: "johndoe",
          skills: ["React", "Node.js", "AI/ML"]
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "Developer",
          email: "jane@example.com",
          github: "janesmith",
          skills: ["Python", "TensorFlow", "UI/UX"]
        }
      ],
      submissions: [
        {
          id: 1,
          type: "Project Idea",
          status: "Approved",
          submittedAt: "2025-01-20 10:00 AM"
        },
        {
          id: 2,
          type: "Mid-way Check",
          status: "Pending",
          submittedAt: "2025-01-21 03:30 PM"
        }
      ]
    };
  
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{teamData.name}</h1>
            <p className="text-gray-500">{teamData.projectTitle}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Message Team</Button>
            <Button variant="default">View Project</Button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Info */}
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Project Description</h3>
                  <p className="text-gray-600">{teamData.description}</p>
                </div>
                <div>
                  <h3 className="font-medium">Team Members</h3>
                  <div className="space-y-3 mt-2">
                    {teamData.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Submissions & Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Submissions & Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamData.submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{submission.type}</p>
                      <p className="text-sm text-gray-500">{submission.submittedAt}</p>
                    </div>
                    <Badge variant={submission.status === 'Approved' ? 'success' : 'default'}>
                      {submission.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  export default TeamDetails;