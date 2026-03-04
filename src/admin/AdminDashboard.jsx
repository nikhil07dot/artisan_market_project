import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminProductList from './AdminProductList.jsx';
import ProductManager from './ProductManager.jsx';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    cartAdds: 0,
    wishlistAdds: 0,
    topCartProducts: [],
    topWishlistedProducts: [],
  });

  useEffect(() => {
    const fakeAnalytics = {
      cartAdds: 41,
      wishlistAdds: 29,
      topCartProducts: [
        { name: 'Boho Bowl Set', count: 12 },
        { name: 'Clay Mug', count: 10 },
      ],
      topWishlistedProducts: [
        { name: 'Ceramic Vase', count: 15 },
        { name: 'Handmade Plate', count: 9 },
      ],
    };

    setAnalytics(fakeAnalytics);
  }, []);

  return (
    <div className="min-h-screen bg-[#e8e0d7] p-10">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Cart Adds 🛒</h2>
          <p className="text-4xl font-bold text-green-600">{analytics.cartAdds}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Wishlist Adds ❤️</h2>
          <p className="text-4xl font-bold text-pink-600">{analytics.wishlistAdds}</p>
        </div>

        <div className="bg-white p-6 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">🔥 Top Carted Products</h2>
          <ul className="space-y-2">
            {analytics.topCartProducts.map((p, idx) => (
              <li key={idx} className="flex justify-between border-b pb-1">
                <span>{p.name}</span>
                <span className="font-bold">{p.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">💖 Most Wishlisted Products</h2>
          <ul className="space-y-2">
            {analytics.topWishlistedProducts.map((p, idx) => (
              <li key={idx} className="flex justify-between border-b pb-1">
                <span>{p.name}</span>
                <span className="font-bold">{p.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <Link
          to="/admin/products"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/productlist"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Product List
        </Link>

        <Link
          to="/admin/logs"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View User Logs
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
