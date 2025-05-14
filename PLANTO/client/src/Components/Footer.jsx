import React from "react";
import "./Footer.css";
import assets from "../assets/assets";
const Footer = () => {
  return (
<footer>
    <div className="footer-main">
      <div className="footer-left-sec">
        <img src={assets.logofooter} alt="" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="footer-leng">
          <div className="EN">
            <h2>EN</h2>
          </div>
          <div className="GJ">
            <h2>GJ</h2>
          </div>
          <div className="HI">
            <h2>HI</h2>
          </div>
        </div>
      </div>
      <div className="footer-center-sec">
        <h1>Quick Link’s</h1>
        <div className="footer-nav">
          <ul>
            <li>Home</li>
            <li>Plants Type</li>
            <li>More</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="footer-right-sec">
        <h1>For Every Update.</h1>
        <div className="footer-input-sec">
                <div className="input">
                    <input type="text" placeholder="Enter Email" />
                </div>
                <div className="button">
                    <button>SUBSCRIBE</button>
                </div>
        </div>
      </div>
    </div>
</footer>
  );
};

export default Footer;
