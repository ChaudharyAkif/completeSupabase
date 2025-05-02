import { Col, Row, Typography, Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import { supabase } from '../../../config/supabase';
import { useNavigate } from 'react-router-dom';

const initialState = { email: "", password: "" }
const { Title } = Typography;
const Login = () => {
   const [state, setState] = useState(initialState)
 const navigate = useNavigate()
  const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = async () => {
    let { password, email } = state
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.log(error)
      navigate("/auth/register")
    }
    else {
      navigate("/")
      alert("Login Success")
    }
  }
  return (
    <>
      <main className='auth  p-3 p-lg-4 bg-primary'>
        <div className="card p-3 p-lg-4 bg-white shadow-sm rounded-3">
          <Row>
            <Col span={24}>
              <Title className='text-center'>Login</Title>
            </Col>
          </Row>
          <Form layout='vertical'>
            <Row gutter={12}>
              <Col xs={24} >
                <Form.Item label="Enter email">
                  <Input type='text' placeholder='Enter your email' name='email' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col xs={24} >
                <Form.Item label="Enter password">
                  <Input.Password placeholder='Enter your password' name='password' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col xs={24} className='text-center'>
                <Button type='primary' onClick={handleSubmit}>Login</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </main>
    </>
  )
}

export default Login
