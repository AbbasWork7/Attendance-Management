import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/employee/notifications/`)
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setNotifications(response.data);
        } else if (response.data.status === 'success' && Array.isArray(response.data.notifications)) {
          setNotifications(response.data.notifications);
        } else {
          setError('⚠️ Failed to load notifications.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err?.message || err);
        setError('❌ Could not load notifications.');
        setLoading(false);
      });
  }, []);


  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <p className="text-sm mb-6">All your important alerts will appear here!</p>

      {loading ? (
        <p>🔄 Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : notifications.length === 0 ? (
        <p>📭 No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`p-4 border-l-4 rounded shadow-sm ${
                note.is_read ? 'bg-gray-100 border-gray-400' : 'bg-blue-50 border-indigo-500'
              }`}
            >
              <p className="font-medium">{note.message}</p>
              <p className="text-xs text-gray-500">
                📅 {new Date(note.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
