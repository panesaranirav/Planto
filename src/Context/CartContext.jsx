import React, { createContext, useContext, useState,useEffect } from "react";
import './CartContext.css'

const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, item];
      }
    });
  };
  
  

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  // ✅ Update quantity (+/-)
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ✅ Clear cart (on place order)
  const clearCart = () => {
    setCartItems([]);
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,   // add this
        clearCart          // and this
      }}
      
    >
      
      {children}
    </CartContext.Provider>
  );
};
