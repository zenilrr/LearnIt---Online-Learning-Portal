import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import "./Styles/EditProfile.css";
import img from "../Assets/profile-img.jpeg";

const EditProfile = () => {
  const [username, setUsername] = useState("Kaushik");
  const [description, setDescription] = useState("Enthusiastic learner and tech enthusiast. Passionate about coding and exploring new technologies.");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [email, setEmail] = useState("abc@gmail.com");
  const [profileImage, setProfileImage] = useState(img);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Email validation
    if (!validateEmail(email)) {
      setError("Invalid email format. Email should contain '@' with characters before and after.");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setError("Password must contain a capital letter, a small letter, a number, a special character, and be 8-12 characters long.");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert("Profile updated successfully!");

    // Navigate to the profile page after successful save
    navigate("/profile");
  };

  return (
    <div className="container">
      <div className="profile-page">
        <header className="profile-header">
          <h2>Edit Profile</h2>
        </header>
        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-image">
              <div className="avatar">
                <img src={profileImage} alt="Profile Avatar" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="img-upload-button"
              />
            </div>
          </div>
          <div className="profile-details">
            <form className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="password-container">
                  <input
                    type={passwordVisible ? "text" : "password"} // Toggle password visibility
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className="password-eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  >
                    {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <div className="password-container">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"} // Toggle confirm password visibility
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <span
                    className="password-eye-icon"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle visibility
                  >
                    {confirmPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  rows="4"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>

              {error && <p className="error-text-2">{error}</p>}

              <button type="button" className="save-button" onClick={handleSave}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
