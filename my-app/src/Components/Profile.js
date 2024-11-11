import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faHourglassHalf,
  faClipboardCheck,
  faCheckCircle,
  faTimesCircle,
  faSignOutAlt,
  faShoppingCart,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import './Styles/Profile.css'
import img from "../Assets/profile-img.jpeg";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeSidebar, setActiveSidebar] = useState("My Courses");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <nav>
          <p>Home &gt; Profile</p>
        </nav>
      </header>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-image">
            <div className="avatar">
              <img src={img} alt="Profile Avatar" />
            </div>
            <h2>Kaushik</h2>
          </div>
          <ul className="sidebar-menu">
            <li
              className={activeSidebar === "My Courses" ? "active" : ""}
              onClick={() => handleSidebarClick("My Courses")}
            >
              <FontAwesomeIcon icon={faList} /> My Courses
            </li>
            <li
              className={activeSidebar === "Quizzes" ? "active" : ""}
              onClick={() => handleSidebarClick("Quizzes")}
            >
              <FontAwesomeIcon icon={faBookOpen} /> Quizzes
            </li>
            <li
              className={activeSidebar === "Orders" ? "active" : ""}
              onClick={() => handleSidebarClick("Orders")}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Orders
            </li>
            <li
              className={activeSidebar === "Logout" ? "active" : ""}
              onClick={() => handleSidebarClick("Logout")}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </li>
          </ul>
        </div>
        <div className="profile-details">
          {activeSidebar === "My Courses" && (
            <>
              <div className="course-summary">
                <div className="course-card">
                  <FontAwesomeIcon icon={faBookOpen} size="2x" />
                  <h3>Enrolled Course</h3>
                  <p>0</p>
                </div>
                <div className="course-card">
                  <FontAwesomeIcon icon={faHourglassHalf} size="2x" />
                  <h3>Inprogress Course</h3>
                  <p>0</p>
                </div>
                <div className="course-card">
                  <FontAwesomeIcon icon={faClipboardCheck} size="2x" />
                  <h3>Finished Course</h3>
                  <p>0</p>
                </div>
                <div className="course-card">
                  <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                  <h3>Passed Course</h3>
                  <p>0</p>
                </div>
                <div className="course-card">
                  <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                  <h3>Failed Course</h3>
                  <p>0</p>
                </div>
              </div>
              <div className="course-tabs">
                {["All", "In Progress", "Finished", "Passed", "Failed"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={activeTab === tab ? "active-tab" : ""}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
              <div className="course-list">
                {activeTab === "All" || activeTab === "Failed" ? (
                  <p className="no-course">No Course available!</p>
                ) : (
                  <p>Showing {activeTab} Courses...</p>
                )}
              </div>
            </>
          )}
          {activeSidebar === "Quizzes" && (
            <div className="quizzes-section">
              <h3>Your Quizzes</h3>
              <p>No quizzes available!</p>
            </div>
          )}
          {activeSidebar === "Orders" && (
            <div className="orders-section">
              <h3>Your Orders</h3>
              <p>No orders found!</p>
            </div>
          )}
          {activeSidebar === "Logout" && (
            <div className="logout-section">
              <h3>Logout</h3>
              <p>You have been logged out.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
