import React from 'react';
import './Styles/Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-item">
        <FaMapMarkerAlt className="contact-icon" />
        <h3>Address</h3>
        <p>1800 Abbot Kinney Blvd, Unit D & E Venice</p>
        <br />
        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="contact-link">
          View Map
        </a>
      </div>
      
      <div className="contact-item">
        <FaPhoneAlt className="contact-icon" />
        <h3>Contact Info</h3>
        <p>Mobile: (+88) - 1990 - 6886</p>
        <p>Hotline: 1800 - 1102</p>
        <p>Email: contact@learnit.com</p>
      </div>
      
      <div className="contact-item">
        <FaClock className="contact-icon" />
        <h3>Work Hours</h3>
        <p>Monday - Friday: 09:00 - 20:00</p>
        <p>Saturday & Sunday: 10:30 - 22:00</p>
      </div>
    </section>
  );
};

export default Contact;
