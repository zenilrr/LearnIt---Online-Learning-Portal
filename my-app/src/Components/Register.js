import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'; // Import MUI Close icon
import './Styles/Register.css';

function Register({ onClose, onLogin }) {
  const [role, setRole] = useState('Student'); // Default role
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          userEmail,
          password,
          role,
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message);
        setError('');
        console.log(response.ok)
        console.log("userEmail in frontend:");
        onLogin();

      } else {
        setError(data.message || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
      <button className="close-btn" onClick={onClose}>
          <CloseIcon style={{ fontSize: '24px', color: '#ffffff' }} /> {/* Close Icon */}
        </button>
        <h2 className="login-title">Create a new account</h2>

        {/* Role Selection Buttons */}
        <div className="role-buttons-container">
          <button 
            className={`role-button ${role === 'Student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('Student')}
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

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p className="member-text">
          Already a member? <span className="register-link" onClick={onLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
