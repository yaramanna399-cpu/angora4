import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const articles = [
    { 
      id: 1, 
      title: 'Information We Collect', 
      icon: "fa-solid fa-database",
      content: ['Personal Data: Name, email address, phone number.', 'Payment Data: Securely processed info.', 'Technical Data: IP address and device info.', 'Usage Data: Browsing behavior.'] 
    },
    { 
      id: 2, 
      title: 'How We Use Your Info', 
      icon: "fa-solid fa-shield-check",
      content: ['To process and fulfill orders.', 'To send confirmation updates.', 'To provide customer support.', 'To improve user experience.'] 
    },
    { 
      id: 3, 
      title: 'Data Protection', 
      icon: "fa-solid fa-user-shield",
      content: ['SSL/TLS encryption protocols.', 'PCI-compliant processing.', 'Regular security audits.', 'Restricted internal access.'] 
    },
    { 
      id: 4, 
      title: 'Security Lockdown', 
      icon: "fa-solid fa-lock",
      content: ['No selling of personal data.', 'Shared only with trusted partners.', 'Legal disclosure when required.'] 
    },
    { 
      id: 5, 
      title: 'Information Sharing', 
      icon: "fa-solid fa-share-nodes",
      content: ['Access your personal data.', 'Request corrections or erasure.', 'Request data portability.', 'Opt-out of marketing.'] 
    },
    { 
      id: 6, 
      title: 'Your Rights & Cookies', 
      icon: "fa-solid fa-cookie-bite",
      content: ['Control cookie settings.', 'Remembering site preferences.', 'Improving site functionality.'] 
    }
  ];

  return (
    <div className="privacy-page bg-light pb-5">
      <div className="bg-main py-5 text-white mb-5 shadow-sm">
        <div className="container">
          <div className="d-flex align-items-center gap-3">
             <div className="bg-white bg-opacity-25 rounded-3 p-3">
                <i className="fa-solid fa-shield-halved fs-2"></i>
             </div>
             <div>
                <h1 className="fw-bold mb-0">Privacy Policy</h1>
                <p className="mb-0 opacity-75 small">Last updated: April 2026</p>
             </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {articles.map((art) => (
            <div key={art.id} className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-main bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" 
                       style={{width: '45px', height: '45px', flexShrink: 0}}>
                    <i className={`${art.icon} text-main fs-5`}></i>
                  </div>
                  <div>
                    <p className="text-uppercase text-main fw-bold x-small mb-0">Article {art.id}</p>
                    <h5 className="fw-bold mb-0 text-dark-blue">{art.title}</h5>
                  </div>
                </div>
                <ul className="list-unstyled mb-0 ms-1">
                  {art.content.map((point, idx) => (
                    <li key={idx} className="text-muted small mb-2 d-flex gap-2 align-items-start">
                      <span className="text-main fw-bold mt-1" style={{fontSize: '8px'}}>●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        
        <div className="row g-4 mt-3">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
               <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-main bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px'}}>
                    <i className="fa-solid fa-clock-rotate-left text-main fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark-blue">Data Retention</h5>
               </div>
               <p className="text-muted small mb-0">We keep your data for as long as needed to provide services or as required by law.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
               <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-main bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px'}}>
                    <i className="fa-solid fa-envelope text-main fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark-blue">Contact Us</h5>
               </div>
               <p className="text-muted small mb-1">Reach out to our support team:</p>
               <a href="mailto:privacy@freshcart.com" className="text-main fw-bold text-decoration-none small">privacy@freshcart.com</a>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5 pt-4 border-top">
           <Link to="/" className="btn btn-outline-secondary rounded-3 px-4 py-2 small fw-bold">
             <i className="fa-solid fa-arrow-left me-2"></i> Home
           </Link>
           <Link to="/terms" className="btn btn-success bg-main border-0 rounded-3 px-4 py-2 small fw-bold">
             Terms of Service <i className="fa-solid fa-arrow-right ms-2"></i>
           </Link>
        </div>
      </div>
    </div>
  );
}