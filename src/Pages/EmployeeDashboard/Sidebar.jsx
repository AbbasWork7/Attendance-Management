// src/EmployeeDashboard/components/Sidebar.jsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add actual logout logic here (clearing token, session, etc)
    alert('Logged out successfully!');
    navigate('/');
  };

  const navItems = [
    { label: ' Dashboard', path: '/employee-dashboard/dashboard' },
    { label: ' Attendance Log', path: '/employee-dashboard/Attendance' },
    { label: 'Salary', path: '/employee-dashboard/salary' },
    { label: 'Requests', path: '/employee-dashboard/requests' },
    { label: 'Notifications', path: '/employee-dashboard/notification' },
    { label: 'Profile', path: '/employee-dashboard/profile' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-md p-4 space-y-4 text-blue-900">
      <h2 className="text-2xl font-bold mb-4">👨‍💼 Menu</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition hover:bg-blue-100 ${
                isActive ? 'bg-blue-200 font-semibold' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="block text-left w-full px-3 py-2 rounded text-red-600 hover:bg-red-100 transition"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}