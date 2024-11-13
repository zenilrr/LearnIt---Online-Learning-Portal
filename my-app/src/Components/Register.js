import React, { useState } from 'react';
import './Styles/Register.css';

function Register({ onClose, onLogin }) {
  const [role, setRole] = useState('User'); // Default role
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="login-title">Create a new account</h2>

        {/* Role Selection Buttons */}
        <div className="role-buttons-container">
          <button 
            className={`role-button ${role === 'User' ? 'active' : ''}`} 
            onClick={() => handleRoleChange('User')}
          >
            Student
          </button>
          <button 
            className={`role-button ${role === 'Instructor' ? 'active' : ''}`} 
            onClick={() => handleRoleChange('Instructor')}
          >
            Instructor
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Register</button>
        </form>

        <p className="member-text">
          Already a member? <span className="register-link" onClick={onLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
