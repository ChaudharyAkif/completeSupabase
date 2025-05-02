import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Divider, message } from 'antd';
import { useAuthContext } from '../../context/Auth';

const { Option } = Select;

const Settings = () => {
  const { user } = useAuthContext()
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log('Saved settings:', values);
    message.success('Settings saved successfully!');
  };

  return (
    <Card title="Account Settings" bordered={false} style={{ maxWidth: 700 }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSave}
        initialValues={{
          username: user.firstName,
          email: user.email,
          notifications: true,
          language: 'english',
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ type: 'email', message: 'Enter a valid email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Language Preference"
          name="language"
          rules={[{ required: true, message: 'Please select your language' }]}
        >
          <Select placeholder="Select a language">
            <Option value="english">English</Option>
            <Option value="urdu">Urdu</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Enable Notifications" name="notifications" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Settings;
