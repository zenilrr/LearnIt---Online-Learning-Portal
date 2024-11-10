// components/Home.js

import React from 'react';
import './Home.css'; 
import { useNavigate } from "react-router-dom";


function Home() {

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>
      <div className="content">
        <h1>Welcome to the Home Page</h1>
      </div>
    </div>
  );
}

export default Home;