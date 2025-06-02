import React from "react";
import { useCart } from "../Context/CartContext"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import './Topselling.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Plants from "../Pages/Plants";
import { useState,useEffect } from "react";
import Loader from "../Components/Loader"

const Topselling = () => {
  const { addToCart } = useCart();  
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true); 
 
  const handleAddToCart = (item) => {
    addToCart(item);
    console.log('Added:', item); 
  
    toast.success(`${item.name} added to cart!`, {
      position: "top-right", 
      autoClose: 2000,
    });
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
   useEffect(() => {
    fetch(`${backendUrl}/Populer`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Plants Data:", error);
        setLoading(false);
      });
  }, []);
    
  if(loading){
    return <Loader/>
  }
  return (
    <div className="topselling-sec">
        <div className="topselling-sec">
      <div className="topselling-heading">
        <h1>Our Top Selling</h1>
      </div>
      <div className="all-card">
       {plants.map((plants,index)=>(
         <div  key={index} className="topselling-card1">
         <img src={plants.image} alt="" />
         <h2>{plants.name}</h2>
         <p>{plants.description}</p>
         <div className="topsell-flax">
           <h3>Rs.{plants.price}/-</h3>
           <FontAwesomeIcon
             icon={faShoppingCart}
             className="img"
             onClick={() => handleAddToCart({
               id: plants.id,
               name:plants.name,
               price: plants.price,
               image: plants.image,
               quantity: 1,
               rating: 4
             })}
           />
         </div>
       </div>  
       ))}  
      </div>
    </div>
     <ToastContainer />
    </div>
  );
};

export default Topselling;
