import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in
  if (!user) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If user is employer but hasn't completed profile, redirect to /register
  if (user.role === 'employer' && !user.profile_completed && location.pathname !== '/register') {
    return <Navigate to="/register" replace />;
  }

  // All clear
  return children;
};

export default ProtectedRoute;
