// src/EmployeeDashboard/pages/Notifications.jsx

import React from 'react';

const mockNotifications = [
  {
    id: 1,
    message: '🎉 Your leave request was approved!',
    date: '2025-06-17',
  },
  {
    id: 2,
    message: '🕒 Don’t forget to log in before 10:00 AM!',
    date: '2025-06-18',
  },
  {
    id: 3,
    message: '📢 Company meeting scheduled for Friday at 4 PM.',
    date: '2025-06-18',
  },
];

export default function Notification() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">🔔 Notifications</h2>
      <p className="text-sm mb-6">All your important alerts will appear here!</p>

      <ul className="space-y-4">
        {mockNotifications.map((note) => (
          <li
            key={note.id}
            className="p-4 bg-blue-50 border-l-4 border-indigo-400 rounded shadow-sm"
          >
            <p className="font-medium">{note.message}</p>
            <p className="text-xs text-gray-500">📅 {note.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}