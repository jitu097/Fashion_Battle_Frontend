
import React, { useState } from 'react';
import "./ShopHeader.css";
import { FaSearch, FaBell, FaHeart, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../../components/Navbar"

const ShopHeader = () => {
    
  return (
    <div className="shop-page">
      
      {/* Navbar */}
        <Navbar />
    
      {/* Search and Filter */}
      <div className="shop-controls">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="filter-box">
          <span>6 products</span>
          <select>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="product-grid">
        <div className="product-card pink">
          <h2>BAGS</h2>
          <p>Min. 60% Off</p>
          <a href="#">+ Explore →</a>
        </div>
        <div className="product-card purple">
          <h2>SHOES</h2>
          <p>Up to 70% Off</p>
          <a href="#">+ Explore →</a>
        </div>
        <div className="product-card pink">
          <h2>BAGS</h2>
          <p>Min. 60% Off</p>
          <a href="#">+ Explore →</a>
        </div>
        <div className="product-card purple">
          <h2>SHOES</h2>
          <p>Up to 70% Off</p>
          <a href="#">+ Explore →</a>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
