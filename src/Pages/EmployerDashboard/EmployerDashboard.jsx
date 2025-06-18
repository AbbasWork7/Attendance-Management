// src/Pages/EmployerDashboard/EmployerDashboard.jsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../EmployerDashboard/Slidedbar';
import DashboardHome from './Dashboard';
import MyTeam from './MyTeam';
import Notification from './Notification';
import AddEmployee from './AddEmployee';
import EmployeeDetails from './EmployeeDetails';
import MyProfile from './MyProfile';
import Logout from './Logout';
import NeedHelp from './NeedHelp';
import AttendanceRegister from './AttendanceRegister';

export default function EmployerDashboard() {
   return (
    <div className="flex">
      <Sidebar />

      {/* Main Page Content */}
      <div className="flex-1 p-4 md:pt-4 pt-20">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-details" element={<EmployeeDetails />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/need-help" element={<NeedHelp />} />
          <Route path="/Attendance-Register" element={<AttendanceRegister />} />
        </Routes>
      </div>
    </div>
  );
}
