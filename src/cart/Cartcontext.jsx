import React, { createContext, useState } from 'react';


export const Cartcontext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log('Adding item to cart:', item); // Debug log
    setCartItems((prevItems) => [...prevItems, item]);
    console.log('Updated cart items:', cartItems); 
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Cartcontext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </Cartcontext.Provider>
  );
};
