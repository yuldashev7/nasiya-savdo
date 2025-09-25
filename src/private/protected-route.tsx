import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  if (roles && role && !roles.includes(role.toUpperCase())) {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return children;
};

export default ProtectedRoute;
