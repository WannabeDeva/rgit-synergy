import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Workspacepage() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">💻 Workspacepage</h1>
        <p className="text-center text-indigo-200 mt-2">Collaborate, Code, and Create Together</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex p-6 gap-6">
        {/* Code Editor Section */}
        <Card className="flex-1 shadow-xl border border-indigo-300">
          <CardHeader className="bg-indigo-50 border-b border-indigo-300">
            <CardTitle className="text-indigo-600 font-semibold text-lg flex justify-between items-center">
              Code Editor
              <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-300">
                Run Code
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[75vh] bg-gray-900 rounded-lg p-4 text-gray-400 text-sm font-mono">
            <p className="italic text-gray-500">Start typing your code here...</p>
          </CardContent>
        </Card>

        {/* Chat Section */}
        <Card className="w-1/3 shadow-xl border border-indigo-300">
          <CardHeader className="bg-indigo-50 border-b border-indigo-300">
            <CardTitle className="text-indigo-600 font-semibold text-lg">Chat</CardTitle>
          </CardHeader>
          <CardContent className="h-[75vh] bg-white rounded-lg p-4 space-y-4">
            <div className="bg-indigo-100 p-3 rounded-lg shadow">
              <p className="text-sm font-medium text-indigo-800">Mentor:</p>
              <p className="text-sm text-gray-700">Hello! Need help with your code?</p>
            </div>
            <div className="bg-indigo-200 p-3 rounded-lg shadow self-end">
              <p className="text-sm font-medium text-indigo-800">You:</p>
              <p className="text-sm text-gray-700">Yes, can you help with the API integration?</p>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Workspacepage;
