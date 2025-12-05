import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCog,
  FaHome,
  FaUser,
  FaShareAlt,
  FaCamera,
  FaShoppingCart,
  FaBox,
  FaHistory,
  FaHeart,
  FaHeadset,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import "./Profile.css";
import Settings from "./Settings";
import EditProfile from "./EditProfile";
import MyCart from "./MyCart";
import MyOrders from "./MyOrders";
import TransactionHistory from "./TransactionHistory";
import Wishlist from "./Wishlist";
import CustomerSupport from "./CustomerSupport";
import FollowerList from "./FollowerList";
import FollowedList from "./FollowingList";

const Profile = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("profile"); // 'profile', 'cart', 'orders', 'transactions', 'wishlist', 'support', 'followers', 'following'

  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
    bio: "",
    profilePic: "",
    profileComplete: false,
    posts: 126,
    followers: 1200,
    following: 370,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view profile");
        setLoading(false);
        return;
      }

      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      
      if (currentUser.id) {
        setProfileData({
          username: currentUser.username || "User",
          name: currentUser.name || "",
          email: currentUser.email || "",
          role: currentUser.role || "seller",
          bio: currentUser.bio || "Add a bio",
          profilePic: currentUser.profilePic || "https://i.pravatar.cc/150?img=5",
          profileComplete: currentUser.profileComplete || false,
          posts: currentUser.posts || 0,
          followers: currentUser.followers || 0,
          following: currentUser.following || 0,
        });
      } else {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  
  const goToDashboard = () => {
    if (profileData.role === "admin") {
      navigate("/Admindashboard");
    } else if (profileData.role === "seller") {
      navigate("/Sellerdashboard");
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to update profile picture");
        return;
      }

      // Convert image to base64 and store in localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        
        // Update current user in localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        currentUser.profilePic = base64Image;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          users[userIndex].profilePic = base64Image;
          localStorage.setItem("users", JSON.stringify(users));
        }
        
        // Update UI
        setProfileData((prev) => ({
          ...prev,
          profilePic: base64Image,
        }));
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Error uploading profile pic:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  const handleSaveProfile = async (newData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to update profile");
        return;
      }

      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update current user in localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      currentUser.username = newData.username;
      currentUser.name = newData.name;
      currentUser.email = newData.email;
      currentUser.bio = newData.bio;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
      }

      setProfileData((prev) => ({
        ...prev,
        username: newData.username,
        name: newData.name,
        email: newData.email,
        bio: newData.bio,
      }));
      setIsEditProfileOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleBackToProfile = () => {
    setIsSettingOpen(false);
    setIsEditProfileOpen(false);
    setActiveView("profile");
  };

  const handleShareProfile = async () => {
    const profileUrl = `${
      window.location.origin
    }/profile/${profileData.username.toLowerCase()}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${profileData.username}'s profile!`,
          text: "Follow this awesome style influencer!",
          url: profileUrl,
        });
      } catch (err) {
        console.log("Share canceled or failed:", err);
      }
    } else {
      navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "cart":
        return <MyCart onBack={handleBackToProfile} />;
      case "orders":
        return <MyOrders onBack={handleBackToProfile} />;
      case "transactions":
        return <TransactionHistory onBack={handleBackToProfile} />;
      case "wishlist":
        return <Wishlist onBack={handleBackToProfile} />;
      case "support":
        return <CustomerSupport onBack={handleBackToProfile} />;
      case "followers":
        return <FollowerList onBack={handleBackToProfile} />;
      case "following":
        return <FollowedList onBack={handleBackToProfile} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="profile-backdrop" onClick={onClose}></div>

      {loading && (
        <div className="profile-card fade-in">
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>Loading profile...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="profile-card fade-in">
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
            <p>{error}</p>
            <button
              onClick={fetchProfileData}
              style={{ marginTop: "10px", padding: "10px 20px" }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {isEditProfileOpen && !loading && (
        <EditProfile
          username={profileData.username}
          name={profileData.name}
          email={profileData.email}
          bio={profileData.bio}
          profilePic={profileData.profilePic}
          onBack={handleBackToProfile}
          onSave={handleSaveProfile}
        />
      )}

      {isSettingOpen && !isEditProfileOpen && !loading && (
        <Settings
          isOpen
          profileData={profileData}
          onBack={handleBackToProfile}
          onEditProfile={() => setIsEditProfileOpen(true)}
        />
      )}

      {activeView !== "profile" &&
        !isSettingOpen &&
        !isEditProfileOpen &&
        !loading &&
        !error &&
        renderActiveView()}

      {activeView === "profile" &&
        !loading &&
        !error &&
        !isSettingOpen &&
        !isEditProfileOpen && (
          <div className="profile-card fade-in">
            <div className="profile-header">
              <FaCog
                className="settings-icon"
                onClick={() => setIsSettingOpen(true)}
              />

              <div className="profile-avatar-container">
                <img
                  src={profileData.profilePic}
                  alt="Profile"
                  className="profile-avatar"
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/150?img=5";
                  }}
                />
                <FaCamera
                  className="camera-icon"
                  title="Change Profile Picture"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </div>

              <h2 className="profile-name">{profileData.username}</h2>
              {profileData.name && (
                <p className="profile-full-name">{profileData.name}</p>
              )}
              <p className="profile-subtitle">{profileData.bio}</p>

              <div className="profile-actions">
                <button
                  className="edit-btn"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  Edit Profile
                </button>
                <button className="share-btn" onClick={handleShareProfile}>
                  <FaShareAlt /> Share
                </button>
              </div>

              {copied && <p className="copied-msg">🔗 Profile link copied!</p>}
            </div>

            <div className="stats-row">
              <div
                onClick={() => setActiveView("profile")}
                style={{ cursor: "pointer" }}
              >
                <h4>{profileData.posts}</h4>
                <p>Posts</p>
              </div>
              <div
                onClick={() => setActiveView("followers")}
                style={{ cursor: "pointer" }}
              >
                <h4>
                  {profileData.followers >= 1000
                    ? `${(profileData.followers / 1000).toFixed(1)}k`
                    : profileData.followers}
                </h4>
                <p>Followers</p>
              </div>
              <div
                onClick={() => setActiveView("following")}
                style={{ cursor: "pointer" }}
              >
                <h4>{profileData.following}</h4>
                <p>Following</p>
              </div>
            </div>

            <div className="menu-list">
              {/* 🌟 DASHBOARD (Only for Admin or Seller) */}
              {(profileData.role === "admin" ||
                profileData.role === "seller") && (
                <div className="menu-item" onClick={goToDashboard}>
                  <FaHome />
                  <span>Dashboard</span>
                </div>
              )}
              <div className="menu-item" onClick={() => setActiveView("cart")}>
                <FaShoppingCart />
                <span>My Cart</span>
              </div>
              <div
                className="menu-item"
                onClick={() => setActiveView("orders")}
              >
                <FaBox />
                <span>My Orders</span>
              </div>
              <div
                className="menu-item"
                onClick={() => setActiveView("transactions")}
              >
                <FaHistory />
                <span>Transaction History</span>
              </div>
              <div
                className="menu-item"
                onClick={() => setActiveView("wishlist")}
              >
                <FaHeart />
                <span>Wishlist</span>
              </div>
              <div
                className="menu-item"
                onClick={() => setActiveView("support")}
              >
                <FaHeadset />
                <span>Customer Support</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
            Logout
            </button>

            <div className="bottom-nav">
              <FaHome />
              <FaUser />
            </div>
          </div>
        )}
    </>
  );
};

export default Profile;
