
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
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
