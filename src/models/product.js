import mongoose from "mongoose";
import { Category } from "./category";

const productSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: String,
  desc: String,
  img: String,
  price: Number,
  isFeatured: {
    type: Boolean,
    default: false
  },
  options: [mongoose.Schema.Types.Mixed],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  catSlug: String
});

productSchema.pre('validate', async function(next) {
  // Logic to populate 'category' based on 'catSlug'
  if (this.catSlug) {
    const category = await Category.findOne({ slug: this.catSlug });
    if (category) {
      this.category = category._id;
    }
  }
  next();
});

mongoose.models = {};
export const Product = mongoose.model('Product', productSchema);

