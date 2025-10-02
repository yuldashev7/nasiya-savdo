import {
  AccountBookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogOutIcon from '../../assets/icons/log-out-icon';
import logo from '../../assets/images/LOGO.png';

const { Header, Sider, Content } = Layout;

const linkData = [
  {
    title: "Do'kon Qo'shish",
    key: 'admin',
    path: '/admin',
    icon: ShoppingOutlined,
  },
  {
    title: "Qarzdor Qo'shish",
    key: 'store-dashboard',
    path: 'store-dashboard',
    icon: AccountBookOutlined,
  },
  {
    title: 'Profil',
    key: 'admin-profile',
    path: 'admin-profile',
    icon: UserOutlined,
  },
];

const menuItems = linkData.map((el, index) => ({
  key: String(index + 1),
  label: <Link to={el.path}>{el.title}</Link>,
  icon: React.createElement(el.icon),
}));

const AdminLayout = () => {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    toast.success('Tizimdan muvaffaqiyatli chiqdingiz');
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onBreakpoint={(broken) => setCollapsed(broken)}
        >
          <div className="flex items-center py-[15px] justify-center  gap-[20px]">
            <img src={logo} alt="img" />
            {!collapsed && (
              <p className="text-[16px] font-[500] text-white">Nasiya Savdo</p>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Button
              danger
              onClick={removeToken}
              className="mr-7 sm:py-2 lg:p-4 flex items-center gap-2"
            >
              <LogOutIcon />
              LogOut
            </Button>
          </Header>

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default AdminLayout;
