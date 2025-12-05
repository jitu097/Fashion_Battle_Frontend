import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import PostCard from './PostCard'
import CreatePost from './CreatePost'
import Message from './Message'
import Profile from '../../../components/Profile/Profile'
import './Home.css'
import Chatbot from '../../../components/Profile/chatbot'

/**
 * Home Page Component
 * Social feed with three-column layout and shopping banner
 */
const Home = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Style_Queen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      likes: 1234,
      comments: 89,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop'
    },
    {
      id: 2,
      username: 'Fashion_Guru',
      avatar: 'https://i.pravatar.cc/150?img=2',
      likes: 856,
      comments: 45,
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop'
    }
  ])

  // CreatePost modal state
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  
  // Message page state
  const [isMessageOpen, setIsMessageOpen] = useState(false)

  //Profile page state
  // Shopping banner items
  const bannerItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600', tag: 'NEW', text: 'Summer Collection' },
    { id: 2, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600', tag: 'SALE', text: 'Up to 50% Off' },
    { id: 3, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', tag: 'HOT', text: 'Trending Now' },
    { id: 4, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600', tag: 'NEW', text: 'Designer Wear' },
    { id: 5, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', tag: 'SALE', text: 'Flash Sale' },
    { id: 6, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600', tag: 'HOT', text: 'Limited Edition' }
  ]

  // Trending users data
  const trendingUsers = [
    { name: 'Sarah_Chen', handle: '@SarahChic', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Mike_Ross', handle: '@MikeStyle', avatar: 'https://i.pravatar.cc/150?img=7' },
    { name: 'Emma_Lee', handle: '@EmmaFash', avatar: 'https://i.pravatar.cc/150?img=9' }
  ]

  // Suggested creators data
  const suggestedCreators = [
    { name: 'Alex_Turner', handle: '@AlexMode', avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Lisa_Wang', handle: '@LisaLooks', avatar: 'https://i.pravatar.cc/150?img=14' },
    { name: 'Tom_Brooks', handle: '@TomTrends', avatar: 'https://i.pravatar.cc/150?img=15' }
  ]

  const handlePostCreated = (newPost) => {
    // Transform the post from CreatePost component format to PostCard format
    const transformedPost = {
      id: newPost.id,
      username: 'You', // Default username for user's posts
      avatar: 'https://i.pravatar.cc/150?img=10', // Default avatar
      likes: 0,
      comments: 0,
      imageUrl: newPost.image, // Map image to imageUrl
      caption: newPost.caption,
      location: newPost.location,
      hashtags: newPost.hashtags,
      filter: newPost.filter,
      timestamp: newPost.timestamp
    }
    setPosts([transformedPost, ...posts])
  }

  const handleCreatePost = () => {
    setIsCreatePostOpen(true)
  }

  const handleCloseCreatePost = () => {
    setIsCreatePostOpen(false)
  }

  const handleOpenMessages = () => {
    setIsMessageOpen(true)
  }

  
  const handleBackToHome = () => {
    setIsMessageOpen(false)
  }

  

  // Show Message page when isMessageOpen is true
  if (isMessageOpen) {
    return (
      <div className="home-page">
        <Message onBack={handleBackToHome} />
      </div>
    )
  }

  return (
    <div className="home-page">
      <Chatbot />
      {/* Navigation Header */}
      <Navbar activePage="Social Feed" />

      {/* Main Layout */}
      <div className="home-layout">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          {/* Create Post Section */}
          <div className="sidebar-section">
            <button className="create-post-btn" onClick={handleCreatePost}>
              <svg className="create-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="create-text">Create Post</span>
            </button>
          </div>

          <div className="sidebar-section">
            <nav className="category-list">
              <button className="category-item active">
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="category-name">Home</span>
              </button>
              <button className="category-item">
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="category-name">Trending</span>
                <span className="badge">24</span>
              </button>
              <button className="category-item">
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="category-name">Following</span>
              </button>
              <button className="category-item">
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="category-name">Saved</span>
              </button>
              <button className="category-item" onClick={handleOpenMessages}>
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="category-name">Messages</span>
              </button>
              <button className="category-item premium">
                <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="category-name">Premium</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="main-feed">
          {/* Shopping Banner */}
          <div className="shopping-banner">
            <div className="banner-scroll">
              {/* Duplicate items for seamless loop */}
              {[...bannerItems, ...bannerItems].map((item, index) => (
                <div key={`${item.id}-${index}`} className="banner-item">
                  <img src={item.image} alt={item.text} className="banner-img" />
                  <div className="banner-content">
                    <span className="banner-badge">{item.tag}</span>
                    <p className="banner-title">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="posts-container">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Search Bar */}
          <div className="sidebar-section">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
              />
              <button className="search-button" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Trending Users */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Trending Users</h3>
            <div className="user-list">
              {trendingUsers.map((user, index) => (
                <div key={index} className="user-item">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-handle">{user.handle}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="see-all-button">See All</button>
          </div>
          
    

          {/* Suggested Creators */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Suggested Creators</h3>
            <div className="user-list">
              {suggestedCreators.map((creator, index) => (
                <div key={index} className="user-item">
                  <img src={creator.avatar} alt={creator.name} className="user-avatar" />
                  <div className="user-info">
                    <p className="user-name">{creator.name}</p>
                    <p className="user-handle">{creator.handle}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="see-all-button">See All</button>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <button className="mobile-nav-button" aria-label="Home">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className="mobile-nav-button" aria-label="Search">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="mobile-nav-button mobile-create-btn" aria-label="Create Post" onClick={handleCreatePost}>
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="mobile-nav-button" aria-label="Messages" onClick={handleOpenMessages}>
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="mobile-nav-button" aria-label="Profile" onClick={() => setIsProfileOpen(true)}>
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>

      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Create Post Modal */}
      <CreatePost 
        isOpen={isCreatePostOpen}
        onClose={handleCloseCreatePost}
        onPostCreated={handlePostCreated}
      />
    </div>
  )
}

export default Home
