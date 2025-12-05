import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import Pages
import Landing from './pages/Landing/Landing'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/SocialFeed/Home.jsx'
import Shop from './pages/Home/shop/shop'
import TryOnHome from './pages/Home/tryon/tryonHome'
import BattleHome from './pages/Home/Battle/battleHome'
import Admindashboard from './pages/Dashboard/Admindashboard.jsx'
import Sellerdashboard from './pages/Dashboard/Sellerdashboard/Sellerdashboard.jsx'

/**
 * App Root Component
 * 
 * Main router configuration for the Fashion Battle application.
 * 
 * Routes:
 * - '/' - Animated landing page (auto-redirects to /login)
 * - '/login' - User login page
 * - '/signup' - User registration page
 * - '/home' - Social feed page (main user home)
 * - '/shop' - E-commerce shop page
 * - '/tryon' - AI Try-On feature
 * - '/battle' - Fashion battle/voting feature
 * 
 * Future Routes:
 * - '/profile' - User profile page
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard navigation admin or seller */}
        <Route path='/Admindashboard' element={<Admindashboard />} />
        <Route path='/Sellerdashboard' element={<Sellerdashboard />} />
        
        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/tryon" element={<TryOnHome />} />
        <Route path="/battle" element={<BattleHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

