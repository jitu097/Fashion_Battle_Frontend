import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import "./ListPage.css";

const FollowingList = ({ onBack }) => {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState([
    {
      username: "emma.codes",
      profilePic: "https://i.pravatar.cc/50?img=7",
      status: "following",
    },
    {
      username: "artlover_01",
      profilePic: "https://i.pravatar.cc/50?img=8",
      status: "following",
    },
    {
      username: "john_traveller",
      profilePic: "https://i.pravatar.cc/50?img=9",
      status: "unfollow",
    },
    {
      username: "lucas_dev",
      profilePic: "https://i.pravatar.cc/50?img=10",
      status: "follow_back",
    },
    {
      username: "grace.m",
      profilePic: "https://i.pravatar.cc/50?img=11",
      status: "following",
    },
    {
      username: "creative_mind",
      profilePic: "https://i.pravatar.cc/50?img=12",
      status: "not_following",
    },
  ]);

  const filtered = following.filter((f) =>
    f.username.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = (index) => {
    setFollowing((prev) =>
      prev.map((f, i) => {
        if (i === index) {
          if (f.status === "following") return { ...f, status: "unfollow" };
          if (f.status === "unfollow") return { ...f, status: "following" };
          if (f.status === "follow_back") return { ...f, status: "following" };
          if (f.status === "not_following") return { ...f, status: "following" };
        }
        return f;
      })
    );
  };

  return (
    <div className="list-page fade-in">
      <div className="list-header">
        <FaArrowLeft onClick={onBack} className="back-icon" />
        <h2>Following</h2>
        <div></div>
      </div>

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search following..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="user-list">
        {filtered.map((f, i) => (
          <li key={i} className="user-item">
            <div className="user-info">
              <img src={f.profilePic} alt={f.username} className="user-pic" />
              <span className="username">{f.username}</span>
            </div>
            <div className="user-actions">
              <button className="msg-btn">Message</button>
              <button
                className={`follow-btn ${f.status}`}
                onClick={() => toggleFollow(i)}
              >
                {f.status === "follow_back"
                  ? "Follow Back"
                  : f.status === "following"
                  ? "Following"
                  : f.status === "unfollow"
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
