import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { tokenContext } from '../Context/TokenContext'; 
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  let { token } = useContext(tokenContext);
  let { getLoggedUserCart, updateProductCount, removeItem, clearCart } = useContext(cartContext);

  async function getCart() {
    setLoading(true);
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoading(false);
  }

  async function updateCount(id, count) {
    if (count < 1) return;
    let response = await updateProductCount(id, count);
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
      toast.success("Quantity Updated");
    }
  }

  async function deleteItem(id) {
    let response = await removeItem(id);
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
      toast.error("Item Removed");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <div className="py-5 my-5 text-center"><i className="fas fa-spinner fa-spin fa-3x text-main"></i></div>;

  return (
    <>
      <div className="container py-5 mt-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className='text-decoration-none text-dark' to="/">Home</Link></li>
            <li className="breadcrumb-item active text-main" aria-current="page">Shopping Cart</li>
          </ol>
        </nav>

        <div className="d-flex align-items-center mb-4">
          <div className="bg-success p-2 rounded-2 me-3">
             <i className="fa-solid fa-cart-shopping text-white fs-4"></i>
          </div>
          <div>
            <h2 className="fw-bold m-0">Shopping Cart</h2>
            <p className="text-muted m-0">You have <span className="text-main fw-bold">{cartDetails?.products.length || 0} items</span> in your cart</p>
          </div>
        </div>

        {cartDetails && cartDetails.products.length > 0 ? (
          <div className="row g-4">
            <div className="col-lg-8">
              {cartDetails.products.map((item) => (
                <div key={item.product.id} className="card border-0 shadow-sm p-3 mb-3 rounded-4">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img src={item.product.imageCover} className="img-fluid rounded-3" alt={item.product.title} />
                    </div>
                    <div className="col-md-5">
                      <h5 className="fw-bold h6">{item.product.title.split(' ').slice(0, 3).join(' ')}</h5>
                      <span className="badge bg-success-subtle text-success mb-2">{item.product.category.name}</span>
                      <h6 className="text-main fw-bold">{item.price} EGP</h6>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex align-items-center border rounded-pill px-2 py-1 justify-content-between" style={{width: '100px'}}>
                        <button onClick={() => updateCount(item.product.id, item.count - 1)} className="btn btn-sm border-0">-</button>
                        <span className="fw-bold">{item.count}</span>
                        <button onClick={() => updateCount(item.product.id, item.count + 1)} className="btn btn-sm border-0 text-main">+</button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="small text-muted mb-1">Total</p>
                      <h6 className="fw-bold mb-3">{item.price * item.count} EGP</h6>
                      <button onClick={() => deleteItem(item.product.id)} className="btn btn-sm btn-outline-danger border-0 bg-danger-subtle rounded-circle">
                         <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-4">
                <Link to="/" className="text-decoration-none text-main fw-bold">
                  <i className="fa-solid fa-arrow-left me-2"></i> Continue Shopping
                </Link>
                <button onClick={clearCart} className="btn text-muted p-0">
                  <i className="fa-solid fa-trash me-1"></i> Clear all items
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="bg-dark p-3">
                   <h5 className="text-white m-0">Order Summary</h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal ({cartDetails.products.length} items)</span>
                    <span className="fw-bold">{cartDetails.totalCartPrice} EGP</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success fw-bold">Calculated at checkout</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="fw-bold">Estimated Total</h5>
                    <h5 className="fw-bold text-main">{cartDetails.totalCartPrice} EGP</h5>
                  </div>

                  
                  {token ? (
                    <Link to="/address" className="btn btn-success w-100 py-3 rounded-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                      <i className="fa-solid fa-credit-card"></i> Proceed to Checkout
                    </Link>
                  ) : (
                    <Link to="/login" className="btn btn-warning w-100 py-3 rounded-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                      <i className="fa-solid fa-right-to-bracket"></i> Login to Checkout
                    </Link>
                  )}

                  <p className="text-center small text-muted">Don't have an account? <Link to="/register" className='text-main fw-bold text-decoration-none'>Sign up</Link></p>
                  
                  <ul className="list-unstyled mt-4 small text-muted border-top pt-3">
                    <li className="mb-2"><i className="fa-solid fa-check text-main me-2"></i> Your cart items will be saved</li>
                    <li className="mb-2"><i className="fa-solid fa-check text-main me-2"></i> Track your orders easily</li>
                    <li><i className="fa-solid fa-check text-main me-2"></i> Access exclusive member deals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center text-center py-5 my-5">
              <div className="bg-light d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '120px', height: '120px' }}>
                <i className="fa-solid fa-box-open text-secondary opacity-25" style={{ fontSize: '50px' }}></i>
              </div>
              <h2 className="fw-bold mb-3">Your cart is empty</h2>
              <p className="text-muted mb-4 px-lg-5">Looks like you haven't added anything to your cart yet.</p>
              <div className="d-flex justify-content-center">
                <Link to="/products" className="btn btn-success bg-main border-0 py-2 px-5 fw-bold rounded-3 shadow-sm">
                  Start Shopping <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
              </div>
          </div>
        )}
      </div>
    </>
  );
}