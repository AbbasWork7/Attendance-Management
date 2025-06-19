import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// 🧪 Dummy data — replace with actual API or shared state
const fetchEmployees = async () => {
  return [
    {
      id: 1,
      name: "Syed Abbas",
      role: "Frontend Developer",
      email: "abbas@example.com",
      phone: "9876543210",
      profileImg: "",
    },
    {
      id: 2,
      name: "Ayesha Khan",
      role: "Backend Developer",
      email: "ayesha@example.com",
      phone: "9876543211",
      profileImg: "",
    },
    {
      id: 3,
      name: "John Smith",
      role: "UI/UX Designer",
      email: "john@example.com",
      phone: "9876543212",
      profileImg: "",
    },
    {
      id: 4,
      name: "Sana Ali",
      role: "Project Manager",
      email: "sana@example.com",
      phone: "9876543213",
      profileImg: "",
    },
  ];
};

// 🎨 Role color map
const roleColorMap = {
  "Frontend Developer": "bg-green-100 text-green-800",
  "Backend Developer": "bg-blue-100 text-blue-800",
  "UI/UX Designer": "bg-pink-100 text-pink-800",
  "Project Manager": "bg-yellow-100 text-yellow-800",
};

export default function MyTeam() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    getEmployees();
  }, []);

  // 🔍 Filter logic
  const filteredEmployees = employees.filter((emp) =>
    `${emp.name} ${emp.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">👥 My Team</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-blue-100 rounded-2xl p-4 shadow-md flex items-center space-x-4"
          >
            {emp.profileImg ? (
              <img
                src={emp.profileImg}
                alt={emp.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-blue-300" />
            )}

            <div>
              <h2 className="text-lg font-semibold text-blue-900">{emp.name}</h2>
              <p
                className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mb-1 ${
                  roleColorMap[emp.role] || "bg-gray-100 text-gray-800"
                }`}
              >
                {emp.role}
              </p>
              <p className="text-sm text-blue-700">{emp.email}</p>
              <p className="text-sm text-blue-700">{emp.phone}</p>
            </div>
          </motion.div>
        ))}

        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <p className="text-center col-span-full text-blue-700">
            No matching employees found.
          </p>
        )}
      </div>
    </div>
  );
}
