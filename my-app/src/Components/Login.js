import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Styles/Login.css';

function Login({ onClose, onRegister }) {
  const navigate = useNavigate(); 
  const [role, setRole] = useState('User'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data)

      if (response.ok) {
       
        setError('');
        console.log('Logged in successfully');
        
        localStorage.setItem('accessToken', data.data.accessToken);
        onClose();
        navigate('/course');
      } else {
        
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="login-title">Login to your account</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="login-button">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}
        
        <p className="member-text">
          Not a member yet? <span className="register-link" onClick={onRegister}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;