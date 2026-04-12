import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  const articles = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: 'fa-solid fa-file-signature', 
      content: [
        'By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
        'If you do not agree to these Terms, you must not access or use the Service.',
        'We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.'
      ]
    },
    {
      id: 2,
      title: 'User Eligibility',
      icon: 'fa-solid fa-user-gear', 
      content: [
        'The Service is intended for users who are at least eighteen (18) years of age.',
        'By using the Service, you represent and warrant that you are of legal age to form a binding contract.',
        'If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.'
      ]
    },
    {
      id: 3,
      title: 'Account Registration',
      icon: 'fa-solid fa-address-card', 
      content: [
        'You may be required to create an account to access certain features of the Service.',
        'You agree to provide accurate, current, and complete information during registration.',
        'You are solely responsible for maintaining the confidentiality of your account credentials.',
        'You agree to notify us immediately of any unauthorized use of your account.'
      ]
    },
    {
      id: 4,
      title: 'Orders and Payments',
      icon: 'fa-solid fa-credit-card', 
      content: [
        'All orders placed through the Service are subject to acceptance and availability.',
        'Prices are subject to change without notice prior to order confirmation.',
        'Payment must be made in full at the time of purchase through approved payment methods.',
        'We reserve the right to refuse or cancel any order at our sole discretion.'
      ]
    },
    {
      id: 5,
      title: 'Shipping and Delivery',
      icon: 'fa-solid fa-truck-fast',
      content: [
        'Shipping times are estimates only and are not guaranteed.',
        'Risk of loss and title for items purchased pass to you upon delivery to the carrier.',
        'We are not responsible for delays caused by carriers, customs, or other factors beyond our control.'
      ]
    },
    {
      id: 6,
      title: 'Returns and Refunds',
      icon: 'fa-solid fa-arrow-rotate-left',
      content: [
        'Our return policy allows returns within 14 days of delivery for most items.',
        'Products must be unused and in original packaging.',
        'Refunds will be processed within 5-7 business days after receiving the returned item.'
      ]
    }
  ];

  return (
    <div className="terms-page bg-light pb-5 min-vh-100">
      <div className="bg-main py-5 text-white mb-4 shadow-sm">
        <div className="container py-4">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small m-0">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75 text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Terms of Service</li>
            </ol>
          </nav>
          <div className="d-flex align-items-center gap-4">
            <div className="bg-white bg-opacity-25 rounded-4 p-4 shadow-sm" style={{ backdropFilter: 'blur(10px)' }}>
              <i className="fa-solid fa-file-lines fs-1"></i> 
            </div>
            <div>
              <h1 className="display-5 fw-bold mb-1">Terms of Service</h1>
              <p className="mb-0 opacity-75">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="alert border-warning bg-warning bg-opacity-10 rounded-4 p-4 mb-5 border-2 shadow-sm">
          <div className="d-flex gap-3">
            <div className="bg-warning text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
              <i className="fa-solid fa-circle-exclamation fs-5"></i>
            </div>
            <div>
              <h6 className="fw-bold text-warning-emphasis mb-1">Important Notice</h6>
              <p className="mb-0 text-muted small lh-base">By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.</p>
            </div>
          </div>
        </div>


        <div className="row g-4">
          {articles.map((art) => (
            <div key={art.id} className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-main bg-opacity-10 text-main rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
                       style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                    <i className={`${art.icon} fs-5`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-uppercase text-main fw-bold x-small mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>Article {art.id}</p>
                    <h5 className="fw-bold mb-0 text-dark-blue">{art.title}</h5>
                  </div>
                </div>
                
                <div className="article-content mt-3">
                  {art.content.map((point, idx) => (
                    <div key={idx} className="d-flex gap-3 mb-3 align-items-start">
                      <span className="badge bg-main bg-opacity-10 text-main rounded-1 p-1 d-flex align-items-center justify-content-center" 
                            style={{ fontSize: '0.65rem', minWidth: '32px', height: '20px' }}>
                        {art.id}.{idx + 1}
                      </span>
                      <p className="text-muted small mb-0 lh-base">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-main bg-opacity-10 text-main rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '48px', height: '48px' }}>
                  <i className="fa-solid fa-scale-balanced fs-5"></i>
                </div>
                <div>
                  <p className="text-uppercase text-main fw-bold x-small mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>Article 7</p>
                  <h5 className="fw-bold mb-0 text-dark-blue">Limitation of Liability</h5>
                </div>
              </div>
              <p className="text-muted small lh-lg mb-0">To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-main bg-opacity-10 text-main rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '48px', height: '48px' }}>
                  <i className="fa-solid fa-paper-plane fs-5"></i>
                </div>
                <div>
                  <p className="text-uppercase text-main fw-bold x-small mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>Article 8</p>
                  <h5 className="fw-bold mb-0 text-dark-blue">Contact Us</h5>
                </div>
              </div>
              <p className="text-muted small mb-2">If you have any questions about these Terms, please contact us at:</p>
              <a href="mailto:support@freshcart.com" className="text-main fw-bold text-decoration-none small shadow-none">support@freshcart.com</a>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5 pt-4 border-top align-items-center">
          <Link to="/" className="btn btn-light border rounded-pill px-4 py-2 fw-bold small text-muted shadow-sm">
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
          </Link>
          <Link to="/privacy" className="btn btn-success bg-main border-0 rounded-pill px-4 py-2 fw-bold small shadow-sm">
            View Privacy Policy <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .bg-main { background-color: #198754 !important; }
        .text-main { color: #198754 !important; }
        .text-dark-blue { color: #0a1d37; }
        .x-small { font-size: 0.75rem; }
        .transition-hover {
           transition: all 0.3s ease-in-out;
        }
        .transition-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .breadcrumb-item + .breadcrumb-item::before {
          color: white;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}