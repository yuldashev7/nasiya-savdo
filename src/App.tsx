import { Navigate, Route, Routes } from 'react-router-dom';
import Unauthorized from './pages/unauth/unauthorized';
import Login from './pages/auth/login/login';
import ProtectedRoute from './private/protected-route';
import SuperAdminLayout from './layout/super-admin-layout/super-admin-layout';
import SuperAdminDashboard from './pages/super-admin/super-admin-dashboard';
import AddAdmin from './crud-admins/add-admin/add-admin';
import AdminLayout from './layout/admin-layout/admin-layout';
import AdminDashboard from './pages/admin/admin-dashboard';
import EditAdmin from './crud-admins/edit-admin/edit-admin';
import EditStore from './crud-store/edit-store/edit-store';
import AddStore from './crud-store/add-store/add-store';
import StoreDashboard from './pages/store-dashboard/store-dashboard';
import AddDebtor from './crud-debtor/add-debtor/add-debtor';
import StoreLayout from './layout/store-layout/store-layout';
import EditDebtor from './crud-debtor/edit-debtor/edit-debtor';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="edit-store/:id" element={<EditStore />} />
          <Route path="store-dashboard" element={<StoreDashboard />} />
          <Route path="add-debtor" element={<AddDebtor />} />
          <Route path="edit-debtor/:id" element={<EditDebtor />} />
        </Route>

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
          <Route path="store-dashboard" element={<StoreDashboard />} />
          <Route path="add-debtor" element={<AddDebtor />} />
          <Route path="edit-debtor/:id" element={<EditDebtor />} />
        </Route>

        <Route
          path="/store-dashboard"
          element={
            <ProtectedRoute roles={['STORE']}>
              <StoreLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StoreDashboard />} />
          <Route path="add-debtor" element={<AddDebtor />} />
          <Route path="edit-debtor/:id" element={<EditDebtor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
