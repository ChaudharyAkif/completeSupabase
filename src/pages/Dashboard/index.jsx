import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import DashboardHome from './DashboardHome';
import UserProfile from './Profile/Profile';
import Settings from './Settings';
import Report from './Reports';


const { Header, Content, Sider } = Layout;

const items1 = [
  { key: '1', label: <Link to="/">Home</Link> },
  { key: '2', label: <Link to="/dashboard/profile">Profile</Link> },
  { key: '3', label: <Link to="/dashboard/settings">Settings</Link> },
  { key: '4', label: <Link to="/dashboard/reports">Reports</Link> },
];

const items2 = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'User',
    children: [
      { key: '1', label: <Link to="/dashboard/profile">Profile</Link> },
      { key: '2', label: <Link to="/dashboard/settings">Settings</Link> },
    ],
  },
  {
    key: 'sub2',
    icon: <LaptopOutlined />,
    label: 'Dashboard',
    children: [
      { key: '3', label: <Link to="/">Home</Link> },
      { key: '4', label: <Link to="/dashboard/reports">Reports</Link> },
    ],
  },
  {
    key: 'sub3',
    icon: <NotificationOutlined />,
    label: 'Notifications',
    children: [
      { key: '5', label: 'Message 1' },
      { key: '6', label: 'Message 2' },
    ],
  },
];

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'Section' }, { title: 'Page' }]} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
        <Routes>
  <Route path="/" element={<DashboardHome />} />
  <Route path="/profile" element={<UserProfile />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/reports" element={<Report />} />
</Routes>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
