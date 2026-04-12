import React, { useEffect } from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();

  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' 
    });
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <Navbar />
      <main className="flex-grow-1 pt-5 mt-4" style={{ overflowX: 'hidden' }}>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
}