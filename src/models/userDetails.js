import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
  email: String,
  isAdmin:{
    type: Boolean,
    default: false
  }
});


mongoose.models = {};
export const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

