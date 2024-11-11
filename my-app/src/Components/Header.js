import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search'; // Material UI search icon
import './Header.css';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-logo">LearnIt</div>
      <nav className="header-links">
        <Link to="/">Home</Link>
        <span className="header-button" onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>About</span>

        {/* Dropdown for Courses */}
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/courses" className="dropdown-link">
            Courses{' '}
            <FaChevronDown
              className={`dropdown-icon ${showDropdown ? 'open' : ''}`} // Add conditional class
            />
          </Link>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/courses/web-development">Web Development</Link>
              <Link to="/courses/data-science">Data Science</Link>
              <Link to="/courses/machine-learning">Machine Learning</Link>
              <Link to="/courses/design">Design</Link>
            </div>
          )}
        </div>

        <span className="header-button" onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer' }}>Contact</span>
      </nav>

      <div className="searchBox">
        <input
          type="text"
          className={`searchInput ${showSearch ? 'active' : ''}`}
          placeholder="Search..."
          style={{ width: showSearch ? '240px' : '0px', padding: showSearch ? '0 6px' : '0' }}
        />
        <button className="searchButton" onClick={toggleSearch}>
          <SearchIcon style={{ color: 'white' }} />
        </button>
      </div>

      <button className="login-button">Register/Login</button>
    </header>
  );
}

export default Header;
