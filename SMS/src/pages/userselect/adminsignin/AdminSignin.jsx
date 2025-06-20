import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Import icons
import './Signin.css';

const AdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3002/login/admin', { email, password });

      if (response.status === 200) {
        // alert('Login successful');
        navigate('/AdminDashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='signinwrapper'>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='off'
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        </div>

        <div className="submit">
          <button type="submit">Login</button>
          <p className="register-link">
            <Link to="/Select">Select User</Link>
          </p>
        </div>
      </form>
      <div className="sideimage">
        <img src="../../../Images/admin-signin.png" alt="sidesignin" />
      </div>
    </div>
  );
};

export default AdminSignin;
