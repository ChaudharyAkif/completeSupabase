import React, { useState } from 'react';
import { Card, Avatar, Form, Input, Button, Divider, Row, Col, message, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../../context/Auth';

const UserProfile = () => {
  const { user } = useAuthContext();
  const avatarImage = user?.image || 'https://www.gravatar.com/avatar?d=mp';
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null); // To store the uploaded image preview

  const handleUpdate = (values) => {
    console.log('Updated profile:', values);
    message.success('Profile updated successfully!');
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);  // Update the image preview
      };
      reader.readAsDataURL(info.file.originFileObj); // Convert image to data URL for preview
    }
  };

  return (
    <Card title="User Profile" bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={24}>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Avatar
            size={120}
            src={imageUrl || avatarImage}  // Use the uploaded image or default avatar
            icon={!imageUrl && <UserOutlined />}  // Fallback if no image is selected
            style={{ marginBottom: 16 }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={() => false}  // Prevent auto upload
            onChange={handleUpload}
            accept="image/*"  // Allow only image files
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Col>

        <Col xs={24} md={16}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleUpdate}
            initialValues={{
              fullName: user?.fullName || 'Muhammad Akif Hussain',
              email: user?.email || 'akif@example.com',
              phone: user?.phone || '0312-1234567',
            }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
