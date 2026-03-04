import mongoose from 'mongoose';

const userActionSchema = new mongoose.Schema({
  userId: String,
  product: String,
  action: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UserAction = mongoose.model('UserAction', userActionSchema);
export default UserAction;
