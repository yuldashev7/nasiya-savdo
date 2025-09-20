import { Route, Routes } from 'react-router-dom';
// import MainLayout from './layout/main-layout/main-layout';
import Home from './pages/home/home';
import Dashboard from './pages/admin/dashboard';
import AdminLayout from './layout/admin-layout/admin-layout';
import Login from './pages/auth/login';
import Seller from './pages/seller/seller';
import AntdProvider from './providers/antd-provider';

function App() {
  return (
    <>
      <AntdProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* seller */}
          <Route path="/seller" element={<Seller />} />
        </Routes>
      </AntdProvider>
    </>
  );
}

export default App;
