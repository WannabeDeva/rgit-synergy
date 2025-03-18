// Install required packages
// npm install react-router-dom framer-motion lucide-react

// In App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EmergencySOS from './pages/EmergencySOS';
import HospitalLocator from './pages/HospitalLocator';
import SymptomChecker from './pages/SymptomChecker';
import FirstAidGuide from './pages/FirstAidGuide';
import MedicalRecords from './pages/MedicalRecords';
// import LiveVideoCall from './pages/LiveVideoCall';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emergency-sos" element={<EmergencySOS />} />
        <Route path="/hospital-locator" element={<HospitalLocator />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/first-aid-guide" element={<FirstAidGuide />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        {/* <Route path="/live-video-call" element={<LiveVideoCall />} /> */}
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;