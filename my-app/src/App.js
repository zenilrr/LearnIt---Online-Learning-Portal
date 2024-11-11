// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
function App() {
  return (
    // <Router>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //     </Routes>
    //   </div>
    // </Router>
    <>
    <div className="app">
      <Header />
      <main className="main-content">
        <Profile />
      </main>
      <Footer />
    </div>
    </>
    
  );
}

export default App;
