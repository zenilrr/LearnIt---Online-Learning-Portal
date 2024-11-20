import React, { useState } from "react";
import "./Styles/BuyNow.css";
import { FaLinkedin } from "react-icons/fa";

function BuyNow() {
  const [activeTab, setActiveTab] = useState("description"); // Initialize activeTab state

  const showTab = (tabId) => setActiveTab(tabId);
  const toggleSections = (chapterId) => {
    const allSections = document.querySelectorAll(".learnpress-section-list");
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
    <div className="learnpress-container">
      {/* Header */}
      <header className="learnpress-header">
                <h1>Introduction to LearnPress – LMS Plugin</h1>
      </header>

      {/* Main Content */}
      <div className="learnpress-main-content">
        {/* Sidebar */}
        <div className="learnpress-sidebar">
          <div className="learnpress-video">
            <iframe
            src="https://www.youtube.com/embed/Zt4fLu6pGt8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="learnpress-course-info">
          <p><strong>👍</strong> 100% positive reviews</p>
                        <p><strong>🧑‍🎓</strong> 279 students</p>
                        <p><strong>📖</strong> 15 lessons</p>
                        <p><strong>🌐</strong> English</p>
                        <p><strong>📝</strong> 1 quiz</p>
                        <p><strong>✏️</strong> Yes</p>
                        <p><strong>♾️</strong> Unlimited access</p>
          </div>
          <a href="goggle.com" className="learnpress-start-button">
            Buy Now
          </a>
        </div>

        {/* Content */}
        <div className="learnpress-content">
          {/* Tabs */}
          <div className="learnpress-tabs">
            
            <div
              className={`learnpress-tab ${
                activeTab === "description" ? "learnpress-tab-active" : ""
              }`}
              onClick={() => showTab("description")}
            >
              Description
            </div>
            <div
              className={`learnpress-tab ${
                activeTab === "instructor" ? "learnpress-tab-active" : ""
              }`}
              onClick={() => showTab("instructor")}
            >
              Instructor
            </div>
            
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="learnpress-tab-content">
                <p>This course will give you an overview of LAN and other networking basics. You’ll learn about IP addresses, serial data transfer, and computing types.</p>
              <div className="learnpress-feature-box">
                <h3>In This Free Course, You Will Learn How To</h3>
                <ul>
                  <li>Interactive video tutorials</li>
                  <li>Step-by-step setup guides</li>
                  <li>Real-world case studies</li>
                  <li>Hands-on assessments and quizzes</li>
                  <li>
                    In-depth modules on LMS customization and user management
                  </li>
                </ul>
              </div>
              <p>Idea 1: "Building an Online Learning Empire with LearnPress: A Step-by-Step Guide to Creating a Thriving eLearning Business"</p>
              <img src="https://eduma.thimpress.com/demo-learning-platform/wp-content/uploads/sites/101/2022/06/single-course-1.jpg" alt="LearnPress Course" width="850" height="200"></img>

            
            </div>
          )}

          

          {activeTab === "instructor" && (
            <div className="learnpress-tab-content">
              <div className="learnpress-instructor-profile">
                 <img src="https://media.istockphoto.com/id/1220701258/photo/sit-less-and-walk-more.jpg?s=612x612&w=0&k=20&c=uQvi4uvthrhPNFv3knxlJNTg5jtLptynTDZBxMzIPVs=" alt="Instructor" className="instructor-image" height="100" width="100" />
                                <p><strong>Saurabh Tiwari</strong></p>
                                <p>👉 Expert in Networking & Security</p>
                                <p>👉 Students taught: 5,000+</p>
                                <p>👉 Total courses offered: 10</p>
                                <a href="https://www.linkedin.com/in/saurabh-tiwari-a5450859/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                    <FaLinkedin size={30} className="linkedin-icon" />
                                </a>
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="learnpress-tab-content">
              {/* Leaderboard content */}
            </div>
          )}
        </div>
      </div>

      {/* Rating Section */}
      <div className="learnpress-rating-section">
        🌟🌟🌟🌟🌟 
      </div>
    </div>
  );
}

export default BuyNow;
