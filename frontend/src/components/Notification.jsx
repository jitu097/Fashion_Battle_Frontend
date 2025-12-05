import React from 'react'
import './Notification.css'

/**
 * Notification Component
 * 
 * Instagram-style notification panel that appears as a side popup
 * - Desktop: Half window width popup from right side
 * - Mobile: Full screen overlay
 * - Shows follow requests, likes, comments, and other notifications
 * - Matches app's pink gradient theme
 */
const Notification = ({ isOpen, onClose }) => {
  // Sample notification data
  const notifications = {
    followRequests: [
      {
        id: 1,
        username: 'fashionista_emma',
        profileImage: 'https://via.placeholder.com/50/FFB6C1/000000?text=FE',
        message: 'requested to follow you.',
        time: '2h',
        type: 'follow_request'
      },
      {
        id: 2,
        username: 'style_hunter_99',
        profileImage: 'https://via.placeholder.com/50/E6A8D7/000000?text=SH',
        message: 'and 12 others requested to follow you.',
        time: '5h',
        type: 'follow_request',
        count: 12
      }
    ],
    today: [
      {
        id: 3,
        username: 'trendy_alex',
        profileImage: 'https://via.placeholder.com/50/D4B5E8/000000?text=TA',
        message: 'liked your post.',
        time: '1h',
        type: 'like',
        postImage: 'https://via.placeholder.com/50/FFC0D9/000000?text=Post'
      },
      {
        id: 4,
        username: 'outfit_queen',
        profileImage: 'https://via.placeholder.com/50/C5D9F5/000000?text=OQ',
        message: 'commented: "Amazing style! 🔥"',
        time: '3h',
        type: 'comment',
        postImage: 'https://via.placeholder.com/50/FFC0D9/000000?text=Post'
      },
      {
        id: 5,
        username: 'fashion_guru_',
        profileImage: 'https://via.placeholder.com/50/F5E6C5/000000?text=FG',
        message: 'started following you.',
        time: '4h',
        type: 'follow'
      }
    ],
    thisMonth: [
      {
        id: 6,
        username: 'style_maven',
        profileImage: 'https://via.placeholder.com/50/E8C5D4/000000?text=SM',
        message: 'replied to your comment: "Thanks for the inspiration!"',
        time: 'Oct 28',
        type: 'comment_reply'
      },
      {
        id: 7,
        username: 'look_book_daily',
        profileImage: 'https://via.placeholder.com/50/D5F5C5/000000?text=LB',
        message: 'mentioned you in a comment.',
        time: 'Oct 25',
        type: 'mention'
      },
      {
        id: 8,
        username: 'chic_wardrobe',
        profileImage: 'https://via.placeholder.com/50/F5D5C5/000000?text=CW',
        message: 'liked your battle submission.',
        time: 'Oct 22',
        type: 'like',
        postImage: 'https://via.placeholder.com/50/FFC0D9/000000?text=Post'
      }
    ]
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div className="notification-backdrop" onClick={onClose}></div>

      {/* Notification panel */}
      <div className="notification-panel">
        {/* Header */}
        <div className="notification-header">
          <h2 className="notification-title">Notifications</h2>
          <button className="notification-close-button" onClick={onClose} aria-label="Close notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Notification content */}
        <div className="notification-content">
          {/* Follow Requests Section */}
          {notifications.followRequests.length > 0 && (
            <div className="notification-section">
              <h3 className="section-title">Follow requests</h3>
              {notifications.followRequests.map((notification) => (
                <div key={notification.id} className="notification-item follow-request">
                  <img 
                    src={notification.profileImage} 
                    alt={notification.username}
                    className="notification-avatar"
                  />
                  <div className="notification-details">
                    <p className="notification-text">
                      <span className="notification-username">{notification.username}</span>
                      {notification.count && ` and ${notification.count} others`} {notification.message}
                    </p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <div className="notification-actions">
                    <button className="action-button confirm-button">Confirm</button>
                    <button className="action-button delete-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Today Section */}
          {notifications.today.length > 0 && (
            <div className="notification-section">
              <h3 className="section-title">Today</h3>
              {notifications.today.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <img 
                    src={notification.profileImage} 
                    alt={notification.username}
                    className="notification-avatar"
                  />
                  <div className="notification-details">
                    <p className="notification-text">
                      <span className="notification-username">{notification.username}</span> {notification.message}
                    </p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {notification.postImage && (
                    <img 
                      src={notification.postImage} 
                      alt="Post"
                      className="notification-post-image"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* This Month Section */}
          {notifications.thisMonth.length > 0 && (
            <div className="notification-section">
              <h3 className="section-title">This month</h3>
              {notifications.thisMonth.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <img 
                    src={notification.profileImage} 
                    alt={notification.username}
                    className="notification-avatar"
                  />
                  <div className="notification-details">
                    <p className="notification-text">
                      <span className="notification-username">{notification.username}</span> {notification.message}
                    </p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {notification.postImage && (
                    <img 
                      src={notification.postImage} 
                      alt="Post"
                      className="notification-post-image"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Notification
