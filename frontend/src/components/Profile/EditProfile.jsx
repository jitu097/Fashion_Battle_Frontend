import React, { useState, useRef } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import "./EditProfile.css";

const EditProfile = ({ username, bio, profilePic, onSave, onBack }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const [newProfilePic, setNewProfilePic] = useState(profilePic);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      username: newUsername,
      bio: newBio,
      profilePic: newProfilePic,
    });
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-container fade-in">
        {/* Header */}
        <div className="edit-header">
          <FaArrowLeft className="back-icon" onClick={onBack} />
          <h3>Edit Profile</h3>
        </div>

        {/* Profile Picture */}
        <div className="edit-avatar-container">
          <img src={newProfilePic} alt="Profile" className="edit-profile-pic" />
          <FaCamera
            className="edit-camera-icon"
            title="Change profile picture"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* Editable Form */}
        <div className="edit-form">
          <label>Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <label>Bio</label>
          <textarea
            rows="3"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
