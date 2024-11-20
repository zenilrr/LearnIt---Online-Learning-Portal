import React, { useState } from "react";
import "./Styles/StartLearning.css";
import { FaLinkedin } from "react-icons/fa";

function StartLearning() {
  const [activeTab, setActiveTab] = useState("description"); // Initialize activeTab state

  const showTab = (tabId) => setActiveTab(tabId);
  const toggleSections = (chapterId) => {
    const allSections = document.querySelectorAll(".start-learning-course-section-list");
    allSections.forEach((section) => {
      if (section.id !== chapterId) {
        section.style.display = "none";
      }
    });
    const sectionList = document.getElementById(chapterId);
    sectionList.style.display =
      sectionList.style.display === "none" ? "block" : "none";
  };

  return (
    <div className="start-learning-course-container">
      {/* Header */}
      <header className="start-learning-course-header">
        <h1>Introduction to LearnPress – LMS Plugin</h1>
      </header>

      {/* Main Content */}
      <div className="start-learning-course-main-content">
        {/* Sidebar */}
        <div className="start-learning-course-sidebar">
          <div className="start-learning-course-video">
            <iframe
              src="https://www.youtube.com/embed/Zt4fLu6pGt8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="start-learning-course-course-info">
            <p><strong>👍</strong> 100% positive reviews</p>
            <p><strong>🧑‍🎓</strong> 279 students</p>
            <p><strong>📖</strong> 15 lessons</p>
            <p><strong>🌐</strong> English</p>
            <p><strong>📝</strong> 1 quiz</p>
            <p><strong>✏️</strong> Yes</p>
            <p><strong>♾️</strong> Unlimited access</p>
          </div>
          <a href="google.com" className="start-learning-course-start-button">
            Start Learning
          </a>
        </div>

        {/* Content */}
        <div className="start-learning-course-content">
          {/* Tabs */}
          <div className="start-learning-course-tabs">
            <div
              className={`start-learning-course-tab ${
                activeTab === "description" ? "start-learning-course-tab-active" : ""
              }`}
              onClick={() => showTab("description")}
            >
              Description
            </div>
            <div
              className={`start-learning-course-tab ${
                activeTab === "curriculum" ? "start-learning-course-tab-active" : ""
              }`}
              onClick={() => showTab("curriculum")}
            >
              Curriculum
            </div>
            <div
              className={`start-learning-course-tab ${
                activeTab === "instructor" ? "start-learning-course-tab-active" : ""
              }`}
              onClick={() => showTab("instructor")}
            >
              Instructor
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="start-learning-course-tab-content">
              <p>This course will give you an overview of LAN and other networking basics. You’ll learn about IP addresses, serial data transfer, and computing types.</p>
              <div className="start-learning-course-feature-box">
                <h3>In This Free Course, You Will Learn How To</h3>
                <ul>
                  <li>Interactive video tutorials</li>
                  <li>Step-by-step setup guides</li>
                  <li>Real-world case studies</li>
                  <li>Hands-on assessments and quizzes</li>
                  <li>In-depth modules on LMS customization and user management</li>
                </ul>
              </div>
              <p>Idea 1: "Building an Online Learning Empire with LearnPress: A Step-by-Step Guide to Creating a Thriving eLearning Business"</p>
              <img src="https://eduma.thimpress.com/demo-learning-platform/wp-content/uploads/sites/101/2022/06/single-course-1.jpg" alt="LearnPress Course" width="850" height="200"></img>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="start-learning-course-tab-content">
              <div className="start-learning-course-chapter-box">
                <h3 onClick={() => toggleSections("chapter1")}>
                  📍 LearnPress Getting Started
                </h3>
                <div className="start-learning-course-section-list" id="chapter1">
                  <p>🧾 What is LearnPress?</p>
                  <p>📒 How to use LearnPress?</p>
                  <p>❓ Demo Quiz to LearnPress</p>
                </div>
              </div>

              <div className="start-learning-course-chapter-box">
                <h3 onClick={() => toggleSections("chapter2")}>
                  📍 LearnPress Live Course
                </h3>
                <div className="start-learning-course-section-list" id="chapter2">
                  <p>👨🏻‍💻 Demo Zoom Meeting Lesson</p>
                  <p>👨🏻‍💻 Demo Google Meeting Lesson</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="start-learning-course-tab-content">
              <div className="start-learning-course-instructor-profile">
                <img
                  src="https://media.istockphoto.com/id/1220701258/photo/sit-less-and-walk-more.jpg?s=612x612&w=0&k=20&c=uQvi4uvthrhPNFv3knxlJNTg5jtLptynTDZBxMzIPVs="
                  alt="Instructor"
                  className="start-learning-instructor-image"
                  height="100"
                  width="100"
                />
                <p><strong>Saurabh Tiwari</strong></p>
                <p>👉 Expert in Networking & Security</p>
                <p>👉 Students taught: 5,000+</p>
                <p>👉 Total courses offered: 10</p>
                <a
                  href="https://www.linkedin.com/in/saurabh-tiwari-a5450859/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="start-learning-linkedin-link"
                >
                  <FaLinkedin size={30} className="start-learning-linkedin-icon" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartLearning;
