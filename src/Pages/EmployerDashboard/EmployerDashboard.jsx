import { Routes, Route } from 'react-router-dom';
import Sidebar from './Slidedbar';
import DashboardHome from './Dashboard'; // ✅ make sure this file exists
import MyTeam from './MyTeam';
import Notification from './Notification';
import AddEmployee from './AddEmployee';
import EmployeeDetails from './EmployeeDetails';
import MyProfile from './MyProfile';
import Logout from './Logout';
import NeedHelp from './NeedHelp';

export default function EmployerDashboard() {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
       <Routes>
  <Route index element={<DashboardHome />} /> {/* ✅ this is the default */}
  <Route path="my-team" element={<MyTeam />} />
  <Route path="notification" element={<Notification />} />
  <Route path="add-employee" element={<AddEmployee />} />
  <Route path="employee-details" element={<EmployeeDetails />} />
  <Route path="my-profile" element={<MyProfile />} />
  <Route path="logout" element={<Logout />} />
  <Route path="need-help" element={<NeedHelp />} />
</Routes>

      </div>
    </div>
  );
}
