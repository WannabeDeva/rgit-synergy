
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Button } from './components/ui/button'
import Create_Teams from './pages/create_teams'
import Homepage from './pages/homepage'
import Judgingpage from './pages/judgingpage'
import Landingpage from './pages/landingpage'
import Mentorpage from './pages/mentorpage'
import Workspacepage from './pages/workspace'
import Navbar from './components/Navbar'
import UserProfile from './pages/user_profile';
import ViewDetails from './pages/view_details';
import SmartPairingPage from './pages/SmartPairingPage';
import MyHackathonsPage from './pages/MyHackathonsPage';
import LoungePage from './pages/LoungePage';
import SubmissionsPage from './pages/SubmissionsPage';
import Leaderboard from './pages/Leaderbaord';
function App() {
  

  return (
    <>
 

    <Router>
      <div>
        {/* Optional: Add a Button or Navbar here */}
        <Navbar />

        <Routes>
          {/* Define routes for the pages */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/create-teams" element={<Create_Teams />} />
          <Route path="/judging" element={<Judgingpage />} />
          <Route path="/mentor" element={<Mentorpage />} />
          <Route path="/workspace" element={<Workspacepage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/details" element={<ViewDetails />} />
          <Route path="/pairing" element={<SmartPairingPage />} />
          <Route path="/myhack" element={<MyHackathonsPage />} />
          <Route path="/lounge" element={<LoungePage />} />
          <Route path="/submit" element={<SubmissionsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
