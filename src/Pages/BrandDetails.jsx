import React, { useEffect, useState, useContext } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../Context/CartContext'; 
import toast from 'react-hot-toast'; 

export default function BrandDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [brandInfo, setBrandInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  let { addToCart } = useContext(cartContext);

  
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-right',
      });
    } else {
      toast.error("Failed to add product");
    }
  }

  useEffect(() => {
    async function getBrandProducts() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
        setProducts(data.data);
        const brandRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        setBrandInfo(brandRes.data.data);
      } catch (error) {
        console.error("Error fetching brand details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getBrandProducts();
  }, [id]);

  if (isLoading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fas fa-spinner fa-spin fa-4x text-main"></i>
    </div>
  );

  return (
    <>
      <div className="bg-main py-5 text-white shadow-sm mt-4">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2 small">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75 text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/brands" className="text-white opacity-75 text-decoration-none">Brands</Link></li>
              <li className="breadcrumb-item active text-white fw-bold" aria-current="page">{brandInfo?.name}</li>
            </ol>
          </nav>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white p-2 rounded-3 shadow-sm">
              <img src={brandInfo?.image} alt={brandInfo?.name} style={{ width: '60px', height: '40px', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 className="fw-bold mb-0 h2">{brandInfo?.name}</h1>
              <p className="mb-0 opacity-75 small">Showing products for {brandInfo?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex align-items-center gap-2 mb-4 bg-light p-3 rounded-3 border">
           <i className="fa-solid fa-filter text-muted me-2"></i>
           <span className="small fw-bold text-muted">Active Filters:</span>
           <span className="badge bg-main-light text-main p-2 border border-success border-opacity-10 rounded-pill d-flex align-items-center gap-2 px-3">
             {brandInfo?.name} <i className="fa-solid fa-xmark font-xs"></i>
           </span>
           <Link to="/brands" className="btn btn-link text-muted small text-decoration-none ms-auto">Clear all</Link>
        </div>

        <p className="small text-muted mb-4 fw-medium">Found {products.length} products</p>

        <div className="row g-4">
          {products.length > 0 ? products.map((product) => (
            <div key={product._id} className="col-xl-2-4 col-lg-3 col-md-4 col-sm-6">
               <div className="product border-0 p-3 rounded-4 bg-white shadow-sm h-100 position-relative transition-hover">
                  <Link to={`/productdetails/${product.id}`} className="text-decoration-none text-dark">
                    <img src={product.imageCover} className="w-100 rounded-3 mb-2" alt={product.title} />
                    <p className="text-main x-small mb-1">{product.category.name}</p>
                    <h3 className="h6 fw-bold truncate-1-line mb-2">{product.title}</h3>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold small">{product.price} EGP</span>
                      <span className="small"><i className="fas fa-star text-warning me-1"></i>{product.ratingsAverage}</span>
                    </div>
                  </Link>
                  
                  <button 
                    onClick={() => addProduct(product._id)} 
                    className="btn bg-main text-white w-100 btn-sm mt-3 rounded-3 shadow-sm"
                  >
                    <i className="fa-solid fa-plus me-1"></i> Add to cart
                  </button>
               </div>
            </div>
          )) : (
            <div className="text-center py-5 w-100">
              <i className="fa-solid fa-box-open fs-1 text-muted mb-3 opacity-50"></i>
              <h3 className="text-muted h5">No products found for this brand yet.</h3>
              <Link to="/brands" className="btn bg-main text-white mt-3 px-4">Back to Brands</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}