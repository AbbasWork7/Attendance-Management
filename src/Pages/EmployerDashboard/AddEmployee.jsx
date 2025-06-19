// src/Pages/EmployerDashboard/AddEmployee.jsx

import React, { useState } from "react";
import { useSubscription } from "./SubscriptionContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AddEmployee() {
  const { isSubscribed, useEmployeeSlot, addCandidate } = useSubscription();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubscribed) {
      setShowPopup(true); // Show popup if wallet has no balance
      return;
    }

    const employeeData = {
      ...formData,
      joinDate: new Date().toISOString(), // Real-time join date (not shown in UI)
    };

    // Simulate backend API call
    console.log("Employee Submitted:", employeeData);

    useEmployeeSlot(); // Reduce wallet balance
    addCandidate({
      id: Date.now(),
      name: formData.name,
      onboardDate: new Date().toLocaleDateString(),
      expiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });

    toast.success("✅ Employee added and subscribed for 30 days!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      designation: "",
      salary: "",
    });
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen text-blue-900 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Candidate</h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4">
        <div>
          <label className="block font-medium mb-1">Candidate Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Designation</label>
          <input
            type="text"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Salary (₹)</label>
          <input
            type="number"
            name="salary"
            required
            min="0"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mt-4 transition ${
            !isSubscribed ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          Add Employee
        </button>
      </form>

      {/* 🔔 Animated Alert Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-center p-6 rounded-xl shadow-xl w-[90%] max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <h2 className="text-xl font-bold text-red-600 mb-3">
                ❌ Insufficient Wallet Balance
              </h2>
              <p className="text-blue-900 mb-4">
                Please recharge your wallet to add a new employee.
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/employer-dashboard"); // 👈 Navigate to Wallet/Dashboard
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Recharge Wallet
              </button>
              <div className="mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-sm text-gray-500 underline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
