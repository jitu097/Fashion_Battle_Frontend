import React from "react";
import { FaArrowLeft, FaHeadset } from "react-icons/fa";
import "./PageStyles.css";

const CustomerSupport = ({ onBack }) => {
  const faqs = [
    { q: "How can I track my order?", a: "Go to 'My Orders' and view your tracking details." },
    { q: "How do I return an item?", a: "Click on 'Return' from the My Orders section for eligible products." },
    { q: "How to contact support?", a: "Email us at support@shopmate.com or call 1800-111-222." },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>Customer Support</h2>
      </div>

      <div className="page-content orders-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="order-card">
            <div className="order-left">
              <FaHeadset className="order-icon" />
            </div>
            <div className="order-right">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="support-footer">
        <button className="checkout-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default CustomerSupport;
