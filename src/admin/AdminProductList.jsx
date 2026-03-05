import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchProducts = async () => {
    try {
     const res = await axios.get(`${API_URL}/api/products/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/admin/products/${id}`);
      fetchProducts(); // refresh list
    } catch (err) {
      console.error('❌ Failed to delete product', err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditedProduct(product);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/api/products/admin/products/${editingId}`, editedProduct);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error('❌ Failed to update product', err);
    }
  };

  return (
    <div style={{ padding: '20px', background:'#e8e0d7' }}>
      <h2>📦 All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>
                  {editingId === prod._id ? (
                    <input name="name" value={editedProduct.name} onChange={handleEditChange} />
                  ) : (
                    prod.name
                  )}
                </td>
                <td>
                  {editingId === prod._id ? (
                    <input name="price" type="number" value={editedProduct.price} onChange={handleEditChange} />
                  ) : (
                    `₹${prod.price}`
                  )}
                </td>
                <td>{prod.inStock ? '✅ Yes' : '❌ No'}</td>
                <td>
                  {editingId === prod._id ? (
                    <input name="category" value={editedProduct.category} onChange={handleEditChange} />
                  ) : (
                    prod.category || '-'
                  )}
                </td>
                <td>
                  {editingId === prod._id ? (
                    <>
                      <button onClick={saveEdit}>💾 Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(prod)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(prod._id)} style={{ marginLeft: '10px' }}>🗑 Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductList;
