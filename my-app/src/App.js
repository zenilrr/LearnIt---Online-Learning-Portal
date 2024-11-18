// App.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import CoursesCatalog from "./Components/CoursesCatalog";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Popup from "./Components/Popup";
import "./App.css";
import CreateCourse from "./Components/CreateCourse";
import FeedbackPage from "./Components/FeedbackPage";
import InstructorDashboard from "./Components/InstructorDashboard";
import LearnPressDemo from "./Components/LearnPressDemo";
import CoursePage from "./Components/CoursePage";
import Edit_Profile from "./Components/Edit_Profile";

function App() {
  return (
    // // <Router>
    // //   <div>
    // //     <Routes>
    // //       <Route path="/" element={<Home />} />
    // //       <Route path="/login" element={<Login />} />
    // //       <Route path="/register" element={<Register />} />
    // <Route path="/coursedetails" element={<LearnPressDemo />} />
    // //     </Routes>
    // //   </div>
    // // </Router>
    // <Routes>
    //         <Route path="/viewcoursedetails" element={<LearnPressDemo />} />
    // </Routes>
    <>
      <div className="app">
        {/*
    //   <main className="main-content">
    //     {/* <Profile /> 
    //     {/* <FeedbackPage /> 
    //     </main>
    //   <Footer />*/}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HeroSection></HeroSection>
                <FeaturesSection />
                <CoursesCatalog />
                <section id="about">
                  <About />
                </section>
                <section id="contact">
                  <Contact />
                </section>
                <CreateCourse />
                <Footer />{" "}
              </>
            }
          />

          {/* <LearnPressDemo/>  */}
          <Route path="/learnCourse" element={<CoursePage />} />
        </Routes>

        {/* <Edit_Profile /> */}
        {/* <Popup /> */}
      </div>
    </>
  );
}

export default App;