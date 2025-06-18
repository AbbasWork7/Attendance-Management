// src/EmployeeDashboard/pages/Salary.jsx

import React from 'react';

export default function Salary() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">💰 Salary</h2>
      <p className="text-sm">Here you can view your daily and monthly salary breakdown. 📊 We'll integrate live salary calculation and reports soon.</p>

      {/* Placeholder Salary Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm border rounded-xl">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-2 text-left">📅 Date</th>
              <th className="p-2 text-left">🕒 Hours Worked</th>
              <th className="p-2 text-left">💵 Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-2">2025-06-17</td>
              <td className="p-2">8 hrs</td>
              <td className="p-2">₹ 1,200</td>
            </tr>
            <tr>
              <td className="p-2">2025-06-18</td>
              <td className="p-2">7.5 hrs</td>
              <td className="p-2">₹ 1,125</td>
            </tr>
            {/* Add more rows dynamically later */}
          </tbody>
        </table>
      </div>
    </div>
  );
}