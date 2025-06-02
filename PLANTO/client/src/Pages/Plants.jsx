import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Topselling from "../Components/Topselling";
import "./Plants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Context/CartContext"; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import Copyright from "../Components/Copyright";
import Loader from "../Components/Loader";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();  

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetch(`${backendUrl}/plants`)
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Plants Data", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div><Loader/></div>;

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right", 
      autoClose: 1000,
    });
  };

  return (
    <div className="all-component">
      <Navbar />
      <div className="plants">
        <Topselling />
      </div>
      <div className="all-plants">
        <div className="heading">
          <h1>Our Regular Plants</h1>
        </div>
        <div className="all-cards">
          {plants.map((plant) => (
            <div key={plant.id} className="plant-card">
              <img
                src={plant.image}
                alt={plant.name}
                className="plant-image"
              />
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-desc">{plant.description}</p>
              <div className="price-cart">
                <p className="plant-price">Rs. {plant.price}/-</p>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="cart-icon"
                  onClick={() => handleAddToCart({
                    id: plant.id,
                    name: plant.name,
                    price: plant.price,
                    quantity: 1,
                    rating: 5,
                    image: plant.image,
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default Plants;
