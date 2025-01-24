import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import Sidebar from '@/components/Sidebar';

// Teams List Page Component
const TeamsList = () => {
  const navigate = useNavigate();
  const teams = [
    {
      id: 1,
      name: "TechNinjas",
      members: 4,
      projectTitle: "AI-Powered Health Assistant",
      status: "active",
      submissionStatus: "pending",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "CodeCrafters",
      members: 3,
      projectTitle: "Sustainable Shopping Tracker",
      status: "active",
      submissionStatus: "submitted",
      lastActive: "5 hours ago"
    },
    // Add more teams as needed
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <Button 
            variant="outline" 
            className="hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/`)}
          >
            Back to home
          </Button>

          <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
              <p className="text-gray-500">Manage and monitor participating teams</p>
            </div>
            <div className="flex gap-4">
              <Badge 
                variant="secondary" 
                className="text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <Users className="w-4 h-4 mr-1" />
                Total Teams: {teams.length}
              </Badge>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search teams..."
                className="w-full pl-10 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] focus:ring-2 focus:ring-purple-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="disqualified">Disqualified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Teams Table */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-gray-600">Team Name</TableHead>
                    <TableHead className="text-gray-600">Members</TableHead>
                    <TableHead className="text-gray-600">Project</TableHead>
                    <TableHead className="text-gray-600">Status</TableHead>
                    <TableHead className="text-gray-600">Last Active</TableHead>
                    <TableHead className="text-gray-600">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow 
                      key={team.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-800">{team.name}</TableCell>
                      <TableCell className="text-gray-600">{team.members}</TableCell>
                      <TableCell className="text-gray-600">{team.projectTitle}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={team.submissionStatus === 'submitted' ? 'success' : 'default'}
                          className="hover:opacity-80 transition-opacity"
                        >
                          {team.submissionStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{team.lastActive}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          onClick={() => navigate('/teams/1')}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeamsList;