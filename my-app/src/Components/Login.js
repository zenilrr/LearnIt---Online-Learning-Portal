import React, { useState } from 'react';
import './Styles/Login.css';

function Login({ onClose, onRegister }) {
  const [role, setRole] = useState('User');  // Default role

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="login-title">Login to your account</h2>

        <form className="login-form">
          <input type="text" placeholder="Username or Email" required />
          <div className="password-container">
            <input
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="member-text">
          Not a member yet? <span className="register-link" onClick={onRegister}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
