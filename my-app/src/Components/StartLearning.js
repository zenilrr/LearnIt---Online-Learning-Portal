import React, { useState, useEffect } from "react";
import "./Styles/StartLearning.css";
import { FaLinkedin } from "react-icons/fa";
import { useParams } from "react-router-dom";

function StartLearning() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); // Initialize activeTab state
  const [openSections, setOpenSections] = useState({}); // State to track open sections

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/coursedetails/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchCourses();
    }
  }, [id]);

  const showTab = (tabId) => setActiveTab(tabId);
  const toggleSections = (chapterId) => {
    const allSections = document.querySelectorAll(".course-section-list");
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
    <div className="course-container">
      {/* Header */}
      <header className="course-header">
        <h1>{courses.title}</h1>
      </header>

      {/* Main Content */}
      <div className="course-main-content">
        {/* Sidebar */}
        <div className="course-sidebar">
          <div className="course-video">
            <iframe
              src={courses.demoVideourl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="course-course-info">
          <p>
              <strong>📅</strong>Published On : {courses.date}
            </p>
            <p><strong>🧑‍🎓</strong> Enrolled Students : {courses.students?.length||0}</p>
            <p><strong>📖</strong> Modules : {courses.curriculum?.length||0}</p>
            <p><strong>🌐</strong> Language : {courses.primaryLanguage}</p>
            <p>
              <strong>📝</strong>Category : {courses.category}
            </p>
            <p>
              <strong>✏️</strong>Level : {courses.level}
            </p>

            <p>
              <strong>💰</strong>Price : ₹{courses.pricing}
            </p>
          </div>
          <a href="/startlearning" className="course-start-button">
            Start Learning
          </a>
        </div>

        {/* Content */}
        <div className="course-content">
          {/* Tabs */}
          <div className="course-tabs">
            <div
              className={`course-tab ${
                activeTab === "description" ? "course-tab-active" : ""
              }`}
              onClick={() => showTab("description")}
            >
              Description
            </div>
            <div
              className={`course-tab ${
                activeTab === "curriculum" ? "course-tab-active" : ""
              }`}
              onClick={() => showTab("curriculum")}
            >
              Curriculum
            </div>
            <div
              className={`course-tab ${
                activeTab === "instructor" ? "course-tab-active" : ""
              }`}
              onClick={() => showTab("instructor")}
            >
              Instructor
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="course-tab-content">
              <p>{courses.description}</p>
              <div className="course-feature-box">
                <h3>In This Free Course, You Will Learn How To</h3>
                <ul>
                  
                  <li>{courses.objectives}</li>
                </ul>
              </div>
              
            
            </div>
          )}

          {activeTab === "curriculum" && (
  <div className="course-tab-content">
    {courses.curriculum && courses.curriculum.length > 0 ? (
      courses.curriculum.map((module, index) => (
        <div className="course-chapter-box" key={index}>
          <h3 onClick={() => toggleSections(`chapter${index + 1}`)}>
            📍 {module.moduleName}
          </h3>
          <div className="course-section-list" id={`chapter${index + 1}`}>
            {module.moduleContentUrl && module.moduleSections && module.moduleSections.map((section, idx) => (
              <p key={idx}><a href={module.moduleContentUrl}>🧾 {section}</a></p>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No curriculum available.</p>
    )}
  </div>
)}


          {activeTab === "instructor" && (
            <div className="course-tab-content">
              <div className="course-instructor-profile">
                <img
                  src={courses.image}
                  alt="Instructor"
                  className="instructor-image"
                  height="100"
                  width="100"
                />
                <p>
                  <strong>{courses.instructorName}</strong>
                </p>
                <p>👉 Expert in {courses.expertise}</p>
                <p>👉 Students taught: {courses.taughtStudents}+</p>
                <p>👉 Total courses offered: {courses.offeredCourses}</p>
                <p>👉 Rating: {courses.rating}</p>

                <a
                  href={courses.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  <FaLinkedin size={30} className="linkedin-icon" />
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