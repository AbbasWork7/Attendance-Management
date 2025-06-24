import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscription } from "./SubscriptionContext";

const BASE_URL = "http://127.0.0.1:8000";

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

    if (!token || token === "undefined" || token.length < 10) {
      toast.error("🔒 Login expired or missing token. Please log in again.");
      navigate("/landing");
      return;
    }

    // ✅ Create FormData
    const form = new FormData();
    form.append("employee_name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone); // backend expects "phone"
    form.append("dob", formData.DOB);
    form.append("company_name", formData.company_name);
    form.append("designation", formData.designation);
    form.append("salary", formData.salary);
    form.append("joining_date", new Date().toISOString().split("T")[0]);

    try {
      const response = await axios.post(`${BASE_URL}/api/users/add-employee/`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ Don't manually set "Content-Type", Axios sets it automatically
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("✅ Employee added successfully!");
        useEmployeeSlot();

        addCandidate({
          id: response.data.employee_id || Date.now(),
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
          navigate("/landing");
        } else if (error.response.data?.error) {
          toast.error(`❗ ${error.response.data.error}`);
        } else if (error.response.data?.message) {
          toast.error(`❗ ${error.response.data.message}`);
        } else {
          toast.error("❌ Something went wrong. Try again.");
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
        <InputField label="Candidate Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="DOB" type="date" name="DOB" value={formData.DOB} onChange={handleChange} />
        <InputField label="Phone Number" type="tel" name="phone" value={formData.phone} pattern="[0-9]{10}" onChange={handleChange} />
        <InputField label="Designation" type="text" name="designation" value={formData.designation} onChange={handleChange} />
        <InputField label="Salary (₹)" type="number" name="salary" value={formData.salary} min="0" onChange={handleChange} />

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
              <h2 className="text-xl font-bold text-red-600 mb-3">❌ Insufficient Wallet Balance</h2>
              <p className="text-blue-900 mb-4">Please recharge your wallet to add a new employee.</p>
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
                <button onClick={() => setShowPopup(false)} className="text-sm text-gray-500 underline">
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

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        {...props}
        required
        className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
