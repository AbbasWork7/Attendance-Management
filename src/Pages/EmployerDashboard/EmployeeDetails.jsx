// src/components/employer/EmployeeDetails.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import defaultAvatar from "../../assets/image/logo.png";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  const handleView = (id) => {
    alert(`View employee with ID: ${id}`);
  };

  return (
    <motion.div
      className="p-4 sm:p-6 bg-white text-blue-900 rounded-xl shadow-lg overflow-x-auto max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold whitespace-nowrap">👥 Employee Details</h2>
        <div className="relative w-full sm:w-auto">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full text-sm text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <thead className="bg-gray-200 text-xs text-blue-800 uppercase">
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
              <motion.tr
                key={emp.id}
                className="border-b hover:bg-blue-50 transition"
                whileHover={{ scale: 1.01 }}
              >
                <td className="px-4 py-3 flex items-center space-x-3 whitespace-nowrap">
                  <img
                    src={emp.profileImage || defaultAvatar}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{emp.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{emp.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{emp.department}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(emp.joinDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 whitespace-nowrap">{emp.totalPresent}</td>
                <td className="px-4 py-3 whitespace-nowrap">{emp.absents}</td>
                <td className="px-4 py-3 font-semibold text-blue-700 whitespace-nowrap">{emp.attendancePercent}%</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                      emp.status === 'Active'
                        ? 'bg-green-200 text-green-800'
                        : emp.status === 'On Leave'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2 text-blue-800 whitespace-nowrap">
                  <button onClick={() => handleView(emp.id)}><FiEye className="hover:text-blue-500 transition duration-200" /></button>
                  <button onClick={() => handleEdit(emp.id)}><FiEdit2 className="hover:text-green-500 transition duration-200" /></button>
                  <button onClick={() => handleDelete(emp.id)}><FiTrash2 className="hover:text-red-500 transition duration-200" /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default EmployeeDetails;
