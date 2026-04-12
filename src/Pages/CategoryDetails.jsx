import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../Context/CartContext'; 
import toast from 'react-hot-toast';

export default function CategoryDetails() {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  let { addToCart } = useContext(cartContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast.success(response.data.message, { 
        duration: 2500, 
        position: 'top-right',
        style: { background: '#198754', color: '#fff' }
      });
    } else {
      toast.error("Failed to add product.");
    }
  }

  const getData = useCallback(async (catId) => {
    try {
      setIsLoading(true);
      
      
      const categoryRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}`);
      const currentCategory = categoryRes.data.data;
      setCategoryInfo(currentCategory);

      
      const subRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`);
      setSubCategories(subRes.data.data);

      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=100`);
      
      const filtered = data.data.filter(product => 
        String(product.category?._id) === String(catId) || 
        product.category?.name === currentCategory.name
      );
      
      setProducts(filtered);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) getData(id);
  }, [id, getData]);

  if (isLoading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-main"></div>
    </div>
  );

  return (
    <div className="pb-5">
      
      <div className="bg-main py-5 text-white mt-5">
        <div className="container py-3 text-start">
          <h1 className="display-6 fw-bold m-0">{categoryInfo?.name}</h1>
          <p className="opacity-75 m-0">Discover products in this category</p>
        </div>
      </div>

      <div className="container mt-4 text-start">
        <Link to="/categories" className="text-muted text-decoration-none small d-flex align-items-center gap-2 mb-4">
          <i className="fa-solid fa-arrow-left"></i> Back to Categories
        </Link>

       
        {subCategories.length > 0 && (
          <div className="mb-5">
             <h4 className="fw-bold mb-3 border-bottom pb-2">Subcategories</h4>
             <div className="row g-3">
                {subCategories.map((sub) => (
                  <div key={sub._id} className="col-md-3">
                    <div className="border p-2 rounded-3 text-center bg-white shadow-sm">
                      <h6 className="small fw-bold mb-0">{sub.name}</h6>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        
        <h4 className="fw-bold mb-4 border-bottom pb-2">Products</h4>
        <div className="row g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="product-card p-3 rounded-4 bg-white shadow-sm h-100 border">
                  <Link to={`/productdetails/${product.id}`} className="text-decoration-none text-dark">
                    <img src={product.imageCover} className="w-100 rounded-3 mb-2" alt={product.title} />
                    <h3 className="h6 fw-bold text-truncate my-2">{product.title}</h3>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold text-main">{product.price} EGP</span>
                      <span className="small"><i className="fas fa-star text-warning"></i> {product.ratingsAverage}</span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => addProductToCart(product.id)}
                    className="btn bg-main text-white w-100 mt-3 py-2 fw-bold rounded-3"
                  >
                    Add to Cart +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 w-100 bg-light rounded-4">
               <i className="fa-solid fa-folder-open fs-1 text-muted mb-3"></i>
               <h5 className="text-muted">No Products available in this category right now.</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}