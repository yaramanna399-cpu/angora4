import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';


import { wishlistContext } from './Wishlist'; 
import { cartContext } from '../Context/CartContext'; 
import toast from 'react-hot-toast';

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('filter');

 
  const wishlistData = useContext(wishlistContext);
  const cartData = useContext(cartContext);

  
  const { addToWishlist, removeItemFromWishlist, wishlistDetails } = wishlistData || {};
  const { addToCart } = cartData || {};

  async function getProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }

  async function toggleWishlist(id, isFav) {
    if (!addToWishlist) {
      toast.error("Wishlist context not found!");
      return;
    }
    if (!isFav) {
      let res = await addToWishlist(id);
      if (res?.data?.status === "success") {
        toast.success("Added to Wishlist ❤️");
      }
    } else {
      let res = await removeItemFromWishlist(id);
      if (res?.data?.status === "success") {
        toast.error("Removed from Wishlist 💔");
      }
    }
  }

  async function addProductToCart(id) {
    if (!addToCart) return;
    let response = await addToCart(id);
    if (response?.data?.status === "success") {
      toast.success("Added to Cart 🛒");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="all-products-page pt-5">
      <div className={`${filterType === 'sale' ? 'bg-danger' : 'bg-main'} py-5 text-white mt-3 text-center shadow-sm`}>
        <h1 className="fw-bold h2">{filterType === 'sale' ? 'Flash Sale' : 'Our Products'}</h1>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {products
            .filter(p => filterType === 'sale' ? (p.priceAfterDiscount < p.price) : true)
            .map((product) => {
              
              
              const isFav = wishlistDetails?.some(item => String(item.id) === String(product.id) || String(item._id) === String(product.id));

              return (
                <div key={product.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                  <div className="product-card h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column">
                    
                    <div className="p-2 text-center position-relative product-img-box">
                      <Link to={`/productdetails/${product.id}`}>
                        <img src={product.imageCover} className="w-100 object-fit-contain" style={{height: '160px'}} alt={product.title} />
                      </Link>
                      
                      
                      <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2" style={{zIndex: '20'}}>
                        <button 
                          onClick={() => toggleWishlist(product.id, isFav)}
                          className="btn btn-sm bg-white border rounded-circle shadow-sm"
                          style={{width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                          <i className={`fa-solid fa-heart ${isFav ? 'text-danger' : 'text-muted opacity-50'}`}></i>
                        </button>
                        
                        <Link 
                          to={`/productdetails/${product.id}`} 
                          className="btn btn-sm bg-white border rounded-circle shadow-sm"
                          style={{width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                          <i className="fa-regular fa-eye text-main"></i>
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 pt-0 flex-grow-1 d-flex flex-column">
                      <h3 className="h6 fw-bold text-truncate mb-2 small">{product.title}</h3>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fw-bold small">{product.price} EGP</span>
                        <button 
                          onClick={() => addProductToCart(product.id)}
                          className="btn bg-main text-white rounded-circle p-0 shadow-sm" 
                          style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}
                        >
                          <i className="fa-solid fa-plus small"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}