import React, { useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, message } from 'antd';
import { supabase } from '../../../config/supabase';
import { useAuthContext } from '../../../context/Auth'; // ✅ IMPORT CONTEXT

const { Title } = Typography;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ReadData } = useAuthContext(); // ✅ GET ReadData FUNCTION

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async userId => {
    const fileName = `users_${userId}.jpg`;

    const { error: uploadError } = await supabase
      .storage
      .from('users')
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload Error:", uploadError.message);
      message.error("Image upload failed.");
      return "";
    }

    const { data, error: urlError } = supabase
      .storage
      .from('users')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error("Error getting public URL:", urlError.message);
      return "";
    }

    return data.publicUrl;
  };

  const saveUserData = async userData => {
    const { error } = await supabase
      .from('users')
      .insert(userData);

    if (error) {
      console.error("Database Insert Error:", error.message);
      message.error("Failed to save user data.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    let { firstName, lastName, email, password, confirmPassword } = state;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return message.error("Please fill in all fields.");
    }
    if (password !== confirmPassword) {
      return message.error("Passwords do not match.");
    }

    setLoading(true);
    firstName = firstName.trim();
    lastName = lastName.trim();
    const fullName = `${firstName} ${lastName}`;

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });
      if (signUpError) throw signUpError;

      const uid = signUpData.user.id;

      let image = "";
      if (file) {
        image = await uploadImage(uid);
      }

      const success = await saveUserData({ uid, firstName, lastName, fullName, email, image });
      if (!success) throw new Error("Could not save user row");

      // ✅ UPDATE CONTEXT IMMEDIATELY
      await ReadData({ id: uid });

      message.success("Registration successful! Check your email for confirmation.");
      setState(initialState);
      setFile(null);
    } catch (err) {
      console.error(err);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='auth p-3 p-lg-4 bg-primary'>
      <div className="card p-4 mx-auto" style={{ maxWidth: 420 }}>
        <Row>
          <Col span={24}><Title level={2} className="text-center">Register</Title></Col>
        </Row>
        <Form layout='vertical'>
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item label="First Name">
                <Input name="firstName" onChange={handleChange} value={state.firstName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Last Name">
                <Input name="lastName" onChange={handleChange} value={state.lastName} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Email">
                <Input name="email" type="email" onChange={handleChange} value={state.email} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Password">
                <Input.Password name="password" onChange={handleChange} value={state.password} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Confirm Password">
                <Input.Password name="confirmPassword" onChange={handleChange} value={state.confirmPassword} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Upload Profile Picture">
                <Input type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Item>
            </Col>
            <Col xs={24} className="text-center">
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
}
