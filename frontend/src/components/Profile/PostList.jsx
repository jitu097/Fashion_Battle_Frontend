import React, { useState } from "react";
import { FaArrowLeft, FaHeart, FaComment } from "react-icons/fa";
import "./ListPage.css";

const PostList = ({ onBack }) => {
  const [likedPosts, setLikedPosts] = useState([]);

  const posts = [
    { id: 1, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb", likes: 321, comments: 12 },
    { id: 2, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", likes: 145, comments: 7 },
    { id: 3, image: "https://i.pravatar.cc/150?img=5", likes: 190, comments: 15 },
    { id: 4, image: "https://images.unsplash.com/photo-1504593811423-6dd665756598", likes: 222, comments: 8 },
    { id: 5, image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a", likes: 410, comments: 21 },
    { id: 6, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e", likes: 98, comments: 5 },
    { id: 7, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", likes: 332, comments: 19 },
    { id: 8, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", likes: 201, comments: 9 },
    { id: 9, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", likes: 415, comments: 30 },
  ];

  const toggleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="list-page fade-in">
      <div className="list-header">
        <FaArrowLeft onClick={onBack} className="back-icon" />
        <h2>Posts</h2>
        <div></div>
      </div>

      <div className="post-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <img src={post.image} alt={`Post ${post.id}`} className="post-img" />

            {/* Hover overlay */}
            <div className="post-overlay">
              <div className="overlay-icons">
                <span
                  className={`like-icon ${likedPosts.includes(post.id) ? "liked" : ""}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <FaHeart />
                  <small>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</small>
                </span>
                <span className="comment-icon">
                  <FaComment /> <small>{post.comments}</small>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
