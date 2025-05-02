import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import PrivateRouter from '../components/PrivateRouter/PrivateRouter'
import { useAuthContext } from '../context/Auth'

const Index = () => {
  const {isAuth}=useAuthContext()
  return (
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path='auth/*' element={!isAuth ?<><Auth /></> :<><Navigate to="/"/></> } />
      <Route path='dashboard/*' element={<PrivateRouter Component={Dashboard} />} />
    </Routes>
  )
}

export default Index
