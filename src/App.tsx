import { Route, Routes } from 'react-router-dom';
import Unauthorized from './pages/unauth/unauthorized';
import Login from './pages/auth/login/login';
import Home from './pages/home/home';
import ProtectedRoute from './private/protected-route';
import MainLayout from './layout/main-layout/main-layout';
import NotFound from './pages/not-found/not-found';
import SuperAdminLayout from './layout/super-admin-layout/super-admin-layout';
import SuperAdminDashboard from './pages/super-admin/super-admin-dashboard';
import SellerDashboard from './pages/seller/seller-dashboard';
import AddAdmin from './pages/add-admin/add-admin';
import AdminLayout from './layout/admin-layout/admin-layout';
import AdminDashboard from './pages/admin/admin-dashboard';
import EditAdmin from './pages/edit-admin/edit-admin';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import EditStore from './pages/edit-store/edit-store';
import AddStore from './pages/add-store/add-store';

function App() {
  const [toastPosition, setToastPosition] = useState<
    'bottom-center' | 'top-right'
  >(window.innerWidth <= 375 ? 'bottom-center' : 'top-right');

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(
        window.innerWidth <= 375 ? 'bottom-center' : 'top-right'
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <ToastContainer position={toastPosition} theme="light" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* super-admin */}

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute roles={['SUPER ADMIN']}>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="admin/:id" element={<EditAdmin />} />
          <Route path="seller-dashboard" element={<SellerDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="edit-store/:id" element={<EditStore />} />
        </Route>

        {/* admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="edit-store/:id" element={<EditStore />} />
        </Route>

        {/* pages */}
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
