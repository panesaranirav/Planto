import React from "react";
import "./productDetails.css";

const ProductDetails = () => {
  return (
    <section className="product-section small-icon">
      <div className="container">
        <div className="product-wrapper">
          <img
            alt="ecommerce"
            className="product-image"
            src="https://dummyimage.com/400x400"
          />
          <div className="product-info">
            <h2 className="brand-name">BRAND NAME</h2>
            <h1 className="product-title">The Catcher in the Rye</h1>

            <div className="rating">
              <span className="stars">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="review-text">4 Reviews</span>
              </span>

              <span className="social-icons">
                <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
                <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.6v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg></a>
                <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8A8.5 8.5 0 018.7 4.3a8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg></a>
              </span>
            </div>

            <p className="description">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY...
            </p>

            <div className="selectors">
              <div className="colors">
                <span>Color:</span>
                <button className="color-box"></button>
                <button className="color-box dark"></button>
                <button className="color-box blue"></button>
              </div>
              <div className="sizes">
                <span>Size:</span>
                <select>
                  <option>SM</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
            </div>

            <div className="actions">
              <span className="price">$58.00</span>
              <button className="buy-button">Buy Now</button>
              <button className="wishlist-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l9.62-9.62a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
