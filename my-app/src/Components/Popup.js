import React, { useEffect, useState } from 'react';
import './Styles/Popup.css';

const Popup = ({ completionCourses }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been seen in this session
    const popupSeen = sessionStorage.getItem('popupSeen');

    // Check if any course is over 90% complete
    const hasCourseAbove90 = 1;

    if (hasCourseAbove90 && !popupSeen) {
      setShowPopup(true);
    }
  }, [completionCourses]);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('popupSeen', true); // Mark popup as seen for the session
  };

  if (!showPopup) return null; // Don't render the popup if not needed

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">
          You have courses that are over 90% complete! Keep going to reach 100%!
        </p>
        <button className="popup-close-button" onClick={handleClosePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
