// src/EmployeeDashboard/pages/Salary.jsx

import React, { useMemo } from 'react';

// Sample attendance data (Replace this with actual attendance context/state)
const attendanceMap = {
  '2025-06-16': { status: 'full' },
  '2025-06-17': { status: 'half' },
  '2025-06-18': { status: 'half' },
  '2025-06-19': { status: 'absent' },
  '2025-06-20': { status: 'full' },
};

const getSalaryFromStatus = (status) => {
  switch (status) {
    case 'full':
      return 1000;
    case 'half':
      return 500;
    case 'absent':
    default:
      return 0;
  }
};

export default function Salary() {
  const attendanceRecords = useMemo(() => {
    return Object.entries(attendanceMap).map(([date, { status }]) => {
      return {
        date,
        status: status === 'full' ? 'Full Day' : status === 'half' ? 'Half Day' : 'Absent',
        amount: getSalaryFromStatus(status)
      };
    });
  }, []);

  const totalSalary = attendanceRecords.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4"> Salary Summary</h2>
      <p className="text-sm mb-6">This section displays your attendance-based daily salary breakdown. Default salary per day is ₹1000 and ₹500 for half day.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-xl">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-2 text-left">📅 Date</th>
              <th className="p-2 text-left">🧾 Attendance</th>
              <th className="p-2 text-left">💵 Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {attendanceRecords.map(({ date, status, amount }) => (
              <tr key={date}>
                <td className="p-2">{date}</td>
                <td className="p-2">{status}</td>
                <td className="p-2">₹ {amount}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="p-2">Total</td>
              <td className="p-2"></td>
              <td className="p-2">₹ {totalSalary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
