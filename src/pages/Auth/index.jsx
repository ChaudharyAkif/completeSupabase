import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register/register'
import Login from './Login/Login'
import Header from '../../components/Header/Header'


const Auth = () => {
  return (
    <>
      <Header />
          <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  )
}

export default Auth
