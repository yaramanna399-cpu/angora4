import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext'; 
import toast from 'react-hot-toast';
import MainSlider from '../Components/MainSlider';
import Features from '../Components/Features'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [email, setEmail] = useState("");

  let { addToCart, addToWishlist } = useContext(cartContext);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(`Success! Check your mail: ${email}`, {
        position: 'bottom-center',
        duration: 3000
      });
      setEmail("");
    } else {
      toast.error("Please enter a valid email");
    }
  };

  async function getData() {
    setIsLoading(true);
    try {
      let resProducts = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      let resCategories = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setProducts(resProducts.data.data);
      setCategories(resCategories.data.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
    setIsLoading(false);
  }

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast.success(response.data.message, { 
        duration: 2500, 
        position: 'top-right',
        style: { background: '#198754', color: '#fff' }
      });
    } else {
      toast.error("Failed to add product. Please login first.");
    }
  }

  async function addWish(id) {
    let response = await addToWishlist(id);
    if (response?.data?.status === 'success') {
      toast.success("Product added to wishlist ❤️", { position: 'top-right' });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fas fa-spinner fa-spin fa-4x text-main"></i>
    </div>
  );

  return (
    <>
      <section className="full-width-breakout main-slider-container">
        <MainSlider />
      </section>
      
      <section className="full-width-breakout bg-light-gray py-5 border-bottom">
        <Features />
      </section>

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold h4">
            <span className="border-success ps-2 me-2"></span>
            Shop By <span className="text-main">Category</span>
          </h3>
          <Link to="/categories" className="text-main text-decoration-none fw-bold small">
            View All Categories <i className="fa-solid fa-arrow-right ms-1"></i>
          </Link>
        </div>

        <div className="row g-3 mb-5">
          {categories.slice(0, 10).map((cat) => (
            <div key={cat._id} className="col-6 col-md-4 col-lg-2">
              <Link to={`/categorydetails/${cat._id}`} className="text-decoration-none">
                <div className="category-card p-3 rounded-3 text-center h-100 shadow-sm bg-white border cursor-pointer transition-all">
                  <div className="cat-img-wrapper mb-3 mx-auto rounded-circle overflow-hidden" style={{width: '90px', height: '90px'}}>
                    <img src={cat.image} className="w-100 h-100 object-fit-cover" alt={cat.name} />
                  </div>
                  <h6 className="small fw-bold mb-0 text-dark">{cat.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>

        
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="promo-card green-gradient-bg p-5 rounded-5 position-relative overflow-hidden h-100 d-flex flex-column justify-content-center">
              <div className="promo-badge-transparent mb-3 w-fit d-flex align-items-center gap-1">
                <span>🔥</span> Deal of the Day
              </div>
              <h2 className="display-6 fw-bold text-white mb-3">Fresh Organic Fruits</h2>
              <p className="text-white opacity-90 fs-6 mb-4">Get up to 40% off on selected organic fruits</p>
              <div className="d-flex align-items-baseline gap-3 mb-5">
                <span className="display-5 fw-bold text-white m-0">40% OFF</span>
                <span className="text-white opacity-80 small">Use code: <strong className="text-white fw-bold">ORGANIC40</strong></span>
              </div>
              <Link to="/products?filter=sale" className="btn btn-promo-white text-main shadow-sm w-fit d-flex align-items-center gap-2 text-decoration-none">
                Shop Now <i className="fa-solid fa-arrow-right-long fs-7"></i>
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="promo-card orange-gradient-bg p-5 rounded-5 position-relative overflow-hidden h-100 d-flex flex-column justify-content-center">
              <div className="promo-badge-transparent mb-3 w-fit d-flex align-items-center gap-1">
                <span>✨</span> New Arrivals
              </div>
              <h2 className="display-6 fw-bold text-white mb-3">Exotic Vegetables</h2>
              <p className="text-white opacity-90 fs-6 mb-4">Discover our latest collection of premium vegetables</p>
              <div className="d-flex align-items-baseline gap-3 mb-5">
                <span className="display-5 fw-bold text-white m-0">25% OFF</span>
                <span className="text-white opacity-80 small">Use code: <strong className="text-white fw-bold">FRESH25</strong></span>
              </div>
              <Link to="/products?filter=sale" className="btn btn-promo-white text-orange shadow-sm w-fit d-flex align-items-center gap-2 text-decoration-none">
                Explore Now <i className="fa-solid fa-arrow-right-long fs-7"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-4 px-0">
          <div className="d-flex align-items-center">
            <div className="title-separator" style={{width: '5px', height: '30px', backgroundColor: '#198754', borderRadius: '10px'}}></div>
            <h2 className="fw-bold m-0 ms-2">
              Featured <span className="text-main">Products</span>
            </h2>
          </div>
        </div>

        
        <div className="row g-3 mb-5">
          {products
            .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
            <div key={product.id} className="col-custom-5 col-md-4 col-6"> 
              <div className="product-card h-100 position-relative rounded-3 shadow-sm bg-white overflow-hidden d-flex flex-column border">
                
                
                {product.priceAfterDiscount && (
                  <div className="position-absolute top-0 start-0 m-2 z-3">
                    <span className="badge bg-danger rounded-pill px-2 py-1" style={{fontSize: '0.65rem'}}>
                      SALE
                    </span>
                  </div>
                )}

                <div className="product-img-wrapper position-relative text-center p-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img src={product.imageCover} className="w-100 object-fit-contain" style={{height: '180px'}} alt={product.title} />
                  </Link>
                  <div className="product-action-btns position-absolute d-flex flex-column gap-1 top-0 end-0 p-2">
                    <button onClick={() => addWish(product.id)} className="action-btn btn border bg-white rounded-circle p-0" style={{width:'35px', height:'35px'}}>
                      <i className="fa-regular fa-heart"></i>
                    </button>
                    <button className="action-btn btn border bg-white rounded-circle p-0" style={{width:'35px', height:'35px'}}><i className="fa-solid fa-right-left"></i></button>
                    <button className="action-btn btn border bg-white rounded-circle p-0" style={{width:'35px', height:'35px'}}><i className="fa-regular fa-eye"></i></button>
                  </div>
                </div>

                <div className="product-info-wrapper p-3 pt-0 d-flex flex-column flex-grow-1">
                  <h6 className="text-muted font-xs mb-1" style={{fontSize: '0.7rem'}}>{product.category.name}</h6>
                  <p className="fw-bold text-dark mb-1 small truncate-1-line">{product.title}</p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex flex-column">
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="fw-bold text-main" style={{fontSize: '0.9rem'}}>{product.priceAfterDiscount} EGP</span>
                          <span className="text-muted text-decoration-line-through extra-small" style={{fontSize: '0.75rem'}}>{product.price} EGP</span>
                        </>
                      ) : (
                        <span className="fw-bold text-dark">{product.price} EGP</span>
                      )}
                    </div>

                    <button 
                      onClick={() => addProduct(product.id)} 
                      className="btn bg-main text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                      style={{width: '32px', height: '32px'}}
                    >
                      <i className="fa-solid fa-plus fs-7"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="newsletter-section-demo p-4 p-md-5 rounded-5 border mb-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-main text-white rounded-3 p-2 me-3 d-flex align-items-center justify-content-center" style={{width:'45px', height:'45px'}}>
                  <i className="fa-regular fa-envelope fs-4"></i>
                </div>
                <div>
                  <h6 className="text-main fw-bold mb-0 small">NEWSLETTER</h6>
                  <p className="text-muted small mb-0">Join 50,000+ subscribers</p>
                </div>
              </div>
              <h2 className="fw-bold mb-3 display-6">Get the Freshest Updates <span className="text-main">Delivered Free</span></h2>
              
              <form onSubmit={handleSubscribe} className="subscribe-box-demo d-flex gap-2">
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="form-control rounded-3 py-3 border-0 shadow-sm" 
                />
                <button type="submit" className="btn bg-main text-white px-4 rounded-3 fw-bold">Subscribe <i className="fa-solid fa-arrow-right ms-1"></i></button>
              </form>
              <p className="text-muted small mt-3">✨ Unsubscribe anytime. No spam, ever.</p>
            </div>

            <div className="col-lg-4">
              <div className="dark-app-card p-4 p-xl-5 rounded-5 text-white shadow-lg position-relative overflow-hidden bg-dark">
                <span className="app-badge mb-4 d-inline-block p-1 px-2 rounded-2 bg-secondary small" style={{fontSize:'0.6rem'}}>📱 MOBILE APP</span>
                <h3 className="fw-bold mb-2">Shop Faster on Our App</h3>
                <div className="d-grid gap-3 mt-4">
                  <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" className="btn btn-outline-light d-flex align-items-center p-3 rounded-3 text-white text-decoration-none border-secondary transition-all">
                    <i className="fa-brands fa-apple fs-1 me-3"></i>
                    <div className="text-start">
                      <p className="mb-0 small opacity-50" style={{lineHeight: '1'}}>DOWNLOAD ON</p>
                      <h6 className="mb-0 fw-bold">App Store</h6>
                    </div>
                  </a>
                  <a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="btn btn-outline-light d-flex align-items-center p-3 rounded-3 text-white text-decoration-none border-secondary transition-all">
                    <i className="fa-brands fa-google-play fs-2 me-3"></i>
                    <div className="text-start">
                      <p className="mb-0 small opacity-50" style={{lineHeight: '1'}}>GET IT ON</p>
                      <h6 className="mb-0 fw-bold">Google Play</h6>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}