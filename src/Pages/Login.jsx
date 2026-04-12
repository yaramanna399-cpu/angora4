import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { tokenContext } from '../Context/TokenContext';


import loginImage from '../assets/images/2e5810ff3e-e750761ebcd4ae5907db.png';

export default function Login() {
  const navigate = useNavigate();
  let { setToken } = useContext(tokenContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
        if (data.message === 'success') {
          localStorage.setItem('userToken', data.token);
          setToken(data.token);
          navigate('/');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="container mt-5 py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 bg-white shadow-lg rounded-4 overflow-hidden border align-items-stretch" style={{ maxWidth: '1100px' }}>
        
        
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center p-5 bg-light position-relative text-center">
          <img 
            src={loginImage} 
            alt="FreshCart Shopping Cart" 
            className="img-fluid mb-4" 
            style={{ maxWidth: '85%' }}
          />
          <div className="mt-2">
            <h2 className="fw-bold h4 text-dark mb-3">FreshCart - Your One-Stop Shop for Fresh Products</h2>
            <p className="text-muted small px-4">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
            
            <div className="d-flex justify-content-center gap-4 mt-4 small fw-medium text-muted">
              <span><i className="fa-solid fa-truck text-success me-1"></i> Free Delivery</span>
              <span><i className="fa-solid fa-shield-halved text-success me-1"></i> Secure Payment</span>
              <span><i className="fa-solid fa-headset text-success me-1"></i> 24/7 Support</span>
            </div>
          </div>
        </div>

        
        <div className="col-md-6 p-4 p-lg-5 border-start">
          <div className="text-center mb-4">
            <img src="https://freshcart-route.vercel.app/_next/static/media/freshcart-logo.49f1b44d.svg" width="160" alt="FreshCart Logo" className="mb-3" />
            <h1 className="h4 fw-bold mb-1">Welcome Back!</h1>
            <p className="text-muted small">Sign in to continue your fresh shopping experience</p>
          </div>

          
          <div className="d-grid gap-2 mb-4">
            <button type="button" className="btn btn-outline-dark small py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm bg-white">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
              <span className="fw-medium">Continue with Google</span>
            </button>
            <button type="button" className="btn btn-outline-dark small py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm bg-white">
              <i className="fa-brands fa-facebook text-primary fs-5"></i>
              <span className="fw-medium">Continue with Facebook</span>
            </button>
          </div>

          <div className="text-center position-relative mb-4">
            <hr className="text-muted opacity-25" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted fw-bold" style={{ fontSize: '10px' }}>
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {error && <div className="alert alert-danger py-2 small border-0 shadow-sm">{error}</div>}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-light border-end-0 text-muted"><i className="fa-regular fa-envelope"></i></span>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className={`form-control bg-light border-light border-start-0 shadow-none py-2 ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.errors.email && formik.touched.email && <div className="text-danger small mt-1" style={{fontSize:'11px'}}>{formik.errors.email}</div>}
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-bold text-dark mb-0">Password</label>
                <Link className="text-success small text-decoration-none fw-bold">Forgot Password?</Link>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-light border-end-0 text-muted"><i className="fa-solid fa-lock"></i></span>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className={`form-control bg-light border-light border-start-0 shadow-none py-2 ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps('password')}
                />
                <span className="input-group-text bg-light border-light border-start-0 text-muted cursor-pointer"><i className="fa-regular fa-eye-slash small"></i></span>
              </div>
              {formik.errors.password && formik.touched.password && <div className="text-danger small mt-1" style={{fontSize:'11px'}}>{formik.errors.password}</div>}
            </div>

            <div className="mb-4 form-check">
              <input type="checkbox" className="form-check-input shadow-none" id="remember" />
              <label className="form-check-label small text-muted" htmlFor="remember">Keep me signed in</label>
            </div>

            <button type="submit" disabled={isLoading} className="btn bg-main text-white w-100 py-2 fw-bold rounded-3 shadow-sm border-0">
              {isLoading ? <i className="fas fa-spinner fa-spin me-2"></i> : 'Sign In'}
            </button>
          </form>

          <p className="text-center small mt-4 mb-0 text-muted">
            New to FreshCart? <Link to="/register" className="text-success fw-bold text-decoration-none ms-1">Create an account</Link>
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4 pt-3 border-top text-muted" style={{ fontSize: '10px' }}>
            <span><i className="fa-solid fa-lock me-1"></i> SSL Secured</span>
            <span><i className="fa-solid fa-users me-1"></i> 50K+ Users</span>
            <span><i className="fa-solid fa-star text-warning me-1"></i> 4.9 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}