// src/pages/dashboard/Home.js
import React from 'react';
import { useAuthContext } from '../../../context/Auth';
import { Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

const Home = () => {
  const { user, isAuth } = useAuthContext();

  // Derive initials if there's no image
  const initials =
    (user.firstName?.[0] || user.email?.[0] || 'G').toUpperCase();

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <Title level={2}>
        Welcome {user?.fullName || user?.email || 'Guest'}
      </Title>

      {isAuth ? (
        <Avatar
          size={120}
          src={user.image}              // your Supabase‐stored URL
          style={{ objectFit: 'cover' }} 
        >
          {initials}                   {/* shown if image fails */}
        </Avatar>
      ) : (
        <Avatar size={120}>{initials}</Avatar>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <Text strong>Email:</Text> <Text>{user?.email || '—'}</Text><br/>
        <Text strong>UID:</Text> <Text>{user?.uid || '—'}</Text>
      </div>
    </main>
  );
};

export default Home;
