import React, { useState, useEffect, useRef } from 'react';
import './Styles/Search_page.css';
import { FaChevronDown } from 'react-icons/fa';

function Search() {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [selectedOthers, setSelectedOthers] = useState(false); 
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("A-Z");
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]); 
  const [toastMessages, setToastMessages] = useState([]);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const categories = [
    "Photography", 
    "IT", 
    "Developer", 
    "Marketing", 
    "Health", 
    "Teaching Online", 
    "Technology", 
    "Business", 
    "Design", 
    "Others"
  ];

  const courses = [
    { title: "Photography Mastery", price: 50, dateAdded: "2024-01-01", popularity: 5, category: "Photography" },
    { title: "Advanced IT Skills", price: 20, dateAdded: "2024-02-01", popularity: 8, category: "IT" },
    { title: "Web Development Bootcamp", price: 100, dateAdded: "2024-03-01", popularity: 10, category: "Developer" },
    { title: "Marketing for Professionals", price: 75, dateAdded: "2024-01-15", popularity: 12, category: "Marketing" },
    { title: "Health & Wellness 101", price: 30, dateAdded: "2024-04-01", popularity: 7, category: "Health" },
    { title: "Teach Online Like a Pro", price: 120, dateAdded: "2024-02-15", popularity: 3, category: "Teaching Online" },
    { title: "Tech Innovations 2024", price: 200, dateAdded: "2024-03-15", popularity: 15, category: "Technology" },
    { title: "Business Fundamentals", price: 90, dateAdded: "2024-01-10", popularity: 18, category: "Business" },
    { title: "Creative Design Techniques", price: 45, dateAdded: "2024-05-01", popularity: 9, category: "Design" },
    { title: "Intro to Photography", price: 0, dateAdded: "2024-06-01", popularity: 2, category: "Photography" },
    { title: "Free IT Resources", price: 0, dateAdded: "2024-06-10", popularity: 4, category: "IT" },
    { title: "Learn Web Development (Free)", price: 0, dateAdded: "2024-06-15", popularity: 6, category: "Developer" },
    { title: "Free Marketing Strategies", price: 0, dateAdded: "2024-06-20", popularity: 1, category: "Marketing" },
    { title: "Health Basics for All", price: 0, dateAdded: "2024-06-25", popularity: 3, category: "Health" },
  ];

  const toggleFilterDropdown = () => {
    setShowFilterDropdown((prev) => !prev);
  };

  const handleCategoryChange = (category) => {
    if (category === "Others") {
      setSelectedOthers(!selectedOthers);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
      );
    }
  };

  const handlePriceChange = (price) => {
    setPriceFilter(price === priceFilter ? null : price);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceFilter(null);
    setSelectedOthers(false);
  };

  const handleSortChange = (sortAlgorithm) => {
    setSelectedSort(sortAlgorithm);
    setShowSortDropdown(false);
  };

  const handleApplyFilters = () => {
    setShowFilterDropdown(false);
  };

  const sortCourses = (courses, sortAlgorithm) => {
    switch (sortAlgorithm) {
      case "A-Z":
        return [...courses].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...courses].sort((a, b) => b.title.localeCompare(a.title));
      case "price-low-high":
        return [...courses].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...courses].sort((a, b) => b.price - a.price);
      case "newly-added":
        return [...courses].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case "popular":
        return [...courses].sort((a, b) => b.popularity - a.popularity);
      default:
        return courses;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      if (showSortDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  const handleBookmark = (courseTitle) => {
    setBookmarkedCourses((prev) => {
      const isBookmarked = prev.includes(courseTitle);
      const newMessage = isBookmarked ? "Course is UnBookmarked!!" : "Course is Bookmarked!!";

      const newToastMessage = { message: newMessage, id: new Date().getTime() };

      setToastMessages((prevMessages) => [
        ...prevMessages,
        newToastMessage, 
      ]);

      setTimeout(() => {
        setToastMessages((prevMessages) => prevMessages.slice(1)); 
      }, 2000);

      if (isBookmarked) {
        return prev.filter(course => course !== courseTitle);
      } else {
        return [...prev, courseTitle]; 
      }
    });
  };

  const filteredCourses = courses.filter((course) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const priceMatch = priceFilter ? (priceFilter === "Free" ? course.price === 0 : course.price > 0) : true;
    return categoryMatch && priceMatch;
  });

  const sortedCourses = sortCourses(filteredCourses, selectedSort);

  return (
    <div className="search-container">
      {/* Toast Messages */}
      <div className="toast-container">
        {toastMessages.map((toast) => (
          <div key={toast.id} className="toast-message">
            {toast.message}
          </div>
        ))}
      </div>

      <div className="controls">
        <div className="filter-container">
          <button ref={buttonRef} className="filter-btn" onClick={toggleFilterDropdown}>
            Filter <FaChevronDown className={`dropdown-icon ${showFilterDropdown ? 'open' : ''}`} />
          </button>
          {showFilterDropdown && (
            <div className="filter-dropdown" ref={dropdownRef}>
              <h3 className="filter-heading">Categories</h3>
              {categories.map((category, index) => (
                <label key={index} className="filter-option">
                  <input
                    type="checkbox"
                    checked={category === "Others" ? selectedOthers : selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
              <h3 className="filter-heading">Price</h3>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={priceFilter === 'Free'}
                  onChange={() => handlePriceChange('Free')}
                />
                Free
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={priceFilter === 'Paid'}
                  onChange={() => handlePriceChange('Paid')}
                />
                Paid
              </label>
              <div className="filter-btns">
                <button className="reset-btn" onClick={resetFilters}>Reset</button>
                <button className="apply-btn" onClick={handleApplyFilters}>Apply</button>
              </div>
            </div>
          )}
        </div>

        <div className="sort-container">
          <div className="sort-btn" onClick={() => setShowSortDropdown(!showSortDropdown)}>
            {selectedSort} <FaChevronDown className={`dropdown-icon ${showSortDropdown ? 'open' : ''}`} />
          </div>
          {showSortDropdown && (
            <div className="sort-dropdown" ref={dropdownRef}>
              <ul>
                <li onClick={() => handleSortChange("A-Z")}>A-Z</li>
                <li onClick={() => handleSortChange("Z-A")}>Z-A</li>
                <li onClick={() => handleSortChange("price-low-high")}>Price Low-High</li>
                <li onClick={() => handleSortChange("price-high-low")}>Price High-Low</li>
                <li onClick={() => handleSortChange("newly-added")}>Newly Added</li>
                <li onClick={() => handleSortChange("popular")}>Popular</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="courses-container">
        {sortedCourses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-tag">{course.price === 0 ? 'Free' : 'Paid'}</div>
            <img src="https://picsum.photos/150" alt="Course" className="course-image" />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-meta">Price: ${course.price}</p>
            <p className="course-description">This is a description of the course.</p>
            <button
              className="course-plus-btn"
              onClick={() => handleBookmark(course.title)}
            >
              {bookmarkedCourses.includes(course.title) ? '✔' : '+'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
