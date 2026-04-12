import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { tokenContext } from '../Context/TokenContext';
import { cartContext } from '../Context/CartContext';

export default function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  let { token, setToken } = useContext(tokenContext);
  let { cartNumber, getLoggedUserCart } = useContext(cartContext);
  
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const logoUrl = "https://freshcart-route.vercel.app/_next/static/media/freshcart-logo.49f1b44d.svg";

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getLoggedUserCart();
    }
  }, []);

  function logOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }

  const isActive = (path) => location.pathname === path ? 'text-main fw-bold' : 'text-dark';

  return (
    <header className="fixed-top bg-white border-bottom main-header font-sm">
      
      <div className="top-bar py-2 border-bottom d-none d-lg-block bg-light text-muted small">
        <div className="container-fluid px-lg-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-4 align-items-center">
              <span><i className="fa-solid fa-truck text-success me-1"></i> Free Shipping on Orders 500 EGP</span>
              <span><i className="fa-solid fa-box text-success me-1"></i> New Arrivals Daily</span>
            </div>
            <div className="d-flex gap-4 align-items-center">
              <span><i className="fa-solid fa-phone me-1"></i> +1 (800) 123-4567</span>
              <span><i className="fa-regular fa-envelope me-1"></i> support@freshcart.com</span>
              <div className="ms-3 border-start ps-3 d-flex gap-3">
                {!token ? (
                  <>
                    <Link className="text-muted text-decoration-none" to="/login"><i className="fa-regular fa-user me-1"></i> Sign In</Link>
                    <Link className="text-muted text-decoration-none" to="/register"><i className="fa-solid fa-user-plus me-1"></i> Sign Up</Link>
                  </>
                ) : (
                  <Link className="text-main fw-bold text-decoration-none" to="/"><i className="fa-regular fa-circle-user me-1"></i> My Profile</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <nav className="navbar navbar-expand-lg bg-white py-3">
        <div className="container-fluid px-lg-5">
          <div className="d-flex align-items-center w-100 gap-4">
            
            
            <Link className="navbar-brand me-0" to="/">
              <img src={logoUrl} alt="FreshCart" style={{ width: '150px' }} />
            </Link>

            
            <div className="flex-grow-1 d-none d-md-block" style={{ maxWidth: '400px' }}>
              <div className="input-group border rounded-3 overflow-hidden bg-light border-light shadow-sm">
                <input type="text" className="form-control border-0 bg-transparent py-2 ps-3 small shadow-none" placeholder="Search for products..." />
                <button className="btn bg-main text-white px-3 border-0">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            
            <div className="collapse navbar-collapse flex-grow-0" id="navContent">
              <ul className="navbar-nav gap-3 align-items-center fw-medium text-dark">
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/products')}`} to="/products">Shop</Link>
                </li>
                
                
                <li className="nav-item position-relative" 
                    onMouseEnter={() => setIsCategoryOpen(true)} 
                    onMouseLeave={() => setIsCategoryOpen(false)}>
                  <span className="nav-link cursor-pointer border rounded-2 px-2 py-1 small d-flex align-items-center gap-1">
                    Categories <i className={`fa-solid fa-chevron-down transition-all ${isCategoryOpen ? 'rotate-180 text-main' : ''}`} style={{fontSize: '10px'}}></i>
                  </span>
                  
                  {isCategoryOpen && (
                    <ul className="dropdown-menu show shadow-sm border-0 mt-0 py-2 animate__animated animate__fadeIn position-absolute">
                      <li><Link className="dropdown-item py-2 border-bottom small" to="/all-categories">All Categories</Link></li>
                      <li><Link className="dropdown-item py-2 small" to="/category/6439d2d167d6445213f0b07a">Electronics</Link></li>
                      <li><Link className="dropdown-item py-2 small" to="/category/6439d5b967d6445213f0b0bc">Women's Fashion</Link></li>
                      <li><Link className="dropdown-item py-2 small" to="/category/6439d58a67d6445213f0b0ba">Men's Fashion</Link></li>
                    </ul>
                  )}
                </li>

                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/brands')}`} to="/brands">Brands</Link>
                </li>
              </ul>
            </div>

            
            <div className="d-flex align-items-center gap-3 ms-auto">
              <div className="d-none d-xl-flex align-items-center gap-2 border-end pe-3">
                 <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width:'35px', height:'35px'}}>
                    <i className="fa-solid fa-headset text-main"></i>
                 </div>
                 <div className="lh-1">
                    <span className="text-muted d-block" style={{fontSize:'9px'}}>Support</span>
                    <span className="fw-bold" style={{fontSize:'12px'}}>24/7 Help</span>
                 </div>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <Link className="text-dark-emphasis" to="/wishlist">
                  <i className="fa-regular fa-heart fs-5"></i>
                </Link>
                <Link className="text-dark-emphasis position-relative" to="/cart">
                  <i className="fa-solid fa-cart-shopping fs-5"></i>
                  {cartNumber > 0 && (
                    <span className="badge bg-main text-white position-absolute top-0 start-100 translate-middle rounded-pill d-flex align-items-center justify-content-center" style={{fontSize:'10px', minWidth:'18px', height:'18px'}}>
                        {cartNumber}
                    </span>
                  )}
                </Link>
              </div>

              
              {!token ? (
                <Link to="/login" className="btn bg-main text-white rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-2 shadow-sm small">
                  <i className="fa-regular fa-user"></i> Sign In
                </Link>
              ) : (
                <button onClick={logOut} className="btn btn-outline-danger rounded-3 px-3 py-1 fw-bold small">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}