import React, { useState } from 'react';
import Axios from '../../Axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = async () => {
    try {
      console.log('login worked');
      const datatosent = { email, password };
      const res = await Axios.post('/admin/login', datatosent);
      console.log(res.data); 
      if(res.data.success) {
        localStorage.setItem('admin', true)
        navigate('/admin')
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="px-4 py-2 border rounded w-64"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="px-4 py-2 border rounded w-64"
      />
      <button
        onClick={Login}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
