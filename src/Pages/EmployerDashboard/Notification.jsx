// src/Pages/EmployerDashboard/Notification.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching requests from backend (replace with actual API later)
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        name: "John Doe",
        message: "Requesting half-day leave on June 22",
        time: "2025-06-19T10:15:00",
      },
      {
        id: 2,
        name: "Sara Khan",
        message: "Need system access reset",
        time: "2025-06-18T17:42:00",
      },
    ];
    setNotifications(sampleData);
  }, []);

  return (
    <motion.div
      className="p-6 bg-white min-h-screen text-blue-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 text-2xl font-bold mb-4">
        <FaBell className="text-blue-700" />
        Notifications
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 mt-4">No new requests.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className="border border-blue-200 bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold text-blue-800">{note.name}</div>
              <div className="text-sm text-gray-700 mt-1">{note.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(note.time).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
