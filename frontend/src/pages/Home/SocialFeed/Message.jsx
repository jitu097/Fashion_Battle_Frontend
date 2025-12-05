import React, { useState } from 'react';
import './Message.css';

const Message = ({ onBack }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchText, setSearchText] = useState('');

  // Sample chat data
  const [chats] = useState([
    {
      id: 1,
      username: 'fashionista_maya',
      displayName: 'Maya Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Love your latest outfit post! 😍',
      timestamp: '2m',
      unread: 2,
      online: true
    },
    {
      id: 2,
      username: 'style_alex',
      displayName: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'Where did you get those shoes?',
      timestamp: '15m',
      unread: 0,
      online: true
    },
    {
      id: 3,
      username: 'trendsetter_sara',
      displayName: 'Sara Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Thanks for the styling tips!',
      timestamp: '1h',
      unread: 1,
      online: false
    },
    {
      id: 4,
      username: 'fashion_guru',
      displayName: 'Fashion Guru',
      avatar: 'https://i.pravatar.cc/150?img=4',
      lastMessage: 'Check out my new collection',
      timestamp: '3h',
      unread: 0,
      online: false
    },
    {
      id: 5,
      username: 'outfit_daily',
      displayName: 'Daily Outfits',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Your feedback would be great!',
      timestamp: '1d',
      unread: 3,
      online: true
    }
  ]);

  // Sample messages for selected chat
  const [messages] = useState({
    1: [
      {
        id: 1,
        text: "Hey! I love your style posts",
        sender: 'other',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        text: "Thank you so much! That means a lot 😊",
        sender: 'me',
        timestamp: '10:32 AM'
      },
      {
        id: 3,
        text: "Love your latest outfit post! 😍",
        sender: 'other',
        timestamp: '10:35 AM'
      }
    ]
  });

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
    chat.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="message-page">
      {/* Back Navigation */}
      <div className="message-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>Back to Home</span>
        </button>
        <h1 className="message-title">Messages</h1>
      </div>

      <div className="message-container">
        {/* Left Sidebar - Chat List */}
        <div className="chat-sidebar">
          {/* Header */}
          <div className="sidebar-header">
            <div className="header-user">
              <h2 className="header-username">fashion_user</h2>
              <svg className="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <button className="new-message-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Messages Tab */}
          <div className="messages-tab">
            <div className="tab-header">
              <span className="tab-title">Messages</span>
              <span className="tab-count">{chats.filter(chat => chat.unread > 0).length}</span>
            </div>
          </div>

          {/* Chat List */}
          <div className="chat-list">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'selected' : ''}`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="chat-avatar-container">
                  <img src={chat.avatar} alt={chat.displayName} className="chat-avatar" />
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                
                <div className="chat-info">
                  <div className="chat-header">
                    <span className="chat-name">{chat.displayName}</span>
                    <span className="chat-timestamp">{chat.timestamp}</span>
                  </div>
                  <div className="chat-preview">
                    <span className="last-message">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <div className="unread-badge">{chat.unread}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="chat-area">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header-bar">
                <div className="chat-user-info">
                  <img src={selectedChat.avatar} alt={selectedChat.displayName} className="chat-user-avatar" />
                  <div className="chat-user-details">
                    <span className="chat-user-name">{selectedChat.displayName}</span>
                    <span className="chat-user-status">
                      {selectedChat.online ? 'Active now' : 'Active 1h ago'}
                    </span>
                  </div>
                </div>
                
                <div className="chat-actions">
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </button>
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                  </button>
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {messages[selectedChat.id]?.map(message => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <span className="message-text">{message.text}</span>
                    </div>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <form onSubmit={handleSendMessage} className="message-form">
                  <div className="input-container">
                    <button type="button" className="emoji-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      </svg>
                    </button>
                    
                    <input
                      type="text"
                      placeholder="Message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="message-input"
                    />
                    
                    <button type="button" className="media-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                      </svg>
                    </button>
                    
                    {messageText.trim() ? (
                      <button type="submit" className="send-btn">
                        Send
                      </button>
                    ) : (
                      <button type="button" className="like-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="message-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <h3>Your messages</h3>
              <p>Send a message to start a chat.</p>
              <button className="send-message-btn">Send message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
