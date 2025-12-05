import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/new logo.svg'
import Profile from './Profile/Profile'
import Notification from './Notification'
import './Navbar.css'
import Cart from './Cart'

/**
 * Navbar Component
 * 
 * Reusable navigation header with:
 * - FASHIONBATTLE logo (image from assets)
 * - Navigation buttons (Social Feed, Shop, Try On AI, Battle)
 * - Right side icons (notifications, shopping cart, profile)
 * - Pink gradient background
 * - Normal flow positioning (scrolls with page)
 */
const Navbar = () => {
  const [activePage, setActivePage] = useState("Social Feed");
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  const handleLogoClick = () => navigate('/home');
  
  const handleNavigation = (page) => {
    setActivePage(page);
    switch (page) {
      case 'Social Feed': navigate('/home'); break;
      case 'Shop': navigate('/shop'); break;
      case 'Try On AI': navigate('/tryon'); break;
      case 'Battle': navigate('/battle'); break;
      default: break;
    }
  };

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img src={logo} alt="FASHIONBATTLE Logo" className="navbar-logo-image" />
          </div>

          {/* Navigation */}
          <nav className="navbar-nav">
            {['Social Feed', 'Shop', 'Try On AI', 'Battle'].map((page) => (
              <button
                key={page}
                className={`navbar-button ${activePage === page ? 'active' : ''}`}
                onClick={() => handleNavigation(page)}
              >
                {page}
                {page === 'Try On AI' && <span className="nav-badge">New</span>}
                {page === 'Battle' && <span className="nav-badge">Hot</span>}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Notifications */}
            <div className="navbar-icon-wrapper">
              <button className="navbar-icon-button" onClick={() => setIsNotificationOpen(true)}>
                <span className="icon-emoji">🔔</span>
                <span className="notification-dot"></span>
              </button>
            </div>

            {/* Cart */}
            <div className="navbar-icon-wrapper">
              <button className="navbar-icon-button cart-button" onClick={() => setIsCartOpen(true)}>
                <span className="icon-emoji">🛒</span>
                <span className="cart-badge">3</span>
              </button>
            </div>

            {/* Profile */}
            <div className="navbar-icon-wrapper">
              <button className="navbar-icon-button profile-icon" onClick={() => setIsProfileOpen(true)}>
                <span className="icon-emoji">👤</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Panels */}
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
