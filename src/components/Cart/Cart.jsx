import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';

const Cart = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const groupedItems = cart;

  const handleIncrease = (product) => {
    setCart(prev =>
      prev.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (product) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    const confirm = window.confirm("Do you want to remove this product from the cart?");
    if (confirm) {
      removeFromCart(productId);
      showToast("Removed from cart successfully");
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const total = groupedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 md:p-10 bg-[#e8e0d7] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-md z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {groupedItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-6">
          {groupedItems.map((item, index) => (
            <Motion.div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#dcd2c8]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-lg border"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-semibold text-lg md:text-xl">{item.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">${item.price}</p>

                  <div className="flex items-center justify-center sm:justify-start mt-3 gap-3">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 text-lg font-semibold transition-all duration-200"
                    >
                      −
                    </button>
                    <span className="text-md font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 text-lg font-semibold transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="group px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 shadow ring-2 ring-transparent hover:ring-red-300"
                >
                  <FiTrash2 className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  Remove
                </button>
              </div>
            </Motion.div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t pt-6 gap-4">
            <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>

            <button
              onClick={() => showToast("Order placed successfully 🛍️")}
              className="group px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg ring-2 ring-transparent hover:ring-green-300"
            >
              <FiShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-200" />
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
