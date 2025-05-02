import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { UserOutlined, FileDoneOutlined, MessageOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../context/Auth';

const { Title } = Typography;

const DashboardHome = () => {
    const {user} =useAuthContext()
  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <Title level={2}>Welcome to Your Dashboard</Title>

      <Row gutter={24}>
        {/* User Statistics Card */}
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Total Users"
              value={1328}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>

        {/* Reports Card */}
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Reports Generated"
              value={45}
              prefix={<FileDoneOutlined />}
              valueStyle={{ color: '#1DA57A' }}
            />
          </Card>
        </Col>

        {/* Messages Card */}
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Unread Messages"
              value={12}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#1890FF' }}
            />
          </Card>
        </Col>

        {/* Revenue Card */}
        <Col span={6}>
          <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Total Revenue"
              value={8600}
              prefix={<DollarCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
              suffix="USD"
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        {/* Welcome Message */}
        <Col span={24}>
          <Card
            title={user?.fullName || 'Welcome Back!'}
            bordered={false}
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <p>We are glad to have you back! Here's a quick overview of your dashboard.</p>
            <p>
              Explore your profile, settings, and reports. Stay up to date with the latest notifications
              and manage your user data efficiently.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
