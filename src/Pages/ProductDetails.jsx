import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../Context/CartContext';
import { wishlistContext } from './Wishlist'; 
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  const { addToCart } = useContext(cartContext);
  const { addToWishlist, removeItemFromWishlist, wishlistDetails } = useContext(wishlistContext) || {};

  async function getProductDetails(id) {
    setLoading(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast.success("Added to Cart 🛒");
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  if (loading) return (
    <div className="py-5 my-5 text-center">
      <i className="fas fa-spinner fa-spin fa-3x text-main"></i>
    </div>
  );

  const isFav = wishlistDetails?.some(item => item.id === productDetails?.id || item._id === productDetails?.id);

  return (
    <div className="container py-5 mt-5">
      {productDetails && (
        <>
          
          <div className="row g-5 bg-white p-4 rounded-4 shadow-sm align-items-center mb-5 border border-light">
            <div className="col-md-4 text-center border-end">
              <img src={productDetails.imageCover} className="w-100 rounded-3 mb-3 shadow-sm" alt={productDetails.title} />
              <div className="d-flex gap-2 justify-content-center">
                {productDetails.images?.slice(0, 3).map((img, i) => (
                   <img key={i} src={img} className="rounded border p-1" style={{width: '60px', height: '60px', objectFit: 'contain'}} alt="" />
                ))}
              </div>
            </div>

            <div className="col-md-8">
              <div className="product-info px-md-4">
                <span className="badge bg-success bg-opacity-10 text-success mb-2 px-3 py-2 rounded-pill">
                   <i className="fa-solid fa-circle me-1" style={{fontSize: '7px'}}></i> In Stock
                </span>
                <h2 className="fw-bold h3 mb-2">{productDetails.title}</h2>
                <h4 className="fw-bold text-main mb-3">{productDetails.price} EGP</h4>
                
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <button onClick={() => addProductToCart(productDetails.id)} className="btn btn-success bg-main border-0 w-100 py-2 fw-bold rounded-3 shadow-sm">
                      <i className="fa-solid fa-cart-shopping me-2"></i> Add to Cart
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-dark w-100 py-2 fw-bold rounded-3 shadow-sm">
                      <i className="fa-solid fa-bolt me-2"></i> Buy Now
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => isFav ? removeItemFromWishlist(productDetails.id) : addToWishlist(productDetails.id)}
                  className={`btn w-100 border py-2 rounded-3 fw-bold transition-all d-flex align-items-center justify-content-center ${isFav ? 'bg-danger bg-opacity-10 text-danger border-danger' : 'bg-light'}`}
                >
                  <i className={`fa-heart me-2 ${isFav ? 'fa-solid' : 'fa-regular'}`}></i>
                  {isFav ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          
          <div className="mt-5 bg-white rounded-4 shadow-sm border overflow-hidden">
            <div className="d-flex border-bottom bg-light bg-opacity-50">
               <button onClick={() => setActiveTab('details')} className={`btn rounded-0 py-3 px-4 fw-bold border-end transition-all ${activeTab === 'details' ? 'bg-white text-success border-top border-4 border-success' : 'text-muted border-0'}`}>
                 <i className="fa-solid fa-file-lines me-2"></i> Product Details
               </button>
               <button onClick={() => setActiveTab('reviews')} className={`btn rounded-0 py-3 px-4 fw-bold border-end transition-all ${activeTab === 'reviews' ? 'bg-white text-success border-top border-4 border-success' : 'text-muted border-0'}`}>
                 <i className="fa-solid fa-star me-2"></i> Reviews (2)
               </button>
               <button onClick={() => setActiveTab('shipping')} className={`btn rounded-0 py-3 px-4 fw-bold transition-all ${activeTab === 'shipping' ? 'bg-white text-success border-top border-4 border-success' : 'text-muted border-0'}`}>
                 <i className="fa-solid fa-truck-fast me-2"></i> Shipping & Returns
               </button>
            </div>

            <div className="p-4">
              {activeTab === 'details' && (
                <div className="animate__animated animate__fadeIn">
                  <h6 className="fw-bold mb-3 h6">About this Product</h6>
                  <p className="text-muted small mb-4 leading-relaxed">{productDetails.description}</p>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 h-100 border shadow-sm">
                        <h6 className="fw-bold small border-bottom pb-2 mb-3">Product Information</h6>
                        <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Category</span><span className="fw-bold">Women's Fashion</span></div>
                        <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Subcategory</span><span className="fw-bold">Women's Clothing</span></div>
                        <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Brand</span><span className="fw-bold">DeFacto</span></div>
                        <div className="d-flex justify-content-between mb-0 small"><span className="text-muted">Items Sold</span><span className="fw-bold text-success">531+ sold</span></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 h-100 border shadow-sm">
                        <h6 className="fw-bold small border-bottom pb-2 mb-3">Key Features</h6>
                        <ul className="list-unstyled m-0">
                          <li className="small mb-2 text-muted"><i className="fa-solid fa-check text-success me-2"></i> Premium Quality Product</li>
                          <li className="small mb-2 text-muted"><i className="fa-solid fa-check text-success me-2"></i> 100% Authentic Guarantee</li>
                          <li className="small mb-2 text-muted"><i className="fa-solid fa-check text-success me-2"></i> Fast & Secure Packaging</li>
                          <li className="small mb-0 text-muted"><i className="fa-solid fa-check text-success me-2"></i> Quality Tested</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
              {activeTab === 'reviews' && (
                <div className="animate__animated animate__fadeIn row g-4 align-items-center">
                  <div className="col-md-3 text-center border-end">
                    <h1 className="fw-bold m-0" style={{fontSize: '60px'}}>{productDetails.ratingsAverage || 4}</h1>
                    <div className="text-warning mb-2"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i></div>
                    <p className="small text-muted m-0">Based on 2 reviews</p>
                  </div>
                  <div className="col-md-9 ps-md-4">
                     {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="d-flex align-items-center mb-1 small gap-2">
                           <span className="text-muted" style={{width: '45px'}}>{star} star</span>
                           <div className="progress flex-grow-1 rounded-pill" style={{height: '6px'}}><div className="progress-bar bg-warning" style={{width: star === 5 ? '25%' : star === 4 ? '60%' : '10%'}}></div></div>
                           <span className="text-muted" style={{width: '35px'}}>{star === 5 ? '25%' : star === 4 ? '60%' : '10%'}%</span>
                        </div>
                     ))}
                  </div>
                </div>
              )}

              
              {activeTab === 'shipping' && (
                <div className="animate__animated animate__fadeIn">
                  <div className="row g-4 mb-4">
                     <div className="col-md-6">
                        <div className="p-4 bg-success bg-opacity-10 rounded-3 h-100 border border-success border-opacity-10">
                           <div className="d-flex align-items-center gap-2 mb-3 text-success fw-bold">
                              <i className="fa-solid fa-truck fs-5"></i><span>Shipping Information</span>
                           </div>
                           <ul className="list-unstyled m-0 small text-muted">
                              <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i> Free shipping on orders over $50</li>
                              <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i> Standard delivery: 3-5 business days</li>
                              <li><i className="fa-solid fa-check text-success me-2"></i> Track your order in real-time</li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="p-4 bg-light rounded-3 h-100 border">
                           <div className="d-flex align-items-center gap-2 mb-3 text-dark fw-bold">
                              <i className="fa-solid fa-rotate-left fs-5"></i><span>Returns & Refunds</span>
                           </div>
                           <ul className="list-unstyled m-0 small text-muted">
                              <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i> 30-day hassle-free returns</li>
                              <li className="mb-2"><i className="fa-solid fa-check text-success me-2"></i> Full refund or exchange available</li>
                              <li><i className="fa-solid fa-check text-success me-2"></i> Easy online return process</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                     <i className="fa-solid fa-shield-halved text-muted fs-3"></i>
                     <div>
                        <h6 className="fw-bold m-0 small">Buyer Protection Guarantee</h6>
                        <p className="small text-muted m-0">Get a full refund if your order doesn't arrive as described.</p>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}