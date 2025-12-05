import React from "react";
import "./shop.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-cards">

      {/* Product Image */}
      <div className="product-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        {/* Badge if needed */}
        {product.price < 120 && <span className="product-badge">Hot</span>}
      </div>

      {/* Content */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-category">{product.category}</p>

        <p className="product-price">₹{product.price}</p>

        <div className="product-sizes">
          {product.options.map((size, i) => (
            <span key={i} className="size-chip">{size}</span>
          ))}
        </div>

        <button className="product-btn">Add to Cart</button>
      </div>

    </div>
  );
};

export default ProductCard;
