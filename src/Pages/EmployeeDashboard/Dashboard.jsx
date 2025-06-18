// src/EmployeeDashboard/pages/Dashboard.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-blue-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">🚀 Employee Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
            <h2 className="text-2xl font-semibold mb-4">🏠 Dashboard</h2>
            <p className="text-sm">
              Welcome to your dashboard! 🎉 You can view your attendance, salary, and more from the sidebar. Use the navigation to explore all features.
            </p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}