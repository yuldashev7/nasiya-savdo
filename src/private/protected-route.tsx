import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const raw = localStorage.getItem('token');
  const token = raw ? JSON.parse(raw) : null;

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  if (roles && !roles.includes(token.role)) {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return children;
};

export default ProtectedRoute;
