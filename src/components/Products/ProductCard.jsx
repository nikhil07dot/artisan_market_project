// ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-2xl hover:scale-[1.02] duration-300">
  <Link to={`/products/${product._id}`}>
    <img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover" />
  </Link>
  <div className="p-4 flex flex-col justify-between h-full">
    <div>
      <Link to={`/products/${product._id}`}>
        <h2 className="text-lg font-bold hover:text-gray-800 transition">{product.name}</h2>
      </Link>
      <p className="text-gray-600 text-sm mt-1 min-h-[2.5rem]">{product.description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-black font-semibold">${product.price}</span>
        <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>

    <div className="mt-4 flex justify-between items-center">
      <button
        onClick={() => onAddToCart(product)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
      >
        Add to Cart
      </button>

      <button
        onClick={() => onToggleWishlist(product)}
        className="transition transform hover:scale-110"
      >
        {isWishlisted ? (
          <SolidHeart className="w-6 h-6 text-red-500" />
        ) : (
          <OutlineHeart className="w-6 h-6 text-gray-500" />
        )}
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductCard;
