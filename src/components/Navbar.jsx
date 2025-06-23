import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Weather App</div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
