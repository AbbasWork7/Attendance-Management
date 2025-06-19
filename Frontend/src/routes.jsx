import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Signup from './Pages/Signup';
import EmployerDashboard from './Pages/EmployerDashboard/EmployerDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Employer Dashboard Route with Nested Routes */}
      <Route
        path="/employer-dashboard/*"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Employee Dashboard Route with Nested Routes */}
      <Route
        path="/employee-dashboard/*"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
