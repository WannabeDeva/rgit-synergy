import React, { useState } from 'react';
import { CheckCircle, Copy, Share } from 'lucide-react';

const TeamManagementPage = () => {
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const [teamCodeInput, setTeamCodeInput] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [createdTeam, setCreatedTeam] = useState(null); // New state to store created team info
    const [teamMembers, setTeamMembers] = useState([
      { name: 'Creator', role: 'Leader', photo: 'https://via.placeholder.com/50' }, // Placeholder photo
    ]); // Initial member (creator)
    const [isApplying, setIsApplying] = useState(false); // Whether the user clicked apply
  
    const generateTeamCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTeamCode(code);
    };
  
    const handleCreateTeam = () => {
      if (teamName.trim() !== '') {
        generateTeamCode();
        // Create the team and assign the creator as the leader
        const newTeam = {
          name: teamName,
          code: teamCode,
          members: [{ name: 'Creator', role: 'Leader', photo: 'https://via.placeholder.com/50' }],
        };
        setCreatedTeam(newTeam);
      }
    };
  
    const handleJoinTeam = () => {
      if (teamCodeInput.trim() !== '') {
        // Add logic to join the team using the provided team code
      }
    };
  
    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(teamCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };
  
    const handleApply = () => {
      // Logic to apply to the team (e.g., add the current user as a member)
      if (isApplying) {
        setTeamMembers([...teamMembers, { name: 'New Member', role: 'Member', photo: 'https://via.placeholder.com/50' }]);
      }
    };
  
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 space-y-6">
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-300"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Back
        </button>
  
        {/* First Container: Team Management */}
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Team Management</h1>
  
          {/* Create Team */}
          <div>
            <h2 className="text-xl font-bold mb-2">Create Team</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleCreateTeam}
              >
                Create
              </button>
            </div>
            {teamCode && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="bg-gray-100 px-4 py-2 rounded-md flex-1">{teamCode}</div>
                <button
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
                  onClick={handleCopyToClipboard}
                >
                  {isCopied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </div>
  
          {/* Join Team */}
          <div>
            <h2 className="text-xl font-bold mb-2">Join Team</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm"
                placeholder="Enter team code"
                value={teamCodeInput}
                onChange={(e) => setTeamCodeInput(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleJoinTeam}
              >
                Join
              </button>
            </div>
          </div>
        </div>
  
        {/* Second Container: Display created team information */}
        {createdTeam && (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800">Team Created: {createdTeam.name}</h3>
              <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                Active
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Team Members:</h4>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">{member.name}</p>
                      {member.role === 'Leader' && (
                        <span className="text-sm text-blue-600 font-semibold">Leader</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default TeamManagementPage;