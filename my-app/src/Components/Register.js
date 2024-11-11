import React, { useState } from 'react';
import './Styles/Register.css';

function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", form);
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register a new account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="register-button">Sign Up</button>
            </form>
            <p className="member-text">
                Are you a member? <a href="/login" className="login-link">Login now</a>
            </p>
            <p className="demo-text">
                Wanna see how Student, Instructor, or Admin look?<br />
                <a href="/demo" className="demo-link">Click here to access Demo Account</a>
            </p>
        </div>
    );
}

export default Register;
