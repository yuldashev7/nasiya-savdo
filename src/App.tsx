import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Dashboard from './pages/admin/admin-dashboard';
import AdminLayout from './layout/admin-layout/admin-layout';
import Login from './pages/auth/login';
import Seller from './pages/seller/seller-dashboard';
import Unauthorized from './pages/unauth/unauthorized';
import ProtectedRoute from './private/protected-route';
import SellerLayout from './layout/seller-layout/seller-layout';
import MainLayout from './layout/main-layout/main-layout';
import NotFound from './pages/not-found/not-found';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* seller */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute roles={['seller']}>
            <SellerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Seller />} />
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
