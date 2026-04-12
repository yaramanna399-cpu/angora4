import React, { useContext, useEffect, useState, useCallback, createContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';


export const wishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLoggedUserWishlist = useCallback(async () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: { token: localStorage.getItem("userToken") }
    });
  }, []);

  const getWishlist = useCallback(async () => {
    setLoading(true);
    try {
      let response = await getLoggedUserWishlist();
      if (response?.data?.status === "success") {
        setWishlistData(response.data.data);
      }
    } catch (error) { console.error("Error:", error); }
    setLoading(false);
  }, [getLoggedUserWishlist]);

  const addToWishlist = async (productId) => {
    try {
      let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
        { productId }, 
        { headers: { token: localStorage.getItem("userToken") } });
      if (res.data.status === "success") getWishlist();
      return res;
    } catch (error) { return error; }
  };

  const removeItemFromWishlist = async (productId) => {
    try {
      let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem("userToken") }
      });
      if (res.data.status === "success") {
        setWishlistData((prev) => prev.filter(item => item.id !== productId && item._id !== productId));
      }
      return res;
    } catch (error) { return error; }
  };

  useEffect(() => { getWishlist(); }, [getWishlist]);

  return (
    <wishlistContext.Provider value={{ addToWishlist, removeItemFromWishlist, wishlistDetails: wishlistData, loading, getWishlist }}>
      {children}
    </wishlistContext.Provider>
  );
}


export default function Wishlist() {
  const { wishlistDetails, loading, removeItemFromWishlist } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  async function deleteItem(id) {
    let response = await removeItemFromWishlist(id);
    if (response?.data?.status === "success") {
      toast.error("Removed from Wishlist 💔");
    }
  }

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response?.data?.status === "success") {
      toast.success("Added to Cart 🛒");
    }
  }

  if (loading) return (
    <div className="py-5 my-5 text-center">
      <i className="fas fa-spinner fa-spin fa-3x text-main"></i>
    </div>
  );

  return (
    <div className="container py-5 mt-5">
      {wishlistDetails && wishlistDetails.length > 0 ? (
        <>
          <div className="d-flex align-items-center mb-5 pb-3 border-bottom border-light">
            <div className="bg-success bg-opacity-10 p-3 rounded-4 me-3">
               <i className="fa-solid fa-heart-circle-check text-success fs-3"></i>
            </div>
            <div>
              <h2 className="fw-bold m-0 h4">My Wishlist</h2>
              <p className="text-muted small m-0">You have {wishlistDetails.length} items saved</p>
            </div>
          </div>

          <div className="row g-4">
            {wishlistDetails.map((item) => (
              <div key={item.id || item._id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="product-card bg-white border border-light-subtle rounded-4 overflow-hidden h-100 shadow-sm transition-all position-relative">
                  
                 
                  <button 
                    onClick={() => deleteItem(item.id || item._id)} 
                    className="btn btn-sm btn-light text-danger position-absolute end-0 top-0 m-3 rounded-circle shadow-sm border border-light"
                    style={{ zIndex: '10', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fa-solid fa-xmark small"></i>
                  </button>

                 
                  <Link to={`/productdetails/${item.id || item._id}`} className="text-center d-block p-4 bg-light bg-opacity-25">
                    <img src={item.imageCover} className="img-fluid rounded-3" style={{height: '160px', objectFit: 'contain'}} alt={item.title} />
                  </Link>

                  <div className="card-body p-3">
                   
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold" style={{fontSize: '9px'}}>
                            {item.category?.name}
                        </span>
                        <span className="text-muted fw-medium" style={{fontSize: '10px'}}>{item.brand?.name || 'Brand'}</span>
                    </div>

                    
                    <Link to={`/productdetails/${item.id || item._id}`} className="text-decoration-none text-dark">
                        <h3 className="fw-bold h6 text-truncate mb-1" style={{fontSize: '14px'}}>{item.title}</h3>
                    </Link>
                    <div className="mb-2">
                        <span className="text-success fw-bold" style={{fontSize: '10px'}}><i className="fa-solid fa-circle me-1" style={{fontSize:'7px'}}></i> In Stock</span>
                    </div>
                    
                    
                    <div className="mb-3 text-warning" style={{fontSize: '11px'}}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <span className="text-muted ms-2">({item.ratingsAverage || 4})</span>
                    </div>

                    
                    <div className="mb-3 border-top pt-2">
                        <div className="d-flex justify-content-between mb-1" style={{fontSize: '11px'}}>
                            <span className="text-muted">Items Sold:</span>
                            <span className="text-dark fw-bold">531+ sold</span>
                        </div>
                        <div className="d-flex align-items-center mb-1" style={{fontSize: '11px'}}>
                            <i className="fa-solid fa-shield-check text-success me-2"></i>
                            <span className="text-muted">100% Authentic</span>
                        </div>
                        <div className="d-flex align-items-center" style={{fontSize: '11px'}}>
                            <i className="fa-solid fa-truck-fast text-success me-2"></i>
                            <span className="text-muted">Fast Shipping</span>
                        </div>
                    </div>

                    
                    <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light">
                        <span className="text-dark fw-bold fs-6">{item.price} <small className="text-success small">EGP</small></span>
                        <button 
                            onClick={() => addProductToCart(item.id || item._id)} 
                            className="btn btn-success bg-main border-0 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                            style={{width: '36px', height: '36px'}}
                        >
                            <i className="fa-solid fa-cart-plus small"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-5 mt-5 bg-white rounded-4 border border-light-subtle shadow-sm p-5">
            <div className="mb-4">
                <i className="fa-solid fa-heart-crack text-muted opacity-25" style={{fontSize: '80px'}}></i>
            </div>
            <h2 className="fw-bold text-muted h4">Your wishlist is empty</h2>
            <p className="text-muted mb-4">You haven't added any products to your wishlist yet.</p>
            <Link to="/allproducts" className="btn btn-success bg-main border-0 py-2 px-5 fw-bold rounded-pill shadow-sm text-white text-decoration-none">Start Shopping</Link>
        </div>
      )}
    </div>
  );
}