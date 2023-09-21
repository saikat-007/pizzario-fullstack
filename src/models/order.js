import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  price: Number,
  products: [mongoose.Schema.Types.Mixed],
  status: String,
  intent_id: {
    type: String,
    unique: true
  },
  userEmail: String
});

mongoose.models = {};
export const Order = mongoose.model('Order', orderSchema);
