// src/Pages/EmployerDashboard/DashboardHome.jsx

import React from "react";
import PieChart from "./PieChart";
import Wallet from "./Wallet";
import SubscriptionTable from "./Subscription"; // ✅ This is your Subscription UI

export default function DashboardHome() {
  return (
    <div className="p-6 bg-white min-h-screen text-blue-900">
      <h1 className="text-2xl font-bold mb-6">📊 Organization Dashboard</h1>

      {/* Row 1: Attendance + Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChart />
        <Wallet />
      </div>

      {/* Row 2: Subscription Table */}
      <div className="mt-8">
        <SubscriptionTable />
      </div>
    </div>
  );
}
