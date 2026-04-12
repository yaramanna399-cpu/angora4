import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Contact() {
  return (
    <div className="bg-light bg-opacity-25 pb-5">
      
      <div className="bg-main py-5 text-white mb-5 shadow-sm">
        <div className="container py-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-25 rounded-3 p-2 border border-white border-opacity-25">
              <i className="fa-solid fa-headset fs-3"></i>
            </div>
            <div>
              <h1 className="fw-bold m-0 h2">Contact Us</h1>
              <p className="m-0 opacity-75 small">We'd love to hear from you. Get in touch with our team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-3">
              {[
                { icon: 'phone', title: 'Phone', text: 'Mon-Fri from 8am to 6pm', val: '+1 (800) 123-4567' },
                { icon: 'envelope', title: 'Email', text: "We'll respond within 24 hours", val: 'support@freshcart.com' },
                { icon: 'location-dot', title: 'Office', text: '123 Commerce Street, New York, NY 10001 United States' },
                { icon: 'clock', title: 'Business Hours', text: 'Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-4 shadow-sm border border-light">
                  <div className="d-flex gap-3">
                    <div className="bg-light text-main rounded-3 p-2 px-3 align-self-start">
                      <i className={`fa-solid fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className="text-muted small mb-1 white-space-pre">{item.text}</p>
                      {item.val && <p className="text-main fw-bold small m-0">{item.val}</p>}
                    </div>
                  </div>
                </div>
              ))}
              
              
              <div className="bg-white p-4 rounded-4 shadow-sm border border-light mt-2">
                <h6 className="fw-bold mb-3 small">Follow Us</h6>
                <div className="d-flex gap-2">
                  {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map(soc => (
                    <button key={soc} type="button" className="btn btn-light rounded-circle shadow-sm border-0" style={{width:'40px', height:'40px'}}>
                      <i className={`fa-brands fa-${soc} text-muted`}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          
          <div className="col-lg-8">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light h-100">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="bg-light text-main rounded-circle d-flex align-items-center justify-content-center" style={{width:'35px', height:'35px'}}>
                   <i className="fa-solid fa-headset small"></i>
                </div>
                <div>
                   <h5 className="fw-bold mb-0">Send us a Message</h5>
                   <p className="text-muted small mb-0">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email Address</label>
                  <input type="email" className="form-control bg-light border-0 py-2 shadow-none" placeholder="john@example.com" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Subject</label>
                  <select className="form-select bg-light border-0 py-2 shadow-none">
                    <option>Select a subject</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Message</label>
                  <textarea className="form-control bg-light border-0 shadow-none" rows="5" placeholder="How can we help you?"></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="button" className="btn btn-success bg-main border-0 px-4 py-2 fw-bold rounded-3 shadow-sm">
                    <i className="fa-solid fa-paper-plane me-2"></i> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          
          <div className="col-12 mt-4">
            <div className="bg-main bg-opacity-10 border border-success border-opacity-10 p-4 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-white text-main rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{width:'40px', height:'40px'}}>
                  <i className="fa-solid fa-question"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Looking for quick answers?</h6>
                  <p className="text-muted small mb-0 pe-md-5">Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.</p>
                </div>
              </div>
              <Link to="/help-center" className="btn text-main fw-bold p-0 border-0 text-decoration-none">
                Visit Help Center <i className="fa-solid fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}