import React from "react";
import { FaArrowLeft, FaBox } from "react-icons/fa";
import "./PageStyles.css";

const MyOrders = ({ onBack }) => {
  const orders = [
    { id: "ORD123", item: "Denim Jacket", date: "2025-10-20", status: "Delivered" },
    { id: "ORD124", item: "Sneakers", date: "2025-10-25", status: "In Transit" },
    { id: "ORD125", item: "Leather Boots", date: "2025-11-01", status: "Processing" },
    { id: "ORD126", item: "T-Shirt", date: "2025-11-03", status: "Delivered" },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>My Orders</h2>
      </div>

      <div className="page-content orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-left">
              <FaBox className="order-icon" />
            </div>
            <div className="order-right">
              <h3>{order.item}</h3>
              <p><b>Order ID:</b> {order.id}</p>
              <p><b>Date:</b> {order.date}</p>
              <p className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                <b>Status:</b> {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
