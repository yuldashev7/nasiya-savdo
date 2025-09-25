import {
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
    key: 'super-admin',
    path: '/super-admin',
    title: 'admin',
    icon: CrownOutlined,
  },
  {
    key: 'seller',
    path: '/super-admin/seller-dashboard',
    title: 'seller',
    icon: UserOutlined,
  },
];

const menuItems = linkData.map((el, index) => ({
  key: String(index + 1),
  label: <Link to={el.path}>{el.title}</Link>,
  icon: React.createElement(el.icon),
}));

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    toast.success('Tizimdan muvaffaqiyatli chiqdingiz', { autoClose: 1500 });
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
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
              style={{
                marginRight: '30px',
                paddingTop: '18px',
                paddingBottom: '18px',
              }}
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
    </>
  );
};

export default SuperAdminLayout;
