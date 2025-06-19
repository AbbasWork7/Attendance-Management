// src/Pages/EmployeeDashboard/EmployeeDashboardRoutes.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Attendance from './Attendance';
import Salary from './Salary';
import Requests from './Requests';
import Notification from './Notification';
import Profile from './Profile';
import NeedHelp from './NeedHelp';

export default function EmployeeDashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="attendance" replace />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="salary" element={<Salary />} />
      <Route path="requests" element={<Requests />} />
      <Route path="notification" element={<Notification />} />
      <Route path="profile" element={<Profile />} />
      <Route path="needhelp" element={<NeedHelp />} />
      <Route path="*" element={<p className="text-red-600 p-4">404 – Page not found</p>} />
    </Routes>
  );
}
