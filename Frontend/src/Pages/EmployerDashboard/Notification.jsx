import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";

const BASE_URL = "http://127.0.0.1:8000";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState({}); // holds messages by notification ID

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await axios.get(`${BASE_URL}/api/employer/notifications/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.status === "success" && Array.isArray(res.data.notifications)) {
          setNotifications(res.data.notifications);
        } else {
          toast.error("❌ Failed to load notifications.");
        }
      } catch (err) {
        toast.error("❌ Error loading notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleReplyChange = (id, value) => {
    setReply((prev) => ({ ...prev, [id]: value }));
  };

  const handleResponse = async (id, status) => {
    const message = reply[id]?.trim();
    if (!message) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.post(
        `${BASE_URL}/api/employer/notifications/respond/`,
        {
          notification_id: id,
          status: status,
          response_message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success(`✅ Request ${status} successfully!`);
        // Remove the notification from list
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        setReply((prev) => {
          const newReply = { ...prev };
          delete newReply[id];
          return newReply;
        });
      } else {
        toast.error("❌ Failed to submit response.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("❌ API endpoint not found (404).");
      } else {
        toast.error("❌ Server error.");
      }
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading notifications...</p>;
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

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notifications.length === 0 ? (
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
                {new Date(note.time || note.created_at).toLocaleString()}
              </div>

              <textarea
                rows={2}
                placeholder="Write a response..."
                value={reply[note.id] || ""}
                onChange={(e) => handleReplyChange(note.id, e.target.value)}
                className="w-full mt-3 p-2 border border-gray-300 rounded"
              />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleResponse(note.id, "approved")}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleResponse(note.id, "declined")}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  ❌ Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
