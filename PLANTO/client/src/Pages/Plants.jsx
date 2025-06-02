import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Topselling from "../Components/Topselling";
import "./Plants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import  {useCart}  from "../Context/CartContext"; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import Copyright from "../Components/Copyright"
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
        console.error("Error Fatching Plants Data ", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div><Loader/></div>
   
    const handleAddToCart = (item) => {
      addToCart(item);
    
      toast.success(`${item.name} added to cart!`, {
        position: "top-right", 
        autoClose: 2000,
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
          <h1>Our Reguler Plants</h1>
        </div>
        <div className="all-cards">
          {plants.map((plants) => (
            <div
              key={plants.id}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={plants.image}
                alt={plants.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-xl font-semibold">{plants.name}</h2>
              <p className="text-sm text-gray-600">{plants.description}</p>
             <div className="prise-cart">
             <p className="mt-2 font-bold text-green-600">Rs.{plants.price}/-</p>
              <FontAwesomeIcon
              icon={faShoppingCart}
              className="img"
              onClick={() => handleAddToCart({
                id: plants.id,
                name: plants.name,
                price: plants.price,
                quantity: 1,
                rating: 5,
                image:plants.image,
                
              })}
            />
             </div>
            </div>
            
          ))}
        </div>
      </div>
      <Footer />
      <Copyright/>
    </div>
  );
};

export default Plants;
