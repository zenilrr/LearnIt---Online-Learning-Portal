import React, { useState } from "react";
import "./Styles/Edit_Profile.css";

const ProfileEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "********",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const togglePictureEditMode = () => {
    setIsEditingPicture(!isEditingPicture);
  };

  return (
    <div className="dashboard-page-unique">
      <aside className="sidebar-unique">
        <h2>Profile Info.</h2>
        <nav>
          <ul>
            <li
              className={!isEditingPicture ? "active-unique" : ""}
              onClick={() => setIsEditingPicture(false)}
            >
              Edit Profile
            </li>
            <li
              className={isEditingPicture ? "active-unique" : ""}
              onClick={() => setIsEditingPicture(true)}
            >
              Edit Profile Picture
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content-unique">
        <header className="header-unique">
          <h1>{isEditingPicture ? "Edit Profile Picture" : "Edit Profile"}</h1>
        </header>

        {!isEditingPicture ? (
          <>
            <table className="profile-table-unique">
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.firstName
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.lastName
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.email
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td>
                    {isEditing ? (
                      <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.password
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
              <button className="save-btn-unique" onClick={toggleEditMode}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </>
        ) : (
          <div className="profile-picture-editor-unique">
            <div className="image-preview-unique">
              {preview ? (
                <img src={preview} alt="Profile Preview" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <input
              className="file-input-unique"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <button
              className="save-btn-unique"
              onClick={() => alert("Picture Saved!")}
            >
              Save
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileEditor;
