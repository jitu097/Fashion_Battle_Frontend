import React, { useState } from 'react'
import './PostCard.css'

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes || 0)
  const [comments, setComments] = useState(post.comments || [])
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        username: 'current_user',
        text: newComment.trim(),
        timestamp: new Date().toISOString()
      }
      setComments([...comments, comment])
      setNewComment('')
      
      // If showing all comments, keep them visible
      if (comments.length >= 2 && !showComments) {
        // Don't auto-expand, let user see in preview
      }
    }
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  return (
    <article className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-header-left">
          <img 
            src={post.avatar || 'https://i.pravatar.cc/150?img=1'} 
            alt={post.username || 'User'} 
            className="post-avatar" 
          />
          <div className="post-user-info">
            <h3 className="post-username">{post.username || 'User'}</h3>
            <span className="post-user-handle">@{(post.username || 'user').toLowerCase()}</span>
          </div>
        </div>
        <button 
          className={`follow-button ${isFollowing ? 'following' : ''}`}
          onClick={handleFollow}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Post Image */}
      <div className="post-image-wrapper">
        <img 
          src={post.imageUrl || post.image} 
          alt={`Post by ${post.username || 'User'}`} 
          className="post-image" 
        />
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <div className="action-buttons">
          <div className="like-section">
            <button 
              className={`action-button like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <svg className="action-icon" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
            <span className="likes-count">{likesCount.toLocaleString()} likes</span>
          </div>

          <button 
            className="action-button comment-button"
            onClick={toggleComments}
            aria-label="Comment"
          >
            <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <button className="action-button share-button" aria-label="Share">
            <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Comments Display */}
      {comments.length > 0 && (
        <div className="comments-display">
          <div className="comments-preview">
            {comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="comment">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
          
          {comments.length > 2 && (
            <button className="view-all-comments" onClick={toggleComments}>
              View all {comments.length} comments
            </button>
          )}
        </div>
      )}

      {/* Full Comments Section */}
      {showComments && comments.length > 2 && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
          <button className="hide-comments" onClick={toggleComments}>
            Hide comments
          </button>
        </div>
      )}

      {/* Add Comment */}
      <div className="add-comment">
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            className="comment-input"
            maxLength={300}
          />
          {newComment.trim() && (
            <button type="submit" className="comment-submit">
              Post
            </button>
          )}
        </form>
      </div>
    </article>
  )
}

export default PostCard
