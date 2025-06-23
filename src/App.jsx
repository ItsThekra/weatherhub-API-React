import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';  
import LoginPage from './pages/LoginPage';  
import WeatherPage from './pages/WeatherPage';  
import SignUpPage from './pages/SignUpPage';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/weather" element={<WeatherPage />} />  
        <Route path="/signup" element={<SignUpPage />} />  
      </Routes>
    </Router>
  );
}

export default App;
