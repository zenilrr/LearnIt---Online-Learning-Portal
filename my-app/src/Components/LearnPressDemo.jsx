import React, { useState } from 'react';
import './Styles/LearnPressDemo.css';
import { FaLinkedin } from 'react-icons/fa';
import { FaMedal } from 'react-icons/fa';

function LearnPressDemo() {
    const [learnpressActiveTab, setLearnpressActiveTab] = useState('description');
    const [learnpressOpenSections, setLearnpressOpenSections] = useState({});

    const students = [
        {
          id: 1,
          profilePic: 'https://via.placeholder.com/40',
          name: 'John Doe',
          totalScore: 95
        },
        {
          id: 2,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Jane Smith',
          totalScore: 89
        },
        {
          id: 3,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Alice Johnson',
          totalScore: 92
        },
        {
          id: 4,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Michael Brown',
          totalScore: 87
        },
        {
          id: 5,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Emma Davis',
          totalScore: 91
        },
        {
          id: 6,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Chris Lee',
          totalScore: 88
        },
        {
          id: 7,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Olivia Martinez',
          totalScore: 94
        },
        {
          id: 8,
          profilePic: 'https://via.placeholder.com/40',
          name: 'David Wilson',
          totalScore: 90
        },
        {
          id: 9,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Sophia Taylor',
          totalScore: 93
        },
        {
          id: 10,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Daniel Anderson',
          totalScore: 85
        },
        {
          id: 11,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Lucas Thomas',
          totalScore: 82
        },
        {
          id: 12,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Mia Jackson',
          totalScore: 80
        },
        {
          id: 13,
          profilePic: 'https://via.placeholder.com/40',
          name: 'William Harris',
          totalScore: 78
        },
        {
          id: 14,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Amelia White',
          totalScore: 97
        },
        {
          id: 15,
          profilePic: 'https://via.placeholder.com/40',
          name: 'Benjamin Martin',
          totalScore: 84
        }
      ];
      
      

    const showLearnpressTab = (tabId) => setLearnpressActiveTab(tabId);
    const toggleLearnpressSections = (chapterId) => {
        const allSections = document.querySelectorAll(".learnpress-section-list");
        allSections.forEach((section) => {
            if (section.id !== chapterId) {
                section.style.display = "none";
            }
        });
        const sectionList = document.getElementById(chapterId);
        sectionList.style.display = sectionList.style.display === "none" ? "block" : "none";
    };

    return (
        <div className="learnpress-container">
            {/* Header */}
            <header className="learnpress-header">
                <h1>Introduction to LearnPress – LMS Plugin</h1>
            </header>

            {/* Main Content */}
            <div className="learnpress-main-content">
                {/* Left Sidebar */}
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
                    <a href="#" className="learnpress-start-button">Start Now</a>
                </div>

                {/* Center Content */}
                <div className="learnpress-content">
                    {/* Tabs */}
                    <div className="learnpress-tabs">
                        <div className={`learnpress-tab ${learnpressActiveTab === 'description' ? 'learnpress-tab-active' : ''}`} onClick={() => showLearnpressTab('description')}>Description</div>
                        <div className={`learnpress-tab ${learnpressActiveTab === 'curriculum' ? 'learnpress-tab-active' : ''}`} onClick={() => showLearnpressTab('curriculum')}>Curriculum</div>
                        <div className={`learnpress-tab ${learnpressActiveTab === 'instructor' ? 'learnpress-tab-active' : ''}`} onClick={() => showLearnpressTab('instructor')}>Instructor</div>
                        <div className={`learnpress-tab ${learnpressActiveTab === 'leaderboard' ? 'learnpress-tab-active' : ''}`} onClick={() => showLearnpressTab('leaderboard')}>Leaderboard</div>
                    </div>

                    {/* Tab Content */}
                    {learnpressActiveTab === 'description' && (
                        <div className="learnpress-tab-content">
                            <p>This course will give you an overview of LAN and other networking basics. You’ll learn about IP addresses, serial data transfer, and computing types.</p>
                            <div className="learnpress-feature-box">
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
                            <p>Idea 2: "Unleash Your Teaching Superpowers: 10 Genius LearnPress Hacks to Take Your Online Courses to the Next Level"</p>
                            <img src="https://eduma.thimpress.com/demo-learning-platform/wp-content/uploads/sites/101/2022/06/single-course-1.jpg" alt="LearnPress Course" className="learnpress-image" />
                        </div>
                    )}

                    {learnpressActiveTab === 'curriculum' && (
                         <div id="learnpress-curriculum" className="learnpress-tab-content active">
                         <div className="learnpress-chapter-box">
                             <h3 onClick={() => toggleLearnpressSections("chapter1")}>📍 LearnPress Getting Started</h3>
                             <div className="learnpress-section-list" id="chapter1">
                                 <p>🧾 What is LearnPress?</p>
                                 <p>📒 How to use Learnpress?</p>
                                 <p>❓ Demo Quiz to Learnpress</p>
                             </div>
                         </div>
 
                         <div className="learnpress-chapter-box">
                             <h3 onClick={() => toggleLearnpressSections("chapter2")}>📍 Learnpress Live Course</h3>
                             <div className="learnpress-section-list" id="chapter2">
                                 <p>👨🏻‍💻 Demo Zoom Meeting Lesson</p>
                                 <p>👨🏻‍💻 Demo Google Meeting Lesson</p>
                             </div>
                         </div>
                     </div>
                    )}

                    {learnpressActiveTab === 'instructor' && (
                        <div className="learnpress-tab-content">
                            <div className="learnpress-instructor-profile">
                                <img src="https://media.istockphoto.com/id/1220701258/photo/sit-less-and-walk-more.jpg?s=612x612&w=0&k=20&c=uQvi4uvthrhPNFv3knxlJNTg5jtLptynTDZBxMzIPVs=" alt="Instructor" className="learnpress-instructor-image" />
                                <p><strong>Saurabh Tiwari</strong></p>
                                <p>👉 Expert in Networking & Security</p>
                                <p>👉 Students taught: 5,000+</p>
                                <p>👉 Total courses offered: 10</p>
                                <a href="https://www.linkedin.com/in/saurabh-tiwari-a5450859/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="learnpress-linkedin-link">
                                    <FaLinkedin size={30} className="learnpress-linkedin-icon" />
                                </a>
                            </div>
                        </div>
                    )}

{learnpressActiveTab === 'leaderboard' && (
  <div className="learnpress-tab-content">
    <div className="leaderboard-container">
      <div className="leaderboard-list">
        {students
          .sort((a, b) => b.totalScore - a.totalScore) // Sorting by totalScore in descending order
          .map((student, index) => (
            <div className="leaderboard-row" key={student.id}>
              <div className="rank">
                {index + 1 === 1 && <FaMedal className="medal gold" />}
                {index + 1 === 2 && <FaMedal className="medal silver" />}
                {index + 1 === 3 && <FaMedal className="medal bronze" />}
                {index + 1 > 3 && index + 1} {/* Show rank number only for positions 4 and below */}
              </div>
              <div className="profile">
                <img className="profile-pic" src={student.profilePic} alt={`${student.name}'s profile`} />
                <span className="name">{student.name}</span>
              </div>
              <div className="score">{student.totalScore}</div>
            </div>
          ))}
      </div>
    </div>
  </div>
)}



                </div>
            </div>

            {/* Rating Section */}
            <div className="learnpress-rating-section">
                🌟🌟🌟🌟🌟 5.0
            </div>
        </div>
    );
}

export default LearnPressDemo;
