import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; 
import './Signin.css';


const StudentSignin = () => {
  const [studentId, setStudentId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/login/student", {
        studentId, 
        dateOfBirth
      });

      if (response.status === 200) {
        localStorage.setItem("studentId", response.data.studentId);
        localStorage.setItem("student", JSON.stringify(response.data.studentDetails));

        navigate("/StudentProfile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Student ID or Date of Birth");
    }
  };

  return (
    <div className='signinwrapper'>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <div className="input-group">
          <label htmlFor="dateOfBirth">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="dateOfBirth"
              placeholder="Enter your password"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              autoComplete='off'
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)} >
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
        <img src="../../../Images/student-signin.jpg" alt="" />
      </div>
    </div>
  );
};

export default StudentSignin;
