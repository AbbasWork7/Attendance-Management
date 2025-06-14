import React, { useState } from 'react';
import { Calendar } from 'react-calendar'; // if you're using a calendar library
import 'react-calendar/dist/Calendar.css';

export default function EmployeeDashboard() {
  const [date, setDate] = useState(new Date());
  const [loginTime, setLoginTime] = useState('');
  const [logoutTime, setLogoutTime] = useState('');
  const [eodReport, setEodReport] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ loginTime, logoutTime, eodReport });
    // Add your API logic here
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Menu</h2>
        <nav className="space-y-3 text-gray-700">
          <button className="block hover:text-indigo-500">🏠 Dashboard</button>
          <button className="block hover:text-indigo-500">📅 Attendance</button>
          <button className="block hover:text-indigo-500">💰 Salary</button>
          <button className="block hover:text-indigo-500">📨 Requests</button>
          <button className="block hover:text-indigo-500">🔔 Notifications</button>
          <button className="block hover:text-indigo-500">👤 Profile</button>
          <button className="block hover:text-red-500">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🧑‍💼 Employee Dashboard</h1>


    {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">📅 Attendance Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date, view }) => {
              // TODO: Add logic to color days based on attendance status
              return ''; // className like 'bg-green-300' or 'bg-red-300'
            }}
          />
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <div><span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span> Full Day</div>
            <div><span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span> Half Day</div>
            <div><span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span> Absent</div>
            <div><span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span> Approved Leave</div>
            <div><span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span> Pending</div>
          </div>
        </div>

        {/* Attendance Submission Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">📝 Submit Attendance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Login Time</label>
              <input
                type="time"
                className="mt-1 block w-full p-2 border rounded"
                value={loginTime}
                onChange={(e) => setLoginTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Logout Time</label>
              <input
                type="time"
                className="mt-1 block w-full p-2 border rounded"
                value={logoutTime}
                onChange={(e) => setLogoutTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">EOD Report</label>
              <textarea
                className="mt-1 block w-full p-2 border rounded"
                rows="4"
                value={eodReport}
                onChange={(e) => setEodReport(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              ✅ Submit
            </button>
          </form>
        </div>

        
        
      </main>
    </div>
  );
}
