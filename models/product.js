import { Schema, model } from "mongoose";

const productSchema = new Schema({
  code: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  stock: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: Array,
  },
});

const Product = model("Product", productSchema);
export { Product };
