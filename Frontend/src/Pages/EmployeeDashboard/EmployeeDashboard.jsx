// src/Pages/EmployeeDashboard/EmployeeDashboard.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeDashboardRoutes from './EmployeeDashboardRoutes';
import Sidebar from './Sidebar';
import Header from './Header';

const EmployeeDashboard = () => {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <EmployeeDashboardRoutes />
        </main>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
