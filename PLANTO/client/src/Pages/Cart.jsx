import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart(); 
  const [step, setStep] = useState("cart"); // "cart" | "location" | "success"
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handlePlaceOrder = () => {
    setStep("location");
  };

  const handleConfirmOrder = () => {
    if (!location.trim()) return alert("Please enter your location");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      clearCart();
    }, 1200);
  };

  return (
    <div className="cart-app-container">
      <div className="cart-box">
        {step === "cart" && (
          <>
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
                    <div className="cart-item-price">Rs:{item.price.toFixed(2)}</div>
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
            {cartItems.length > 0 && (
              <div className="cart-total-section">
                <h3>Total: Rs:{getTotal()}</h3>
                <button className="cart-place-order-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            )}
          </>
        )}

        {step === "location" && (
          <div className="location-form">
            <h3>Enter Your Delivery Location</h3>
            <textarea
              rows="3"
              placeholder="Enter address / location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-textarea"
            ></textarea>
            <button
              className="confirm-order-btn"
              onClick={handleConfirmOrder}
              disabled={loading}
            >
              {loading ? "Confirming..." : "Confirm Order"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="order-success-popup">
            <h2>✅ Order Confirmed!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={handleBackToHome}>Go to Home</button>
          </div>
        )}
      </div>

      {step === "cart" && (
        <button className="button-back-home" onClick={handleBackToHome}>
          Back to Home
        </button>
      )}
    </div>
  );
};

export default Cart;
