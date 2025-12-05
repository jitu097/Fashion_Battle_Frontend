// src/components/FilterSidebar.jsx
import React, { useState } from "react";
import './FilterSidebar.css'

const FilterGroup = ({ title, children }) => (
  <div className="filter-group">
    <div className="filter-title">{title}</div>
    {children}
    <hr />
  </div>
);

const FilterSidebar = ({
  category,
  setCategory,
  price,
  setPrice,
  size,
  setSize,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer toggle

  const handleClearAll = () => {
    setCategory("All Items");
    setPrice(500);
    setSize(null);
  };

  const filterContent = (
    <>
      <div className="filter-header">
        <span className="title">Filters</span>
        <button className="clear-all" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <FilterGroup title="Category">
        {["All Items", "Clothing", "Shoes", "Bags", "Accessories"].map((cat) => (
          <button
            key={cat}
            className={`filter-item ${category === cat ? "selected" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range">
        <div className="price-display">${price}</div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="price-slider"
        />
      </FilterGroup>

      {/* Size Filter */}
      <FilterGroup title="Size">
        <div className="size-grid">
          {["XS", "S", "M", "L", "XL", "6", "7", "8", "9", "10"].map((s) => (
            <button
              key={s}
              className={`size-button ${size === s ? "selected" : ""}`}
              onClick={() => setSize(size === s ? null : s)}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
    </>
  );

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <button className="mobile-filter-btn" onClick={() => setIsOpen(true)}>
        Filters
      </button>

      {/* DESKTOP SIDEBAR */}
      <aside className="filter-sidebar desktop-filter">
        {filterContent}
      </aside>

      {/* MOBILE DRAWER */}
      <div className={`filter-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {filterContent}
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`drawer-overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};

export default FilterSidebar;
