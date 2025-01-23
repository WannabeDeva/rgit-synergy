import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const JudgeDashboard = () => {
  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      project: "AI-Powered Assistant",
      status: "Pending Evaluation",
    },
    {
      id: 2,
      name: "Team Beta",
      project: "Blockchain Voting System",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Judges Dashboard</h1>
        <p className="text-lg font-light">
          Stay organized. Evaluate teams and manage your assigned tasks efficiently.
        </p>
      </header>

      {/* Overview Section */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Teams Assigned</CardTitle>
            <CardDescription className="text-gray-500">Total teams to evaluate</CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold text-blue-600">10</h2>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Completed Evaluations</CardTitle>
            <CardDescription className="text-gray-500">Teams you've already evaluated</CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold text-green-600">5</h2>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Pending Evaluations</CardTitle>
            <CardDescription className="text-gray-500">Teams still waiting for evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold text-red-600">5</h2>
          </CardContent>
        </Card>
      </section>

      {/* Teams List Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Teams List</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="font-bold text-gray-700">Team Name</TableCell>
                <TableCell className="font-bold text-gray-700">Project Title</TableCell>
                <TableCell className="font-bold text-gray-700">Status</TableCell>
                <TableCell className="font-bold text-gray-700">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.project}</TableCell>
                  <TableCell>
                    <Badge
                      variant={team.status === "Completed" ? "success" : "destructive"}
                      className="px-2 py-1"
                    >
                      {team.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="default" className="mr-2">
                      Evaluate
                    </Button>
                    <Button variant="outline">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default JudgeDashboard;