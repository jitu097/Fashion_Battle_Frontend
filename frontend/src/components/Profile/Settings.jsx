import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaUserCog,
  FaLock,
  FaBell,
  FaCog,
  FaCommentDots,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import EditProfile from "./EditProfile"; // ✅ make sure path is correct
import "./Settings.css";

const Settings = ({ isOpen, profileData, onBack, onSaveProfile }) => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  if (!isOpen) return null;

  // when edit profile clicked
  const handleEditClick = () => {
    setShowEditProfile(true);
  };

  // when save in edit profile
  const handleSave = (updatedData) => {
    onSaveProfile(updatedData); // update profile data in Profile.jsx
    setShowEditProfile(false);
  };

  // when back from edit profile
  const handleBackFromEdit = () => {
    setShowEditProfile(false);
  };

  // ✅ If EditProfile is open, show it instead of settings list
  if (showEditProfile) {
    return (
      <EditProfile
        username={profileData.username}
        bio={profileData.bio}
        profilePic={profileData.profilePic}
        onBack={handleBackFromEdit}
        onSave={handleSave}
      />
    );
  }

  // Settings options
  const settingsOptions = [
    { icon: <FaUser />, label: "Edit Profile", action: handleEditClick },
    { icon: <FaUserCog />, label: "Account" },
    { icon: <FaLock />, label: "Privacy" },
    { icon: <FaBell />, label: "Notifications" },
    { icon: <FaCog />, label: "General" },
    { icon: <FaCommentDots />, label: "Support" },
    { icon: <FaInfoCircle />, label: "About" },
  ];

  return (
    <div className="settings-page fade-in">
      {/* Header */}
      <div className="settings-header">
        <FaArrowLeft className="settings-back" onClick={onBack} />
        <h2>Settings</h2>
        <div style={{ width: "24px" }}></div>
      </div>

      {/* Settings List */}
      <div className="settings-options">
        {settingsOptions.map((item, index) => (
          <div
            key={index}
            className="settings-item"
            onClick={item.action || null}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
