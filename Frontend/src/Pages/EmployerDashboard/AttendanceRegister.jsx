import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCloseCircle } from 'react-icons/io';

export default function AttendanceRequest() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelection, setBulkSelection] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get('http://127.0.0.1:8000/api/employee/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to fetch employees', err));
  }, []);

  const submitBulkAttendance = async () => {
    const today = new Date().toISOString().split("T")[0];

    const summary = employees.map((emp) => {
      const type = bulkSelection[emp.id] || 'Absent';
      const multiplier = type === 'Full Day' ? 1 : type === 'Half Day' ? 0.5 : 0;
      const salary = emp.salaryPerDay * multiplier;

      return {
        user: emp.id,
        date: today,
        attendance_type: type.toLowerCase().replace(" ", "_"),
        salary,
        status: false,
      };
    });

    try {
      const token = localStorage.getItem("access_token");

      await axios.post("http://127.0.0.1:8000/api/salaries/bulk_create/", summary, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Bulk attendance submitted successfully!");
      setModalData({ bulk: true, data: summary });
      setBulkMode(false);
      setBulkSelection({});
    } catch (err) {
      console.error("Bulk submit failed:", err);
      alert("Failed to submit attendance");
    }
  };

  const handleAppearanceClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSelectOption = (type) => {
    const multiplier = type === 'Full Day' ? 1 : type === 'Half Day' ? 0.5 : 0;
    const salary = selectedEmployee.salaryPerDay * multiplier;

    setModalData({
      name: selectedEmployee.username,
      salary,
      login: selectedEmployee.login,
      logout: selectedEmployee.logout,
      type,
    });

    setSelectedEmployee(null);
  };

  const handleBulkSubmit = () => {
    setBulkMode(true);
  };

  const handleBulkOption = (id, type) => {
    setBulkSelection((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-blue-900 font-medium">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Attendance Record</h1>
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          onClick={handleBulkSubmit}
        >
          Bulk Submit
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 shadow">
        <table className="min-w-full text-center">
       <thead className="bg-blue-100 text-blue-800 font-semibold">
  <tr>
    <th className="p-2">Profile</th>
    <th>Name</th>
    <th>Login</th>
    <th>Logout</th>
    <th>EOD</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {employees.map((emp) => (
    <tr key={emp.id} className="border-t">
      {/* Profile column */}
      <td className="py-2 flex items-center gap-3 justify-center">
        <img src={emp.imageUrl} alt="profile" className="w-10 h-10 rounded-full object-cover" />
      </td>

      {/* ✅ Name column (should display username here) */}
      <td>{emp.username}</td>

      <td>{emp.login}</td>
      <td>{emp.logout}</td>
      <td>
        {emp.eodFile ? (
          <a
            href={emp.eodFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            View File
          </a>
        ) : (
          <span className="text-red-500">Not Submitted</span>
        )}
      </td>
      <td>
        <button
          onClick={() => handleAppearanceClick(emp)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Appearance
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Individual Attendance Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white rounded-xl p-6 shadow-xl text-center text-blue-900 w-[90%] max-w-sm"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-3">Select Attendance</h2>
              {['Full Day', 'Half Day', 'Absent'].map((type) => (
                <button
                  key={type}
                  className="block w-full py-2 my-1 bg-blue-700 text-white rounded hover:bg-blue-800"
                  onClick={() => handleSelectOption(type)}
                >
                  {type}
                </button>
              ))}
              <button
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-3 right-3 text-red-500 text-xl"
              >
                <IoMdCloseCircle />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Mode Modal */}
      <AnimatePresence>
        {bulkMode && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white rounded-xl p-6 w-[95%] max-w-xl text-blue-900 shadow-lg"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3">Select Attendance Type</h3>
              {employees.map((emp) => (
                <div key={emp.id} className="border-b py-2">
                  <p>👤 <strong>{emp.username}</strong> — {emp.profile}</p>
                  <div className="flex gap-2 mt-1">
                    {['Full Day', 'Half Day', 'Absent'].map((type) => (
                      <button
                        key={type}
                        className={`px-2 py-1 rounded text-sm ${
                          bulkSelection[emp.id] === type
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        onClick={() => handleBulkOption(emp.id, type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
             <div className="mt-4 flex justify-end gap-3">
  <button
    onClick={() => setBulkMode(false)}
    className="px-4 py-2 bg-gray-300 text-blue-900 rounded hover:bg-gray-400"
  >
    Cancel
  </button>
  <button
    onClick={submitBulkAttendance}
    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
  >
    Submit All
  </button>
</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Alert Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white text-blue-900 rounded-xl p-6 shadow-xl w-[90%] max-w-lg"
              initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-4">Attendance Summary</h3>
              {modalData.bulk ? (
                modalData.data.map((item, i) => (
                  <div key={i} className="border-b mb-3 pb-2">
                    <p>👤 {item.name} — {item.profile}</p>
                    <p>🕐 Login: {item.login}</p>
                    <p>🕔 Logout: {item.logout}</p>
                    <p>📌 Status: {item.type}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="font-medium">💰 Salary:</label>
                      <input
                        type="number"
                        min="0"
                        className="border px-2 py-1 rounded w-32"
                        value={item.salary}
                        onChange={(e) => {
                          const updated = [...modalData.data];
                          updated[i].salary = Number(e.target.value);
                          setModalData((prev) => ({ ...prev, data: updated }));
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>👤 Employee: <strong>{modalData.name}</strong></p>
                  <p>🕐 Login: {modalData.login}</p>
                  <p>🕔 Logout: {modalData.logout}</p>
                  <p>📌 Status: {modalData.type}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="font-medium">💰 Salary:</label>
                    <input
                      type="number"
                      min="0"
                      className="border px-2 py-1 rounded w-32"
                      value={modalData.salary}
                      onChange={(e) =>
                        setModalData((prev) => ({ ...prev, salary: Number(e.target.value) }))
                      }
                    />
                  </div>
                </>
              )}
              <div className="mt-4 text-right">
                <button
                  onClick={() => setModalData(null)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
