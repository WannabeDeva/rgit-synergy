import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';

// import './App.css';

import JudgeDashboard from './pages/JudgeDashboard';
import TeamDetails from './pages/TeamDetails';
import EvaluationForm from "./pages/EvaluationForm";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}

      <Routes>
        {/* Define a single route for the JudgeDashboard */}
        <Route path="/" element={<JudgeDashboard />} />
        <Route path="/evaluate" element={<EvaluationForm />} />
        <Route path="/team/:teamId" element={<TeamDetails />} /> {/* Route to TeamDetails with dynamic teamId */}
        
      </Routes>
    </Router>
  );
}

export default App;
