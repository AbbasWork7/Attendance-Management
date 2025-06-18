// src/EmployeeDashboard/EmployeeDashboard.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../EmployeeDashboard/Dashboard';
import Attendance from '../EmployeeDashboard/Attendance';
import Salary from '../EmployeeDashboard/Salary';
import Requests from '../EmployeeDashboard/Requests';
import Notification from '../EmployeeDashboard/Notification';
import Profile from './Profile'

export default function EmployeeDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<></>} /> {/* Optional placeholder */}
        <Route path="Attendance" element={<Attendance />} />
        <Route path="Salary" element={<Salary />} />
        <Route path="Requests" element={<Requests />} />
        <Route path="Notification" element={<Notification />} />  
        <Route path="Profile" element={<Profile />} />
       </Route>
    </Routes>
  );
}