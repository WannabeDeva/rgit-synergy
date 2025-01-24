import React, { useState } from 'react';
import { CheckCircle, Copy, Users, PlusCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamManagementPage = () => {
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const [teamCodeInput, setTeamCodeInput] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [createdTeam, setCreatedTeam] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isApplyAvailable, setIsApplyAvailable] = useState(false);
    const navigate = useNavigate();
  
    const generateTeamCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTeamCode(code);
    };
  
    const handleCreateTeam = () => {
      if (teamName.trim() !== '') {
        generateTeamCode();
        const newTeam = {
          name: teamName,
          code: teamCode,
        };
        
        const leaderMember = { 
          name: 'Team Creator', 
          role: 'Leader', 
          photo: 'https://via.placeholder.com/50' 
        };
        
        setCreatedTeam(newTeam);
        setTeamMembers([leaderMember]);
        setErrorMessage('');
      } else {
        setErrorMessage('Please enter a team name');
      }
    };
  
    const handleJoinTeam = () => {
      if (!createdTeam) {
        setErrorMessage('Please create a team first');
        return;
      }

      if (teamCodeInput.trim() === teamCode) {
        const newMember = { 
          name: `Member ${teamMembers.length + 1}`, 
          role: 'Member', 
          photo: 'https://via.placeholder.com/50' 
        };
        
        const memberExists = teamMembers.some(member => member.name === newMember.name);
        
        if (!memberExists) {
          const updatedMembers = [...teamMembers, newMember];
          setTeamMembers(updatedMembers);
          setTeamCodeInput('');
          setErrorMessage('');
          
          // Check if apply button should be shown
          setIsApplyAvailable(updatedMembers.length >= 2);
        } else {
          setErrorMessage('Member already in the team');
        }
      } else {
        setErrorMessage('Invalid team code');
      }
    };
  
    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(teamCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };
  
    const handleApply = () => {
      // Logic for applying to the team (can be expanded later)
      console.log('Applied to team');
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="text-gray-700" />
        </button>

        <div className="w-full max-w-lg space-y-6">
          {/* Team Creation and Management Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-blue-500">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
              <Users className="mr-3 text-blue-600" /> Team Management
            </h1>

            {errorMessage && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-lg">
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Create Team Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <PlusCircle className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-700">Create Team</h2>
              </div>
              <div className="flex space-x-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={handleCreateTeam}
                >
                  Create
                </button>
              </div>

              {teamCode && (
                <div className="mt-4 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
                    Team Code: {teamCode}
                  </div>
                  <button 
                    onClick={handleCopyToClipboard}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  >
                    {isCopied ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Copy className="text-gray-600" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Join Team Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-700">Join Team</h2>
              </div>
              <div className="flex space-x-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team code"
                  value={teamCodeInput}
                  onChange={(e) => setTeamCodeInput(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={handleJoinTeam}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Team Members Display */}
          {createdTeam && (
            <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {createdTeam.name}
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {teamMembers.length} Members
                </span>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{member.name}</p>
                      <span className={`text-sm font-medium ${member.role === 'Leader' ? 'text-blue-600' : 'text-gray-500'}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Apply Button */}
              {isApplyAvailable && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    onClick={() => navigate("/")}
                  >
                    Apply to Team
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TeamManagementPage;