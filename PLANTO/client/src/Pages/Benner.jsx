import React from "react";
import "./Benner.css";
import assets from "../assets/assets";
const Benner = () => {
  return (
    <div className="benner-sec">
        <div className="left-sec-benner">
            <div className="left-sec-benner-text">
                <h1>Breath Natureal </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button>Explore</button>
            </div>
            <div className="people-card">
                <div className="card">
                    <div className="people-img">
                    <img src={assets.people} />
                    </div>
                    <div className="people-name">
                    <h2>Nirav Patel</h2>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt...
                    </p>
            </div>
         </div>

      <div className="right-sec-benner">
        <div className="right-sec-card">
          <img src={assets.calathea} />
          <div className="right-sec-text">
                <h4>Trendy House Plant</h4>
                <h2>Calathea plant 〉 </h2>
                <button>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benner;
