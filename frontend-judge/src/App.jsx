import TeamDetails from './pages/TeamDetails';
import Navbar from './components/Navbar';

// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JudgeDashboard from './pages/JudgeDashboard';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Define a single route for the JudgeDashboard */}
        <Route path="/" element={<JudgeDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
