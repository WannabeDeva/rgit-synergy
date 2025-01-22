
import Overview from './pages/Overview'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamsList from './pages/TeamsList';
import TeamDetails from './pages/TeamDetails';
import Announcements from './pages/Announcements';
import Homepage from './pages/Homepage';

function App() {
  

  return (
    <>
     <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Homepage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
