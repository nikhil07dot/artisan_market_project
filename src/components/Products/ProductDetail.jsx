import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';
import { Tooltip } from 'react-tooltip';

import { useCart } from '../Cart/CartContext';
import { useWishlist } from '../Wishlist/WishlistContext';
import { useToast } from '../Toast/ToastContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted: checkWishlisted, wishlist } = useWishlist();
  const { showToast } = useToast();

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      fetchRelated(data.category, data._id);
    };

    const fetchRelated = async (category, currentId) => {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      const filtered = data.filter(p => p.category === category && p._id !== currentId);
      setRelated(filtered.slice(0, 4));
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsWishlisted(checkWishlisted(product._id));
    }
  }, [product, checkWishlisted]);

  const handleAddToCart = () => {
    addToCart(product, quantity, showToast);
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product, showToast);
    setIsWishlisted(added);
  };

  const handleWishlistRedirect = () => {
    if (wishlist.length === 0) {
      showToast('Your wishlist is empty!', 'warning');
    } else {
      navigate('/wishlist');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRelatedClick = async (productId) => {
    await delay(1000);
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full mx-auto p-4 bg-[#e8e0d7]">
      <Tooltip id="wishlist-tooltip" place="top" />

      {/* Back + Wishlist Buttons */}
      <div className="flex flex-col items-end gap-2 mb-4 relative">
        <button
          onClick={() => {
            navigate('/products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Products
        </button>

        {/* Wishlist Button */}
        <div className="relative group">
          <button
            onClick={handleWishlistRedirect}
            data-tooltip-id="wishlist-tooltip"
            data-tooltip-content={wishlist.length > 0
              ? `${wishlist.length} item(s) in wishlist`
              : 'Wishlist is empty'}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition relative"
          >
            <OutlineHeart className="w-5 h-5" />
            Wishlist
          </button>

          {wishlist.length > 0 && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs font-semibold flex items-center justify-center animate-bounce"
            >
              {wishlist.length}
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="badge bg-yellow-100 text-yellow-800">New</span>
              <span className="badge bg-green-100 text-green-800">Best Seller</span>
            </div>

            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>

            <div className="text-2xl font-semibold text-black mb-2">${product.price}</div>
            <div className={`mb-4 text-lg font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded px-3 py-2 bg-white shadow">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-2 text-xl">−</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)} className="px-2 text-xl">+</button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto shadow"
            >
              Add to Cart
            </button>

            {/* Wishlist Toggle */}
            <button
              onClick={handleWishlistToggle}
              data-tooltip-id="wishlist-tooltip"
              data-tooltip-content={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className="transition transform hover:scale-110"
            >
              {isWishlisted ? (
                <SolidHeart className="w-8 h-8 text-red-500" />
              ) : (
                <OutlineHeart className="w-8 h-8 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-6 text-black">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {related.map(rel => (
              <div
                key={rel._id}
                className="cursor-pointer"
                onClick={() => handleRelatedClick(rel._id)}
              >
                <ProductCard
                  product={rel}
                  onAddToCart={(prod) => addToCart(prod, 1, showToast)}
                  onToggleWishlist={(prod) => toggleWishlist(prod, showToast)}
                  isWishlisted={checkWishlisted(rel._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
