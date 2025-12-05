import React from "react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import "./PageStyles.css";

const MyCart = ({ onBack }) => {
  const cartItems = [
    { id: 1, name: "Denim Jacket", price: 1299, qty: 1 },
    { id: 2, name: "White Sneakers", price: 2199, qty: 2 },
    { id: 3, name: "T-shirt", price: 599, qty: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>My Cart</h2>
      </div>

      <div className="page-content orders-grid">
        {cartItems.map((item) => (
          <div key={item.id} className="order-card">
            <div className="order-left">
              <FaShoppingCart className="order-icon" />
            </div>
            <div className="order-right">
              <h3>{item.name}</h3>
              <p><b>Price:</b> ₹{item.price}</p>
              <p><b>Quantity:</b> {item.qty}</p>
              <p><b>Subtotal:</b> ₹{item.price * item.qty}</p>
            </div>
          </div>
        ))}

        <div className="total-card">
          <h3>Total: ₹{total}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
