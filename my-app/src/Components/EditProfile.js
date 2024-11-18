import React, { useState } from "react";
import "./Styles/EditProfile.css";
import img from "../Assets/profile-img.jpeg";

const EditProfile = () => {
  const [username, setUsername] = useState("Kaushik");
  const [description, setDescription] = useState("Enthusiastic learner and tech enthusiast. Passionate about coding and exploring new technologies.");
  const [password, setPassword] = useState("12345678");
  const [email, setEmail] = useState("abc@gmail.com");
  const [profileImage, setProfileImage] = useState(img);

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
    alert("Profile updated successfully!");
    // Add logic to save changes (e.g., API call)
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
                  value={username}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={username}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description:</label>
                <textarea
                  id="description"
                  rows="4"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
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
