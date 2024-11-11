import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import './Styles/Header.css';
import capLogo from '../Assets/Cap.png';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(''); // Track selected suggestion
  const location = useLocation();
  const navigate = useNavigate();

  // Sample list of search suggestions
  const suggestions = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Design',
    'Artificial Intelligence',
    'Cybersecurity',
    'Blockchain',
    'Cloud Computing',
    'JavaScript',
    'Python'
  ];

  // Toggle search visibility and handle redirection when search is triggered
  const toggleSearch = () => {
    if (selectedSuggestion) {
      // Navigate to the selected suggestion if available
      navigate(`/courses/${selectedSuggestion.toLowerCase().replace(/\s+/g, '-')}`);
      setSearchTerm(''); // Clear the search term
      setSelectedSuggestion(''); // Reset selected suggestion
    } else {
      // Clear the search term and hide suggestions if invalid
      setSearchTerm('');
      setFilteredSuggestions([]); // Hide the suggestion box
    }
    setShowSearch(!showSearch); // Toggle search visibility
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
      setActiveLink(sectionId);
    }
  };

  const handleSearchChange = (e) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);

    // Filter suggestions based on input (matches starting letters)
    if (userInput) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(userInput.toLowerCase()) // Filter by startsWith
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSelectedSuggestion(suggestion); // Save selected suggestion
    setFilteredSuggestions([]); // Hide suggestions after selection
  };

  // Function to highlight the search term in the suggestion
  const highlightSearchTerm = (course) => {
    const index = course.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index !== -1) {
      const beforeMatch = course.substring(0, index);
      const match = course.substring(index, index + searchTerm.length);
      const afterMatch = course.substring(index + searchTerm.length);
      return (
        <>
          {beforeMatch}
          <span className="highlight">{match}</span>
          {afterMatch}
        </>
      );
    }
    return course;
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'contact'];
      let currentSection = '';

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveLink('home');
    } else if (location.pathname.includes('/courses')) {
      setActiveLink('courses');
    } else if (location.pathname === '/contact') {
      setActiveLink('contact');
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-logo">
        <img src={capLogo} alt="Graduation Cap" className="logo-image" />
        LearnIt
      </div>
      <nav className="header-links-2">
        <Link to="/" className={activeLink === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>
          Home
        </Link>
        <span
          className={`header-button ${activeLink === 'about' ? 'active' : ''}`}
          onClick={() => scrollToSection('about')}
        >
          About
        </span>

        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/courses" className={activeLink === 'courses' ? 'active' : ''}>
            Courses <FaChevronDown className={`dropdown-icon ${showDropdown ? 'open' : ''}`} />
          </Link>
          {showDropdown && (
            <div className="dropdown-menu">
              {suggestions.map((suggestion, index) => (
                <Link key={index} to={`/courses/${suggestion.toLowerCase().replace(/\s+/g, '-')}`}>
                  {suggestion}
                </Link>
              ))}
            </div>
          )}
        </div>

        <span
          className={`header-button ${activeLink === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </span>
      </nav>

      <div className="searchBox">
        <input
          type="text"
          className={`searchInput ${showSearch ? 'active' : ''}`}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: showSearch ? '240px' : '0px', padding: showSearch ? '0 6px' : '0' }}
        />
        <button className="searchButton" onClick={toggleSearch}>
          <SearchIcon style={{ color: '#ffffff' }} />
        </button>
        {/* Display filtered suggestions */}
        {filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {highlightSearchTerm(suggestion)}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="login-button" onClick={() => navigate('/login')}>
        Register/Login
      </button>
    </header>
  );
}

export default Header;
