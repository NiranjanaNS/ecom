import React from 'react'
import { Navigate } from 'react-router-dom'

const UserAuth = ({children}) => {
  const data = localStorage.getItem('user')
  return data ? children : <Navigate to='/login' />
}

export default UserAuth