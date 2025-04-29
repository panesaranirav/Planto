import React from "react";
import { useCart } from "../Context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart(); 
  const [loading, setLoading] = useState(false);
const [orderPlaced, setOrderPlaced] = useState(false);

const handlePlaceOrder = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setOrderPlaced(true);
    clearCart(); 
  }, 1200);
};


  const handleQtyChange = (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      updateQuantity(id, newQty);
    }
  };

  const handleDelete = (id) => {
    removeFromCart(id);
  };


  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="cart-app-container">
      <div className="cart-box">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-rating">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-qty-controls">
                <button onClick={() => handleQtyChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
              </div>
              <button
                className="cart-delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Your cart is empty.
          </h3>
        )}
        {loading ? (
  <div className="order-loading">Placing your order...</div>
) : orderPlaced ? (
  <div className="order-success">✅ Order placed successfully!</div>
) : (
  cartItems.length > 0 && (
    <div className="cart-total-section">
      <h3>Total: ${getTotal()}</h3>
      <button className="cart-place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  )
)}

      </div>
      <button className="button-back-home" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default Cart;
