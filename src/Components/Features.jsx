import React from 'react';

export default function Features() {
  const featureData = [
    {
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      icon: "fa-solid fa-truck",
      bgColor: "#e7f3ff",
      iconColor: "#0d6efd"
    },
    {
      title: "Secure Payment",
      desc: "100% secure transactions",
      icon: "fa-solid fa-shield-halved",
      bgColor: "#e6f9f0",
      iconColor: "#198754"
    },
    {
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: "fa-solid fa-arrow-rotate-left",
      bgColor: "#fff4e6",
      iconColor: "#fd7e14"
    },
    {
      title: "24/7 Support",
      desc: "Dedicated support team",
      icon: "fa-solid fa-headset",
      bgColor: "#f3f0ff",
      iconColor: "#6f42c1"
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          {featureData.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center p-4 shadow-sm border-0 rounded-3 bg-white" style={{ transition: '0.3s' }}>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ backgroundColor: item.bgColor, width: '50px', height: '50px', flexShrink: 0 }}
                >
                  <i className={`${item.icon} fs-5`} style={{ color: item.iconColor }}></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1 small">{item.title}</h6>
                  <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}