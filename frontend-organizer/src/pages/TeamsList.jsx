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
    <main className="flex-1 bg-gray-100 min-h-screen">
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}

      <Button variant="destructive" onClick={() => navigate(`/`)}>Back to home</Button>
    

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-gray-500">Manage and monitor participating teams</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="secondary" className="text-sm">
            <Users className="w-4 h-4 mr-1" />
            Total Teams: {teams.length}
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search teams..."
            className="w-full"
            prefix={<Search className="w-4 h-4" />}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
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
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>{team.projectTitle}</TableCell>
                  <TableCell>
                    <Badge variant={team.submissionStatus === 'submitted' ? 'success' : 'default'}>
                      {team.submissionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{team.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/teams/1') }>View Details</Button>
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