import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: "linear",
    dotsClass: "slick-dots custom-dots", 
  };

  const slides = [
    {
      id: 1,
      title: "Fresh Products Delivered to your Door",
      desc: "Get 20% off your first order",
      bgImage: "https://freshcart-route.vercel.app/static/media/slider-image-2.3f773463.jpeg",
      btn1: "Shop Now",
      btn2: "View Deals"
    },
    {
      id: 2,
      title: "Big Discount on Groceries",
      desc: "Healthy food for a healthy life",
      bgImage: "https://freshcart-route.vercel.app/static/media/slider-image-1.47226685.jpeg",
      btn1: "Order Now",
      btn2: "Delivery Info"
    },
    {
      id: 3,
      title: "Fast & Free Delivery",
      desc: "Same day delivery available",
      bgImage: "https://freshcart-route.vercel.app/static/media/slider-image-3.0ad193c5.jpeg", 
      btn1: "Order Now",
      btn2: "Delivery Info"
    }
  ];

  return (
    <section className="main-slider-section mb-5 overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div 
              className="slide-bg-wrap position-relative" 
              style={{ 
                backgroundImage: `url(${slide.bgImage})`,
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              
              <div className="green-overlay position-absolute top-0 start-0 w-100 h-100" 
                   style={{ background: "linear-gradient(90deg, rgba(16, 163, 102, 0.8) 0%, rgba(16, 163, 102, 0.4) 100%)", zIndex: 1 }}>
              </div>
              
              <div className="container h-100 position-relative" style={{ zIndex: 3 }}>
                <div className="row h-100 align-items-center">
                  <div className="col-lg-7 col-md-9 text-white">
                    
                    <h1 className="main-title fw-bold mb-3 slide-up-text display-4">
                      {slide.title}
                    </h1>
                    <p className="sub-title mb-5 slide-up-text fs-5" style={{ animationDelay: "0.2s" }}>
                      {slide.desc}
                    </p>
                    
                    
                    <div className="d-flex gap-3 slide-up-text" style={{ animationDelay: "0.4s" }}>
                      <Link to="/products" className="btn btn-light text-main fw-bold rounded-pill px-4 py-2 shadow-sm border-0">
                        {slide.btn1}
                      </Link>
                      <Link to="/products" className="btn btn-outline-light fw-bold rounded-pill px-4 py-2 shadow-sm" style={{ borderWidth: '2px' }}>
                        {slide.btn2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}