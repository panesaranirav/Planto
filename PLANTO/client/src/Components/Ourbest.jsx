import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assets from "../assets/assets";
import "./Ourbest.css";
const Ourbest = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="main">
        <h2>Our Best o2</h2>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <div className="slider-img-text">
              <div className="slider-img">
                <img src={assets.Topsellingfour} alt="Slide 1" />
              </div>
              <div className="slider-text">
                <h1>We Have Small And Best O2 Plants Collection’s</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
                <div className="remove">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
                <button>Explore</button>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="slider-img-text">
              <div className="slider-img">
              <img src={assets.Topsellingfive} alt="Slide 2" />
              </div>
              <div className="slider-text">
                <h1>We Have Small And Best O2 Plants Collection’s</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
                <div className="remove">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
                <button>Explore</button>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="slider-img-text">
              <div className="slider-img">
              <img src={assets.Topsellingsix} alt="Slide 3" />
              </div>
              <div className="slider-text">
                <h1>We Have Small And Best O2 Plants Collection’s</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
                <div className="remove">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
                <button>Explore</button>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Ourbest;
