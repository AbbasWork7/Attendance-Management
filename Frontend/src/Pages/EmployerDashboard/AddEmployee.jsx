import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscription } from "./SubscriptionContext";

const BASE_URL = "http://127.0.0.1:8000/";

export default function AddEmployee() {
  const { isSubscribed, useEmployeeSlot, addCandidate } = useSubscription();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    DOB: "",
    company_name: "TechNova Pvt Ltd",
    designation: "",
    salary: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubscribed) {
      setShowPopup(true);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("🔒 Login expired. Please log in again.");
      navigate("/Landing");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/add-employee/`,
        {
          employee_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.DOB,
          company_name: formData.company_name,
          designation: formData.designation,
          salary: formData.salary,
          joining_date: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("✅ Employee added successfully!");

        useEmployeeSlot();
        addCandidate({
          id: Date.now(),
          name: formData.name,
          onboardDate: new Date().toLocaleDateString(),
          expiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          DOB: "",
          company_name: "TechNova Pvt Ltd",
          designation: "",
          salary: "",
        });
      } else {
        toast.error("❌ Failed to add employee. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("🔐 Unauthorized. Please log in again.");
          navigate("/login");
        } else {
          toast.error(
            error.response.data.message || "❌ Something went wrong."
          );
        }
      } else {
        toast.error("🌐 Network error. Server might be offline.");
      }
    }
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
          <label className="block font-medium mb-1">DOB</label>
          <input
            type="date"
            name="DOB"
            required
            value={formData.DOB}
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
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handleChange}
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

      {/* Wallet popup */}
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
                  navigate("/employer-dashboard");
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
