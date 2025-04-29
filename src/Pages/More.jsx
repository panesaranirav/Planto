import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./More.css";
import assets from "../assets/assets";
import { FaTruck , FaHeart  } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const More = () => {
  return (
    <>
      <Navbar />
      <div className="all-sec">
        <div className="sec-1">
          <div className="sec-1-img">
            <img src={assets.about1} alt="" />
          </div>
          <div className="sec-1-text">
            <h2>Something To See</h2>
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button>Explore More</button>
          </div>
        </div>
        <div className="sec-2">
          <div className="sec-2-img">
            <img src={assets.calathea} alt="" />
          </div>
          <div className="sec-2-text">
            <h2>The Journey Planto</h2>
            <h1>Our History</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur{" "}
            </p>
          </div>
        </div>
        <div className="Quality">
          <div className="heading-sec">
            <h3>Quality In Planto</h3>
            <h1>Why Choose Us</h1>
          </div>
          <div className="box">
            <div className="Delivery">
                <div className="Delivery-img">
                <FaTruck className="FaTruck" title="Delivery" />
                </div>
                <div className="Delivery-text">
                  <h1>Free Delivery</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>
            <div className="Product">
            <div className="Product-img">
            <FaHeart className="FaHeart" title="Like"/>
                </div>
                <div className="Product-text">
                  <h1>Quality Product
                  </h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit</p>
                </div>
            </div>
            <div className="Trusted">
            <div className="Trusted-img">
            <MdVerified className="MdVerified" title="Verified" />
                </div>
                <div className="Trusted-text">
                  <h1>Trusted</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default More;
