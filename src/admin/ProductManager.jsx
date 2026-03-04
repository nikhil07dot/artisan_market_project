import React, { useState } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    inStock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/products/admin/products', product); // 👈 FULL URL
      alert('✅ Product created!');
      console.log(res.data);
    } catch (err) {
      console.error('❌ Error creating product:', err);
      alert('Failed to create product');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', background:'#e8e0d7' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <label>
          In Stock:
          <input type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} />
        </label>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductManager;
