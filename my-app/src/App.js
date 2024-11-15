// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import HeroSection from './Components/HeroSection';
import FeaturesSection from './Components/FeaturesSection';
import CoursesCatalog from './Components/CoursesCatalog';
import About from './Components/About';
import Contact from './Components/Contact';
import './App.css';
import CreateCourse from './Components/CreateCourse';
import FeedbackPage from './Components/FeedbackPage';

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
        {/* <Profile /> */}
        <CreateCourse />
        {/* <FeedbackPage /> */}
      </main>
      <Footer />
      
      {/* <Header />
      <HeroSection />
      <FeaturesSection />
      <CoursesCatalog />
      <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      <Footer /> */}

    </div>
    </>
    
  );
}

export default App;
