import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { logUserAction } from '../../utils/logger';
// import useAuth from '../../hooks/UseAuth';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  // const { user, token } = useAuth();
  const [cart, setCart] = useState([]);
  const didInit = useRef(false);

  // Load cart from localStorage only once
  useEffect(() => {
    if (!didInit.current) {
      const local = localStorage.getItem('cart');
      setCart(local ? JSON.parse(local) : []);
      didInit.current = true;
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, onSuccess) => {
    let message = '';
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        logUserAction("Updated Quantity in Cart", product.name);
        message = `${product.name} quantity updated in cart`;
        return updated;
      }
      logUserAction("Added to Cart", product.name);
      message = `${product.name} added to cart`;
      return [...prev, { ...product, quantity }];
    });
    if (onSuccess && message) {
      onSuccess(message);
    }
  };

  const removeFromCart = (productId) => {
    const product = cart.find(item => item._id === productId);
    if (product) {
      setCart(prev => prev.filter(item => item._id !== productId));
      logUserAction("Removed from Cart", product.name);
    }
  };

  const clearCart = () => {
    setCart([]);
    logUserAction("Cleared Cart", "All items");
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;