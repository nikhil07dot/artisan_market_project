import React, { useState } from 'react';
import { useWishlist } from './WishlistContext'; // adjust path as needed
import { useCart } from '../Cart/CartContext'; // adjust path as needed

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const handleRemove = (product) => {
    toggleWishlist(product); // removes
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
    showToast('Product moved to cart successfully 🛒');
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="p-10 bg-[#e8e0d7] min-h-screen relative">
      <h1 className="text-4xl font-bold mb-6 text-black">Your Wishlist</h1>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-md z-50">
          {toastMessage}
        </div>
      )}

      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-lg">You have no items in your wishlist ❤️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
              <img src={product.imageUrl} alt={product.name} className="h-72 w-full object-cover rounded" />

              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleRemove(product)}
                  className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                >
                  Remove ❤️
                </button>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Move to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
