import React, { useState, useEffect } from 'react';
import './Styles/LearnPressDemo.css';
import { FaLinkedin } from 'react-icons/fa';

function LearnPressDemo() {
    
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // Initialize activeTab state
  const [openSections, setOpenSections] = useState({}); // State to track open sections

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/coursedetails');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data[1]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

    const showTab = (tabId) => setActiveTab(tabId);
    const toggleSections = (chapterId) => {
        const allSections = document.querySelectorAll(".section-list");
        allSections.forEach((section) => {
            if (section.id !== chapterId) {
                section.style.display = "none";
            }
        });
        const sectionList = document.getElementById(chapterId);
        sectionList.style.display = sectionList.style.display === "none" ? "block" : "none";
    };
    
    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <h1>{courses.title}</h1>
            </header>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Sidebar */}
                <div className="left-sidebar">
                    <div className="video-container">
                        <iframe
                            src={courses.ytsrc}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="course-info">
                        <p><strong>👍</strong> {courses.Reviews}</p>
                        <p><strong>🧑‍🎓</strong> {courses.StudentsEnrolled}</p>
                        <p><strong>📖</strong> {courses.Chapters}</p>
                        <p><strong>🌐</strong> {courses.primaryLanguage}</p>
                        <p><strong>📝</strong> {courses.Quizzes}</p>
                        
                        <p><strong>♾️</strong> {courses.Access}s</p>
                    </div>
                    <a href="#" className="start-button">Start Now</a>
                </div>

                {/* Center Content */}
                <div className="content">
                    {/* Tabs */}
                    <div className="tabs">
                        <div className={`tab ${activeTab === 'description' ? 'active' : ''}`} onClick={() => showTab('description')}>Description</div>
                        <div className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => showTab('curriculum')}>Curriculum</div>
                        <div className={`tab ${activeTab === 'instructor' ? 'active' : ''}`} onClick={() => showTab('instructor')}>Instructor</div>
                        <div className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => showTab('leaderboard')}>Leaderboard</div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'description' && (
                        <div className="tab-content">
                            <p>{courses.description}</p>
                            <div className="feature-box">
                                <h3>In This Free Course, You Will Learn How To</h3>
                                <ul>
                                    <li>Interactive video tutorials</li>
                                    <li>Step-by-step setup guides</li>
                                    <li>Real-world case studies</li>
                                    <li>Hands-on assessments and quizzes</li>
                                    <li>In-depth modules on LMS customization and user management</li>
                                </ul>
                            </div>
                            <p>Idea 1: "Building an Online Learning Empire with LearnPress: A Step-by-Step Guide to Creating a Thriving eLearning Business"
                            This in-depth article would provide a comprehensive tutorial on how to leverage the LearnPress plugin to build a successful online learning platform. It would cover everything from setting up courses and lessons to monetization strategies and student engagement tactics.</p>
                            <p>Idea 2: "Unleash Your Teaching Superpowers: 10 Genius LearnPress Hacks to Take Your Online Courses to the Next Level"
                            This listicle would showcase 10 innovative ways to maximize the features and functionality of the LearnPress plugin, empowering online educators to create more engaging, effective, and profitable courses.</p>
                            <img src="https://eduma.thimpress.com/demo-learning-platform/wp-content/uploads/sites/101/2022/06/single-course-1.jpg" alt="LearnPress Course" />
                        </div>
                    )}

                    {activeTab === 'curriculum' && (
                         <div id="curriculum" className="tab-content active">
                         <div className="chapter-box">
                             <h3 onClick={() => toggleSections("chapter1")}>📍 LearnPress Getting Started</h3>
                             <div className="section-list" id="chapter1">
                                 <p>🧾 What is LearnPress?</p>
                                 <p>📒 How to use Learnpress?</p>
                                 <p>❓ Demo Quiz to Learnpress</p>
                             </div>
                         </div>
 
                         <div className="chapter-box">
                             <h3 onClick={() => toggleSections("chapter2")}>📍 Learnpress Live Course</h3>
                             <div className="section-list" id="chapter2">
                                 <p>👨🏻‍💻 Demo Zoom Meeting Lesson</p>
                                 <p>👨🏻‍💻 Demo Google Meeting Lesson</p>
                             </div>
                         </div>
                     </div>
                    )}

                    {activeTab === 'instructor' && (
                        <div className="tab-content">
                            <div className="instructor-profile">
                                <img src="https://media.istockphoto.com/id/1220701258/photo/sit-less-and-walk-more.jpg?s=612x612&w=0&k=20&c=uQvi4uvthrhPNFv3knxlJNTg5jtLptynTDZBxMzIPVs=" alt="Instructor" className="instructor-image" />
                                <p><strong>{courses.instructorName}</strong></p>
                                <p>👉 Expert in {courses.Expertise}</p>
                                <p>👉 Students taught: {courses.StudentsTaught}+</p>
                                <p>👉 Total courses offered: {courses.TotalCourseOffered}</p>
                                <a href="https://www.linkedin.com/in/saurabh-tiwari-a5450859/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                    <FaLinkedin size={30} className="linkedin-icon" />
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="tab-content">
                            {/* Leaderboard content */}
                        </div>
                    )}
                </div>
            </div>

            {/* Rating Section */}
            <div className="rating-section">
                🌟🌟🌟🌟🌟 {courses.Rating}
            </div>
        </div>
    );
}

export default LearnPressDemo;