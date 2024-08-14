import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Book Smart. All rights reserved. | <a href="#privacy-policy">Privacy Policy</a> | <a href="#terms-of-service">Terms of Service</a></p>
      </div>
    </footer>
  );
};

export default Footer;
