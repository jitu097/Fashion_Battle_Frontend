import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import "./ListPage.css";

const FollowerList = ({ onBack }) => {
  const [query, setQuery] = useState("");
  const [followers, setFollowers] = useState([
    {
      username: "alex_walker",
      profilePic: "https://i.pravatar.cc/50?img=1",
      status: "following", // could be: following, follow_back, not_following
    },
    {
      username: "maria.designs",
      profilePic: "https://i.pravatar.cc/50?img=2",
      status: "follow_back",
    },
    {
      username: "the_travel_boy",
      profilePic: "https://i.pravatar.cc/50?img=3",
      status: "not_following",
    },
    {
      username: "sophia_arts",
      profilePic: "https://i.pravatar.cc/50?img=4",
      status: "following",
    },
    {
      username: "daniel_dev",
      profilePic: "https://i.pravatar.cc/50?img=5",
      status: "follow_back",
    },
    {
      username: "fashionqueen",
      profilePic: "https://i.pravatar.cc/50?img=6",
      status: "not_following",
    },
  ]);

  const filtered = followers.filter((f) =>
    f.username.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = (index) => {
    setFollowers((prev) =>
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
        <h2>Followers</h2>
        <div></div>
      </div>

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search followers..."
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

export default FollowerList;
