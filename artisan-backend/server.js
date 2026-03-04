// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './routes/productRoutes.js'; // Product routes
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';     // Admin analytics routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Mount routes
app.use('/api/products', productRoutes); // Ex: GET /api/products/, POST /api/products/admin/products
app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes);     // Ex: GET /api/admin/actions

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected.");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
