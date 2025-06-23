import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router'; 
import LoginPage from '../pages/LoginPage';  
import SignUpPage from '../pages/SignUpPage';  
import WeatherPage from '../pages/WeatherPage';  

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
