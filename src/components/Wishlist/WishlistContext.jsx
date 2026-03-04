// WishlistContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { logUserAction } from '../../utils/logger';
import useAuth from '../../hooks/UseAuth';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from backend or localStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && token) {
        // try {
        //   const res = await fetch('/api/wishlist', {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //   const data = await res.json();
        //   setWishlist(data.wishlist || []);
        // } catch (err) {
        //   console.error('Failed to fetch wishlist:', err);
        // }
        const local = localStorage.getItem('wishlist');
        setWishlist(local ? JSON.parse(local) : []);
      } else {
        const local = localStorage.getItem('wishlist');
        setWishlist(local ? JSON.parse(local) : []);
      }
    };

    fetchWishlist();
  }, [user, token]);

  // Sync wishlist on change
  useEffect(() => {
    // const syncWishlist = async () => {
    //   if (user && token) {
    //     try {
    //       await fetch('/api/wishlist', {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({ wishlist }),
    //       });
    //     } catch (err) {
    //       console.error('Failed to sync wishlist:', err);
    //     }
    //   } else 
      
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle wishlist add/remove
  const toggleWishlist = (product, onSuccess) => {
    const exists = wishlist.find(item => item._id === product._id);

    if (exists) {
      setWishlist(prev => prev.filter(item => item._id !== product._id));
      logUserAction('Removed from Wishlist', product.name);
      onSuccess?.(`${product.name} removed from wishlist`);
      return false;
    } else {
      setWishlist(prev => [...prev, product]);
      logUserAction('Added to Wishlist', product.name);
      onSuccess?.(`${product.name} added to wishlist`);
      return true;
    }
  };

  // Check if product is in wishlist
  const isWishlisted = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
