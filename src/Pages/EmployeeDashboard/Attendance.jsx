// src/EmployeeDashboard/pages/AttendanceLog.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/* import './calendar-style.css';  */// You can customize calendar style here

export default function Attendance() {
  const today = new Date().toDateString();
  const [date, setDate] = useState(new Date());
  const [loginInfo, setLoginInfo] = useState(null);
  const [logoutTime, setLogoutTime] = useState('');
  const [eodReport, setEodReport] = useState('');

  const isToday = date.toDateString() === today;

  const handleLogin = () => {
    const now = new Date();
    setLoginInfo({
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
      day: now.toLocaleDateString('en-US', { weekday: 'long' })
    });
  };

  const handleLogout = () => {
    if (!eodReport.trim()) {
      alert('⚠ Please submit EOD report before logout.');
      return;
    }
    const now = new Date();
    setLogoutTime(now.toLocaleTimeString());
    alert('✅ Successfully Logged Out!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900">
      <h2 className="text-2xl font-semibold mb-4">📅 Attendance Log</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <Calendar onChange={setDate} value={date} className="rounded border w-full" />
          <div className="flex flex-wrap mt-4 text-xs gap-2 text-gray-600">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded-full"></span> Full Day</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded-full"></span> Half Day</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded-full"></span> Absent</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full"></span> Approved Leave</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rounded-full"></span> Pending</span>
          </div>
        </div>

        {/* Attendance Actions */}
        <div className="space-y-4">
          {isToday && !loginInfo && (
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              🔓 Login
            </button>
          )}

          {loginInfo && (
            <div className="bg-gray-50 p-4 rounded border text-sm space-y-2">
              <p>🕒 Login Time: <strong>{loginInfo.time}</strong></p>
              <p>📅 Date: <strong>{loginInfo.date}</strong></p>
              <p>📆 Day: <strong>{loginInfo.day}</strong></p>

              {!logoutTime && (
                <>
                  <textarea
                    className="w-full border p-2 rounded mt-2"
                    placeholder="📝 Enter EOD report..."
                    rows="3"
                    value={eodReport}
                    onChange={(e) => setEodReport(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition"
                  >
                    🔒 Logout
                  </button>
                </>
              )}

              {logoutTime && <p>✅ Logged out at: <strong>{logoutTime}</strong></p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}