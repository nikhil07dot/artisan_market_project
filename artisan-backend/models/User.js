// models/User.js
import mongoose from 'mongoose';

// models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' }, // ✅ optional for Google accounts
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
