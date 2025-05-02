import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';
import { Avatar, Dropdown } from 'antd';

const Navbar = () => {
  const { user, isAuth, handleLogOut } = useAuthContext();

  // Fallback avatar image if user image not available
  const avatarImage = user?.image || 'https://www.gravatar.com/avatar?d=mp';

  // Define menu items for Dropdown
  const items = !isAuth
    ? [
        {
          key: 'register',
          label: <Link to="/auth/register">Register</Link>,
        },
        {
          key: 'login',
          label: <Link to="/auth/login">Login</Link>,
        },
      ]
    : [
        {
          key: 'profile',
          label: <Link to="/dashboard/profile">Profile</Link>,
        },
        {
          key: 'logout',
          label: <span onClick={handleLogOut}>Logout</span>,
        },
      ];

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>

          <div style={{ position: 'relative' }}>
            <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
              <Avatar
                size={50}
                src={avatarImage}
                style={{
                  cursor: 'pointer',
                  objectFit: 'cover',
                  border: '2px solid #1890ff',
                }}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
