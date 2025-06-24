import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const BASE_URL ='http://127.0.0.1:8000/' ;

export default function Attendance() {
  const today = new Date();
  const todayStr = today.toDateString();
  const [date, setDate] = useState(today);
  const [loginInfo, setLoginInfo] = useState(null);
  const [logoutTime, setLogoutTime] = useState('');
  const [eodReport, setEodReport] = useState('');
  const [eodFile, setEodFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [attendanceMap, setAttendanceMap] = useState({});

  const isToday = date.toDateString() === todayStr;

  useEffect(() => {
    if (uploadSuccess && logoutTime && loginInfo) {
      const loginHour = new Date(`1970-01-01T${loginInfo.time}`).getHours();
      const loginMinute = new Date(`1970-01-01T${loginInfo.time}`).getMinutes();
      const isHalfDay = loginHour > 9 || (loginHour === 9 && loginMinute > 30);
      const key = todayStr;
      setAttendanceMap(prev => ({
        ...prev,
        [key]: {
          status: 'pending',
          isHalfDay
        }
      }));
      toast.success('Successfully Logged Out!', { duration: 3000 });
    }
  }, [uploadSuccess, logoutTime]);

  const handleLogin = async () => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().slice(0, 5);

    try {
      const response = await axios.post(`${BASE_URL}/api/employee/attendance/login/`, {
        date: formattedDate,
        time: formattedTime,
      });

      if (response.status === 200 || response.status === 201) {
        setLoginInfo({
          time: now.toLocaleTimeString(),
          date: now.toLocaleDateString(),
          day: now.toLocaleDateString('en-US', { weekday: 'long' })
        });
        toast.success('Login time recorded!');
      } else {
        toast.error('Failed to record login time.');
      }
    } catch (error) {
      console.error('Login API Error:', error);
      toast.error('Error logging attendance.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      toast.error('Invalid file type.');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('File size must be ≤ 1MB.');
      return;
    }

    setEodFile(file);
    setUploadSuccess(true);
  };

  const handleLogout = async () => {
    if (!eodFile || !eodReport.trim()) {
      toast.error('Please upload your EOD file and enter a report.');
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const formData = new FormData();
    formData.append('date', formattedDate);
    formData.append('eod_report', eodReport);
    formData.append('document', eodFile);

    try {
      const response = await axios.put(`${BASE_URL}/api/employee/attendance/logout/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const logoutTimeStr = now.toLocaleTimeString();
        setLogoutTime(logoutTimeStr);
        toast.success(`Logged out at ${logoutTimeStr}`);
      } else {
        toast.error('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout API Error:', error);
      toast.error('Error while logging out.');
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== 'month') return;
    const dateKey = date.toDateString();
    const record = attendanceMap[dateKey];
    if (!record) return;

    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (record.status === 'pending') {
      if (diffInDays < 3) return 'bg-gray-400 text-white';
      return record.isHalfDay ? 'bg-orange-400 text-white' : 'bg-green-400 text-white';
    }

    return record.status === 'absent'
      ? 'bg-red-400 text-white'
      : record.status === 'leave'
      ? 'bg-blue-400 text-white'
      : 'bg-green-400 text-white';
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-6 text-blue-900 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Attendance Log</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-4 shadow">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full p-2 rounded-md border border-blue-200"
            tileClassName={getTileClassName}
          />
          <div className="flex flex-wrap mt-4 text-xs gap-2 text-gray-600">
            <Legend color="green-400" label="Full Day" />
            <Legend color="orange-400" label="Half Day" />
            <Legend color="red-400" label="Absent" />
            <Legend color="blue-400" label="Approved Leave" />
            <Legend color="gray-400" label="Pending" />
          </div>
        </div>

        <div className="space-y-4">
          {isToday && !loginInfo && (
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition"
            >
              🔓 Login
            </button>
          )}

          {loginInfo && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-3 text-sm shadow">
              <p>🕒 <strong>Login Time:</strong> {loginInfo.time}</p>
              <p>📅 <strong>Date:</strong> {loginInfo.date}</p>
              <p>📆 <strong>Day:</strong> {loginInfo.day}</p>

              {!logoutTime && (
                <>
                  <label className="block text-sm font-medium text-gray-700">End of Day Report</label>
                  <textarea
                    value={eodReport}
                    onChange={(e) => setEodReport(e.target.value)}
                    rows="3"
                    className="w-full border p-2 rounded mb-2"
                    placeholder="e.g. Completed API integrations..."
                  />

                  <label className="block text-sm font-medium text-gray-700">Upload EOD File (PDF/DOC only)</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                  />
                  {uploadSuccess && (
                    <p className="text-green-600 text-sm">✅ File uploaded successfully.</p>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`bg-red-500 text-white px-6 py-2 rounded-lg mt-2 hover:bg-red-600 transition ${(!uploadSuccess || !eodReport.trim()) && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!uploadSuccess || !eodReport.trim()}
                  >
                    🔒 Logout
                  </button>
                </>
              )}

              {logoutTime && (
                <p className="text-green-600 font-semibold">
                  ✅ Logged out at: {logoutTime}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Legend = ({ color, label }) => (
  <span className="flex items-center gap-1">
    <span className={`w-3 h-3 rounded-full bg-${color}`}></span> {label}
  </span>
);
