// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import './Signin.css';

// const TeacherSignin = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Sending POST request to the backend for teacher login
//       const response = await axios.post('http://localhost:3002/login/teacher', { mobileNumber, dateOfBirth });

//       if (response.status === 200) {
//         // Save the mobileNumber in localStorage after successful login
//         localStorage.setItem("mobileNumber", response.data.mobileNumber);  
//         localStorage.setItem("teacher", JSON.stringify(response.data.teacherDetails));

//         navigate('/ProfileTeacher');
//       }
//     } catch (err) {
//       setError('Invalid teacher ID or date of birth');
//     }
//   };

//   return (
//     <div className='signinwrapper'>
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>Login</h2>

//         {error && <p className="error-message">{error}</p>}

//         <div className="input-group">
//           <label htmlFor="mobileNumber">Mobile Number</label>
//           <input
//             type="text"
//             id="mobileNumber"
//             placeholder="Enter your mobile number"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="dateOfBirth">Date of Birth</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="dateOfBirth"
//               placeholder="Enter your date of birth"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               required
//             />
//             <span className="eye-icon" onClick={() => setShowPassword(!showPassword)} >
//               {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//             </span>
//           </div>
//         </div>

//         <div className="submit">
//           <button type="submit">Login</button>
//           <p className="register-link">
//             <Link to="/Select">Select User</Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TeacherSignin;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './Signin.css';

const TeacherSignin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post("http://localhost:3002/login/teacher", {
        mobileNumber,
        dateOfBirth
      });

      if (response.status === 200) {
        localStorage.setItem("mobileNumber", response.data.mobileNumber);
        localStorage.setItem("teacher", JSON.stringify(response.data.teacherDetails));

        navigate('/TeacherProfile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid mobile number or date of birth');
    }
  };

  return (
    <div className='signinwrapper'>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            autoComplete="off"
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
              autoComplete="off"
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
        <img src="../../../Images/teacher-signin.jpg" alt="" />
      </div>
    </div>
  );
};

export default TeacherSignin;
