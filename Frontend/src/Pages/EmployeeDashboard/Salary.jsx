// src/EmployeeDashboard/pages/Salary.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Salary() {
  const [records, setRecords] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalaryRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/employee/employee_salary/`);
        const data = response.data;

        const formatted = data.map((item) => {
          const { date, status } = item;
          const salary =
            status === 'full'
              ? 1000
              : status === 'half'
              ? 500
              : 0;

          return {
            date,
            status: status === 'full' ? 'Full Day' : status === 'half' ? 'Half Day' : 'Absent',
            amount: salary,
          };
        });

        const total = formatted.reduce((acc, item) => acc + item.amount, 0);

        setRecords(formatted);
        setTotalSalary(total);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch salary data:', err);
        setError('Failed to load salary records.');
        setLoading(false);
      }
    };

    fetchSalaryRecords();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">💰 Salary Summary</h2>
      <p className="text-sm mb-6">
        Your attendance-based salary. ₹1000 for full day, ₹500 for half day.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading salary records...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
              {records.map(({ date, status, amount }) => (
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
      )}
    </div>
  );
}
