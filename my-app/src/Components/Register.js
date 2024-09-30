// components/Register.js

import React from 'react';
import './Register.css'; 

function Register() {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password (at least 8 characters):</label>
          <input type="password" id="password" name="password" minLength="8" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" minLength="8" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;