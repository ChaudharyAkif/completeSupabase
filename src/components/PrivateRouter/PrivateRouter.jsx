// src/components/PrivateRouter.js
import React from 'react';
import { useAuthContext } from '../../context/Auth';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ Component }) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Component />
    </>
  );
};

export default PrivateRouter;
