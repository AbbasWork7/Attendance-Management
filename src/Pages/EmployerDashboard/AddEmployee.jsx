import React, { useState } from 'react';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    profile: '',
    joinDate: new Date().toISOString().split('T')[0], // auto today
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call here to send data to backend
    console.log('Employee Data Submitted:', formData);
    alert('Employee added successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      profile: '',
      joinDate: new Date().toISOString().split('T')[0],
      salary: '',
    });
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen text-blue-900">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4">
        <div>
          <label className="block font-medium mb-1">Employee Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Department</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Profile</label>
          <input
            type="text"
            name="profile"
            required
            value={formData.profile}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Join Date</label>
          <input
            type="date"
            name="joinDate"
            required
            value={formData.joinDate}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Salary (₹)</label>
          <input
            type="number"
            name="salary"
            required
            min="0"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mt-4"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}
