// src/pages/Dashboard/Sellerdashboard.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaBell,
  FaBox,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import "./Sellerdashboard.css";
import HomePage from './HomePage';
import ProductsPage from './ProductPage';
import OrdersPage from './OrdersPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage'


const Sellerdashboard = () => {
  const [expanded, setExpanded] = useState(null);
  const [dark, setDark] = useState(false);
  const [notifications] = useState({ messages: 4, alerts: 17 });
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");


  const toggleAccordion = (id) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className={`dashboard-root ${dark ? "dark" : ""}`}>
      <div className="dashboard-container">
        <aside
          className={`sidebar ${collapsed ? "collapsed" : ""} ${
            isMobileMenuOpen ? "mobile-open" : ""
          }`}
        >
          <div className="sidebar-top">
            <h2 className="logo"></h2>
            <button
              className="collapse-btn"
              onClick={() => setCollapsed((prev) => !prev)} 
            >
              ☰
            </button>
          </div>

          <ul className="menu">
  <li
    className={`menu-item ${activePage === "home" ? "active" : ""}`}
    onClick={() => setActivePage("home")}
  >
    <FaHome /> <span>Home</span>
  </li>

  <li
    className={`menu-item ${activePage === "products" ? "active" : ""}`}
    onClick={() => setActivePage("products")}
  >
    <FaBox /> <span>Products</span>
  </li>

  <li
    className={`menu-item ${activePage === "orders" ? "active" : ""}`}
    onClick={() => setActivePage("orders")}
  >
    <FaShoppingCart /> <span>Orders</span>
  </li>

  <li
    className={`menu-item ${activePage === "analytics" ? "active" : ""}`}
    onClick={() => setActivePage("analytics")}
  >
    <FaChartBar /> <span>Analytics</span>
  </li>

  <li
    className={`menu-item ${activePage === "settings" ? "active" : ""}`}
    onClick={() => setActivePage("settings")}
  >
    <FaCog /> <span>Settings</span>
  </li>
</ul>

        </aside>

        <main className="main-content">
          <div className="topbar">
            {/* Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>
            <div className="breadcrumb">Seller Dashboard</div>
            

            <div className="top-actions">
              <button className="icon-btn" title="Messages">
                <FaEnvelope />
                <span className="badge">{notifications.messages}</span>
              </button>

              <button className="icon-btn" title="Notifications">
                <FaBell />
                <span className="badge red">{notifications.alerts}</span>
              </button>

              <button
                className="theme-toggle"
                onClick={() => setDark((d) => !d)}
                title="Toggle theme"
              >
                {dark ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
           {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
          {activePage === "home" && <HomePage />}
          {activePage === "products" && <ProductsPage />}
          {activePage === "orders" && <OrdersPage />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "settings" && <SettingsPage />}
          
        </main>
      </div>
    </div>
  );
};

export default Sellerdashboard;
