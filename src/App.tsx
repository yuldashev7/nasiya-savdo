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
import AddAdmin from './pages/crud-pages/add-admin/add-admin';
import AdminLayout from './layout/admin-layout/admin-layout';
import AdminDashboard from './pages/admin/admin-dashboard';
import EditAdmin from './pages/crud-pages/edit-admin/edit-admin';
import EditStore from './pages/crud-pages/edit-store/edit-store';
import AddStore from './pages/crud-pages/add-store/add-store';
import StoreDashboard from './pages/store-dashboard/store-dashboard';
import AddDebtor from './pages/crud-pages/add-debtor/add-debtor';
import StoreLayout from './layout/store-layout/store-layout';
import AdminProfile from './pages/admin-profile/admin-profile';
import EditDebtor from './pages/crud-pages/edit-debtor/edit-debtor';

function App() {
  return (
    <>
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
          <Route path="store-dashboard" element={<StoreDashboard />} />
          <Route path="add-debtor" element={<AddDebtor />} />
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
          <Route path="store-dashboard" element={<StoreDashboard />} />
          <Route path="add-debtor" element={<AddDebtor />} />
          <Route path="admin-profile" element={<AdminProfile />} />
        </Route>

        {/* store pages */}

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
