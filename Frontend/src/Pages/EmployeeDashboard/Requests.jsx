import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Requests() {
  const [type, setType] = useState('leave');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();

try {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(`${BASE_URL}api/employee/employee-request/`, {
    request_type: type,
    message: message,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200 || response.status === 201) {
    setStatus('✅ Request submitted successfully!');
    setMessage('');
  } else {
    setStatus('⚠️ Failed to submit request.');
  }
} catch (error) {
  // Show specific error from backend (e.g., validation error)
  const errorMessage = error.response?.data?.errors
    ? JSON.stringify(error.response.data.errors)
    : error.response?.data?.detail || error.message;

  console.error('API Error:', errorMessage);
  setStatus(`❌ Error: ${errorMessage}`);
  toast.error(`❌ ${errorMessage}`);
}

};

  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-blue-900 transition-all">
      <h2 className="text-2xl font-semibold mb-4">Requests</h2>
      <p className="text-sm mb-6">Send official requests like leave, work-from-home, or custom notes to your manager.</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Request Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="leave">🌴 Leave</option>
            <option value="wfh">🏠 Work From Home</option>
            <option value="other">✏ Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Explain your request clearly..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          📨 Submit Request
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
