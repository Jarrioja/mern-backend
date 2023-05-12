import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  code: {
    type: String,
    require: true,
    unique: true,
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
    default: true,
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
productSchema.plugin(mongoosePaginate);
const Product = model("Product", productSchema);
export { Product };
