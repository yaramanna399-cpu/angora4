import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories() {
    try {
      setIsLoading(true);
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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
              <li className="breadcrumb-item">
                <Link to="/" className="text-white opacity-75 text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Categories</li>
            </ol>
          </nav>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-25 p-3 rounded-3 shadow-sm">
              <i className="fa-solid fa-layer-group fs-2"></i>
            </div>
            <div>
              <h1 className="fw-bold mb-0 h2">Our Categories</h1>
              <p className="mb-0 opacity-75 small">Find the best products by category</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div key={cat._id} className="col-xl-2-4 col-lg-3 col-md-4 col-sm-6">
              <Link to={`/category/${cat._id}`} className="text-decoration-none">
                <div className="category-item-card text-center cursor-pointer">
                  <div className="category-img-holder p-3 mb-2 rounded-4 border bg-white shadow-sm transition-hover overflow-hidden">
                    <img 
                      src={cat.image} 
                      className="w-100 object-fit-cover rounded-3" 
                      style={{ height: '220px' }} 
                      alt={cat.name} 
                    />
                  </div>
                  <h6 className="fw-bold text-dark mt-2">{cat.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}