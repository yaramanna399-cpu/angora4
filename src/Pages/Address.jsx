import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../Context/CartContext';

export default function Address() {
  const [loading, setLoading] = useState(false);
  let { onlinePayment, cartId } = useContext(cartContext);

  async function handleAddress(values) {
    setLoading(true);
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleAddress
  });

  return (
    <div className="container py-5 mt-5">
      <div className="row g-4 justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center mb-4 border-bottom pb-3">
               <div className="bg-success-subtle p-2 rounded-3 me-3">
                  <i className="fa-solid fa-truck-fast text-success fs-4"></i>
               </div>
               <h3 className="fw-bold m-0 h4">Shipping Details</h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted small">Full Address Details</label>
                <textarea 
                  name="details" 
                  onChange={formik.handleChange} 
                  className="form-control border-light-subtle bg-light py-2" 
                  rows="2"
                  placeholder="Street name, building number, apartment..."
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold text-muted small">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone" 
                    onChange={formik.handleChange} 
                    className="form-control border-light-subtle bg-light py-2" 
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold text-muted small">City / Area</label>
                  <input 
                    type="text"
                    name="city" 
                    onChange={formik.handleChange} 
                    className="form-control border-light-subtle bg-light py-2" 
                    placeholder="e.g. Cairo"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-success bg-main w-100 py-3 mt-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : (
                  <>
                    <i className="fa-solid fa-lock"></i>
                    Proceed to Secure Payment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-light border-start border-4 border-success">
            <h5 className="fw-bold mb-3">Secure Checkout</h5>
            <p className="small text-muted mb-4">
              Your personal data will be used to process your order and support your experience throughout this website.
            </p>
            
            <div className="d-flex flex-column gap-3">
               <div className="d-flex align-items-center gap-3 bg-white p-3 rounded-3 shadow-sm">
                  <i className="fa-solid fa-shield-check text-success fs-3"></i>
                  <div>
                    <p className="m-0 fw-bold small">SSL Encrypted</p>
                    <p className="m-0 text-muted extra-small" style={{fontSize: '11px'}}>Your connection is secure</p>
                  </div>
               </div>
               
               <div className="d-flex align-items-center gap-3 bg-white p-3 rounded-3 shadow-sm">
                  <i className="fa-brands fa-stripe text-primary fs-3"></i>
                  <div>
                    <p className="m-0 fw-bold small">Powered by Stripe</p>
                    <p className="m-0 text-muted extra-small" style={{fontSize: '11px'}}>International payment gateway</p>
                  </div>
               </div>
            </div>

            <div className="mt-4 pt-3 border-top">
               <p className="small text-muted text-center m-0">
                  <i className="fa-solid fa-circle-info me-1"></i>
                  Payments are processed externally
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}