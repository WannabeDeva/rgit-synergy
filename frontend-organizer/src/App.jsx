
import Overview from './pages/Overview'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamsList from './pages/TeamsList';
import TeamDetails from './pages/TeamDetails';
import Announcements from './pages/Announcements';
import Homepage from './pages/Homepage';
import LandingPage from './pages/LandingPage';

function App() {
  

  return (
    <>
     <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/organizerhome" element={<Homepage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/landing" element={<LandingPage />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
