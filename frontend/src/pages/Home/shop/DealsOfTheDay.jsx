import React from "react";
import "./DealsOfTheDay.css";
import { FaHeart } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "H&M",
    desc: "Printed Casual Dress",
    price: 1499,
    oldPrice: 2999,
    discount: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Roadster",
    desc: "Men Slim Fit Shirt",
    price: 799,
    oldPrice: 1599,
    discount: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    name: "YK",
    desc: "Kids Casual Wear",
    price: 599,
    oldPrice: 1199,
    discount: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Lavie",
    desc: "Women Handbag",
    price: 1299,
    oldPrice: 2599,
    discount: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  },
];

const DealsOfTheDay = () => {
  return (
    <section className="deals-section">
      <h2 className="deals-title">DEALS OF THE DAY</h2>
      <div className="deals-grid">
        {products.map((item) => (
          <div className="deal-card" key={item.id}>
            <div className="discount-badge">{item.discount}</div>
            <FaHeart className="fav-icon" />
            <img src={item.image} alt={item.name} className="deal-img" />
            <div className="deal-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="deal-price">
                <span className="new">₹{item.price}</span>
                <span className="old">₹{item.oldPrice}</span>
                <span className="off">(50% OFF)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsOfTheDay;
