import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-section mt-5">
      
      <div className="footer-features py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-3">
              <div className="feature-icon"><i className="fa-solid fa-truck-fast"></i></div>
              <div>
                <h6 className="mb-0 fw-bold text-dark-blue">Free Shipping</h6>
                <small className="text-muted">On orders over 500 EGP</small>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-3">
              <div className="feature-icon"><i className="fa-solid fa-rotate-left"></i></div>
              <div>
                <h6 className="mb-0 fw-bold text-dark-blue">Easy Returns</h6>
                <small className="text-muted">14-day return policy</small>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-3">
              <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <div>
                <h6 className="mb-0 fw-bold text-dark-blue">Secure Payment</h6>
                <small className="text-muted">100% secure checkout</small>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-3">
              <div className="feature-icon"><i className="fa-solid fa-headset"></i></div>
              <div>
                <h6 className="mb-0 fw-bold text-dark-blue">24/7 Support</h6>
                <small className="text-muted">Contact us anytime</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="footer-main py-5">
        <div className="container">
          <div className="row g-4">
            
            <div className="col-lg-4">
              <div className="footer-logo mb-4">
                <img src="https://freshcart-route.vercel.app/_next/static/media/freshcart-logo.49f1b44d.svg" alt="FreshCart Logo" style={{ width: '160px' }} />
              </div>
              <p className="footer-text-muted small pe-lg-5">
                FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
              </p>
              <ul className="list-unstyled small mt-4 footer-contact-info">
                <li className="mb-2"><i className="fa-solid fa-phone text-main me-2"></i> +1 (800) 123-4567</li>
                <li className="mb-2"><i className="fa-solid fa-envelope text-main me-2"></i> support@freshcart.com</li>
                <li className="mb-2"><i className="fa-solid fa-location-dot text-main me-2"></i> 123 Commerce Street, New York, NY 10001</li>
              </ul>
              <div className="social-links d-flex gap-2 mt-4">
                <button type="button" className="social-btn border-0 shadow-none"><i className="fa-brands fa-facebook-f"></i></button>
                <button type="button" className="social-btn border-0 shadow-none"><i className="fa-brands fa-twitter"></i></button>
                <button type="button" className="social-btn border-0 shadow-none"><i className="fa-brands fa-instagram"></i></button>
                <button type="button" className="social-btn border-0 shadow-none"><i className="fa-brands fa-youtube"></i></button>
              </div>
            </div>

            
            <div className="col-lg-2 col-md-3">
              <h6 className="text-white fw-bold mb-4">Shop</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/brands">Brands</Link></li>
                <li><Link to="/category/6439d2d167d6445213f0b07a">Electronics</Link></li>
                <li><Link to="/category/6439d58a67d6445213f0b0ba">Men's Fashion</Link></li>
                <li><Link to="/category/6439d5b967d6445213f0b0bc">Women's Fashion</Link></li>
              </ul>
            </div>

            
            <div className="col-lg-2 col-md-3">
              <h6 className="text-white fw-bold mb-4">Account</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/login">My Account</Link></li>
                <li><Link to="/login">Order History</Link></li> 
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/cart">Shopping Cart</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Create Account</Link></li>
              </ul>
            </div>

            
            <div className="col-lg-2 col-md-3">
              <h6 className="text-white fw-bold mb-4">Support</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/contact">Contact Us</Link></li>
                
                <li><Link to="/help-center">Help Center</Link></li>
                <li><Link to="/shipping-info">Shipping Info</Link></li>
                <li><Link to="/returns">Returns & Refunds</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
              </ul>
            </div>

            
            <div className="col-lg-2 col-md-3">
              <h6 className="text-white fw-bold mb-4">Legal</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom py-3">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
          <p className="footer-text-muted small mb-0">© 2026 FreshCart. All rights reserved.</p>
          <div className="payment-icons d-flex gap-3 text-white opacity-50 small">
            <span><i className="fa-brands fa-cc-visa"></i> Visa</span>
            <span><i className="fa-brands fa-cc-mastercard"></i> Mastercard</span>
            <span><i className="fa-brands fa-cc-paypal"></i> PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}