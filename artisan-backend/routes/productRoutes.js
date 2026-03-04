// routes/productRoutes.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// ✅ Public Routes
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get single product by ID

// ✅ Admin Routes
router.post('/admin/products', createProduct); // Create new product
router.put('/admin/products/:id', updateProduct); // Update product
router.delete('/admin/products/:id', deleteProduct); // Delete product
router.get('/admin/products', getAllProducts); // Admin - Get all products

export default router;
