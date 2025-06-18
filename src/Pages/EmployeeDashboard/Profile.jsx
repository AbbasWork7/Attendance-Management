// src/EmployeeDashboard/pages/Profile.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const user = {
    name: 'Deva Das',
    role: 'Full Stack Developer',
    email: 'devadas@gmail.com',
    phone: '9876543210',
    location: 'Tirunelveli, Tamil Nadu',
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token logic here if needed
    navigate('/logout');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">👤 Profile</h2>
      <p className="text-sm mb-6">View and update your personal information. ✨</p>

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={user.phone}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={user.location}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}