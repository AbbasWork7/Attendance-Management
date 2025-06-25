import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import defaultAvatar from "../../assets/image/logo.png";
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = "http://127.0.0.1:8000";

export default function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem("access_token"); // ✅ use correct key

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/employer/employees/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === "success") {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      toast.error("Failed to load employees");
      console.error(err);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    (emp.employee_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="p-6 bg-white text-blue-900 rounded-xl shadow-lg overflow-x-auto max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">👥 Candidate Details</h2>
        <div className="relative">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-blue-800 uppercase">
          <tr>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Join Date</th>
            <th className="px-4 py-3">Present</th>
            <th className="px-4 py-3">Absents</th>
            <th className="px-4 py-3">Attendance %</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-blue-50">
              <td className="px-4 py-3 flex items-center space-x-2">
                <img src={emp.profile_picture || defaultAvatar} alt={emp.employee_name} className="w-8 h-8 rounded-full" />
                <span>{emp.employee_name}</span>
              </td>
              <td className="px-4 py-3">{emp.email}</td>
              <td className="px-4 py-3">{emp.designation || "-"}</td>
              <td className="px-4 py-3">{emp.joining_date ? new Date(emp.joining_date).toLocaleDateString() : '-'}</td>
              <td className="px-4 py-3">{emp.totalPresent || 0}</td>
              <td className="px-4 py-3">{emp.absents || 0}</td>
              <td className="px-4 py-3">{emp.attendancePercent || 0}%</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  emp.status === 'Active' ? 'bg-green-200 text-green-800'
                    : emp.status === 'On Leave' ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
                }`}>{emp.status || 'Inactive'}</span>
              </td>
              <td className="px-4 py-3 flex justify-center gap-2 text-blue-800">
                <FiEye className="hover:text-blue-500 cursor-pointer" />
                <FiEdit2 className="hover:text-green-500 cursor-pointer" />
                <FiTrash2 className="hover:text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
