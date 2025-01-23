import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Globe, Building, GraduationCap, Linkedin, Github, Code, Terminal, FileText, Briefcase, Clock } from 'lucide-react';

export default function UserProfile(){

    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
            {/* Flex container for Back button and header */}
            <div className="relative flex items-center">
                <button
                className="absolute left-0 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                onClick={() => navigate(-1)} // Adjust this if you want different navigation behavior
                >
                Back
                </button>
                <h1 className="mx-auto text-3xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <p className="mt-2 text-gray-600 text-center">
                Manage your profile information and preferences
            </p>
            </div>
    
            <div className="space-y-8">
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 flex justify-center mb-6">
                    <div className="relative group">
                      <img 
                        src="/api/placeholder/150/150" 
                        alt="Profile" 
                        className="rounded-full w-36 h-36 object-cover border-4 border-blue-100 transition-transform group-hover:scale-105"
                      />
                      <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 shadow-lg transition-all hover:scale-110">
                        <User className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="email" 
                        className="mt-1 block w-full rounded-lg border-gray-200 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="tel" 
                        className="mt-1 block w-full rounded-lg border-gray-200 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        className="mt-1 block w-full rounded-lg border-gray-200 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Academic Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Academic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Role</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="University Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                    <div className="mt-1 flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">
                        <Linkedin className="h-4 w-4 text-gray-500" />
                      </span>
                      <input 
                        type="url" 
                        className="flex-1 block w-full rounded-none rounded-r-lg border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">GitHub Profile</label>
                    <div className="mt-1 flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">
                        <Github className="h-4 w-4 text-gray-500" />
                      </span>
                      <input 
                        type="url" 
                        className="flex-1 block w-full rounded-none rounded-r-lg border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Skills Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Code className="h-5 w-5 text-blue-600" />
                  Skills & Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Programming Languages</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="Python, JavaScript, Java"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tech Stack/Frameworks</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="React, Node.js, Django"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                      <div className="space-y-2 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Hackathon Preferences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow hover:shadow-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Terminal className="h-5 w-5 text-blue-600" />
                  Hackathon Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Domain</label>
                    <select className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option value="">Select a domain</option>
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>AI/ML</option>
                      <option>Blockchain</option>
                      <option>IoT</option>
                      <option>Cybersecurity</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                    <select className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option value="">Select experience level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
    
              <div className="flex justify-end space-x-4 pt-4">
                <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};