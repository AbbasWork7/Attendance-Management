// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "employer" && !user.profile_completed && location.pathname !== "/register") {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
