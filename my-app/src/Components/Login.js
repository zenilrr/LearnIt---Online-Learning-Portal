// Components/Login.js

import React from 'react';
import './Login.css'; 

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username or Email ID:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="loginId">Login ID:</label>
          <input type="password" id="loginId" name="loginId" required />
        </div>
        <div className="form-group">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div className="form-group">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>New user? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
}

export default Login;