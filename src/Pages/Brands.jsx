import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBrands() {
    try {
      setIsLoading(true);
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (isLoading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fas fa-spinner fa-spin fa-4x text-main"></i>
    </div>
  );

  return (
    <>
      
      <div className="py-5 text-white shadow-sm mt-4" style={{ backgroundColor: '#9c27b0' }}>
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white opacity-75 text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Brands</li>
            </ol>
          </nav>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-25 p-3 rounded-3 shadow-sm">
              <i className="fa-solid fa-tags fs-2"></i>
            </div>
            <div>
              <h1 className="fw-bold mb-0 h2">Top Brands</h1>
              <p className="mb-0 opacity-75 small">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {brands.map((brand) => (
            <div key={brand._id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              
              <Link to={`/branddetails/${brand._id}`} className="text-decoration-none">
                <div className="category-item-card text-center h-100">
                  <div className="category-img-holder p-4 mb-2 rounded-4 border bg-white shadow-sm transition-hover d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                    <img 
                      src={brand.image} 
                      className="w-100 object-fit-contain" 
                      alt={brand.name} 
                    />
                  </div>
                  <h6 className="fw-bold text-dark mt-2">{brand.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}