import React from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
  
  const cartIconPath = "M 24 -16 C 10.7 -16 0 -5.3 0 8 S 10.7 32 24 32 l 45.3 0 c 3.9 0 7.2 2.8 7.9 6.6 l 52.1 286.3 c 6.2 34.2 36 59.1 70.8 59.1 L 456 384 c 13.3 0 24 -10.7 24 -24 s -10.7 -24 -24 -24 l -255.9 0 c -11.6 0 -21.5 -8.3 -23.6 -19.7 l -5.1 -28.3 l 303.6 0 c 30.8 0 57.2 -21.9 62.9 -52.2 L 568.9 69.9 C 572.6 50.2 557.5 32 537.4 32 l -412.7 0 l -0.4 -2 c -4.8 -26.6 -28 -46 -55.1 -46 L 24 -16 Z M 208 512 a 48 48 0 1 0 0 -96 a 48 48 0 1 0 0 96 Z m 224 0 a 48 48 0 1 0 0 -96 a 48 48 0 1 0 0 96 Z";

  return (
    <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center text-center">
      
      
      <div className="mb-4 position-relative">
        <div className="bg-white shadow-sm rounded-4 p-5 d-inline-block border border-light">
          <svg 
            viewBox="0 0 576 512" 
            width="80" 
            height="80" 
            fill="#0aad0a" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={cartIconPath} />
          </svg>
          
          
          <span 
            className="position-absolute bg-main text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" 
            style={{ 
              width: '50px', 
              height: '50px', 
              fontSize: '14px', 
              top: '-15px', 
              right: '-15px',
              backgroundColor: '#0aad0a'
            }}
          >
            404
          </span>
        </div>

        
        <div className="d-flex justify-content-center gap-2 mt-3 opacity-50">
           <span className="bg-main rounded-circle" style={{width:'8px', height:'8px', backgroundColor:'#0aad0a'}}></span>
           <span className="border border-success rounded-pill" style={{width:'20px', height:'8px'}}></span>
           <span className="bg-main rounded-circle" style={{width:'8px', height:'8px', backgroundColor:'#0aad0a'}}></span>
        </div>
      </div>

      
      <h1 className="fw-bold mb-2 text-dark display-6">Oops! Nothing Here</h1>
      <p className="text-muted mb-5 px-3" style={{ maxWidth: '450px' }}>
        Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
      </p>

      
      <div className="d-flex gap-3 mb-5">
        <Link 
          to="/" 
          className="btn btn-success bg-main border-0 py-2 px-4 fw-bold rounded-3 shadow-sm d-flex align-items-center"
        >
          <i className="fa-solid fa-house me-2"></i> Go to Homepage
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="btn btn-white bg-white border py-2 px-4 fw-bold rounded-3 shadow-sm text-dark"
        >
          <i className="fa-solid fa-arrow-left me-2"></i> Go Back
        </button>
      </div>

      <div className="w-100 bg-white p-4 rounded-4 shadow-sm border border-light" style={{ maxWidth: '600px' }}>
        <h6 className="text-muted x-small fw-bold mb-3 opacity-75 text-uppercase" style={{letterSpacing:'1.5px'}}>
          Popular Destinations
        </h6>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Link to="/products" className="btn btn-light bg-light btn-sm rounded-3 px-3 text-dark small fw-medium text-decoration-none border-0">All Products</Link>
          <Link to="/categories" className="btn btn-light bg-light btn-sm rounded-3 px-3 text-dark small fw-medium text-decoration-none border-0">Categories</Link>
          <Link to="/brands" className="btn btn-light bg-light btn-sm rounded-3 px-3 text-dark small fw-medium text-decoration-none border-0">Brands</Link>
          <Link to="/contact" className="btn btn-light bg-light btn-sm rounded-3 px-3 text-dark small fw-medium text-decoration-none border-0">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}