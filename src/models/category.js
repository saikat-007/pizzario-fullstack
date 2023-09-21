import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: String,
  desc: String,
  color: String,
  img: String,
  slug: {
    type: String,
    unique: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});


mongoose.models = {};
export const Category = mongoose.model("Category", categorySchema);
//export const User = mongoose.model("User", schema);
