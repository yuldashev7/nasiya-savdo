import { Navigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../types/types';

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  if (roles && role && !roles.includes(role.toUpperCase())) {
    return <Navigate to={'/unauthorized'} replace />;
  }

  if (window.location.pathname === '/') {
    if (role?.toUpperCase() === 'SUPER ADMIN')
      return <Navigate to={'/super-admin'} replace />;
    if (role?.toUpperCase() === 'ADMIN')
      return <Navigate to={'/admin'} replace />;
    if (role?.toUpperCase() === 'STORE')
      return <Navigate to={'/store-dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
