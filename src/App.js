import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Medical} from './pages/medical';
import {Disaster} from './pages/disaster';
import { Navbar } from './pages/Navbar';
import { useLocation } from 'react-router-dom';
import DisasterBackgroundContainer from './components/DisasterBackground';
import MedicalBackgroundContainer from './components/MedicalBackground';

const BackgroundContainer = ({ children }) => {
  const location = useLocation();

  if (location.pathname === '/') {
    return <MedicalBackgroundContainer>{children}</MedicalBackgroundContainer>;
  } else if (location.pathname === '/disaster') {
    return <DisasterBackgroundContainer>{children}</DisasterBackgroundContainer>;
  } else {
    return <div>{children}</div>;
  }
};

function App() {

  return (
    <div className="App" >
      <Router>
        <Navbar />
        
        <BackgroundContainer>
      
      <Routes>
        <Route path="/" element={<Medical />} />
        <Route path="/disaster" element={<Disaster />} />
      </Routes>

     </BackgroundContainer>

      </Router>
    
    </div>
  );
}

export default App;
