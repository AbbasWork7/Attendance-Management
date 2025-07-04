import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSubscription } from "./SubscriptionContext";
import toast from "react-hot-toast";

export default function SubscriptionTable() {
  const {
    wallet,
    setWallet,
    extendCandidateSubscription,
    candidates,
  } = useSubscription();

  const handleRecharge = (id) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return;

    const now = Date.now();
    const isExpired = !candidate.expiry || now > candidate.expiry;

    if (wallet <= 0) {
      toast.error(" Wallet balance is insufficient. Please recharge.", {
        duration: 3000,
        style: { background: "#fff3f3", color: "#c0392b" },
        icon: "🚫",
      });
      return;
    }

    if (!isExpired) {
      toast(" Subscription already active", {
        style: { background: "#f0fdf4", color: "#15803d" },
        icon: "🟢",
      });
      return;
    }

    setWallet((w) => w - 1);
    extendCandidateSubscription(id);
    toast.success(" Subscription recharged for 30 days!", {
      duration: 3000,
      style: { background: "#f0f9ff", color: "#0369a1" },
      icon: "⚡",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-blue-200 shadow-lg rounded-xl p-6 mt-6"
    >
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        📄 Employee Subscriptions
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-blue-900">
            <tr>
              <th className="p-2">👤 Name of the canditate</th>
              <th className="p-2">📅 Onboard Date</th>
              <th className="p-2">⏳ Expiry Time</th>
              <th className="p-2">🔁 Recharge</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((emp) => {
              const expired = !emp.expiry || Date.now() > emp.expiry;
              const timeLeft = expired
                ? "Expired"
                : `${Math.floor(
                    (emp.expiry - Date.now()) / (1000 * 60 * 60 * 24)
                  )}d left`;

              return (
                <tr key={emp.id} className="border-t hover:bg-blue-50">
                  <td className="p-2 font-medium">{emp.name}</td>
                  <td className="p-2">{emp.onboardDate}</td>
                  <td className={`p-2 ${expired ? "text-red-500" : "text-green-600"}`}>
                    {timeLeft}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRecharge(emp.id)}
                      className="px-3 py-1 text-sm rounded bg-blue-700 text-white hover:bg-blue-800 transition"
                    >
                      Recharge ₹1
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
