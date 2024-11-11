// components/Login.js

import React, { useState } from 'react';
import './Login.css';

function Login({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="login-title">Login to your account</h2>
        <form className="login-form">
          <input type="text" placeholder="Username or Email" required />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/lost-password" className="lost-password">
              Lost your password?
            </a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="member-text">
          Not a member yet? <span className="register-link" onClick={onClose}>Register</span>
        </p>
        <p className="demo-text">
                Wanna see how Student, Instructor, or Admin look?<br />
                <a href="/demo" className="demo-link">Click here to access Demo Account</a>
            </p>
      </div>
    </div>
  );
}

export default Login;
