import React from "react";
import { FaArrowLeft, FaHistory } from "react-icons/fa";
import "./PageStyles.css";

const TransactionHistory = ({ onBack }) => {
  const transactions = [
    { id: "TXN001", date: "2025-10-20", amount: 2499, status: "Success" },
    { id: "TXN002", date: "2025-10-25", amount: 1599, status: "Pending" },
    { id: "TXN003", date: "2025-11-01", amount: 899, status: "Failed" },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>Transaction History</h2>
      </div>

      <div className="page-content orders-grid">
        {transactions.map((txn) => (
          <div key={txn.id} className="order-card">
            <div className="order-left">
              <FaHistory className="order-icon" />
            </div>
            <div className="order-right">
              <h3>Transaction ID: {txn.id}</h3>
              <p><b>Date:</b> {txn.date}</p>
              <p><b>Amount:</b> ₹{txn.amount}</p>
              <p className={`status ${txn.status.toLowerCase()}`}>
                <b>Status:</b> {txn.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
