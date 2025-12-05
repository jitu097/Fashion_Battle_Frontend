import React from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import "./PageStyles.css";

const Wishlist = ({ onBack }) => {
  const wishlist = [
    { id: 1, name: "Leather Jacket", price: 2499 },
    { id: 2, name: "Analog Watch", price: 1899 },
    { id: 3, name: "Backpack", price: 999 },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>My Wishlist</h2>
      </div>

      <div className="page-content orders-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="order-card">
            <div className="order-left">
              <FaHeart className="order-icon" style={{ color: "#ff4d4d" }} />
            </div>
            <div className="order-right">
              <h3>{item.name}</h3>
              <p><b>Price:</b> ₹{item.price}</p>
              <button className="checkout-btn">Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
