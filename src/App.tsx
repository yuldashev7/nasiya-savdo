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

function App() {
  return (
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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
  );
}

export default App;
