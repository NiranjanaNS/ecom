import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const Auth = () => {
    const isAuth = localStorage.getItem('token') !== null;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default Auth