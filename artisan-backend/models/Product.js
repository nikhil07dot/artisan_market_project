import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  inStock: Boolean,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
