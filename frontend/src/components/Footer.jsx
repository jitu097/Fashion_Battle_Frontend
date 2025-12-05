import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from '../assets/new logo.svg'
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT BRAND SECTION */}
        <div className="footer-section">
          <img src= {logo} alt="logo" className="footer-logo" />

          <p className="footer-text">
            Where Fashion Meets Fame. Your premier destination for the latest
            trends and timeless elegance.
          </p>

          <div className="footer-contact-list">
            <p className="footer-contact-item">
              <FaEnvelope className="footer-icon" />
              hello@fashionbattle.com
            </p>

            <p className="footer-contact-item">
              <FaPhoneAlt className="footer-icon" />
              +91 123 456 7890
            </p>

            <p className="footer-contact-item">
              <FaMapMarkerAlt className="footer-icon" />
              Fashion District, Mumbai, India
            </p>
          </div>
        </div>

        {/* SHOP */}
        <div className="footer-section">
          <h3 className="footer-title">Shop</h3>
          <ul className="footer-links">
            <li>Men's Fashion</li>
            <li>Women's Fashion</li>
            <li>Kids & Teens</li>
            <li>Accessories</li>
            <li className="footer-highlight">Sale</li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div className="footer-section">
          <h3 className="footer-title">Customer Care</h3>
          <ul className="footer-links">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Exchange</li>
            <li>Shipping Info</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* STAY CONNECTED */}
        <div className="footer-section">
          <h3 className="footer-title">Stay Connected</h3>

          <p className="footer-text">Subscribe to get special offers and updates</p>

          <div className="footer-socials">
            <div className="social-icon"><FaFacebookF /></div>
            <div className="social-icon"><FaInstagram /></div>
            <div className="social-icon"><FaTwitter /></div>
            <div className="social-icon"><FaYoutube /></div>
          </div>

          <div className="footer-email-box">
            <input type="email" placeholder="Your email" />
            <button>Join</button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="footer-bottom">
        <p>© 2025 FASHIONBATTLE. All rights reserved.</p>

        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
