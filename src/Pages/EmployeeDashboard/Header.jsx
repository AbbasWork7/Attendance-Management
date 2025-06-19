// src/Pages/EmployeeDashboard/components/Header.jsx

import React from 'react';
/* import logo from './assets/image/logo.png'; */
import logo from "../../assets/image/logo.png";


const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Vtraco Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-blue-800">Vtraco</h1>
      </div>
      <div className="text-sm text-gray-600">
        👤 Welcome, Candidate
      </div>
    </header>
  );
};

export default Header;
